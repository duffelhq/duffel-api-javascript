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

  test('should get a page of orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders?limit=1`)
      .reply(200, { data: [mockOrder], meta: { limit: 1, before: null, after: null } })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOrder.id)
  })

  test('should get all orders paginated', async () => {
    nock(/(.*)/)
      .get(`/air/orders`)
      .reply(200, { data: [mockOrder], meta: { limit: 1, before: null, after: null } })

    const response = new Orders(new Client({ token: 'mockToken' })).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockOrder.id)
    }
  })

  test('should get only on hold orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders?awaiting_payment=true`)
      .reply(200, { data: mockOnHoldOrders, meta: { limit: 1, before: null, after: null } })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({ awaiting_payment: true })
    expect(response.data).toHaveLength(2)
    expect(response.data[0].payment_status.awaiting_payment).toBe(true)
    expect(response.data[1].payment_status.awaiting_payment).toBe(true)
  })

  test('should create an order', async () => {
    nock(/(.*)/).post(`/air/orders`).query(true).reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).create(mockCreateOrderRequest)
    expect(response.data?.id).toBe(mockOrder.id)
  })
})
