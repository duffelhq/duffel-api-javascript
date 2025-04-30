import { Resource } from '../../Resource'
import {
  ConfirmOrderChangePayment,
  CreateOrderChangeParameters,
  DuffelResponse,
  OrderChangeOffer,
} from '../../types'

/**
 * Once you've created an order change request, and you've chosen which slices to add and remove, you'll then want to create an order change.
 */
export class OrderChanges extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/order_changes'
  }

  /**
   * To begin the process of changing an order you need to create an order change.
   * The OrderChange will contain the `selected_order_change_offer` reference of the change you wish to make to your order.
   * @link https://duffel.com/docs/api/order-changes/create-order-change
   */
  public create = async (
    options: CreateOrderChangeParameters,
  ): Promise<DuffelResponse<OrderChangeOffer>> =>
    this.request({ method: 'POST', path: this.path, data: options })

  /**
   * Retrieves an order change by its ID
   * @param {string} id - Duffel's unique identifier for the order change
   * @link https://duffel.com/docs/api/order-changes/get-order-change-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<OrderChangeOffer>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Once you've created a pending order change, you'll know the change_total_amount due for the change.
   * @param {string} id - Duffel's unique identifier for the order change
   * @param {payment} Object - The payment details to use to pay for the order change, if there is an amount to be paid. Some order changes may not need this if they instead refund an amount. In those cases, you can pass any empty object.
   * @link https://duffel.com/docs/api/order-changes/confirm-order-change
   */
  public confirm = async (
    id: string,
    options: Partial<ConfirmOrderChangePayment>,
  ): Promise<DuffelResponse<OrderChangeOffer>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${id}/actions/confirm`,
      data: options,
    })
}
