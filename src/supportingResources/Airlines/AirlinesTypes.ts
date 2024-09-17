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
  iata_code: string | null
  /*
   * Path to a svg of the airline lockup logo. A lockup logo is also called a combination logo, in which it combines the logotype and logomark. This may be `null` if no logo is available.
   */
  logo_lockup_url: string | null
  /*
   * Path to a svg of the airline logo. This may be `null` if no logo is available.
   */
  logo_symbol_url: string | null
  /*
   * URL to the airline's conditions of carriage.
   */
  conditions_of_carriage_url: string | null
}
