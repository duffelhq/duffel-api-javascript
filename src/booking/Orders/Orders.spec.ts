import nock from 'nock'
import { Client } from '../../Client'
import {
  mockAddServicesRequest,
  mockCreateOrderRequest,
  mockOnHoldOrders,
  mockOrder,
  mockServices,
} from './mockOrders'
import { Orders } from './Orders'

describe('Orders', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order', async () => {
    nock(/(.*)/)
      .get(`/air/orders/${mockOrder.id}`)
      .reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).get(
      mockOrder.id
    )
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should get a page of orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders`)
      .query((queryObject) => {
        expect(queryObject.limit).toEqual('1')
        return true
      })
      .reply(200, {
        data: [mockOrder],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({
      limit: 1,
    })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOrder.id)
  })

  test('should get all orders paginated', async () => {
    nock(/(.*)/)
      .get(`/air/orders`)
      .reply(200, {
        data: [mockOrder],
        meta: { limit: 1, before: null, after: null },
      })

    const response = new Orders(
      new Client({ token: 'mockToken' })
    ).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockOrder.id)
    }
  })

  test('should get only on hold orders', async () => {
    nock(/(.*)/)
      .get(`/air/orders`)
      .query((queryObject) => {
        expect(queryObject['awaiting_payment']).toEqual('true')
        return true
      })
      .reply(200, {
        data: mockOnHoldOrders,
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({
      awaiting_payment: true,
    })
    expect(response.data).toHaveLength(2)
    expect(response.data[0].payment_status.awaiting_payment).toBe(true)
    expect(response.data[1].payment_status.awaiting_payment).toBe(true)
  })

  test('should create an order', async () => {
    nock(/(.*)/)
      .post(`/air/orders`, (body) => {
        expect(body.data).toEqual(mockCreateOrderRequest)
        return true
      })
      .reply(200, { data: mockOrder })

    const response = await new Orders(
      new Client({ token: 'mockToken' })
    ).create(mockCreateOrderRequest)
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should get orders matching a passenger name', async () => {
    nock(/(.*)/)
      .get(`/air/orders?passenger_name[]=Earhart`)
      .reply(200, {
        data: [mockOrder],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({
      'passenger_name[]': ['Earhart'],
    })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].passengers[0].family_name).toContain('Earhart')
  })

  test('should get orders matching a given PNR / booking reference', async () => {
    nock(/(.*)/)
      .get(`/air/orders?booking_reference=RZPNX8`)
      .reply(200, {
        data: [mockOrder],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Orders(new Client({ token: 'mockToken' })).list({
      booking_reference: 'RZPNX8',
    })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].booking_reference).toBe('RZPNX8')
  })

  test('should update a single order', async () => {
    const metadata = { payment_intent_id: 'pit_00009htYpSCXrwaB9DnUm2' }
    nock(/(.*)/)
      .patch(`/air/orders/${mockOrder.id}`, (body) => {
        expect(body.data.options.metadata['payment_intent_id']).toEqual(
          metadata['payment_intent_id']
        )
        return true
      })
      .reply(200, { data: mockOrder })

    const response = await new Orders(
      new Client({ token: 'mockToken' })
    ).update(mockOrder.id, { metadata })
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should update a single order and clear metadata', async () => {
    const metadata = {}
    nock(/(.*)/)
      .patch(`/air/orders/${mockOrder.id}`, (body) => {
        expect(body.data.options.metadata).toEqual(metadata)
        return true
      })
      .reply(200, { data: mockOrder })

    const response = await new Orders(
      new Client({ token: 'mockToken' })
    ).update(mockOrder.id, { metadata })
    expect(response.data?.id).toBe(mockOrder.id)
  })

  test('should get order passenger with loyalty programme details', async () => {
    nock(/(.*)/)
      .get(`/air/orders/${mockOrder.id}`)
      .reply(200, { data: mockOrder })

    const response = await new Orders(new Client({ token: 'mockToken' })).get(
      mockOrder.id
    )

    expect(response.data.passengers[0].id).toBe('pas_00009hj8USM7Ncg31cBCLL')
    expect(response.data.passengers[0].loyalty_programme_accounts).toHaveLength(
      1
    )
  })

  test('should get available services for an order', async () => {
    nock(/(.*)/)
      .get(`/air/orders/${mockOrder.id}/available_services`)
      .reply(200, { data: mockServices })

    const response = await new Orders(
      new Client({ token: 'mockToken' })
    ).getAvailableServices(mockOrder.id)

    expect(response.data[0].id).toBe(mockServices[0].id)
  })

  test('should add services to an order', async () => {
    nock(/(.*)/)
      .post(`/air/orders/${mockOrder.id}/services`)
      .reply(200, { data: { ...mockOrder, services: mockServices } })

    const response = await new Orders(
      new Client({ token: 'mockToken' })
    ).addServices(mockOrder.id, mockAddServicesRequest)

    expect(response.data.services[0].id).toBe(mockServices[0].id)
  })
})
