import nock from 'nock'
import { Client } from '../../Client'
import { mockOrder, mockCreateOrderRequest, mockOnHoldOrders } from './mockOrders'
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
    function* testResponse() {
      yield { data: [mockOrder], meta: { limit: 50, before: 'test', after: null } }
    }
    nock(/(.*)/).get(`/air/orders`).query(true).reply(200, testResponse)

    const response = new Orders(new Client({ token: 'mockToken' })).list()
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockOrder.id)
    }
  })

  test('should get only on hold orders', async () => {
    function* testResponse() {
      yield { data: [mockOnHoldOrders], meta: { limit: 50, before: 'test', after: null, awaitingPayment: true } }
    }
    nock(/(.*)/).get(`/air/orders`).query(true).reply(200, testResponse)

    const response = new Orders(new Client({ token: 'mockToken' })).list()
    for await (const page of response) {
      expect(page.data).toHaveLength(3)
      expect(page.data![0].id).toBe('ord_0000A6GioOO1UDbjb7nIi8')
    }
  })

  test('should create an order', async () => {
    nock(/(.*)/).post(`/air/orders`).query(true).reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).create(mockCreateOrderRequest)
    expect(response.data?.id).toBe(mockOrder.id)
  })
})
