import nock from 'nock'
import { Client } from '../../Client'
import { mockOrderCancellation } from './mockOrderCancellations'
import { OrderCancellations } from './OrderCancellations'

describe('OrderCancellations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should create a order cancellation', async () => {
    nock(/(.*)/)
      .post(`/air/order_cancellations`)
      .reply(200, { data: mockOrderCancellation })

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
        `/air/order_cancellations/${mockOrderCancellation.id}/actions/confirm`
      )
      .reply(200, { data: mockOrderCancellation })

    const response = await new OrderCancellations(
      new Client({ token: 'mockToken' })
    ).confirm('ore_00009qzZWzjDipIkqpaUAj')
    expect(response.data?.order_id).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })

  test('should get a page of order cancellations', async () => {
    nock(/(.*)/)
      .get(`/air/order_cancellations`)
      .query((queryObject) => {
        expect(queryObject?.order_id).toBe('ord_123')
        expect(queryObject?.limit).toEqual('1')
        return true
      })
      .reply(200, {
        data: [mockOrderCancellation],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new OrderCancellations(
      new Client({ token: 'mockToken' })
    ).list({
      order_id: 'ord_123',
      limit: 1,
    })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOrderCancellation.id)
  })

  test('should get all order cancellations paginated', async () => {
    nock(/(.*)/)
      .get(`/air/order_cancellations`)
      .query((queryObject) => {
        expect(queryObject?.order_id).toBe('ord_123')
        return true
      })
      .reply(200, {
        data: [mockOrderCancellation],
        meta: { limit: 50, before: null, after: null },
      })

    const response = await new OrderCancellations(
      new Client({ token: 'mockToken' })
    ).listWithGenerator({
      order_id: 'ord_123',
    })

    for await (const page of response) {
      expect(page.data.id).toBe(mockOrderCancellation.id)
    }
  })
})
