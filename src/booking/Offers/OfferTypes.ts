import { CabinClass, FlightsConditions, PassengerIdentityDocumentType, Place, PlaceType } from '../../types/shared'
import { Aircraft } from '../../supportingResources/Aircraft/AircraftTypes'
import { Airline } from '../../supportingResources/Airlines/AirlinesType'
import { Airport } from '../../supportingResources/Airports/AirportsType'

/**
 * Each offer represents flights you can buy from an airline at a particular price that meet your search criteria.
 * @link https://duffel.com/docs/api/offers/schema
 */
export interface Offer {
  /**
   * The types of identity documents that may be provided for the passengers when creating an order based on this offer.
   * Currently, the only supported type is `passport`. If this is `[]`, then you must not provide identity documents.
   */
  allowed_passenger_identity_document_types: PassengerIdentityDocumentType[]

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
}

export interface OfferAvailableServiceBaggageMetadata {
  /**
   * The maximum weight that the baggage can have in kilograms
   */
  maximum_weight_kg: number | null

  /**
   * The maximum height that the baggage can have in centimetres
   */
  maximum_height_cm: number | null

  /**
   * The maximum length that the baggage can have in centimetres
   */
  maximum_length_cm: number | null

  /**
   * The maximum depth that the baggage can have in centimetres
   */
  maximum_depth_cm: number | null

  /**
   * The type of the baggage
   */
  type: BaggageType
}

export interface PaymentRequirements {
  /**
   *  The ISO 8601 datetime by which you must pay for this order.
   * At this time, if still unpaid, the reserved space on the flight(s)
   * will be released and you will have to create a new order.
   * This will be null only for orders where `awaiting_payment` is `false`.
   */
  payment_required_by?: string | null
  /**
   *  The ISO 8601 datetime at which the price associated
   * with the order will no longer be guaranteed by the airline
   * and the order will need to be repriced before payment.
   * This can be null when there is no price guarantee.
   */
  price_guarantee_expires_at?: string | null
  /**
   * Whether immediate payment is required or not
   */
  requires_instant_payment: boolean
}

export interface OfferAvailableServiceMetadataMap {
  baggage: OfferAvailableServiceBaggageMetadata
}

export type OfferAvailableServiceType = keyof OfferAvailableServiceMetadataMap

export interface OfferAvailableService<T_ServiceType extends OfferAvailableServiceType = 'baggage'> {
  /**
   * Duffel's unique identifier for the service
   */
  id: string

  /**
   * The maximum quantity of this service that can be booked with an order
   */
  maximum_quantity: number

  /**
   * An object containing metadata about the service, like the maximum weight and dimensions of the baggage.
   */
  metadata?: OfferAvailableServiceMetadataMap[T_ServiceType]

  /**
   * The list of passenger `id`s the service applies to.
   * If you add this service to an order it will apply to all the passengers in this list.
   * For services where the type is `baggage`, this list will include only a single passenger.
   */
  passenger_ids: string[]

  /**
   * The list of segment ids the service applies to.
   * If you add this service to an order it will apply to all the segments in this list.
   * For services where the type is baggage, depending on the airline,
   * this list includes all the segments of all slices or all the segments of a single slice.
   */
  segment_ids: string[]

  /**
   * The total price of the service for all passengers and segments it applies to, including taxes
   */
  total_amount: string

  /**
   * The currency of the `total_amount`, as an ISO 4217 currency code
   */
  total_currency: string

  /**
   * The type of the service.
   * For now we only return services of type baggage but we will return other types in the future.
   * We won't consider adding new service types a break change.
   */
  type: T_ServiceType
}

export interface OfferPassenger {
  /**
   * The age of the passenger on the departure_date of the final slice.
   */
  age?: number

  /**
   * The type of the passenger.
   */
  type?: 'adult'

  /**
   * The identifier for the passenger, unique within this Offer Request and across all Offer Requests.
   * This ID will be generated by Duffel unless you had optionally provided one.
   * Optionally providing one has been deprecated.
   */
  id: string
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
   * are subject to change without any prior notice. We’re in the process of adding support for fare_brand_name across
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
   * The conditions associated with this slice, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
   * This condition is applied only to this slice and to all the passengers associated with this offer - for information at the offer level (e.g. "what happens if I want to change all the slices?") refer to the conditions at the top level.
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: FlightsConditions
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
}

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
