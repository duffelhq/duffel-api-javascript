import omit from 'lodash/omit'
import nock from 'nock'
import { Client } from '../../Client'
import { mockCreateOfferRequest, mockOfferRequest } from './mockOfferRequest'
import { OfferRequests } from './OfferRequests'

describe('OfferRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer request', async () => {
    nock(/(.*)/).get(`/air/offer_requests/${mockOfferRequest.id}`).reply(200, { data: mockOfferRequest })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).get(mockOfferRequest.id)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })

  test('should get all offer requests', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests`)
      .reply(200, { data: [mockOfferRequest], meta: { limit: 1, before: null, after: null } })

    const response = new OfferRequests(new Client({ token: 'mockToken' })).list()
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockOfferRequest.id)
    }
  })

  test('should create an offer request and return offers by default', async () => {
    nock(/(.*)/).post(`/air/offer_requests/`).query(true).reply(200, { data: mockOfferRequest })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create({
      body: mockCreateOfferRequest
    })
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })

  test('should create an offer request and no offers should return when requested', async () => {
    const mockResponseWithoutOffer = omit(mockOfferRequest, 'offers')
    nock(/(.*)/).post(`/air/offer_requests/`).query(true).reply(200, { data: mockResponseWithoutOffer })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create({
      body: mockCreateOfferRequest,
      queryParams: { returnOffers: false }
    })
    expect(response.data?.offers).toBe(undefined)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })
})
