/**
 * The cabin class that the passenger will travel in on this segment
 */
export type CabinClass = 'first' | 'business' | 'premium_economy' | 'economy'

/**
 * The type of the passenger
 */
export type DuffelPassengerType = 'adult' | 'child' | 'infant_without_seat'

/**
 * The passenger's title
 */
export type DuffelPassengerTitle = 'mr' | 'ms' | 'mrs' | 'MR' | 'MS' | 'MRS'

/**
 * The passenger's gender
 */
export type DuffelPassengerGender = 'm' | 'f'

/**
 * The type of the identity document. Currently, the only supported type is passport.
 * This must be one of the `allowed_passenger_identity_document_types` on the offer.
 */
export type PassengerIdentityDocumentType = 'passport'

/**
 * The type of the origin or destination
 */
export type PlaceType = 'airport' | 'city'

export type FlightsConditions = {
  /**
   * Whether the whole order or offer can be refunded before the departure of the first slice.
   * If all of the slices on the order or offer can be refunded then the `allowed` property will be `true` and information will be provided about any penalties.
   * If any of the slices on the order or offer can't be refunded then the `allowed` property will be `false`.
   * If the airline hasn't provided any information about whether this order or offer can be refunded then this property will be `null`.
   */
  refundBeforeDeparture?: {
    /**
     * The currency of the `penalty_amount` as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * This will be in a currency determined by the airline, which is not necessarily the same as the currency of the order or offer.
     * If this is `null` then `penalty_amount` will also be `null`.
     * @example "GBP"
     */
    penaltyCurrency: string
    /**
     * If the modification is `allowed` then this is the amount payable to apply the modification to all passengers.
     * If there is no penalty, the value will be zero. If the modification isn't `allowed` or the penalty is not known then this field will be `null`.
     * If this is `null` then the `penalty_currency` will also be null.
     * @example "100.00"
     */
    penaltyAmount?: string
    /**
     * Whether this kind of modification is allowed post-booking
     *
     * @example "true"
     */
    allowed: boolean
  } | null
  /**
   * Whether the whole order or offer can be changed before the departure of the first slice.
   * If all of the slices on the order or offer can be changed then the `allowed` property will be `true`.
   * Refer to the `slices` for information about change penalties.
   * If any of the slices on the order or offer can't be changed then the `allowed` property will be `false`.
   * In this case you should refer to the slices conditions to determine if any part of the order or offer is changeable.
   * If the airline hasn't provided any information about whether this order or offer can be changed then this property will be `null`.
   */
  changeBeforeDeparture?: {
    /**
     * The currency of the `penalty_amount` as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
     * This will be in a currency determined by the airline, which is not necessarily the same as the currency of the order or offer.
     * If this is `null` then `penalty_amount` will also be `null`.
     * @example "GBP"
     */
    penaltyCurrency: string
    /**
     * If the modification is `allowed` then this is the amount payable to apply the modification to all passengers.
     * If there is no penalty, the value will be zero. If the modification isn't `allowed` or the penalty is not known then this field will be `null`.
     * If this is `null` then the `penalty_currency` will also be null.
     * @example "100.00"
     */
    penaltyAmount?: string
    /**
     * Whether this kind of modification is allowed post-booking
     *
     * @example "true"
     */
    allowed: boolean
  } | null
}

/**
 * The metropolitan area where the airport is located.
 * Only present for airports which are registered with IATA as belonging to a metropolitan area.
 * @link https://portal.iata.org/faq/articles/en_US/FAQ/How-do-I-create-a-new-Metropolitan-Area
 */
export interface City {
  /**
   * The three-character IATA code for the city
   * @example "LON"
   */
  iataCode: string
  /**
   * The ISO 3166-1 alpha-2 code for the country where the city is located
   * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   * @example "GB"
   */
  iataCountryCode: string
  /**
   * Duffel's unique identifier for the city
   * @example "cit_lon_gb"
   */
  id: string
  /**
   * The name of the city
   * @example "London"
   */
  name: string
}

/**
 * An object containing metadata about the service, like the designator of the seat.
 */
export interface Seat {
  /**
   * The designator used to uniquely identify the seat, usually made up of a row number and a column letter
   * @example "14B"
   */
  designator: string
  /**
   * Each disclosure is text, in English, provided by the airline that describes the terms and conditions of this seat. We recommend showing this in your user interface to make sure that customers understand any restrictions and limitations.
   * @example "["Do not seat children in exit row seats","Do not seat passengers with special needs in exit row seats"]"
   */
  disclosures: string[]
  /**
   * A name which describes the type of seat, which you can display in your user interface to help customers to understand its features
   * @example "Exit row seat"
   */
  name: string
}

/**
 * The type of payment you want to apply to the order.
 * If you are an IATA agent with your own agreements with airlines, in some cases, you can pay using ARC/BSP cash by specifying `arc_bsp_cash`. Otherwise, you must pay using your Duffel account's balance by specifying `balance`.
 * In test mode, your balance is unlimited. If you're not sure which of these options applies to you, get in touch with the Duffel support team at [help@duffel.com](mailto:help@duffel.com).
 */
export type PaymentType = 'arc_bsp_cash' | 'balance'
