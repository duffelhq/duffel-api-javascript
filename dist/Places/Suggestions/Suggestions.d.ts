import { Client } from 'Client';
import { Resource } from '../../Resource';
import { DuffelResponse, Places } from '../../types';
interface PlacesSuggestionsParameters {
    /**
     * A search string for finding matching Places.
     */
    query: string;
}
/**
 * A Place is a city or airport that can serve as an origin or destination.
 * * @link https://duffel.com/docs/api/places
 */
export declare class Suggestions extends Resource {
    /**
     * Endpoint path
     */
    path: string;
    constructor(client: Client);
    /**
     * Retrieves a list of Places matching the provided query
     */
    list: (params: PlacesSuggestionsParameters) => Promise<DuffelResponse<Places[]>>;
}
export {};
