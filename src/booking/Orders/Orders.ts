import { Resource } from '../../Resource'
import { CreateOrder, DuffelResponse, ListParamsOrders, Order, PaginationMeta } from '../../types'

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
  public get = async (id: string): Promise<DuffelResponse<Order>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of orders. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/orders/get-orders
   */
  public list = (options?: { queryParams?: PaginationMeta & ListParamsOrders }): Promise<DuffelResponse<Order[]>> =>
    this.request({ method: 'GET', path: this.path, ...options })

  /**
   * Retrieves a generator of all orders. The results may be returned in any order.
   * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
   * @param {Object} [options] - Optional query parameters: awaiting_payment, sort
   * @link https://duffel.com/docs/api/orders/get-orders
   */
  public listWithGenerator = (options?: {
    queryParams?: ListParamsOrders
  }): AsyncGenerator<DuffelResponse<Order>, void, unknown> => this.paginatedRequest({ path: 'air/orders', ...options })

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
  }): Promise<DuffelResponse<Order>> => {
    return this.request({ method: 'POST', path: this.path, bodyParams, queryParams })
  }
}
