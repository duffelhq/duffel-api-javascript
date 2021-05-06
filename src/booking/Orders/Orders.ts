import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { CreateOrder, ListParamsOrders, Order } from './OrdersTypes'

export class Orders extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/orders'
  }

  /**
   * Retrieves an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public get = async (id: string): Promise<APIResponse<Order>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

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
   * @param {{bodyParams, queryParams}} { bodyParams, queryParams }
   */
  public create = async ({
    bodyParams,
    queryParams
  }: {
    bodyParams: CreateOrder
    queryParams?: Record<string, any>
  }): Promise<APIResponse<Order>> => {
    return this.request({ method: 'POST', path: this.path, bodyParams, queryParams })
  }
}
