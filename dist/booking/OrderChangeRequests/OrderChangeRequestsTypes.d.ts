import { CabinClass, Place } from '../../types';
import { OrderChangeOfferSlices } from '../OrderChangeOffers/OrderChangeOfferTypes';
export interface OrderChangeSliceResponse {
    remove: {
        slice_id: string;
    };
    add: {
        /**
         * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date on which the passengers want to depart
         */
        departure_date: string;
        /**
         * The city or airport where this slice ends
         */
        destination: Place;
        /**
         * The city or airport where this slice begins
         */
        origin: Place;
        /**
         * The cabin that the passengers want to travel in
         */
        cabin_class: CabinClass;
    };
}
export interface OrderChangeOffers {
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer was last updated
     */
    updated_at: string;
    /**
     * The price of this offer as a change to your existing order, excluding taxes
     */
    change_total_amount: string | null;
    /**
     * The currency of the `change_total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * It will match your organisation's billing currency unless you're using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
     */
    change_total_currency: string | null;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer was created
     */
    created_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer will expire and no longer be usable to create an order
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
     * The currency of the `new_total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code. It will match your organisation's billing currency unless you're using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
     */
    new_total_currency: string;
    /**
     * The ID for an `order change` if one has already been created from this `order change offer`
     */
    order_change_id: string;
    /**
     * The penalty price imposed by the airline for making this change
     */
    penalty_amount: string | null;
    /**
     * The currency of the `penalty_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * It will match your organisation's billing currency unless you're using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
     */
    penalty_currency: string | null;
    /**
     * Where the refund, once confirmed, will be sent. `card` is currently a restricted feature. `awaiting_payment` is for pay later orders where no payment has been made yet.
     */
    refund_to: 'arc_bsp_cash' | 'balance' | 'card' | 'voucher' | 'awaiting_payment';
    /**
     * The slices within an order change that are being added to and/or removed from the order
     */
    slices: OrderChangeOfferSlices;
}
export interface OrderChangeRequestResponse {
    /**
     * The ID of your order change request
     */
    id: string;
    /**
     * Whether the order was created in live mode. This field will be set to `true` if the order was created in live mode, or `false` if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * The list of the offers available to perform change on the order.
     */
    order_change_offers: OrderChangeOffers[];
    /**
     * The order ID that you want to change
     */
    order_id: string;
    /**
     * The slices to be added and/or removed
     */
    slices: OrderChangeSliceResponse;
}
export interface CreateOrderChangeRequest {
    /**
     * The changes you wish to make to your order
     */
    changes: {
        /**
         * The [slices](https://duffel.com/docs/api/overview/key-principles) that make up this offer request. One-way journeys can be expressed using one slice, whereas return trips will need two.
         */
        slices: {
            /**
             * The search criteria for slices which you wish to add to your order
             */
            add: {
                /**
                 * The cabin that the passengers want to travel in
                 */
                cabin_class: CabinClass;
                /**
                 * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date on which the passengers want to depart
                 */
                departure_date: string;
                /**
                 * The 3-letter IATA code for the city or airport where this slice ends
                 */
                destination: string;
                /**
                 * The 3-letter IATA code for the city or airport where this slice starts
                 */
                origin: string;
            }[];
            /**
             * The slices that you wish to remove from your order
             */
            remove: {
                slice_id: string;
            }[];
        };
    };
    /**
     * The order ID you wish to change
     */
    order_id: string;
}
