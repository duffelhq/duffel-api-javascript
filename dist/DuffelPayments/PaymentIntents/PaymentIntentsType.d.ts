export interface PaymentIntent {
    /**
     * The amount of the Payment Intent that covers the cost of the flight being sold and any additional markup.
     * The card payment will be charged this amount.
     */
    amount: string;
    /**
     * The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code of the country that issued the card used to confirm the Payment Intent.
     * It will be null until the Payment Intent is confirmed.
     */
    card_country_code: string | null;
    /**
     * The last four digits of the card used to confirm the Payment Intent.
     * It will be null until the Payment Intent is confirmed.
     */
    card_last_four_digits: string | null;
    /**
     * The card network in which the Payment Intent was processed on.
     * It will be null until the Payment Intent is confirmed.
     */
    card_network: 'amex' | 'cartes_bancaires' | 'diners' | 'discover' | 'interac' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' | 'unknown' | null;
    /**
     * This value is used when displaying the payment collection form to securely identify and transmit the values to Duffel.
     */
    client_token: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the Payment Intent was confirmed
     */
    confirmed_at: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the Payment Intent was created
     */
    created_at: string;
    /**
     * The currency of the `amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * The card payment will be charged in this currency.
     * If it's different to your Balance currency, it will be converted to your Balance currency before the Balance is topped up.
     */
    currency: string;
    /**
     * The amount of the fees to process the Payment Intent.
     * It will be `null` until the Payment Intent is confirmed.
     */
    fees_amount: string | null;
    /**
     * The currency of the fees_amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * This currency will match your Balance currency.
     * It will be null until the Payment Intent is confirmed.
     */
    fees_currency: string | null;
    /**
     * Duffel's unique identifier for the `Payment Intent`
     */
    id: string;
    /**
     * Whether the Payment Intent was created in live mode. This field will be set to `true` if the Payment Intent was created in live mode, or `false` if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * The amount of the Payment Intent that was added to the Balance.
     * It'll be `amount` (in the Balance currency) less the `fees_amount`.
     * It will be `null` until the Payment Intent is confirmed.
     */
    net_amount: string | null;
    /**
     * The currency of the net_amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * This currency will match your Balance currency.
     * It will be null until the Payment Intent is confirmed.
     */
    net_currency: string | null;
    /**
     * The Refunds for this Payment Intent
     * @link https://duffel.com/docs/api/payment-intents/schema#payment-intents-schema-refunds
     */
    refunds: {
        amount: string;
        arrival: string;
        created_at: string;
        currency: string;
        destination: string;
        id: string;
        live_mode: boolean;
        net_amount: string;
        net_currency: string;
        payment_intent_id: string;
        status: 'succeeded' | 'pending' | 'failed';
        updated_at: string;
    }[];
    /**
     * The status of this Payment Intent
     */
    status: null | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'cancelled' | 'succeeded';
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the Payment Intent was updated
     */
    updated_at: string;
}
export interface CreatePaymentIntent {
    /**
     * This is the amount that the card payment being taken will be charged.
     * It should be enough to cover the service(s) you want to sell (enough to book an Offer for example) and the processing fees.
     * If the currency is different from your Balance currency you should also account for foreign exchange.
     * It can be higher than that, in which case the remainder will be considered your markup.
     * If it's higher than the maximum allowed for you organisation you will get a validation error. By default the maximum is 5,000.00 GBP (or equivalent in the same currency). If you need a maximum higher than the default please get in touch with us via help@duffel.com.
     */
    amount: string;
    /**
     * The currency of the amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * This is going to be the currency that the card payment being taken in will be charged in.
     */
    currency: string;
}
