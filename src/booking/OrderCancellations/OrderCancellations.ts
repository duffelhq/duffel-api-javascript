import { Resource } from '../../Resource'
import { CreateOrderCancellation, DuffelResponse, OrderCancellation } from '../../types'

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
   * Create order cancellation
   * @description To begin the process of cancelling an order you need to create an order cancellation.
   * @param order_id - Duffel's unique identifier for the order
   * @link https://duffel.com/docs/api/order-cancellations/create-order-cancellation
   */
  public create = async (options: CreateOrderCancellation): Promise<DuffelResponse<OrderCancellation>> => {
    return this.request({ method: 'POST', path: this.path, data: options })
  }

  /**
   * Confirm order cancellation
   * @description Once you've created a pending order cancellation, you'll know the `refund_amount` you're due to get back.
   * @param {string} id - Duffel's unique identifier for the order to cancel
   * @link https://duffel.com/docs/api/order-cancellations/confirm-order-cancellation
   */
  public confirm = async (id: string): Promise<DuffelResponse<OrderCancellation>> =>
    this.request({ method: 'POST', path: `${this.path}/${id}/actions/confirm` })
}
