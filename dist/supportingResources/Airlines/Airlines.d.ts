import { Resource } from '../../Resource';
import { Airline, DuffelResponse, PaginationMeta } from '../../types';
/** Airlines are used to identify the air travel companies selling and operating flights
 * @class
 * @link https://duffel.com/docs/api/airlines */
export declare class Airlines extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Retrieves an airline by its ID
     * @param {string} id - Duffel's unique identifier for the airline
     * @link https://duffel.com/docs/api/airlines/get-airline-by-id
     */
    get: (id: string) => Promise<DuffelResponse<Airline>>;
    /**
     * Retrieves a page of airlines. The results may be returned in any order.
     * @param {Object} [options] - Pagination options (optional: limit, after, before)
     * @link https://duffel.com/docs/api/airlines/get-airlines
     */
    list: (options?: PaginationMeta) => Promise<DuffelResponse<Airline[]>>;
    /**
     * Retrieves a generator of all airlines. The results may be returned in any order.
     * @link https://duffel.com/docs/api/airlines/get-airlines
     */
    listWithGenerator: () => AsyncGenerator<DuffelResponse<Airline>, void, unknown>;
}
