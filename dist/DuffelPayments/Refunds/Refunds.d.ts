import { Resource } from '../../Resource';
import { DuffelResponse } from '../../types';
import { CreateRefund, Refund } from './RefundsType';
export declare class Refunds extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * You should use this API to get the complete, up-to-date information about a Refund.
     * @param {string} id - Duffel's unique identifier for the Refund
     * @link https://duffel.com/docs/api/refunds/get-refund-by-id
     */
    get: (id: string) => Promise<DuffelResponse<Refund>>;
    /**
     * Create a Refund to refund some money to a customer that they paid using a Payment Intent. You must specify the amount and currency. The currency is currently limited to the currency in which the Payment Intent was made.
     * @param {Object.<CreateFund>} params - Endpoint params (amount, currency and payment_intent_id)
     */
    create: (params: CreateRefund) => Promise<DuffelResponse<Refund>>;
}
