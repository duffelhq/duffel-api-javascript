import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { DuffelResponse, Order } from '../../types'
import {
  AirlineInitiatedChange,
  AirlineInitiatedChangeActionTaken,
} from './AirlineInitiatedChangesTypes'

/**
 * Sometimes there can be changes to your order initiated by the airline, for
 * example a flight being delayed. We record every one of these changes so that
 * you can view them all or for an order. You can filter changes for a specific
 * order using the `order_id` parameter.
 *
 * Each airline-initiated change contains an `added` and `removed` field. `added`
 * contains the updated slices following the change. These slices and their
 * segments may have a new ID based on the change. `removed` contains a list of
 * slices and their segments as they were before the change.
 */
export class AirlineInitiatedChanges extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/airline_initiated_changes'
  }

  /**
   * This endpoint is only available to those airline-initiated changes that
   * Duffel cannot accept on behalf of the customer. Duffel is unable to accept
   * an airline-initiated change when these two conditions are true: the order
   * was booked with the merchant's IATA number and Duffel is unable to accept
   * the airline-initiated change programatically. In this case you, the
   * customer, are responsible to resolve airline-initiated changes concerning
   * this order (e.g. by contacting the airline directly). Once these have been
   * resolved, you need to inform us of the action taken so we can mark it
   * accordingly in our system.
   *
   * @param {AirlineInitiatedChange['id']} id - Duffel's unique identifier for
   * the airline-initiated change
   *
   * @param action_taken - The action taken in response to this
   * airline-initiated change. Accepted, cancelled and changed reflect your
   * action in accepting the change, cancelling the order or changing the order
   * respectively.
   *
   * @link https://duffel.com/docs/api/v1/airline-initiated-changes/update-airline-initiated-changes
   */
  public update = async (
    id: AirlineInitiatedChange['id'],
    action_taken: AirlineInitiatedChangeActionTaken
  ): Promise<DuffelResponse<AirlineInitiatedChange>> =>
    this.request({
      method: 'PATCH',
      path: `${this.path}/${id}`,
      data: { action_taken },
    })

  /**
   * Once there is an airline-initiated change you can choose to accept it.
   *
   * @param {AirlineInitiatedChange['id']} id - Duffel's unique identifier for
   * the airline-initiated change
   *
   * @link https://duffel.com/docs/api/v1/airline-initiated-changes/accept-airline-initiated-changes
   */
  public accept = async (
    id: AirlineInitiatedChange['id']
  ): Promise<DuffelResponse<AirlineInitiatedChange>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${id}/actions/accept`,
    })

  /**
   * Retrieves a list of all airline-initiated changes.
   *
   * @param order_id - Filters airline-initiated changes by their order ID.
   * Value must be a valid order ID. Check the [Order schema](https://duffel.com/docs/api/orders/schema#orders-schema-id)
   * for details.
   *
   * @link https://duffel.com/docs/api/v1/airline-initiated-changes/get-airline-initiated-changes
   */
  public list = async (
    order_id: Order['id']
  ): Promise<DuffelResponse<Order['airline_initiated_changes']>> =>
    this.request({
      method: 'GET',
      path: this.path,
      params: {
        order_id,
      },
    })
}
