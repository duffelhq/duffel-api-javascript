import {
  Aircraft,
  Airline,
  Airport,
  CabinClass,
  CreateOfferRequestPassengerFareType,
  PassengerType,
  FlightsConditions,
  LoyaltyProgrammeAccount,
  OfferSliceConditions,
  PaginationMeta,
  Place,
  PlaceType,
  Stop,
} from '../../types'

/**
 * Each offer represents flights you can buy from an airline at a particular price that meet your search criteria.
 * @link https://duffel.com/docs/api/offers/schema
 */
export interface Offer {
  /**
   * The services that can be booked along with the offer but are not included by default, for example an additional checked bag.
   * This field is only returned in the Get single offer endpoint.
   * When there are no services available, or we don't support services for the airline, this list will be empty.
   */
  available_services: OfferAvailableService[]

  /**
   * The base price of the offer for all passengers, excluding taxes.
   * It does not include the base amount of any service(s) that might be booked with the offer.
   */
  base_amount: string

  /**
   * The currency of the `base_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  base_currency: string

  /**
   * The conditions associated with this offer, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
   * This information assumes the condition is applied to all of the slices and passengers associated with this offer - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the `slices`.
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: FlightsConditions

  /**
   * The ISO 8601 datetime at which the offer was created
   */
  created_at: string

  /**
   * The ISO 8601 datetime at which the offer will expire and no longer be usable to create an order
   */
  expires_at: string

  /**
   * Duffel's unique identifier for the offer
   */
  id: string

  /**
   * Whether the offer request was created in live mode.
   * This field will be set to `true` if the offer request was created in live mode, or `false` if it was created in test mode.
   */
  live_mode: boolean

  /**
   * The airline which provided the offer
   */
  owner: Airline

  /**
   * Whether identity documents must be provided for each of the passengers when creating an order based on this offer.
   * If this is `true`, you must provide an identity document for every passenger.
   */
  passenger_identity_documents_required: boolean

  /**
   * The passengers included in the offer
   */
  passengers: OfferPassenger[]

  /**
   * The payment requirements for this offer
   */
  payment_requirements: PaymentRequirements

  /**
   * The private fares applied on this offer.
   */
  private_fares: OfferPrivateFare[]

  /**
   * The slices that make up this offer. Each slice will include one or more segments,
   * the specific flights that the airline is offering to take the passengers from the slice's `origin` to its `destination`.
   */
  slices: OfferSlice[]

  /**
   * The amount of tax payable on the offer for all passengers
   */
  tax_amount: string | null

  /**
   * The currency of the `tax_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  tax_currency: string | null

  /**
   * The total price of the offer for all passengers, including taxes.
   * It does not include the total price of any service(s) that might be booked with the offer.
   */
  total_amount: string

  /**
   * An estimate of the total carbon dioxide (CO₂) emissions when
   * all of the passengers fly this offer's itinerary, measured in kilograms
   */
  total_emissions_kg: string

  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  total_currency: string

  /**
   * The ISO 8601 datetime at which the offer was last updated
   */
  updated_at: string

  /**
   * Whether this is a partial or full offer.
   * A partial offer can't be booked directly, but it can be combined with other partial offers to form a full offer.
   * Partial offers are only ever returned through the multi-step search flow.
   */
  partial: boolean

  /**
   * A list of airline IATA codes whose loyalty programmes are supported when booking the offer.
   * Loyalty programmes present within the offer passengers that are not present in this field shall be ignored at booking.
   * If this is an empty list ([]), no loyalty programmes are supported for the offer and shall be ignored if provided.
   * @example: ["AF","KL","DL"]
   */
  supported_loyalty_programmes: string[]

  /**
   * The types of identity documents supported by the airline and may be provided for the
   * passengers when creating an order based on this offer. Currently, possible types are `passport`,
   * `tax_id`, `known_traveler_number`, and `passenger_redress_number`.
   */
  supported_passenger_identity_document_types: OfferSupportedPassengerIdentityDocumentTypes[]
}

export type OfferSupportedPassengerIdentityDocumentTypes =
  | 'passport'
  | 'tax_id'
  | 'known_traveler_number'
  | 'passenger_redress_number'

export interface OfferAvailableServiceBaggageMetadata {
  /**
   * The maximum weight that the baggage can have in kilograms.
   */
  maximum_weight_kg: number | null

  /**
   * The maximum height that the baggage can have in centimetres.
   */
  maximum_height_cm: number | null

  /**
   * The maximum length that the baggage can have in centimetres.
   */
  maximum_length_cm: number | null

  /**
   * The maximum depth that the baggage can have in centimetres.
   */
  maximum_depth_cm: number | null

  /**
   * The type of the baggage
   */
  type: BaggageType
}

export interface OfferAvailableServiceCFARMetadata {
  /**
   * The amount the customer will receive back if the service is used, in
   * `offer.total_currency`.
   */
  refund_amount: string

  /**
   * Information to display to customers.
   */
  merchant_copy: string

  /**
   * URL with the T&Cs for customers.
   */
  terms_and_conditions_url: string
}

export interface OfferAvailableServiceCommon {
  /**
   * Duffel's unique identifier for the service.
   */
  id: string

  /**
   * The maximum quantity of this service that can be booked with an order.
   */
  maximum_quantity: number

  /**
   * The list of passenger `id`s the service applies to. If you add this
   * service to an order it will apply to all the passengers in this list.
   * For services where the type is `baggage`, this list will include only a
   * single passenger.
   */
  passenger_ids: string[]

  /**
   * The list of segment `id`s the service applies to. If you add this
   * service to an order it will apply to all the segments in this list. For
   * services where the type is `baggage`, depending on the airline, this
   * list includes all the segments of all slices or all the segments of a
   * single slice.
   */
  segment_ids: string[]

  /**
   * The total price of the service for all passengers and segments it
   * applies to, including taxes. This price is for a single unit of the
   * service.
   */
  total_amount: string

  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
   * currency code. It will match your organisation's billing currency unless
   * you’re using Duffel as an accredited IATA agent, in which case it will be
   * in the currency provided by the airline (which will usually be based on the
   * country where your IATA agency is registered).
   */
  total_currency: string
}

export interface OfferAvailableServiceBaggage
  extends OfferAvailableServiceCommon {
  /**
   * The metadata varies by the type of service. It includes further data
   * about the service. For example, for baggages, it may have data about
   * size and weight restrictions.
   */
  metadata: OfferAvailableServiceBaggageMetadata

  /**
   * The type of the service.
   */
  type: 'baggage'
}

export interface OfferAvailableServiceCFAR extends OfferAvailableServiceCommon {
  /**
   * The metadata varies by the type of service. It includes further data
   * about the service. For example, for baggages, it may have data about
   * size and weight restrictions.
   */
  metadata: OfferAvailableServiceCFARMetadata

  /**
   * The type of the service.
   */
  type: 'cancel_for_any_reason'
}

export type OfferAvailableService =
  | OfferAvailableServiceBaggage
  | OfferAvailableServiceCFAR

export interface PaymentRequirements {
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime by which
   * you must pay for this order. At this time, if still unpaid, the reserved
   * space on the flight(s) will be released and you will have to create a new
   * order. This will be null only for orders where `awaiting_payment` is
   * `false`.
   */
  payment_required_by: string | null

  /**
   * The ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the
   * price associated with the order will no longer be guaranteed by the airline
   * and may change before payment. This will be null when
   * `requires_instant_payment` is `true`.
   */

  price_guarantee_expires_at: string | null

  /**
   * When payment is required at the time of booking this will be true and
   * `payment_required_by` and `price_guarantee_expires_at` will be `null`. When
   * payment can be made at a time after booking, this will be `false` and the
   * time limits on the payment will be provided in `payment_required_by` and
   * `price_guarantee_expires_at`.
   */
  requires_instant_payment: boolean
}

export interface OfferPrivateFare {
  /**
   * The corporate code that was applied, if any.
   */
  corporate_code?: string

  /**
   * The tracking reference that was applied, if any.
   */
  tracking_reference?: string

  /**
   * The type of private fare applied.
   */
  type: 'corporate' | 'leisure' | 'negotiated'
}

export interface OfferPassenger {
  /**
   * The age of the passenger on the departure_date of the final slice.
   */
  age: number | null

  /**
   * The type of the passenger.
   */
  type: PassengerType | null

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

  /**
   * The fare type of the passenger
   * Example: "contract_bulk"
   */
  fare_type: CreateOfferRequestPassengerFareType | null
}

export interface OfferSlice {
  /**
   * The type of the destination
   */
  destination_type: PlaceType

  /**
   * The city or airport where this slice ends
   */
  destination: Place

  /**
   * The type of the origin
   */
  origin_type: PlaceType

  /**
   * The city or airport where this slice begins
   */
  origin: Place

  /**
   * The duration of the slice, represented as a ISO 8601 duration
   */
  duration: string | null

  /**
   * The name of the fare brand associated with this slice.
   * A fare brand specifies the travel conditions you get on your slice made available
   * by the airline. e.g. a British Airways Economy Basic fare will only include a hand baggage allowance.
   * It is worth noting that the fare brand names are defined by the airlines themselves and therefore they
   * are subject to change without any prior notice. We're in the process of adding support for fare_brand_name across
   * all our airlines, so for now, this field may be null in some offers.
   * This will become a non-nullable attribute in the near future.
   */
  fare_brand_name: string | null

  /**
   * Duffel's unique identifier for the slice. It identifies the slice of an offer (i.e. the same slice across offers will have different `id`s
   */
  id: string

  /**
   * The segments - that is, specific flights - that the airline is offering to get the passengers from the `origin` to the `destination`
   */
  segments: OfferSliceSegment[]

  /**
   * The conditions associated with this slice, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications
   * and also what perks shall be available to passengers when travelling.
   * This condition is applied only to this slice and to all the passengers associated with this offer - for information at the offer level (e.g. "what happens if I want to change all the slices?") refer to the conditions at the top level.
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   * Note that the perks associated with the slice are aggregated across passengers and segments and are intended to provide a brief summary of the passenger experience,
   * however, the experience may not be consistent across all segments.
   * As an example, priority boarding may be flagged as available but not available on all segments on the slice.
   * See segment passenger conditions for a per-flight breakdown what is available to
   * passengers if you require this level of granularity.
   */
  conditions: OfferSliceConditions

  /**
   * A summary of the seat characteristics and extras available to passengers on the given slice.
   * The shelf is calculated by Duffel and may be used to group similar slices across offers when building a shopping display.
   * Note this value does not take into account any services that may be purchased in addition to the offer and should not be directly used
   * in any offer ranking systems.
   * Includes the following:
   *   - `"1"`: standard seating with limited extras.
   *   - `"2"`: standard seating with extras, i.e. carry-on baggage, advanced seat selection,  priority boarding etc.
   *   - `"3"`: preferred seating, such as additional legroom, seat width or middle seat free
   *   - `"4"`: premium seating, additional legroom and recline. Situated in business class or higher.
   *    - `"5"`: deluxe seating, additional legroom and reclines to lie flat position. Situated in business class or higher.
   */
  ngs_shelf: number | null

  /**
   * A hash uniquely identifying this slice. This value could be use to group together identical slices from different offers.
   */
  comparison_key: string
}

export interface OfferSliceSegment {
  /**
   * The aircraft that the operating carrier will use to operate this segment
   */
  aircraft: Aircraft

  /**
   * The ISO 8601 datetime at which the segment is scheduled to arrive
   */
  arriving_at: string

  /**
   * The terminal at the destination airport where the segment is scheduled to arrive
   */
  destination_terminal: string | null

  /**
   * The ISO 8601 datetime at which the segment is scheduled to depart
   */
  departing_at: string

  /**
   * The terminal at the origin airport from which the segment is scheduled to depart
   */
  origin_terminal: string | null

  /**
   * The airport at which the segment is scheduled to arrive
   */
  destination: Airport

  /**
   * The distance of the segment in kilometres
   */
  distance: string | null

  /**
   * The duration of the segment, represented as a ISO 8601 duration
   */
  duration: string | null

  /**
   * Duffel's unique identifier for the segment. It identifies the segment of an offer (i.e. the same segment across offers will have different `id`s
   */
  id: string

  /**
   * The airline selling the tickets for this segment.
   * This may differ from the `operating_carrier` in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  marketing_carrier: Airline

  /**
   * The flight number assigned by the marketing carrier
   */
  marketing_carrier_flight_number: string

  /**
   * The airport from which the flight is scheduled to depart
   */
  origin: Airport

  /**
   * The airline actually operating this segment.
   * This may differ from the marketing_carrier in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  operating_carrier: Airline

  /**
   * The flight number assigned by the operating carrier
   */
  operating_carrier_flight_number: string

  /**
   * Additional segment-specific information about the passengers included in the offer (e.g. their baggage allowance and the cabin class they will be travelling in)
   */
  passengers: OfferSliceSegmentPassenger[]

  /**
   * Additional segment-specific information about the stops, if any, included in the segment
   */
  stops: Array<Stop>
}

export type WiFiAmenityCost = 'free' | 'paid' | 'free or paid' | 'n/a'
export type SeatPitch = 'less' | 'more' | 'standard' | 'n/a'
export type SeatType =
  | 'standard'
  | 'extra_legroom'
  | 'skycouch'
  | 'recliner'
  | 'angle_flat'
  | 'full_flat'
  | 'private_suite'

export interface OfferSliceSegmentPassenger {
  /**
   * The baggage allowances for the passenger on this segment included in the offer.
   * Some airlines may allow additional baggage to be booked as a service - see the offer's available_services.
   */
  baggages: OfferSliceSegmentPassengerBaggage[]

  /**
   * The cabin class that the passenger will travel in on this segment
   */
  cabin_class: CabinClass

  /**
   * The name that the marketing carrier uses to market this cabin class
   */
  cabin_class_marketing_name: string

  /**
   * The identifier for the passenger.
   * You may have specified this ID yourself when creating the offer request, or otherwise, Duffel will have generated its own random ID.
   */
  passenger_id: string

  /**
   * The airline's alphanumeric code for the fare that the passenger is using to travel. Where this is `null`, it means that either the
   * fare basis code is not available or the airline does not use fare basis codes.
   */
  fare_basis_code: string

  /**
   * Data about the cabin that the passenger will be flying in for this segment
   */
  cabin: OfferSliceSegmentPassengerCabin | null
}

export interface OfferSliceSegmentPassengerCabin {
  /**
   * The name of the cabin class
   */
  name: CabinClass

  /**
   * TThe name that the marketing carrier uses to market this cabin class
   */
  marketing_name: string

  /**
   * The amenities specific to this cabin class on this plane
   */
  amenities: {
    /**
     * If Wi-Fi is available, information on its cost, availability, etc
     */
    wifi: {
      /**
       * Whether Wi-Fi is available in this cabin
       */
      available: boolean

      /**
       * The cost, if any, to use the Wi-Fi
       */
      cost: WiFiAmenityCost
    } | null

    /**
     * Information on the standard seat in this cabin class. Exceptions may apply, such as on exit rows.
     */
    seat: {
      /**
       * The distance from a point on a seat to the seat front/behind it, in inches, or "n/a" if not available
       */
      pitch: SeatPitch

      /**
       * A summary of the seat characteristics for the cabin.
       * Includes the following:
       *   - `"standard"` - typical seating with regular legroom / recline
       *   - `"extra_legroom"` - typical seating with additional legroom
       *   - `"skycouch"` - a row of seats converted into a couch layout
       *   - `"recliner"` - seating with additional legroom and recline
       *   - `"angle_flat"` - seating with additional legroom and near flat recline
       *   - `"full_flat_pod"` - seating with full flat recline and enclosing privacy screens
       *   - `"private_suite"` - a full suite, typically including a bed and recliner seat
       */
      type: SeatType
    } | null

    /**
     * If power (AC and/or USB) is available, information on what is available
     */
    power: {
      /**
       * Whether there is power available or not in this cabin
       */
      available: boolean
    } | null
  }
}

export type BaggageType = 'carry_on' | 'checked'

export interface OfferSliceSegmentPassengerBaggage {
  /**
   * The type of the baggage allowance
   */
  type: BaggageType

  /**
   * The number of this type of bag allowed on the segment. Note that this can currently be 0 in some cases.
   */
  quantity: number
}

export interface ListOffersParams extends PaginationMeta {
  /**
   * Duffel's unique identifier for the offer request, returned when it was created
   */
  offer_request_id: string

  /**
   * Allows to filter the offers list by the maximum number of connections in a given offer. e.g. a return flight with three flights outbound and a direct inbound flight would be filtered out if `max_connections=1` was passed.
   */
  max_connections?: number

  /**
   * By default, the offers will be returned sorted by ID in ascending order.
   * This parameter allows you to sort the list of offers by `total_amount` or `total_duration`.
   * By default the sorting order will be ascending, if you wish to sort in descending order a - will need to be prepended to the sorting attribute (i.e: `-total_amount`).
   */
  sort?: 'total_amount' | 'total_duration'
}

export interface LoyaltyProgrammeAccounts {
  /**
   * The passenger's account number for this Loyalty Programme Account
   */
  account_number: string

  /**
   * The IATA code for the airline that this Loyalty Programme Account belongs to
   */
  airline_iata_code: string
}

export interface UpdateOffer {
  type: string
  loyalty_programme_accounts: LoyaltyProgrammeAccounts
  id: string
  given_name: string
  family_name: string
  age: number
}

export type OfferIntendedPaymentMethod =
  | {
      /**
       * The type of payment method intended to use
       */
      type: 'card'

      /**
       * The ID of the card intended to pay with
       */
      card_id: string
    }
  | {
      /**
       * The type of payment method intended to use
       */
      type: 'airline_credit'

      /**
       * The ID of the airline credit intended to pay with
       */
      airline_credit_id: string
    }

export interface OfferIntendedService {
  /**
   * The ID of the service to pay for
   */
  id: string

  /**
   * The quantity of the service ID to pay for
   */
  quantity: number
}

export interface GetOfferPricedParams {
  /**
   * The payment methods intended to use to pay for the offer
   */
  intended_payment_methods: OfferIntendedPaymentMethod[]

  /**
   * The services intended to book along with the offer
   */
  intended_services: OfferIntendedService[]
}

/**
 * Represents a priced offer, including the charge and surcharge amounts for the intended payment methods and services
 */
export interface OfferPriced extends Offer {
  /**
   * The payment methods intended to use to pay for the offer, along with the charge and surcharge amounts
   */
  intended_payment_methods: (OfferIntendedPaymentMethod & {
    charge_currency: string
    charge_amount: string
    surcharge_amount: string
    surcharge_currency: string
  })[]

  /**
   * The services intended to book along with the offer
   */
  intended_services: OfferIntendedService[]
}
