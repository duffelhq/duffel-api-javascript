import nock from 'nock'
import { Client } from '../../Client'
import { OrderCancellation } from './OrderCancellation'
import { mockOrderCancellation } from './mockOrderCancellation'

describe('OrderCancellations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should create a order cancellation', async () => {
    nock(/(.*)/).post(`/air/order_cancellations`).reply(200, { data: mockOrderCancellation })

    const response = await new OrderCancellation(new Client({ token: 'mockToken' })).create({
      bodyParam: {
        order_id: 'ord_00009hthhsUZ8W4LxQgkjo'
      }
    })
    expect(response.data?.orderId).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })

  test('should confirm the order cancellation', async () => {
    nock(/(.*)/)
      .post(`/air/order_cancellations/${mockOrderCancellation.id}/actions/confirm`)
      .reply(200, { data: mockOrderCancellation })

    const response = await new OrderCancellation(new Client({ token: 'mockToken' })).confirm({
      id: 'ore_00009qzZWzjDipIkqpaUAj'
    })
    expect(response.data?.orderId).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })
})
