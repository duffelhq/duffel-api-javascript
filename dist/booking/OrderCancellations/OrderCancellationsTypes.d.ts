import { PaginationMeta } from '../../types';
export interface CreateOrderCancellation {
    /**
     * Duffel's unique identifier for the order
     */
    order_id: string;
}
export interface ListOrderCancellationsParams extends PaginationMeta {
    /**
     * Duffel's unique identifier for the order, returned when it was created
     */
    order_id?: string;
}
export interface OrderCancellation {
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime that indicates when the order cancellation was confirmed
     */
    confirmed_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the order cancellation was created
     */
    created_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime by which this cancellation must be confirmed
     */
    expires_at: string;
    /**
     * Duffel's unique identifier for the order cancellation
     */
    id: string;
    /**
     * Whether the order cancellation was created in live mode. This field will be set to `true` if the order cancellation was created in live mode, or `false` if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * Duffel's unique identifier for the order
     */
    order_id: string;
    /**
     * The amount that will be returned to the original payment method if the order is cancelled, determined according to the fare conditions. This may be `0.00` if the fare is non-refundable. It will include the refund amount of the flights and the services booked.
     */
    refund_amount: string;
    /**
     * The currency of the `refund_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * It will match your organisation's billing currency unless you're using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
     * For pay later orders that are awaiting payment, the refund amount will always be 0.00.
     */
    refund_currency: string;
    /**
     * Where the refund, once confirmed, will be sent. `card` is currently a restricted feature. `awaiting_payment` is for pay later orders where no payment has been made yet.
     */
    refund_to: 'arc_bsp_cash' | 'balance' | 'card' | 'voucher' | 'awaiting_payment';
}
