import { APIResponse, CreateOrderCancellations, OrderCancellationsResponse } from 'types'
import { Resource } from '../../Resource'

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
   * Create order cancellation
   * @description To begin the process of cancelling an order you need to create an order cancellation.
   * @param bodyParams.order_id - Duffel's unique identifier for the order
   */
  public create = async ({
    bodyParams,
    queryParams
  }: {
    bodyParams: CreateOrderCancellations
    queryParams?: Record<string, any>
  }): Promise<APIResponse<OrderCancellationsResponse>> => {
    return this.request({ method: 'POST', path: this.path, bodyParams, queryParams })
  }

  /**
   * Confirm order cancellation
   * @description Once you've created a pending order cancellation, you'll know the `refund_amount` you're due to get back.
   * @param {{
   *     id: string
   *     queryParams
   *   }} {
   *     id,
   *     queryParams
   *   }
   */
  public confirm = async ({
    id,
    queryParams
  }: {
    id: string
    queryParams?: Record<string, any>
  }): Promise<APIResponse<OrderCancellationsResponse>> =>
    this.request({ method: 'POST', path: `${this.path}/${id}/actions/confirm`, queryParams })
}
