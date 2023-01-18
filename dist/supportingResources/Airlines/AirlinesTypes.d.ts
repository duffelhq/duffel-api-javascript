/**
 * Airlines are used to identify the air travel companies selling and operating flights
 * @link https://duffel.com/docs/api/airlines/schema
 */
export interface Airline {
    /**
     * The three-character IATA code for the airline
     */
    name: string;
    /**
     * Duffel's unique identifier for the airline
     */
    id: string;
    iata_code: string;
    logo_lockup_url?: string;
    logo_symbol_url?: string;
}
