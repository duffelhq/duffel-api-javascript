import { APIResponse, OrderChangeOfferSlice } from 'types'
import { Resource } from '../../Resource'
import { CreateOrderChangeParameters } from 'types/OrderChanges'

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
   */
  public create = async ({
    bodyParams
  }: {
    bodyParams: CreateOrderChangeParameters
  }): Promise<APIResponse<OrderChangeOfferSlice>> => this.request({ method: 'POST', path: this.path, bodyParams })

  /**
   * Retrieves an order change by its ID
   * @param {string} id - Duffel's unique identifier for the order change
   */
  public get = async (id: string): Promise<APIResponse<OrderChangeOfferSlice>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Once you've created a pending order change, you'll know the change_total_amount due for the change.
   * @param {string} id - Duffel's unique identifier for the order change
   */
  public confirm = async (id: string): Promise<APIResponse<OrderChangeOfferSlice>> =>
    this.request({ method: 'POST', path: `${this.path}/${id}` })
}
