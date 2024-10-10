import { PaginationMeta } from '../../types'

export interface CreateOrderCancellation {
  /**
   * Duffel's unique identifier for the order
   */
  order_id: string
}

export interface ListOrderCancellationsParams extends PaginationMeta {
  /**
   * Duffel's unique identifier for the order, returned when it was created
   */
  order_id?: string
}

export interface OrderCancellationAirlineCredit {
  /**
   * Duffel's unique identifier for the airline credit
   */
  id: string

  /**
   * The human-readable name used by the airline to categorize the type of credit being offered. This name should help when trying to understand the airline's conditions of use which apply to this credit.
   */
  credit_name: string

  /**
   * The code which identifies the airline credit to the airline and will be used to redeem the airline credit
   */
  credit_code: string

  /**
   * The monetary value associated with this airline credit
   */
  credit_amount: string

  /**
   * The currency in which this airline credit is issued, as an ISO 4217 currency code
   */
  credit_currency: string

  /**
   * The date the credit was issued. It is important to note that this date might not be the same as the date of cancellation. Often airlines associate credits with tickets, in which case the date of issue is considered to be the date the ticket was originally issued. Airline credits may have expiration dates which are based on the date of issue. Airlines don't always reliably disclose the expiration date in their APIs at the time of cancellation, so we are unable to return this information on airline credits. To get the latest info on expiration dates for airline credits we recommend checking directly with the airlines to determine the specific conditions of use for the credit.
   */
  issued_on: string

  /**
   * Duffel's unique identifier for the passenger on the order that the credit is associated with
   */
  passenger_id: string
}

export interface OrderCancellation {
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime that indicates when the order cancellation was confirmed
   */
  confirmed_at: string
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the order cancellation was created
   */
  created_at: string
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime by which this cancellation must be confirmed
   */
  expires_at: string
  /**
   * Duffel's unique identifier for the order cancellation
   */
  id: string
  /**
   * Whether the order cancellation was created in live mode. This field will be set to `true` if the order cancellation was created in live mode, or `false` if it was created in test mode.
   */
  live_mode: boolean
  /**
   * Duffel's unique identifier for the order
   */
  order_id: string
  /**
   * The amount that will be returned to the original payment method if the order is cancelled, determined according
   * to the fare conditions. This may be 0.00 if the fare is non-refundable. It will include the refund amount
   * of the flights and the services booked. This may be null in cases where the refund amount is unknown.
   * This only applies in cases where we are unable to get a refund quote from the carrier.
   */
  refund_amount: string | null
  /**
   * The currency of the refund_amount, as an ISO 4217 currency code.
   * It will match your organisation's billing currency unless you’re using Duffel as an accredited IATA agent,
   * in which case it will be in the currency provided by the airline (which will usually be based on the
   * country where your IATA agency is registered). For hold orders that are awaiting payment, the refund amount will always be 0.00.
   */
  refund_currency: string | null
  /**
   * Where the refund, once confirmed, will be sent. `card` is currently a restricted feature. `awaiting_payment` is for pay later orders where no payment has been made yet.
   */
  refund_to:
    | 'arc_bsp_cash'
    | 'balance'
    | 'card'
    | 'voucher'
    | 'awaiting_payment'
    | 'airline_credits'

  /**
   * The airline credits for this OrderCancellation
   */
  airline_credits: OrderCancellationAirlineCredit[]
}
