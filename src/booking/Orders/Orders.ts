import { APIResponse } from 'types'
import { OrdersType } from './OrdersTypes'
import { Resource } from '../../Resource'

export class Orders extends Resource {
  /**
   * Retrieves an order by its ID
   * @param {string} id - Duffel's unique identifier for the order
   */
  public get = async (id: string): Promise<APIResponse<OrdersType.Order>> => this.request('GET', `air/orders/${id}`)

  /**
   * Retrieves a paginated list of all orders. The results may be returned in any order.
   */
  public list = async (): Promise<APIResponse<OrdersType.Order[]>> => this.request('GET', `air/orders`)

  /**
   * Creates a booking with an airline based on an offer.
   * @param body
   */
  public create = async (body: OrdersType.CreateOrder): Promise<APIResponse<OrdersType.Order>> => {
    return this.request('POST', `air/orders/`, body)
  }
}
