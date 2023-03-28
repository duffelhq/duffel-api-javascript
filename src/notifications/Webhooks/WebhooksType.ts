import { PaginationMeta } from 'types'

export interface Webhooks {
  /**
   * Whether the webhook receiver is actively being notified or not
   */
  active: boolean

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the webhook was created
   */
  created_at: string

  /**
   * The events that this webhook will be subscribed to
   */
  events: string[]

  /**
   * Duffel's unique identifier for the webhook receiver
   */
  id: string

  /**
   * The live mode that the webhook was created in. It will only receive events for that same live mode. For example, you won't receive order.created events for orders that you created in the sandbox, if your webhook is for live_mode: true.
   */
  live_mode: boolean

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the order change was updated
   */
  updated_at: string

  /**
   * The URL where your webhook will be received
   */
  url: string
}

export interface WebhooksListDeliveriesParams extends PaginationMeta {
  delivery_success: boolean

  /**
   * Filters the returned webhook deliveries by creation datetime.
   */
  created_at?: PaginationMeta

  /**
   * Filters webhook deliveries by the type of their related webhook event.
   */
  type?: string

  /**
   * Filters webhook deliveries by the ID of the related webhook endpoint.
   */
  endpoint_id: string
}

export interface WebhooksUpdateParams {
  /**
   * The desired active status of the webhook
   */
  active: boolean

  /**
   * The desired events that the webhook should subscribe to
   */
  events: string[]

  /**
   * The desired url of the webhook
   */
  url: string
}

export interface WebhooksCreateParams {
  /**
   * The desired events that the webhook should subscribe to
   */
  events: string[]

  /**
   * The desired url of the webhook
   */
  url: string
}

export interface WebhooksListDeliveriesResponse {
  /**
   * The URL where your webhook will be received
   */
  url: string

  endpoint_id: string

  /**
   * Webhook deliveries will be included if they were successful.
   */
  delivery_success?: boolean

  type: string

  response_status_code: 200

  response_body: string

  event_id: string

  /**
   * The live mode that the webhook was created in. It will only receive events for that same live mode. For example, you won't receive order.created events for orders that you created in the sandbox, if your webhook is for live_mode: true.
   */
  live_mode: boolean

  /**
   * Duffel's unique identifier for the webhook receiver
   */
  id: string

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the webhook was created
   */
  created_at: string
}

export interface WebhooksListResponse extends Webhooks {
  /**
   * Webhook deliveries will be included if they were successful.
   */
  delivery_success?: boolean
}

export interface WebhooksCreateResponse {
  secret: string
  url: string
  updated_at: string
  live_mode: boolean
  id: string
  events: string[]
  created_at: string
  active: boolean
}
