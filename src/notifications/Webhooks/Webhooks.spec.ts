import nock from 'nock'
import * as mockWebhooks from './mockWebhooks'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Webhooks', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should trigger a re-delivery of an event to a webhook', async () => {
    nock(/(.*)/)
      .post(`/air/webhooks/events/wev_0000A3tQSmKyqOrcySrGbo/actions/redeliver`)
      .reply(200, {})

    const response = await duffel.webhooks.redeliver(
      'wev_0000A3tQSmKyqOrcySrGbo'
    )
    expect(response.data).toBe(undefined)
  })

  test('should trigger a ping to a webook', async () => {
    nock(/(.*)/)
      .post(`/air/webhooks/wev_0000A3tQSmKyqOrcySrGbo/actions/ping`)
      .reply(200, {})

    const response = await duffel.webhooks.ping('wev_0000A3tQSmKyqOrcySrGbo')
    expect(response.data).toBe(undefined)
  })

  test('should get a single webhook event', async () => {
    nock(/(.*)/)
      .get(`/air/webhooks/events/wev_0000A3tQSmKyqOrcySrGbo`)
      .reply(200, { data: mockWebhooks.mockWebhooksSingleGetEventResponse })

    const response = await duffel.webhooks.get('wev_0000A3tQSmKyqOrcySrGbo')
    expect(response.data.id).toBe('wev_0000A3tQSmKyqOrcySrGbo')
  })

  test('should retrieve a paginated list of webhooks deliveries', async () => {
    nock(/(.*)/)
      .get(`/air/webhooks/deliveries`)
      .query((queryObject) => {
        expect(queryObject?.limit).toBe('1')
        expect(queryObject?.before).toBe(
          'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB='
        )
        expect(queryObject?.after).toBe(
          'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB='
        )
        expect(queryObject?.type).toBe('order.created')
        expect(queryObject?.delivery_success).toBe('true')
        expect(queryObject?.endpoint_id).toBe('end_0000A3tQSmKyqOrcySrGbo')
        return true
      })
      .reply(200, { data: mockWebhooks.mockWebhooksListDeliveriesResponse })

    const response = await duffel.webhooks.listDeliveries({
      limit: 1,
      before: 'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=',
      after: 'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=',
      type: 'order.created',
      delivery_success: true,
      endpoint_id: 'end_0000A3tQSmKyqOrcySrGbo',
    })
    expect(response.data[0].endpoint_id).toBe('end_0000A3tQSmKyqOrcySrGbo')
  })

  test('should delete a webhook', async () => {
    nock(/(.*)/)
      .delete(`/air/webhooks/end_0000A3tQSmKyqOrcySrGbo`)
      .reply(200, {})

    const response = await duffel.webhooks.delete('end_0000A3tQSmKyqOrcySrGbo')
    expect(response.data).toBe(undefined)
  })

  test('should retrieve a paginated list of webhooks', async () => {
    nock(/(.*)/)
      .get('/air/webhooks')
      .query((queryObject) => {
        expect(queryObject?.limit).toBe('1')
        expect(queryObject?.before).toBe(
          'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB='
        )
        expect(queryObject?.after).toBe(
          'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB='
        )
        return true
      })
      .reply(200, { data: mockWebhooks.mockWebhooksListResponse })

    const response = await duffel.webhooks.list({
      limit: 1,
      before: 'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=',
      after: 'g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=',
    })
    expect(response.data[0].id).toBe('end_0000A3tQSmKyqOrcySrGbo')
  })

  test('should create a webhook', async () => {
    nock(/(.*)/)
      .post('/air/webhooks')
      .reply(200, { data: mockWebhooks.mockWebhooksCreateResponse })

    const response = await duffel.webhooks.create({
      url: 'https://www.example.com/webhooks',
      events: ['order.created', 'order.airline_initiated_change_detected'],
    })
    expect(response.data.url).toBe('https://www.example.com:4000/webhooks')
  })
})
