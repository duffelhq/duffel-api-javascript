import { Resource } from '../../Resource';
import { AddServices, CreateOrder, DuffelResponse, ListParamsOrders, Order, OrderAvailableService, PaginationMeta, UpdateSingleOrder } from '../../types';
export declare class Orders extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Retrieves an order by its ID
     * @param {string} id - Duffel's unique identifier for the order
     */
    get: (id: string) => Promise<DuffelResponse<Order>>;
    /**
     * Retrieves a page of orders. The results may be returned in any order.
     * @param {Object} [options] - Pagination options (optional: limit, after, before)
     * @link https://duffel.com/docs/api/orders/get-orders
     */
    list: (options?: PaginationMeta & ListParamsOrders) => Promise<DuffelResponse<Order[]>>;
    /**
     * Retrieves a generator of all orders. The results may be returned in any order.
     * You can optionally filter the results by the `awaiting_payment` state and sort by the `payment_required_by` date.
     * @param {Object} [options] - Optional query parameters: awaiting_payment, sort
     * @link https://duffel.com/docs/api/orders/get-orders
     */
    listWithGenerator: (options?: ListParamsOrders) => AsyncGenerator<DuffelResponse<Order>, void, unknown>;
    /**
     * Creates a booking with an airline based on an offer.
     */
    create: (options: CreateOrder) => Promise<DuffelResponse<Order>>;
    /**
     * Updates a single order
     * @description Some order fields are updateable. Each field that can be updated is detailed in the request object.
     * @param {string} id - Duffel's unique identifier for the order
     * @param {Object.UpdateSingleOrder} options
     * @example (id: 'ord_00009hthhsUZ8W4LxQgkjo', { metadata: { 'payment_intent_id': 'pit_00009htYpSCXrwaB9DnUm2' } } )
     * @link https://duffel.com/docs/api/orders/update-order-by-id
     */
    update: (id: string, options: UpdateSingleOrder) => Promise<DuffelResponse<Order>>;
    /**
     * Retrieves the available services for an order by its ID
     * @param {string} id - Duffel's unique identifier for the order
     */
    getAvailableServices: (id: string) => Promise<DuffelResponse<OrderAvailableService[]>>;
    /**
     * Adds services for an order by its ID
     * @param {string} id - Duffel's unique identifier for the order
     * @param {Object.AddServices} options
     * @link https://duffel.com/docs/api/orders/create-order-services
     */
    addServices: (id: string, options: AddServices) => Promise<DuffelResponse<Order>>;
}
