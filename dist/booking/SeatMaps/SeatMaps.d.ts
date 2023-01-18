import { Resource } from '../../Resource';
import { DuffelResponse, SeatMap } from '../../types';
export declare class SeatMaps extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(args: any);
    /**
     * Gets seat maps by specific parameters. At the moment we only support querying by an offer ID.
     * @param {string} offer_id - Duffel's unique identifier for the offer
     * @link https://duffel.com/docs/api/seat-maps/get-seat-maps
     */
    get: (params: {
        offer_id: string;
    }) => Promise<DuffelResponse<SeatMap>>;
}
