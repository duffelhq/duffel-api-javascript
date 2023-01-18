/**
 * Aircraft are used to describe what passengers will fly in for a given trip
 * @link https://duffel.com/docs/api/aircraft/schema
 */
export interface Aircraft {
    /**
     * The name of the aircraft
     */
    name: string;
    /**
     * Duffel's unique identifier for the aircraft
     */
    id: string;
    /**
     * The three-character IATA code for the aircraft
     */
    iata_code: string;
}
