export interface Refund {
    /**
     * The amount of the Payment Intent that will be refunded to the customer
     */
    amount: string;
    /**
     * When the refund is expected to arrive in the destination
     */
    arrival: string;
    /**
     * The ISO 8601 datetime at which the Refund was created
     */
    created_at: string;
    /**
     * The currency of the amount, as an ISO 4217 currency code.
     * It will always match the currency of the Payment Intent.
     */
    currency: string;
    /**
     * Where the Refund amount will be sent to
     */
    destination: 'original_form_of_payment';
    /**
     * Duffel's unique identifier for the Refund
     */
    id: string;
    /**
     * Whether the Refund was created in live mode. This field will be set to true if the Refund was created in live mode, or false if it was created in test mode.
     */
    live_mode: boolean;
    /**
     * The amount deducted from your Balance to cover the Refund amount
     */
    net_amount: string;
    /**
     * The currency of the net_amount, as an ISO 4217 currency code.
     * This currency will match your Balance currency.
     */
    net_currency: string;
    /**
     * Duffel's unique identifier for the Payment Intent that the Refund is for
     */
    payment_intent_id: string;
    /**
     * The status of the Refund.
     * Succeeded: The refund is on its way to the destination.
     * Pending: The Refund could not be processed immediately, and is pending processing.
     * Failed: A refund can fail if the customer’s bank or card issuer has been unable to process it correctly (e.g., a closed bank account or a problem with the card). The bank returns the refunded amount to us and we add it back to your Balance. This process can take up to 30 days from the post date.
     */
    status: 'succeeded' | 'pending' | 'failed';
    /**
     * The ISO 8601 datetime at which the Refund was updated
     */
    updated_at: string;
}
export interface CreateRefund {
    /**
     * This amount that will be refunded to the customer's card.
     */
    amount: string;
    /**
     * The currency of the amount, as an ISO 4217 currency code.
     * It must match the Payment Intent currency.
     */
    currency: string;
    /**
     * Duffel's unique identifier for the Payment Intent that the Refund is for
     */
    payment_intent_id: string;
}
