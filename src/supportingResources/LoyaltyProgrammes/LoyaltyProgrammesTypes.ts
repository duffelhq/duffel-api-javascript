/**
 * Loyalty programmes are used to identify the frequent flyer programmes offered by airlines
 * @link https://duffel.com/docs/api/loyalty-programmes/schema
 */
export interface LoyaltyProgramme {
  /**
   * Duffel's unique identifier for the loyalty programme
   */
  id: string
  /**
   * Name of the loyalty programme
   */
  name: string
  /**
   * The Duffel ID of the airline that corresponds to the loyalty programme
   */
  owner_airline_id: string
  /*
   * The name of the alliance this loyalty programme is part of. This may be `null` if the loyalty programme isn't part of an alliance.
   */
  alliance: string | null
  /*
   * Path to a svg of the loyalty programme logo. This may be `null` if no logo is available.
   */
  logo_url: string | null
}
