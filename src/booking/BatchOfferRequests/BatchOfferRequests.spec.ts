import nock from 'nock'
import { Client } from '../../Client'
import {
  mockCreateBatchOfferRequest,
  mockBatchOfferRequest,
} from './mockBatchOfferRequest'
import { BatchOfferRequests } from './BatchOfferRequests'

describe('BatchOfferRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer request', async () => {
    nock(/(.*)/)
      .get(`/air/batch_offer_requests/${mockBatchOfferRequest.id}`)
      .reply(200, { data: mockBatchOfferRequest })

    const response = await new BatchOfferRequests(
      new Client({ token: 'mockToken' }),
    ).get(mockBatchOfferRequest.id)
    expect(response.data?.id).toBe(mockBatchOfferRequest.id)
  })

  test('should create an offer request and returns the id', async () => {
    nock(/(.*)/)
      .post(`/air/batch_offer_requests/`)
      .reply(200, { data: mockBatchOfferRequest })

    const response = await new BatchOfferRequests(
      new Client({ token: 'mockToken' }),
    ).create(mockCreateBatchOfferRequest)
    expect(response.data?.id).toBe(mockBatchOfferRequest.id)
  })
})
