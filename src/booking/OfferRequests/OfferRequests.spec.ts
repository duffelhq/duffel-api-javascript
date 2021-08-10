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

  test('should get a page of offer requests', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests?limit=1`)
      .reply(200, { data: [mockOfferRequest], meta: { limit: 1, before: null, after: null } })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOfferRequest.id)
  })

  test('should get all offer requests paginated', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests`)
      .reply(200, { data: [mockOfferRequest], meta: { limit: 1, before: null, after: null } })

    const response = new OfferRequests(new Client({ token: 'mockToken' })).listWithGenerator()
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

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create(mockCreateOfferRequest)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })

  test('should create an offer request and no offers should return when requested', async () => {
    const mockResponseWithoutOffer = { ...mockOfferRequest }
    delete mockResponseWithoutOffer.offers
    nock(/(.*)/)
      .post(`/air/offer_requests/`)
      .query({ return_offers: false })
      .reply(200, { data: mockResponseWithoutOffer })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create(mockCreateOfferRequest, {
      return_offers: false
    })
    expect(response.data?.offers).toBe(undefined)
    expect(response.data?.id).toBe(mockOfferRequest.id)
  })
})
