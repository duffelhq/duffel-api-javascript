import { Resource } from '../../Resource'
import {
  AddServices,
  CreateOrder,
  DuffelResponse,
  ListParamsOrders,
  Order,
  OrderAvailableService,
  PaginationMeta,
  UpdateSingleOrder,
} from '../../types'

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
  public list = async (
    options?: PaginationMeta & ListParamsOrders
  ): Promise<DuffelResponse<Order[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all orders. The results may be returned in any order.
   * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
   * @param {Object} [options] - Optional query parameters: awaiting_payment, sort
   * @link https://duffel.com/docs/api/orders/get-orders
   */
  public listWithGenerator = (
    options?: ListParamsOrders
  ): AsyncGenerator<DuffelResponse<Order>, void, unknown> =>
    this.paginatedRequest({ path: 'air/orders', params: options })

  /**
   * Creates a booking with an airline based on an offer.
   */
  public create = async (
    options: CreateOrder
  ): Promise<DuffelResponse<Order>> => {
    return this.request({ method: 'POST', path: this.path, data: options })
  }

  /**
   * Updates a single order
   * @description Some order fields are updateable. Each field that can be updated is detailed in the request object.
   * @param {string} id - Duffel's unique identifier for the order
   * @param {Object.UpdateSingleOrder} options
   * @example (id: 'ord_00009hthhsUZ8W4LxQgkjo', { metadata: { 'payment_intent_id': 'pit_00009htYpSCXrwaB9DnUm2' } } )
   * @link https://duffel.com/docs/api/orders/update-order-by-id
   */
  public update = async (
    id: string,
    options: UpdateSingleOrder
  ): Promise<DuffelResponse<Order>> => {
    return this.request({
      method: 'PATCH',
      path: `${this.path}/${id}`,
      data: { options },
    })
  }

  /**
   * Retrieves the available services for an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public getAvailableServices = async (
    id: string
  ): Promise<DuffelResponse<OrderAvailableService[]>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${id}/available_services`,
    })

  /**
   * Adds services for an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   * @param {Object.AddServices} options
   * @link https://duffel.com/docs/api/orders/create-order-services
   */
  public addServices = async (
    id: string,
    options: AddServices
  ): Promise<DuffelResponse<Order>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${id}/services`,
      data: { options },
    })
}
