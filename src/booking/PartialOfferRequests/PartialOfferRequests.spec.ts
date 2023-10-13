import nock from 'nock'
import { Client } from '../../Client'
import {
  mockCreatePartialOfferRequest,
  mockPartialOfferRequest,
} from './mockPartialOfferRequest'
import { PartialOfferRequests } from './PartialOfferRequests'

describe('PartialOfferRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a partial offer request with selected offer', async () => {
    nock(/(.*)/)
      .get(`/air/partial_offer_requests/${mockPartialOfferRequest.id}`)
      .query((queryObject) => {
        expect(queryObject['selected_partial_offer[]']).toEqual([
          'partial_offer_1',
          'partial_offer_2',
        ])
        return true
      })
      .reply(200, { data: mockPartialOfferRequest })

    const response = await new PartialOfferRequests(
      new Client({ token: 'mockToken' }),
    ).get(mockPartialOfferRequest.id, {
      'selected_partial_offer[]': ['partial_offer_1', 'partial_offer_2'],
    })
    expect(response.data?.id).toBe(mockPartialOfferRequest.id)
    expect(response.data?.offers.length).toBeGreaterThan(0)
  })

  test('should create an offer request and return offers', async () => {
    nock(/(.*)/)
      .post(`/air/partial_offer_requests/`)
      .reply(200, { data: mockPartialOfferRequest })

    const response = await new PartialOfferRequests(
      new Client({ token: 'mockToken' }),
    ).create(mockCreatePartialOfferRequest)
    expect(response.data?.id).toBe(mockPartialOfferRequest.id)
    expect(response.data?.offers.length).toBeGreaterThan(0)
  })

  test('should get a fares request with selected offers', async () => {
    nock(/(.*)/)
      .get(`/air/partial_offer_requests/${mockPartialOfferRequest.id}/fares`)
      .query((queryObject) => {
        expect(queryObject['selected_partial_offer[]']).toEqual([
          'partial_offer_1',
          'partial_offer_2',
        ])
        return true
      })
      .reply(200, { data: mockPartialOfferRequest })

    const response = await new PartialOfferRequests(
      new Client({ token: 'mockToken' }),
    ).getFaresById(mockPartialOfferRequest.id, {
      'selected_partial_offer[]': ['partial_offer_1', 'partial_offer_2'],
    })
    expect(response.data?.id).toBe(mockPartialOfferRequest.id)
    expect(response.data?.offers.length).toBeGreaterThan(0)
  })
})
