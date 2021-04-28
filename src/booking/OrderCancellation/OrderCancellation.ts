import { APIResponse } from 'types'
import { Resource } from '../../Resource'
import { CreateOrderCancellation, OrderCancellationResponse } from './OrderCancellationTypes'

export class OrderCancellation extends Resource {
  /**
   * Create order cancellation
   * @description To begin the process of cancelling an order you need to create an order cancellation.
   * @param body.order_id - Duffel's unique identifier for the order
   */
  public create = async ({
    body,
    queryParams
  }: {
    body: CreateOrderCancellation
    queryParams?: Record<string, any>
  }): Promise<APIResponse<OrderCancellationResponse>> => {
    return this.request('POST', `air/order_cancellations`, body, queryParams)
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
  }): Promise<APIResponse<OrderCancellationResponse>> =>
    this.request('POST', `air/order_cancellations/${id}/actions/confirm`, undefined, queryParams)
}
