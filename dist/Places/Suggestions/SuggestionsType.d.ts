import { Airport, City } from '../../types';
export interface Places {
    /**
     * The type of the place
     */
    type: string;
    /**
     * The time zone of the airport, specified by name from the tz database
     */
    time_zone: string | null;
    /**
     * The name of the place
     */
    name: string;
    /**
     * The longitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -180° and 180°
     */
    longitude: number | null;
    /**
     * The latitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -90° and 90°
     */
    latitude: number | null;
    /**
     * Duffel's unique identifier for the place
     */
    id: string;
    /**
     * The four-character ICAO code for the airport
     */
    icao_code: string | null;
    /**
     * The ISO 3166-1 alpha-2 code for the country where the city is located
     */
    iata_country_code: string;
    /**
     * The 3-letter IATA code for the place
     */
    iata_code: string;
    /**
     * The 3-letter IATA code for the city where the place is located. Only present for airports which are registered with IATA as belonging to a metropolitan area.
     */
    iata_city_code: string | null;
    /**
     * The name of the country where the city or airport is located
     */
    country_name: string | null;
    /**
     * The name of the city (or cities separated by a /) where the airport is located
     */
    city_name: string | null;
    /**
     * The metropolitan area where the airport is located. Only present for airports which are registered with IATA as belonging to a metropolitan area.
     */
    city: City | null;
    /**
     * The airports associated to a city. This will only be provided where the type is city.
     */
    airports: Airport[] | null;
}
