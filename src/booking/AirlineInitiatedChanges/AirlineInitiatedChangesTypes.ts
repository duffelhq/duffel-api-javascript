import { OrderSlice } from 'types'

export type AirlineInitiatedChangeActionTaken =
  | 'accepted'
  | 'cancelled'
  | 'changed'

export type AirlineInitiatedChangeAvailableAction =
  | 'accept'
  | 'cancel'
  | 'change'
  | 'update'

export interface AirlineInitiatedChange {
  /**
   * The action taken in response to this airline-initiated change. Accepted,
   * cancelled and changed reflect your action in accepting the change,
   * cancelling the order or changing the order respectively.
   */
  action_taken: AirlineInitiatedChangeActionTaken | null

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which an
   * action was taken.
   */
  action_taken_at: string | null

  /**
   * List of updated (slices and segments)[https://duffel.com/docs/api/orders/schema#orders-schema-slices]
   * following the change. These slices and segments may each have a new ID as a
   * result of the changes.
   */
  added: OrderSlice[]

  /**
   * The available actions you can take on this Airline-Initiated Change through
   * our API.`"update"` means that you can use the update endpoint for an
   * Airline-Initiated Change.
   */
  available_actions: AirlineInitiatedChangeAvailableAction[]

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which we
   * detected the airline-initiated change.
   */
  created_at: string

  /**
   * Duffel's unique identifier for the airline-initiated change.
   */
  id: string

  /**
   * Duffel's unique identifier for the order.
   */
  order_id: string

  /**
   * List of (slices and segments)[https://duffel.com/docs/api/orders/schema#orders-schema-slices]
   * as they were before the change.
   */
  removed: OrderSlice[]

  /**
   * The associated Travel Agent Ticket, if any, for this Airline-Initiated
   * Change. This value will be present for Airline-Initiated changes that take
   * some time to be processed.
   */
  travel_agent_ticket: any | null

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which
   * the airline-initiated change was last updated.
   */
  updated_at: string
}
