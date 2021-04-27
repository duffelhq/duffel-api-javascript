import nock from 'nock'
import { Client } from '../../Client'
import { mockCreateOrderRequest, mockOnHoldOrders, mockOrder, mockOrderCancellation } from './mockOrders'
import { Orders } from './Orders'

describe('Orders', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order', async () => {
    nock(/(.*)/).get(`/air/orders/${mockOrder.id}`).reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).get(mockOrder.id)
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should get all orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders`)
      .reply(200, { data: [mockOrder], meta: { limit: 1, before: null, after: null } })

    const response = new Orders(new Client({ token: 'mockToken' })).list()
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockOrder.id)
    }
  })

  test('should get only on hold orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders?awaiting_payment=true`)
      .reply(200, { data: mockOnHoldOrders, meta: { limit: 1, before: null, after: null } })

    const response = new Orders(new Client({ token: 'mockToken' })).list({ queryParams: { awaiting_payment: true } })
    for await (const page of response) {
      expect(page.data).toHaveLength(2)
      expect(page.data![0].id).toBe('ord_0000A6GioOO1UDbjb7nIi8')
    }
  })

  test('should create an order', async () => {
    nock(/(.*)/).post(`/air/orders`).query(true).reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).create({ body: mockCreateOrderRequest })
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should create a order cancellation', async () => {
    nock(/(.*)/).post(`/air/order_cancellations`).reply(200, { data: mockOrderCancellation })

    const response = await new Orders(new Client({ token: 'mockToken' })).createOrderCancellation({
      body: {
        order_id: 'ord_00009hthhsUZ8W4LxQgkjo'
      }
    })
    expect(response.data?.orderId).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })

  test('should confirm the order cancellation', async () => {
    nock(/(.*)/)
      .post(`/air/order_cancellations/${mockOrderCancellation.id}/actions/confirm`)
      .reply(200, { data: mockOrderCancellation })

    const response = await new Orders(new Client({ token: 'mockToken' })).confirmOrderCancellation({
      id: 'ore_00009qzZWzjDipIkqpaUAj'
    })
    expect(response.data?.orderId).toBe('ord_00009hthhsUZ8W4LxQgkjo')
  })
})
