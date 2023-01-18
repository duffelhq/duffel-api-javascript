import { OfferSliceSegment } from '../Offers/OfferTypes';
import { PlaceType, Place } from '../../types';
/**
 * @link https://duffel.com/docs/api/order-change-offers/schema
 */
export interface OrderChangeOffer {
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
     * The ISO 8601 datetime at which the offer was created
     */
    created_at: string;
    /**
     * The ISO 8601 datetime at which the offer will expire
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
     * The ID for an order change if one has already been created from this order change offer
     */
    order_change_id: string;
    /**
     * The penalty price imposed by the airline for making this change
     */
    penalty_amount: string;
    /**
     * The currency of the penalty_amount, as an ISO 4217 currency code.
     * It will match your organisation's billing currency unless you're using
     * Duffel as an accredited IATA agent, in which case it will be in the
     * currency provided by the airline (which will usually be based on
     * the country where your IATA agency is registered).
     */
    penalty_currency: string;
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
     *  The ISO 8601 datetime at which the offer was last updated
     */
    updated_at: string;
}
export interface OrderChangeOfferSlices {
    /**
     * The slices that will be added to the order
     */
    add: OrderChangeOfferSlice[];
    /**
     * The slices that will be removed from the order
     */
    remove: OrderChangeOfferSlice[];
}
export interface OrderChangeOfferSlice {
    /**
     * The city or airport where this slice ends
     */
    destination: Place;
    /**
     * The type of the destination
     */
    destination_type: PlaceType;
    /**
     * The duration of the slice, represented as a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration
     */
    duration?: string | null;
    /**
     * Duffel's unique identifier for the slice. It identifies the slice of an order (i.e. the same slice across orders will have different `id`s.
     */
    id: string;
    /**
     * The city or airport where this slice begins
     */
    origin: Place;
    /**
     * The type of the origin
     */
    origin_type: PlaceType;
    /**
     * The segments - that is, specific flights - that the airline is offering to get the passengers from the `origin` to the `destination`
     */
    segments: Array<Omit<OfferSliceSegment, 'passengers'>>;
}
