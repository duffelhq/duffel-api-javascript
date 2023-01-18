import { PaymentType } from '../../types';
/**
 * To pay for an unpaid order you've previously created, you'll need to create a payment for it.
 * @link https:/duffel.com/docs/api/payments/schema
 */
export interface Payment {
    /**
     * The amount of the payment.
     * This should be the same as the `total_amount` of the offer specified in `selected_offers` for an instant order or the `total_amount` of the previously created pay later order specified in `order_id`, plus the `total_amount` of all the services specified in services.
     */
    amount: string;
    /**
     * The currency of the amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * For an instant order, this should be the same as the `total_currency` of the offer specified in selected_offers.
     * For a pay later order, this should be the same as the `total_currency` of the previously created order specified in `order_id`.
     */
    currency?: string | null;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the payment was created
     */
    created_at: string;
    /**
     * Duffel's unique identifier for the payment
     */
    id: string;
    /**
     * The type of payment you want to apply to the order.
     * If you are an IATA agent with your own agreements with airlines, in some cases, you can pay using ARC/BSP cash by specifying `arc_bsp_cash`.
     * Otherwise, you must pay using your Duffel account's balance by specifying `balance`. In [test mode](https://duffel.com/docs/api/overview/test-mode), your balance is unlimited.
     * If you're not sure which of these options applies to you, get in touch with the Duffel support team at [help@duffel.com](mailto:help@duffel.com).
     */
    type: PaymentType;
}
export interface CreatePayment {
    /**
     * The `id` of the order you want to pay for.
     */
    order_id: string;
    /**
     * The payment details to use to pay for the order
     */
    payment: Omit<Payment, 'created_at' | 'id'>;
}
