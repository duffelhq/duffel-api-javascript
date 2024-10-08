import { Airport } from '../supportingResources/Airports/AirportsTypes'

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
  iata_code: string
  /**
   * The ISO 3166-1 alpha-2 code for the country where the city is located
   * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   * @example "GB"
   */
  iata_country_code: string
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
  /**
   * "The airports associated to a city. This will only be provided where the `type` is `city`."
   */
  airports?: Airport[]
  /**
   * The type of the place
   */
  type: 'city'
}

/**
 * The cabin class that the passenger will travel in on this segment
 */
export type CabinClass = 'first' | 'business' | 'premium_economy' | 'economy'

/**
 * The type of the passenger
 */
export type PassengerType = 'adult' | 'child' | 'infant_without_seat'

/**
 * The passenger's title
 */
export type DuffelPassengerTitle = 'mr' | 'ms' | 'mrs' | 'miss' | 'dr'

/**
 * The passenger's gender
 */
export type DuffelPassengerGender = 'm' | 'f'

/**
 * The type of the identity document.
 * This must be one of the `allowed_passenger_identity_document_types` on the offer.
 */
export type PassengerIdentityDocumentType = 'passport' | 'tax_id'

export type Place = (Airport & { type: 'airport' }) | (City & { type: 'city' })

/**
 * The type of the origin or destination
 */
export type PlaceType = Place['type']

export type FlightsConditionAllowed = {
  /**
   * The currency of the `penalty_amount` as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * This will be in a currency determined by the airline, which is not necessarily the same as the currency of the order or offer.
   * If this is `null` then `penalty_amount` will also be `null`.
   *
   * @example "GBP"
   */
  penalty_currency: string
  /**
   * If the modification is `allowed` then this is the amount payable to apply the modification to all passengers.
   * If there is no penalty, the value will be zero. If the modification isn't `allowed` or the penalty is not known then this field will be `null`.
   * If this is `null` then the `penalty_currency` will also be null.
   *
   * @example "100.00"
   */
  penalty_amount: string
  /**
   * Whether this kind of modification is allowed post-booking
   *
   * @example "true"
   */
  allowed: true
}

export type FlightsConditionNotAllowed = {
  /**
   * The currency of the `penalty_amount` as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * This will be in a currency determined by the airline, which is not necessarily the same as the currency of the order or offer.
   * If this is `null` then `penalty_amount` will also be `null`.
   *
   * @example "GBP"
   */
  penalty_currency: null
  /**
   * If the modification is `allowed` then this is the amount payable to apply the modification to all passengers.
   * If there is no penalty, the value will be zero. If the modification isn't `allowed` or the penalty is not known then this field will be `null`.
   * If this is `null` then the `penalty_currency` will also be null.
   *
   * @example "100.00"
   */
  penalty_amount: null
  /**
   * Whether this kind of modification is allowed post-booking
   *
   * @example "true"
   */
  allowed: false
}

export type FlightsCondition =
  | FlightsConditionAllowed
  | FlightsConditionNotAllowed

/**
 * The conditions associated with this offer, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
 * This information assumes the condition is applied to all of the slices and passengers associated with this offer - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the slices.
 * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
 * In some cases, you may need to contact the Duffel support team or the airline directly.
 */
export type FlightsConditions = {
  /**
   * Whether the whole order or offer can be refunded before the departure of the first slice.
   * If all of the slices on the order or offer can be refunded then the `allowed` property will be `true` and information will be provided about any penalties.
   * If any of the slices on the order or offer can't be refunded then the `allowed` property will be `false`.
   * If the airline hasn't provided any information about whether this order or offer can be refunded then this property will be `null`.
   */
  refund_before_departure: FlightsCondition | null

  /**
   * Whether the whole order or offer can be changed before the departure of the first slice.
   * If all of the slices on the order or offer can be changed then the `allowed` property will be `true`.
   * Refer to the `slices` for information about change penalties.
   * If any of the slices on the order or offer can't be changed then the `allowed` property will be `false`.
   * In this case you should refer to the slices conditions to determine if any part of the order or offer is changeable.
   * If the airline hasn't provided any information about whether this order or offer can be changed then this property will be `null`.
   */
  change_before_departure: FlightsCondition | null
}

/**
 * The conditions associated with this offer, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
 * This information assumes the condition is applied to all of the slices and passengers associated with this offer - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the slices.
 * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
 * In some cases, you may need to contact the Duffel support team or the airline directly.
 * Note that the perks associated with the slice are aggregated across passengers and segments and are intended to provide a brief summary of the passenger experience,
 * however, the experience may not be consistent across all segments.
 * As an example, priority boarding may be flagged as available but not available on all segments on the slice.
 * See segment passenger conditions for a per-flight breakdown what is available to
 * passengers if you require this level of granularity.
 */
export type OfferSliceConditions = FlightsConditions & {
  /**
   * Whether passengers are able to select a seat prior to check in.
   */
  advance_seat_selection: boolean | null

  /**
   * Whether passengers are given preferential boarding over others passengers in their cabin.
   */
  priority_boarding: boolean | null

  /**
   * Whether passengers are given access to a fast track lane during check in.
   */
  priority_check_in: boolean | null
}

/**
 * The type of payment you want to apply to the order.
 * If you are an IATA agent with your own agreements with airlines, in some cases, you can pay using ARC/BSP cash by specifying `arc_bsp_cash`. Otherwise, you must pay using your Duffel account's balance by specifying `balance`.
 * In test mode, your balance is unlimited. If you're not sure which of these options applies to you, get in touch with the Duffel support team at [help@duffel.com](mailto:help@duffel.com).
 */
export type PaymentType = 'arc_bsp_cash' | 'balance'
