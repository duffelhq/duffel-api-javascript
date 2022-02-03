import nock from 'nock'
import { Client } from '../../Client'
import { CreateOfferRequest } from './OfferRequestsTypes'
import { mockCreateOfferRequest, mockOfferRequest } from './mockOfferRequest'
import { OfferRequests } from './OfferRequests'

describe('OfferRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer request', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests/${mockOfferRequest.id}`)
      .reply(200, { data: mockOfferRequest })

    const response = await new OfferRequests(
      new Client({ token: 'mockToken' })
    ).get(mockOfferRequest.id)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })

  test('should get a page of offer requests', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests?limit=1`)
      .reply(200, {
        data: [mockOfferRequest],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new OfferRequests(
      new Client({ token: 'mockToken' })
    ).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOfferRequest.id)
  })

  test('should get all offer requests paginated', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests`)
      .reply(200, {
        data: [mockOfferRequest],
        meta: { limit: 1, before: null, after: null },
      })

    const response = new OfferRequests(
      new Client({ token: 'mockToken' })
    ).listWithGenerator()
    for await (const page of response) {
      expect(page.data!.id).toBe(mockOfferRequest.id)
    }
  })

  test('should create an offer request and return offers by default', async () => {
    nock(/(.*)/)
      .post(`/air/offer_requests/`)
      .query((queryObject) => {
        expect(queryObject?.return_offers).toBe(undefined)
        return true
      })
      .reply(200, { data: mockOfferRequest })

    const response = await new OfferRequests(
      new Client({ token: 'mockToken' })
    ).create(mockCreateOfferRequest)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })

  test('should create an offer request and return an offer with passenger loyalty programme details', async () => {
    const passengersWithLoyaltyProgrammes: CreateOfferRequest['passengers'] = [
      {
        type: 'adult',
        given_name: 'Tony',
        family_name: 'Stark',
        loyalty_programme_accounts: [
          {
            account_number: '12901014',
            airline_iata_code: 'BA',
          },
        ],
      },
    ]

    const mockResponseWithLoyaltyProgrammes = {
      ...mockOfferRequest,
      passengers: [
        {
          ...passengersWithLoyaltyProgrammes[0],
          id: 'pas_0000AD3shfu6ubXmZr5R1H',
        },
      ],
    }

    nock(/(.*)/)
      .post('/air/offer_requests/')
      .reply(200, { data: mockResponseWithLoyaltyProgrammes })

    const response = await new OfferRequests(
      new Client({ token: 'mockToken' })
    ).create({
      ...mockCreateOfferRequest,
      passengers: passengersWithLoyaltyProgrammes,
    })
    expect(
      response.data?.passengers[0].loyalty_programme_accounts
    ).toHaveLength(1)
  })

  test('should create an offer request and return the offer request id when `return_offers` is false', async () => {
    const mockResponseWithoutOffer = Object.entries(mockOfferRequest).reduce(
      (res, [key, value]) =>
        key === 'offers' ? res : { ...res, [key]: value },
      {}
    )

    nock(/(.*)/)
      .post(`/air/offer_requests/`)
      .query({ return_offers: false })
      .reply(200, { data: mockResponseWithoutOffer })

    const response = await new OfferRequests(
      new Client({ token: 'mockToken' })
    ).create({
      ...mockCreateOfferRequest,
      return_offers: false,
    })
    // In this case, `offers` won't be in the response, but the offer request's id will still be returned and can be used with the List Offers endpoint to retrieve the offers.
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })
})
