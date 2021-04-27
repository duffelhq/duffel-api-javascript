import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { CreateOrder, ListParamsOrders, Order, CreateOrderCancellation, OrderCancellationResponse } from './OrdersTypes'

export class Orders extends Resource {
  /**
   * Retrieves an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public get = async (id: string): Promise<APIResponse<Order>> =>
    this.request({ method: 'GET', path: `air/orders/${id}` })

  /**
   * Retrieves a paginated list of all orders. The results may be returned in any order.
   * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
   * @param {Object} [options] - Pagination query parameters (optional: limit, after, before) and other optional query parameters (awaiting_payment, sort)
   */
  public list = (options?: {
    queryParams?: PaginationMeta & ListParamsOrders
  }): AsyncGenerator<APIResponse<Order[]>, void, unknown> => this.paginatedRequest({ path: 'air/orders', ...options })

  /**
   * Creates a booking with an airline based on an offer.
   * @param {{body, queryParams}} { body, queryParams }
   */
  public create = async ({
    body,
    queryParams
  }: {
    body: CreateOrder
    queryParams?: Record<string, any>
  }): Promise<APIResponse<Order>> => {
    return this.request({ method: 'POST', path: `air/orders`, body, queryParams })
  }

  /**
   * To begin the process of cancelling an order you need to create an order cancellation.
   * @param body.order_id - Duffel's unique identifier for the order
   */
  public createOrderCancellation = async ({
    body,
    queryParams
  }: {
    body: CreateOrderCancellation
    queryParams?: Record<string, any>
  }): Promise<APIResponse<OrderCancellationResponse>> => {
    return this.request('POST', `air/order_cancellations`, body, queryParams)
  }

  /**
   *
   * Once you've created a pending order cancellation, you'll know the `refund_amount` you're due to get back.
   * @param {{
   *     id: string
   *     queryParams
   *   }} {
   *     id,
   *     queryParams
   *   }
   */
  public confirmOrderCancellation = async ({
    id,
    queryParams
  }: {
    id: string
    queryParams?: Record<string, any>
  }): Promise<APIResponse<OrderCancellationResponse>> =>
    this.request('POST', `air/order_cancellations/${id}/actions/confirm`, undefined, queryParams)
}
