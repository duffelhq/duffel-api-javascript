import {
  WebhooksCreateResponse,
  WebhooksListDeliveriesResponse,
  WebhooksListResponse,
} from './WebhooksType'

export const mockWebhooksSingleGetEventResponse = {
  type: 'order.created',
  live_mode: true,
  idempotency_key: 'ord_0000ABd6wggSct7BoraU1o',
  id: 'wev_0000A3tQSmKyqOrcySrGbo',
  data: {
    id: 'ord_0000ABd6wggSct7BoraU1o',
  },
  created_at: '2020-04-11T15:48:11.642Z',
  api_version: 'beta',
}

export const mockWebhooksListDeliveriesResponse: WebhooksListDeliveriesResponse[] =
  [
    {
      url: 'https://www.example.com:4000/webhooks',
      type: 'order.created',
      response_status_code: 200,
      response_body: '{}',
      live_mode: true,
      id: 'del_0000A3tQSmKyqOrcySrGbo',
      event_id: 'wev_0000A3tQSmKyqOrcySrGbo',
      endpoint_id: 'end_0000A3tQSmKyqOrcySrGbo',
      created_at: '2020-04-11T15:48:11.642Z',
    },
  ]

export const mockWebhooksUpdateWebhookResponse = {
  url: 'https://www.example.com:4000/webhooks',
  updated_at: '2020-04-11T15:48:11.642Z',
  live_mode: true,
  id: 'end_0000A3tQSmKyqOrcySrGbo',
  events: ['order.created', 'order.airline_initiated_change_detected'],
  created_at: '2020-04-11T15:48:11.642Z',
  active: true,
}

export const mockWebhooksListResponse: WebhooksListResponse[] = [
  {
    url: 'https://www.example.com:4000/webhooks',
    updated_at: '2020-04-11T15:48:11.642Z',
    live_mode: true,
    id: 'end_0000A3tQSmKyqOrcySrGbo',
    events: ['order.created', 'order.airline_initiated_change_detected'],
    created_at: '2020-04-11T15:48:11.642Z',
    active: true,
  },
]

export const mockWebhooksCreateResponse: WebhooksCreateResponse = {
  secret: 'QKfUULLQh+8SegYmIsF6kA==',
  url: 'https://www.example.com:4000/webhooks',
  updated_at: '2020-04-11T15:48:11.642Z',
  live_mode: true,
  id: 'end_0000A3tQSmKyqOrcySrGbo',
  events: ['order.created', 'order.airline_initiated_change_detected'],
  created_at: '2020-04-11T15:48:11.642Z',
  active: true,
}
