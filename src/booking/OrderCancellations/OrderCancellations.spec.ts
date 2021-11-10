import nock from 'nock'
import { Client } from '../../Client'
import { mockOrderCancellations } from './mockOrderCancellations'
import { OrderCancellations } from './OrderCancellations'

describe('OrderCancellations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should create a order cancellation', async () => {
    nock(/(.*)/)
      .post(`/air/order_cancellations`)
      .reply(200, { data: mockOrderCancellations })

    const response = await new OrderCancellations(
      new Client({ token: 'mockToken' })
    ).create({
      order_id: 'ord_00009hthhsUZ8W4LxQgkjo',
    })
    expect(response.data?.order_id).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })

  test('should confirm the order cancellation', async () => {
    nock(/(.*)/)
      .post(
        `/air/order_cancellations/${mockOrderCancellations.id}/actions/confirm`
      )
      .reply(200, { data: mockOrderCancellations })

    const response = await new OrderCancellations(
      new Client({ token: 'mockToken' })
    ).confirm('ore_00009qzZWzjDipIkqpaUAj')
    expect(response.data?.order_id).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })
})
