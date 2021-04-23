import { APIResponse, PaginationMeta } from 'types'
import { OrdersType } from './OrdersTypes'
import { Resource } from '../../Resource'

export class Orders extends Resource {
  /**
   * Retrieves an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public get = async (id: string): Promise<APIResponse<OrdersType.Order>> => this.request('GET', `air/orders/${id}`)

  /**
   * Retrieves a paginated list of all orders. The results may be returned in any order.
   * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
   * @param {Object} [options] - Pagination options (optional: limit, after, before, awaiting_payment, sort)
   */
  public list = (options?: PaginationMeta): AsyncGenerator<APIResponse<OrdersType.Order[]>, void, unknown> =>
    this.paginatedRequest('air/orders', options)

  /**
   * Creates a booking with an airline based on an offer.
   * @param body
   */
  public create = async (body: OrdersType.CreateOrder): Promise<APIResponse<OrdersType.Order>> => {
    return this.request('POST', `air/orders/`, body)
  }
}
