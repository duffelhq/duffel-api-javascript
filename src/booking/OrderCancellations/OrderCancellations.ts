import { Resource } from '../../Resource'
import {
  CreateOrderCancellation,
  DuffelResponse,
  OrderCancellation,
  ListOrderCancellationsParams,
} from '../../types'

export class OrderCancellations extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/order_cancellations'
  }

  /**
   * Retrieves an order cancellation by its ID
   * @param {string} id - Duffel's unique identifier for the order cancellation
   * @link https:/duffel.com/docs/api/order-cancellations/get-order-cancellation-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<OrderCancellation>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of order cancellations. The results may be returned in any order.
   * @param {Object.<ListOrderCancellationsParams>} params - Endpoint options (optional: limit, after, before, order_id)
   * @link https://duffel.com/docs/api/order-cancellations/get-order-cancellations
   */
  public list = (
    params?: ListOrderCancellationsParams
  ): Promise<DuffelResponse<OrderCancellation[]>> =>
    this.request({ method: 'GET', path: this.path, params })

  /**
   * Retrieves a generator of all order cancellations. The results may be returned in any order.
   * @param {Object.<ListOrderCancellationsParams>} params - Endpoint options (optional: limit, after, before, order_id)
   * @link https://duffel.com/docs/api/order-cancellations/get-order-cancellations
   */
  public listWithGenerator = (
    params?: ListOrderCancellationsParams
  ): AsyncGenerator<DuffelResponse<OrderCancellation>, void, unknown> =>
    this.paginatedRequest({ path: this.path, params })

  /**
   * Create order cancellation
   * @description To begin the process of cancelling an order you need to create an order cancellation.
   * @param order_id - Duffel's unique identifier for the order
   * @link https://duffel.com/docs/api/order-cancellations/create-order-cancellation
   */
  public create = async (
    options: CreateOrderCancellation
  ): Promise<DuffelResponse<OrderCancellation>> => {
    return this.request({ method: 'POST', path: this.path, data: options })
  }

  /**
   * Confirm order cancellation
   * @description Once you've created a pending order cancellation, you'll know the `refund_amount` you're due to get back.
   * @param {string} id - Duffel's unique identifier for the order to cancel
   * @link https://duffel.com/docs/api/order-cancellations/confirm-order-cancellation
   */
  public confirm = async (
    id: string
  ): Promise<DuffelResponse<OrderCancellation>> =>
    this.request({ method: 'POST', path: `${this.path}/${id}/actions/confirm` })
}
