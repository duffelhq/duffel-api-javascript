import { Resource } from '../../Resource';
import { CreateOrderChangeRequest, DuffelResponse, OrderChangeRequestResponse } from '../../types';
/**
 *
 * To change an order, you'll need to create an order change request.
 * This is still in PREVIEW mode
 * @export
 * @class OrderChangeRequests
 * @extends {Resource}
 */
export declare class OrderChangeRequests extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Retrieves an order change request by its ID
     * @param {string} id - The ID of your order change request
     */
    get: (id: string) => Promise<DuffelResponse<OrderChangeRequestResponse>>;
    /**
     *
     * To change flights on an existing paid order, you'll need to create an order change request.
     * @link https://duffel.com/docs/api/order-change-requests/create-order-change-request
     * @memberof OrderChangeRequests
     */
    create: (options: CreateOrderChangeRequest) => Promise<DuffelResponse<OrderChangeRequestResponse>>;
}
