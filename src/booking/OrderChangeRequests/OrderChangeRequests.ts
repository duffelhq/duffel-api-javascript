import { APIResponse } from 'types'
import { CreateOrderChangeRequest, OrderChangeRequestResponse } from 'types/OrderChangeRequests'
import { Resource } from '../../Resource'
/**
 *
 * To change an order, you'll need to create an order change request.
 * This is still in PREVIEW mode
 * @export
 * @class OrderChangeRequests
 * @extends {Resource}
 */
export class OrderChangeRequests extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/order_change_requests'
  }
  /**
   * Retrieves an order change request by its ID
   * @param {string} id - The ID of your order change request
   */
  public get = async (id: string): Promise<APIResponse<OrderChangeRequestResponse>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   *
   * To change flights on an existing paid order, you'll need to create an order change request.
   * @memberof OrderChangeRequests
   */
  public create = async ({
    bodyParams
  }: {
    bodyParams: CreateOrderChangeRequest
  }): Promise<APIResponse<OrderChangeRequestResponse>> => this.request({ method: 'POST', path: this.path, bodyParams })
}
