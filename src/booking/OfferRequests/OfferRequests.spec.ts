import nock from 'nock'
import omit from 'lodash/omit'
import { Client } from '../../Client'
import { OfferRequests } from './OfferRequests'
import { mockOfferRequests, mockCreateOfferRequest } from './mockOfferRequests'

describe('OfferRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  test('should get a single offer request', async () => {
    nock(/(.*)/).get(`/air/offer_requests/${mockOfferRequests.id}`).reply(200, { data: mockOfferRequests })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).get(mockOfferRequests.id)
    expect(response.data?.id).toBe(mockOfferRequests.id)
  })
  test('should get list of offer requests', async () => {
    nock(/(.*)/)
      .get(`/air/offer_requests`)
      .reply(200, { data: [mockOfferRequests] })
    const response = await new OfferRequests(new Client({ token: 'mockToken' })).list()
    expect(response.data).toHaveLength(1)
    expect(response.data![0].id).toBe(mockOfferRequests.id)
  })
  test('should create an offer request and return offers', async () => {
    nock(/(.*)/).post(`/air/offer_requests/`).query(true).reply(200, { data: mockOfferRequests })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create(mockCreateOfferRequest)
    expect(response.data?.id).toBe(mockOfferRequests.id)
  })
  test('should create an offer request and no offers should return', async () => {
    const mockResponseWithoutOffer = omit(mockOfferRequests, 'offers')
    nock(/(.*)/).post(`/air/offer_requests/`).query(true).reply(200, { data: mockResponseWithoutOffer })

    const response = await new OfferRequests(new Client({ token: 'mockToken' })).create(mockCreateOfferRequest, false)
    expect(response.data?.offers).toBe(undefined)
    expect(response.data?.id).toBe(mockOfferRequests.id)
  })
})
