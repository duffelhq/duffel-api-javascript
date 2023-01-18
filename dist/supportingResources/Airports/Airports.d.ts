import { Resource } from '../../Resource';
import { Airport, DuffelResponse, PaginationMeta } from '../../types';
/** Airports are used to identify origins and destinations in journey slices
 * @class
 * @link https://duffel.com/docs/api/airports
 */
export declare class Airports extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Retrieves an airport by its ID
     * @param {string} id - Duffel's unique identifier for the airport
     * @link https://duffel.com/docs/api/airports/get-airport-by-id
     */
    get: (id: string) => Promise<DuffelResponse<Airport>>;
    /**
     * Retrieves a page of airports. The results may be returned in any order.
     * @param {Object} [options] - Pagination options (optional: limit, after, before)
     * @link https://duffel.com/docs/api/airports/get-airports
     */
    list: (options?: PaginationMeta) => Promise<DuffelResponse<Airport[]>>;
    /**
     * Retrieves a generator of all airports. The results may be returned in any order.
     * @link https://duffel.com/docs/api/airports/get-airports
     */
    listWithGenerator: () => AsyncGenerator<DuffelResponse<Airport>, void, unknown>;
}
