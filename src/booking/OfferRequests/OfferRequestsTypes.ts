import {
  Airline,
  CabinClass,
  PassengerType,
  Place,
  PlaceType,
} from '../../types'
import { Offer, OfferSliceSegment } from '../Offers/OfferTypes'

export interface OfferRequestSlice {
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date on which the passengers want to depart
   */
  departure_date: string

  /**
   * The city or airport the passengers want to travel to
   */
  destination: Place

  /**
   * The city or airport the passengers want to depart from
   */
  origin: Place

  /**
   * The type of the origin
   */
  origin_type: PlaceType

  /**
   * The type of the destination
   */
  destination_type: PlaceType
}

interface CreateOfferRequestPassengerCommon {
  /**
   * The passenger's family name. Only `space`, `-`, `'`, and letters from the
   * `ASCII`, `Latin-1 Supplement` and `Latin Extended-A` (with the exceptions
   * of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, and `ð`) Unicode charts are accepted.
   * All other characters will result in a validation error. The minimum length
   * is 1 character, and the maximum is 20 characters.
   *
   * This is only required if you're also including
   * **Loyalty Programme Accounts**.
   */
  family_name?: string

  /**
   * The passenger's given name. Only `space`, `-`, `'`, and letters from the
   * `ASCII`, `Latin-1 Supplement` and `Latin Extended-A` (with the exceptions
   * of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, and `ð`) Unicode charts are accepted.
   * All other characters will result in a validation error. The minimum length
   * is 1 character, and the maximum is 20 characters.
   *
   * This is only required if you're also including
   * **Loyalty Programme Accounts**.
   */
  given_name?: string

  /**
   * The **Loyalty Programme Accounts** for this passenger.
   */
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]
}

export interface CreateOfferRequestAdultPassenger
  extends CreateOfferRequestPassengerCommon {
  age?: never
  fare_type?: never
  /**
   * The type of the passenger. If the passenger is aged 18 or over, you should
   * specify a `type` of `adult`. If a passenger is aged under 18, you should
   * specify their `age` instead of a `type`. A passenger can have only a type
   * or an age, but not both.
   */
  type: Extract<PassengerType, 'adult'>
}

export interface CreateOfferRequestNonAdultPassenger
  extends CreateOfferRequestPassengerCommon {
  /**
   * The age of the passenger on the `departure_date` of the final slice. e.g.
   * if you a searching for a round trip and the passenger is 15 years old at
   * the time of the outbound flight, but they then have their birthday and are
   * 16 years old for the inbound flight, you must set the age to 16. You should
   * specify an `age` for passengers who are under 18 years old. A passenger can
   * have only a type or an age, but not both. You can optionally pass age with
   * `fare_type` though.
   */
  age: number
  fare_type?: never
  type?: never
}

export type CreateOfferRequestPassengerFareType =
  | 'accompanying_adult'
  | 'contract_bulk'
  | 'contract_bulk_child'
  | 'contract_bulk_infant_with_seat'
  | 'contract_bulk_infant_without_seat'
  | 'frequent_flyer'
  | 'group_inclusive_tour'
  | 'group_inclusive_tour_child'
  | 'humanitarian'
  | 'individual_inclusive_tour_child'
  | 'marine'
  | 'seat_only'
  | 'student'
  | 'teacher'
  | 'tour_operator_inclusive'
  | 'tour_operator_inclusive_infant'
  | 'unaccompanied_child'
  | 'visiting_friends_and_family'

interface CreateOfferRequestPassengerWithFareType
  extends CreateOfferRequestPassengerCommon {
  /**
   * The age of the passenger on the `departure_date` of the final slice. e.g.
   * if you a searching for a round trip and the passenger is 15 years old at
   * the time of the outbound flight, but they then have their birthday and are
   * 16 years old for the inbound flight, you must set the age to 16. You should
   * specify an `age` for passengers who are under 18 years old. A passenger can
   * have only a type or an age, but not both. You can optionally pass age with
   * `fare_type` though.
   */
  age?: number

  /**
   * The fare type of the passenger. If the passenger is aged less than 18, you
   * should pass in age as well.
   */
  fare_type: CreateOfferRequestPassengerFareType
  type?: never
}

export type CreateOfferRequestPassenger =
  | CreateOfferRequestAdultPassenger
  | CreateOfferRequestNonAdultPassenger
  | CreateOfferRequestPassengerWithFareType

export interface CreateOfferRequestPrivateFare {
  corporate_code: string
  tracking_reference: string
}

/**
 * The passengers who want to travel. A passenger will have only a type or an age.
 */
export interface OfferRequestPassenger {
  /**
   * The age of the passenger on the `departure_date` of the final slice.
   */
  age?: number

  /**
   * The type of the passenger.
   */
  type?: PassengerType

  /**
   * The passenger's family name. Only `space`, `-`, `'`, and letters from the `ASCII`, `Latin-1 Supplement` and `Latin
   * Extended-A` (with the exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, , and `ð`) Unicode charts are accepted. All
   * other characters will result in a validation error. The minimum length is 1 character, and the maximum is 20
   * characters.
   *
   * This is only required if you're also including **Loyalty Programme Accounts**.
   */
  family_name?: string

  /**
   * The passenger's given name. Only `space`, `-`, `'`, and letters from the `ASCII`, `Latin-1 Supplement` and `Latin
   * Extended-A` (with the exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, , and `ð`) Unicode charts are accepted. All
   * other characters will result in a validation error. The minimum length is 1 character, and the maximum is 20
   * characters.
   *
   * This is only required if you're also including **Loyalty Programme Accounts**.
   */
  given_name?: string

  /**
   * The **Loyalty Programme Accounts** for this passenger.
   */
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]

  /**
   * The identifier for the passenger, unique within this Offer Request and across all Offer Requests.
   * This ID will be generated by Duffel unless you had optionally provided one.
   * Optionally providing one has been deprecated.
   */
  id: string
}

/**
 * The **Loyalty Programme Account** details.
 */
export interface LoyaltyProgrammeAccount {
  /**
   * The passenger's account number for this **Loyalty Programme Account**.
   */
  account_number: string

  /**
   * The IATA code for the airline that this **Loyalty Programme Account** belongs to.
   */
  airline_iata_code: Airline['iata_code']
}

/**
 * To search for flights, you'll need to create an offer request.
 * An offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
 * It may also include additional filters (e.g. a particular cabin to travel in).
 * @link https://duffel.com/docs/api/offer-requests/schema
 */
export interface OfferRequest {
  /**
   * The slices that make up this offer request.
   * One-way journeys can be expressed using one slice, whereas return trips will need two.
   * @link https://duffel.com/docs/api/overview/key-principles
   */
  slices: OfferRequestSlice[]

  /**
   * The cabin that the passengers want to travel in
   */
  cabin_class?: CabinClass

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer request was created
   */
  created_at: string

  /**
   * Duffel's unique identifier for the offer request
   */
  id: string

  /**
   * Whether the offer request was created in live mode. This field will be set to true if the offer request was created in live mode, or false if it was created in test mode.
   */
  live_mode: boolean

  /**
   * The offers returned by the airlines
   */
  offers: Omit<Offer, 'available_services'>[]

  /**
   * The passengers who want to travel. A passenger will have only a type or an age.
   */
  passengers: OfferRequestPassenger[]
}

export interface CreateOfferRequest {
  /**
   * The cabin that the passengers want to travel in.
   */
  cabin_class?: CabinClass

  /**
   * The maximum number of connections within any slice of the offer. For
   * example 0 means a direct flight which will have a single segment within
   * each slice and 1 means a maximum of two segments within each slice of the
   * offer.
   */
  max_connections?: 0 | 1 | 2

  /**
   * The passengers who want to travel. If you specify an `age` for a passenger,
   * the `type` may differ for the same passenger in different offers due to
   * airline's different rules. E.g. one airline may treat a 14 year old as an
   * adult, and another as a young adult. You may only specify an `age` or a
   * `type` – not both.
   */
  passengers: CreateOfferRequestPassenger[]

  /**
   * The private fare codes for this Offer Request. You can pass in multiple
   * airlines with their specific private fare codes. The key is the airline's
   * IATA code that provided the private fare code. The `corporate_code` is
   * provided to you by the airline and the `tracking_reference` is to identify
   * your business by the airlines.
   */
  private_fares?: {
    [iataCode: string]: CreateOfferRequestPrivateFare[]
  }

  /**
   * The [slices](https://duffel.com/docs/api/overview/key-principles) that make
   * up this offer request. One-way journeys can be expressed using one slice,
   * whereas return trips will need two.
   */
  slices: CreateOfferRequestSlice[]

  /**
   * When set to `true` and the offer request contains more than one slice,
   * Duffel will fire additional one-way searches per slice to find
   * split-ticket itinerary candidates. Split-ticket offers are only returned
   * when combined with the `view=itineraries` query parameter.
   *
   * Requires this capability to be enabled on your Duffel account.
   * @link https://duffel.com/docs/guides/selling-split-ticket-itineraries
   */
  include_split_ticket?: boolean
}

export type TimeRangeFilter = { from: string; to: string }

export interface CreateOfferRequestSlice {
  /**
   * The 3-letter IATA code for the city or airport where this slice ends
   * Example: "JFK"
   */
  destination: string

  /**
   * The 3-letter IATA code for the city or airport where this slice starts
   * Example: "LHR"
   */
  origin: string

  /**
   * The ISO 8601 date on which the passengers want to depart
   * Example: "2020-04-24"
   */
  departure_date: string

  /**
   * The inclusive time range for the arrival of the slice
   */
  arrival_time: TimeRangeFilter | null

  /**
   * The inclusive time range for the departure of the slice
   */
  departure_time: TimeRangeFilter | null
}

/**
 * The shape of the offer request response.
 *
 * - `offers` (default) — a flat list of offers under `data.offers`.
 * - `itineraries` — offers are grouped per slice into a hierarchy of
 *   itineraries and fare brands under `data.slices[].itineraries[]`. This is
 *   the view required to surface split-ticket candidates created with
 *   `include_split_ticket: true`.
 *
 * @link https://duffel.com/docs/guides/selling-split-ticket-itineraries
 */
export type OfferRequestView = 'offers' | 'itineraries'

export interface CreateOfferRequestQueryParameters {
  /**
   * When set to `true`, the offer request resource returned will include all the offers returned by the airlines.
   * If set to `false`, the offer request resource won't include any offers.
   * To retrieve the associated `offers` later, use the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint, specifying the `offer_request_id`.
   * You should use this option if you want to take advantage of the pagination, sorting and filtering that the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint provides.
   */
  return_offers?: boolean

  /**
   * Controls the shape of the response. Defaults to `offers`, which returns a
   * flat list of offers. Set to `itineraries` to receive offers grouped by
   * slice, itinerary and fare brand — required to retrieve split-ticket
   * candidates produced by `include_split_ticket: true`.
   * @link https://duffel.com/docs/guides/selling-split-ticket-itineraries
   */
  view?: OfferRequestView

  /**
   * The maximum amount of time in milliseconds to wait for each airline search to complete.
   * This timeout applies to the response time of the call to the airline and includes
   * some additional overhead added by Duffel. Value should be between `2` seconds and `60` seconds.
   * Any values outside the range will be ignored and the default supplier_timeout will be used.
   * If a value is set, the response will only include offers from airline searches that completed
   * within the given time. If a value is not set, the response will only include offers from
   * airline searches that completed within the default supplier_timeout value of 20 seconds.
   * We recommend setting supplier_timeout lower than the timeout on the HTTP request you send to
   * Duffel API as that will allow us to respond with the offers we received before your request
   * times out with an empty response.
   */
  supplier_timeout?: number
}

/**
 * Discriminator for offers returned under the `itineraries` view.
 *
 * - `single_ticket` — a single offer from one airline that covers every slice
 *   in the original offer request.
 * - `split_ticket` — an offer that covers a single slice, intended to be
 *   combined with offers for the remaining slices (potentially from a
 *   different airline) to fulfil the journey.
 *
 * @link https://duffel.com/docs/guides/selling-split-ticket-itineraries
 */
export type ItineraryOfferType = 'single_ticket' | 'split_ticket'

/**
 * An offer returned under the `itineraries` view.
 *
 * It is structurally the same as a regular {@link Offer} (minus
 * `available_services`, which is only populated by the Get single offer
 * endpoint) but carries a `type` discriminator describing whether the offer
 * covers the full journey or a single slice that needs to be combined with
 * other offers.
 */
export interface ItineraryOffer extends Omit<Offer, 'available_services'> {
  /**
   * Whether the offer covers every slice from a single airline
   * (`single_ticket`) or only the slice it is nested under and needs to be
   * combined with other offers to complete the journey (`split_ticket`).
   */
  type: ItineraryOfferType
}

/**
 * A fare brand grouping offers that share the same itinerary segments.
 */
export interface ItineraryBrand {
  /**
   * The airline's marketing name for the fare brand, e.g. "Economy Basic".
   */
  fare_brand_name: string

  /**
   * The offers available for this fare brand on this itinerary.
   */
  offers: ItineraryOffer[]
}

/**
 * One way the airline can fly a passenger from the slice's origin to its
 * destination. A single itinerary is a fixed list of segments which may be
 * sold under one or more fare brands.
 */
export interface Itinerary {
  /**
   * The segments that make up this itinerary, in the order they are flown.
   */
  segments: OfferSliceSegment[]

  /**
   * The fare brands available for this itinerary, each carrying one or more
   * bookable offers.
   */
  brands: ItineraryBrand[]
}

/**
 * A slice as represented in the `itineraries` view of an offer request.
 *
 * Unlike {@link OfferRequestSlice}, it does not include the `departure_date`
 * or origin/destination type fields directly — the per-segment scheduling
 * lives inside `itineraries[].segments[]`.
 */
export interface OfferRequestItinerariesViewSlice {
  /**
   * The city or airport the passengers want to depart from.
   */
  origin: Place

  /**
   * The city or airport the passengers want to travel to.
   */
  destination: Place

  /**
   * The itineraries available for this slice, each grouping offers by fare
   * brand.
   */
  itineraries: Itinerary[]
}

/**
 * The response payload returned when an offer request is created with the
 * `view=itineraries` query parameter. Offers are grouped per slice rather than
 * returned as a flat list, which is required to surface split-ticket
 * candidates produced by `include_split_ticket: true`.
 *
 * @link https://duffel.com/docs/guides/selling-split-ticket-itineraries
 */
export interface OfferRequestItinerariesView
  extends Omit<OfferRequest, 'slices' | 'offers'> {
  /**
   * The slices that make up this offer request, each carrying the itineraries
   * and offers available for that slice.
   */
  slices: OfferRequestItinerariesViewSlice[]
}
