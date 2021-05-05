import nock from 'nock'
import { Client } from '../../Client'
import { OrderRequestChanges } from './OrderRequestChanges'
import {
  mockOrderRequestChange,
  mockCreateChangeRequest,
  mockOrderRequestChangesAltered
} from './mockOrderRequestChanges'

describe('OrderRequestChanges', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order change request', async () => {
    nock(/(.*)/)
      .get(`/air/order_change_requests/${mockOrderRequestChange.id}`)
      .reply(200, { data: mockOrderRequestChange })

    const response = await new OrderRequestChanges(new Client({ token: 'mockToken' })).get(mockOrderRequestChange.id)
    expect(response.data?.id).toBe(mockOrderRequestChange.id)
  })

  test('should create an order change request', async () => {
    nock(/(.*)/).post(`/air/order_change_requests`).reply(200, { data: mockOrderRequestChangesAltered })

    const response = await new OrderRequestChanges(new Client({ token: 'mockToken' })).create({
      bodyParams: mockCreateChangeRequest
    })
    expect(response.data?.slices.remove.slice_id).toBe(mockCreateChangeRequest.changes.slices.remove[0].slice_id)
    expect(response.data?.slices.add.destination.iata_code).toBe(
      mockCreateChangeRequest.changes.slices.add[0].destination
    )
  })
})
