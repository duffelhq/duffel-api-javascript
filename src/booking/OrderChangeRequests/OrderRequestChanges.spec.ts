import nock from 'nock'
import { Client } from '../../Client'
import {
  mockCreateChangeRequest,
  mockOrderChangeRequest,
  mockOrderChangeRequestAltered,
} from './mockOrderChangeRequests'
import { OrderChangeRequests } from './OrderChangeRequests'

describe('OrderChangeRequests', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order change request', async () => {
    nock(/(.*)/)
      .get(`/air/order_change_requests/${mockOrderChangeRequest.id}`)
      .reply(200, { data: mockOrderChangeRequest })

    const response = await new OrderChangeRequests(
      new Client({ token: 'mockToken' }),
    ).get(mockOrderChangeRequest.id)
    expect(response.data?.id).toBe(mockOrderChangeRequest.id)
  })

  test('should create an order change request', async () => {
    nock(/(.*)/)
      .post(`/air/order_change_requests`)
      .reply(200, { data: mockOrderChangeRequestAltered })

    const response = await new OrderChangeRequests(
      new Client({ token: 'mockToken' }),
    ).create(mockCreateChangeRequest)
    expect(response.data?.slices.remove.slice_id).toBe(
      mockCreateChangeRequest.slices.remove[0].slice_id,
    )
    expect(response.data?.slices.add.destination.iata_code).toBe(
      mockCreateChangeRequest.slices.add[0].destination,
    )
  })
})
