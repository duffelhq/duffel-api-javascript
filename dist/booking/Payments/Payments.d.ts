import { Resource } from '../../Resource';
import { CreatePayment, DuffelResponse, Payment } from '../../types';
export declare class Payments extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Creates a payment for an existing pay later order.
     * An order can be paid for up to the time limit indicated in `payment_required_by`, after which the space held for the order will be released and you will have to create a new order.
     * @param {string} order_id
     * @param {string} payment
     */
    create: (options: CreatePayment) => Promise<DuffelResponse<Payment>>;
}
