import { City } from '../../types';
/**
 * Airports are used to identify origins and destinations in journey slices
 * @link https://duffel.com/docs/api/airports/schema
 */
export interface Airport {
    /**
     * The metropolitan area where the airport is located.
     * Only present for airports which are registered with IATA as belonging to a metropolitan area.
     */
    city?: City | null;
    /**
     * The name of the city (or cities separated by a `/`) where the airport is located
     */
    city_name: string;
    /**
     * The three-character IATA code for the airport
     */
    iata_code?: string;
    /**
     * The ISO 3166-1 alpha-2 code for the country where the city is located
     * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     * @example "GB"
     */
    iata_country_code: string;
    /**
     * The 3-letter IATA code for the city where the place is located.
     * Only present for airports which are registered with IATA as belonging to a [metropolitan area](https://portal.iata.org/faq/articles/en_US/FAQ/How-do-I-create-a-new-Metropolitan-Area).
     */
    iata_city_code?: string | null;
    /**
     * The four-character ICAO code for the airport
     */
    icao_code?: string;
    /**
     * Duffel's unique identifier for the airport
     */
    id: string;
    /**
     * The latitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -90° and 90°
     */
    latitude: number;
    /**
     * The longitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -180° and 180°
     */
    longitude: number;
    /**
     * The name of the airport
     */
    name: string;
    /**
     * The time zone of the airport, specified by name from the [tz database](https://en.wikipedia.org/wiki/Tz_database)
     */
    time_zone: string;
}
