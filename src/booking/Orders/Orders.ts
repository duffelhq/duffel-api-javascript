import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { CreateOrder, ListParamsOrders, Order } from './OrdersTypes'

export class Orders extends Resource {
  /**
   * Retrieves an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public get = async (id: string): Promise<APIResponse<Order>> => this.request('GET', `air/orders/${id}`)

  /**
   * Retrieves a paginated list of all orders. The results may be returned in any order.
   * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
   * @param {Object} [queryParams] - Pagination options (optional: limit, after, before, awaiting_payment, sort)
   */
  public list = (options?: {
    queryParams?: PaginationMeta & ListParamsOrders
  }): AsyncGenerator<APIResponse<Order[]>, void, unknown> => this.paginatedRequest({ path: 'air/orders', ...options })

  /**
   * Creates a booking with an airline based on an offer.
   * @param body
   */
  public create = async ({
    body,
    queryParams
  }: {
    body: CreateOrder
    queryParams?: Record<string, any>
  }): Promise<APIResponse<Order>> => {
    return this.request('POST', `air/orders`, body, queryParams)
  }
}
