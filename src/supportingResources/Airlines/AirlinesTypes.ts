/**
 * Airlines are used to identify the air travel companies selling and operating flights
 * @link https://duffel.com/docs/api/airlines/schema
 */
export interface Airline {
  /**
   * The three-character IATA code for the airline
   */
  name: string
  /**
   * Duffel's unique identifier for the airline
   */
  id: string
  /*
   * The two-character IATA code for the airline. This may be null for non-IATA carriers.
   */
  iata_code: string
}
