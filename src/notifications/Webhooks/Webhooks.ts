import {
  DuffelResponse,
  PaginationMeta,
  Webhooks as WebhooksType,
  WebhooksCreateParams,
  WebhooksCreateResponse,
  WebhooksListDeliveriesParams,
  WebhooksListDeliveriesResponse,
  WebhooksListResponse,
  WebhooksUpdateParams,
} from '../../types'
import { Resource } from '../../Resource'
import { Client } from 'Client'

export class Webhooks extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/webhooks'
  }

  /**
   * Trigger a re-delivery of an event to a webhook.
   * @param {string} id - Duffel's unique identifier for the webhook event
   * @link https://duffel.com/docs/api/v1/webhooks/schema#webhooks-retry-delivering-a-webhook-event-url-parameters-id
   */
  public redeliver = async (id: string): Promise<DuffelResponse<unknown>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/events/${id}/actions/redeliver`,
    })

  /**
   * Send a ping, a "fake event" notification, to a webhook.
   * @param {string} id - Duffel's unique identifier for the webhook receiver
   */
  public ping = async (id: string): Promise<DuffelResponse<unknown>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${id}/actions/ping`,
    })

  /**
   * Retrieves a webhook event by its ID.
   * @param {string} id- Duffel's unique identifier for the webhook event
   */
  public get = async (id: string): Promise<DuffelResponse<WebhooksType>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/events/${id}`,
    })

  /**
   * Retrieve a paginated list of webhook deliveries
   * @param {Object.<WebhooksListDeliveriesParams>} params - Endpoint options
   */
  public listDeliveries = async ({
    ...params
  }: WebhooksListDeliveriesParams): Promise<
    DuffelResponse<WebhooksListDeliveriesResponse[]>
  > =>
    this.request({
      method: 'GET',
      path: `${this.path}/deliveries`,
      params: {
        ...params,
      },
    })

  /**
   * Delete a webhook
   * @param {string} id - Duffel's unique identifier for the webhook receiver
   */
  public delete = async (id: string) =>
    this.request({
      method: 'DELETE',
      path: `${this.path}/${id}`,
    })

  /**
   * Update a webhook
   * @param {string} id - Duffel's unique identifier for the webhook receiver
   */
  public update = async (
    id: string,
    { active, events, url }: WebhooksUpdateParams
  ) =>
    this.request({
      method: 'PATCH',
      path: `${this.path}/${id}`,
      data: {
        active,
        events,
        url,
      },
    })

  /**
   * Retrieve a paginated list of webhook
   * @param {Object.<PaginationMeta>} params - Endpoint options
   */
  public list = async ({
    ...params
  }: PaginationMeta): Promise<DuffelResponse<WebhooksListResponse[]>> =>
    this.request({
      method: 'GET',
      path: this.path,
      params: {
        ...params,
      },
    })

  /**
   * Create a webhook
   * @param {Object.<WebhooksCreateParams>} params - Endpoint options
   */
  public create = async ({
    events,
    url,
  }: WebhooksCreateParams): Promise<DuffelResponse<WebhooksCreateResponse>> =>
    this.request({
      method: 'POST',
      path: this.path,
      data: {
        events,
        url,
      },
    })
}
