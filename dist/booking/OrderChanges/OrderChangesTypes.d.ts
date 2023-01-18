import { OrderChangeOfferSlices, PaymentType } from '../../types';
export interface OrderChange {
    /**
     * The price of this offer as a change to your existing order, excluding taxes
     */
    change_total_amount: string | null;
    /**
     * The currency of the change_total_amount, as an ISO 4217 currency code.
     * It will match your organisation's billing currency unless you're using Duffel
     * as an accredited IATA agent, in which case it will be in the currency provided
     * by the airline (which will usually be based on the country where your
     * IATA agency is registered).
     */
    change_total_currency: string | null;
    /**
     * Whether the order was created in live mode. This field will be set to `true`
     * if the order was created in live mode, or `false` if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer was created
     */
    created_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime that indicates when the order change was confirmed
     */
    confirmed_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer will expire
     * and no longer be usable to create an order
     */
    expires_at: string;
    /**
     * Duffel's unique identifier for the order change offer
     */
    id: string;
    /**
     * The price of this offer if it was newly purchased, excluding taxes
     */
    new_total_amount: string | null;
    /**
     * The currency of the new_total_amount, as an ISO 4217 currency code.
     * It will match your organisation's billing currency unless you're using
     * Duffel as an accredited IATA agent, in which case it will be in the
     * currency provided by the airline (which will usually be based on the
     * country where your IATA agency is registered).
     */
    new_total_currency: string;
    /**
     * Duffel's unique identifier for the order which is being changed
     */
    order_id: string;
    /**
     * The penalty price imposed by the airline for making this change
     */
    penalty_amount: string | null;
    /**
     * The currency of the penalty_amount, as an ISO 4217 currency code.
     * It will match your organisation's billing currency unless you're using
     * Duffel as an accredited IATA agent, in which case it will be in the
     * currency provided by the airline (which will usually be based on
     * the country where your IATA agency is registered).
     */
    penalty_currency: string | null;
    /**
     * Where the refund, once confirmed, will be sent. card is currently a restricted feature.
     * `awaiting_payment` is for pay later orders where no payment has been made yet.
     */
    refund_to: 'arc_bsp_cash' | 'balance' | 'card' | 'voucher' | 'awaiting_payment' | 'original_form_of_payment';
    /**
     * The slices to be added and/or removed
     */
    slices: OrderChangeOfferSlices;
    /**
     * The available payment types to complete the order change.
     */
    available_payment_types?: PaymentType[] | null;
}
export interface CreateOrderChangeParameters {
    /**
     * Duffel's unique identifier for the order change offer
     */
    selected_order_change_offer: string;
}
export interface ConfirmOrderChangePayment {
    /**
     * The amount of the payment. This should be the same as the change_total_amount of the order change.
     */
    amount: string;
    /**
     * The currency of the change_total_amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     */
    currency: string;
    /**
     * The type of payment you want to use for the Order Change.
     * If you are an IATA agent with your own agreements with airlines, in some cases, you can pay using ARC/BSP cash by specifying arc_bsp_cash.
     * Otherwise, you must pay using your Duffel account's balance by specifying balance.
     * In test mode, your balance is unlimited.
     * If you're not sure which of these options applies to you, get in touch with the Duffel support team at [help@duffel.com](mailto:help@duffel.com).
     */
    type: PaymentType;
}
