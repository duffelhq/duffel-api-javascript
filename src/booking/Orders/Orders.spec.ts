import nock from 'nock'
import { Client } from '../../Client'
import { mockCreateOrderRequest, mockOnHoldOrders, mockOrder } from './mockOrders'
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

    const response = await new Orders(new Client({ token: 'mockToken' })).create({ bodyParams: mockCreateOrderRequest })
    expect(response.data?.id).toBe(mockOrder.id)
  })
})
