import { Resource } from '../../Resource';
import { Aircraft as AircraftType, DuffelResponse, PaginationMeta } from '../../types';
/** Aircraft are used to describe what passengers will fly in for a given trip
 * @class
 * @link https://duffel.com/docs/api/aircraft
 */
export declare class Aircraft extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Retrieves an aircraft by its ID
     * @param {string} id - Duffel's unique identifier for the aircraft
     * @link https://duffel.com/docs/api/aircraft/get-aircraft-by-id
     */
    get: (id: string) => Promise<DuffelResponse<AircraftType>>;
    /**
     * Retrieves a page of aircraft. The results may be returned in any order.
     * @param {Object} [options] - Pagination options (optional: limit, after, before)
     * @link https://duffel.com/docs/api/aircraft/get-aircraft
     */
    list: (options?: PaginationMeta) => Promise<DuffelResponse<AircraftType[]>>;
    /**
     * Retrieves a generator of all aircraft. The results may be returned in any order.
     * @link https://duffel.com/docs/api/aircraft/get-aircraft
     */
    listWithGenerator: () => AsyncGenerator<DuffelResponse<AircraftType>, void, unknown>;
}
