import {
  Aircraft,
  Airline,
  CabinClass,
  DuffelPassengerGender,
  DuffelPassengerTitle,
  DuffelPassengerType,
  FlightsConditions,
  LoyaltyProgrammeAccount,
  OfferAvailableService,
  OfferAvailableServiceBaggageMetadata,
  PassengerIdentityDocumentType,
  PaymentType,
  Place,
  PlaceType,
} from '../../types'

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
 * An object containing metadata about the service, like the maximum weight and dimensions of the baggage.
 */
export type OrderServiceBaggageMetadata = OfferAvailableServiceBaggageMetadata

export interface OrderSegmentPassengerBaggage {
  /**
   * The number of this type of bag allowed on the segment. Note that this can currently be 0 in some cases.
   */
  quantity: number
  /**
   * The type of the baggage allowance
   */
  type: 'checked' | 'carry_on'
}

/**
 * Once you've searched for flights by creating an offer request, and you've chosen which offer you want to book, you'll then want to create an order.
 * @link https://duffel.com/docs/api/orders/schema
 */
export interface OrderService {
  /**
   * Duffel's unique identifier for the booked service
   * @example "ser_00009UhD4ongolulWd9123"
   */
  id: string
  /**
   * The metadata varies by the type of service. It includes further data about the service.
   * For example, for baggages, it may have data about size and weight restrictions.
   */
  metadata?: OrderServiceBaggageMetadata | Seat
  /**
   * List of passenger ids the service applies to. The service applies to all the passengers in this list.
   * @example ["pas_00009hj8USM7Ncg31cBCLL"]
   */
  passenger_ids: string[]
  /**
   * The quantity of the service that was booked
   * @example 1
   */
  quantity: number
  /**
   * List of segment `ids` the service applies to. The service applies to all the segments in this list.
   * @example "["seg_00009hj8USM7Ncg31cB456"]"
   */
  segment_ids: string[]
  /**
   * The total price of the service for all passengers and segments it applies to, accounting for quantity and including taxes
   * @example "15.00"
   */
  total_amount: string
  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * It will match your organisation's billing currency unless you're using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
   * @example "GBP"
   */
  total_currency: string
  /**
   * The type of the service.
   * For now we only return services of type `baggage` and `seat` but we will return other types in the future. We won't consider adding new service types a breaking change.
   */
  type: 'baggage' | 'seat'
}

export interface OrderSegmentPassenger {
  /**
   * The baggage allowances for the passenger on this segment that were included in the original offer.
   * Any extra baggage items which were booked as services will be listed in the services field instead of here.
   */
  baggages: OrderSegmentPassengerBaggage[]
  /**
   * The cabin class that the passenger will travel in on this segment
   */
  cabin_class: CabinClass
  /**
   * The name that the marketing carrier uses to market this cabin class
   */
  cabin_class_marketing_name: string
  /**
   * The identifier for the passenger. You may have specified this ID yourself when creating the offer request, or otherwise, Duffel will have generated its own random ID.
   */
  passenger_id?: string
  /**
   * An object containing metadata about the service, like the designator of the seat.
   */
  seat?: Seat
}

export interface OrderPassenger {
  id: string
  /**
   * The passenger's date of birth
   * @example "1987-07-24"
   */
  born_on: string
  /**
   * The passenger's family name
   * @example "Earheart"
   */
  family_name: string
  /**
   * The passenger's given name
   * @xample "Amelia"
   */
  given_name: string
  /**
   * The passenger's gender
   * @return "m" or "f"
   */
  gender: DuffelPassengerGender
  /**
   * The passenger's title
   * @returns "mr", "ms", "mrs", or "miss"
   */
  title: DuffelPassengerTitle
  /**
   * The type of the passenger
   * @return "adult", "child", or "infant_without_seat"
   */
  type: DuffelPassengerType
  /**
   * The id of the infant associated with this passenger
   * @return "adult", "child", or "infant_without_seat"
   */
  infant_passenger_id?: string | null

  /**
   * The **Loyalty Programme Accounts** for this passenger.
   */
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[]
}

export interface OrderPassengerIdentityDocument {
  /**
   * The type of the identity document. Currently, the only supported type is passport. This must be one of the allowed_passenger_identity_document_types on the offer.
   */
  type: PassengerIdentityDocumentType

  /**
   * The unique identifier of the identity document
   */
  unique_identifier: string

  /**
   * The ISO 3166-1 alpha-2 code of the country that issued this identity document
   */
  issuing_country_code: string

  /**
   * The date on which the identity document expires
   */
  expires_on: string
}

export interface CreateOrderPassenger extends Omit<OrderPassenger, 'type'> {
  /**
   * The passenger's identity documents. You may only provide one identity document per passenger. The identity document's type must be included in the offer's allowed_passenger_identity_document_types. If the offer's passenger_identity_documents_required is set to true, then an identity document must be provided.
   */
  identity_documents?: OrderPassengerIdentityDocument[]

  /**
   * The passenger's email address
   * @example "amelia@duffel.com"
   */
  email: string

  /**
   * The passenger's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) (international) format
   * @example "+442080160509"
   */
  phone_number: string

  /**
   * @deprecated This type is here just for the backward-compatibility until the field is officially removed from the API
   *
   * The type of the passenger
   * @example "adult", "child", or "infant_without_seat"
   */
  type?: DuffelPassengerType
}

export interface OrderSliceSegment {
  /**
   * The aircraft that the operating carrier will use to operate this segment
   */
  aircraft?: Aircraft
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the segment is scheduled to arrive, in the destination airport timezone (see destination.timezone)
   */
  arriving_at: string
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the segment is scheduled to depart, in the origin airport timezone
   */
  departing_at: string
  /**
   * The city or airport where this slice ends
   */
  destination: Place
  /**
   * The terminal at the destination airport where the segment is scheduled to arrive
   * @example "5"
   */
  destination_terminal?: string | null
  /**
   * The duration of the segment, represented as a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration
   */
  duration?: string
  /**
   * Duffel's unique identifier for the segment.
   * It identifies the segment of an order (i.e. the same segment across orders will have different ids.
   */
  id: string
  /**
   * The airline selling the tickets for this segment. This may differ from the `operating_carrier` in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  marketing_carrier: Airline
  /**
   * The flight number assigned by the marketing carrier
   * @example "1234"
   */
  marketing_carrier_flight_number: string
  /**
   * The airline actually operating this segment. This may differ from the `marketing_carrier` in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  operating_carrier: Airline
  /**
   * The flight number assigned by the operating carrier. This may not be present, in which case you should display the `marketing_carrier`'s information and the `marketing_carrier_flight_number`, and simply state the name of the `operating_carrier`.
   * @example "4321"
   */
  operating_carrier_flight_number: string
  /**
   * The city or airport where this slice begins
   */
  origin: Place
  /**
   * The terminal at the origin airport from which the segment is scheduled to depart
   * @example "B"
   */
  origin_terminal?: string | null
  /**
   * Additional segment-specific information about the passengers included in the offer (e.g. their baggage allowance and the cabin class they will be travelling in)
   */
  passengers: OrderSegmentPassenger[]
  /**
   * The distance of the segment in kilometres
   * @example "424.2"
   */
  distance?: string | null
}

export interface OrderSlice {
  /**
   * Whether this slice can be changed. This can only be true for paid orders.
   */
  changeable: boolean | null
  /**
   * The conditions associated with this slice, describing the kinds of modifications you can make and any penalties that will apply to those modifications.
   * This condition is applied only to this slice and to all the passengers associated with this order - for information at the order level (e.g. "what happens if I want to change all the slices?") refer to the `conditions` at the top level. If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API. In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: FlightsConditions
  /**
   * The city or airport where this slice ends
   */
  destination: Place
  /**
   * The type of the destination
   */
  destination_type: PlaceType
  /**
   * The city or airport where this slice begins
   */
  origin: Place
  /**
   * The type of the origin
   */
  origin_type: PlaceType

  /**
   * Duffel's unique identifier for the slice. It identifies the slice of an order (i.e. the same slice across orders will have different ids.
   */
  id: string

  /**
   * The duration of the slice, represented as a ISO 8601 duration
   */
  duration: string | null

  /**
   * The segments - that is, specific flights - that the airline is offering to get the passengers from the origin to the destination
   */
  segments: OrderSliceSegment[]
}

export interface OrderPaymentStatus {
  /**
   * Whether a payment has been made, or the airline is waiting for a payment to be made
   */
  awaiting_payment: boolean

  /**
   *  The ISO 8601 datetime by which you must pay for this order.
   * At this time, if still unpaid, the reserved space on the flight(s)
   * will be released and you will have to create a new order.
   * This will be null only for orders where `awaiting_payment` is `false`.
   * Payment Required by means it will hold space
   */
  payment_required_by?: string

  /**
   *  The ISO 8601 datetime at which the price associated
   * with the order will no longer be guaranteed by the airline
   * and the order will need to be repriced before payment.
   * This can be null when there is no price guarantee.
   * Price Guarantee means it will hold price
   */
  price_guarantee_expires_at?: string
}

/**
 * The type of document
 * @returns "electronic_ticket", "electronic_miscellaneous_document_associated", or "electronic_miscellaneous_document_standalone"
 */
export type OrderDocumentsType =
  | 'electronic_ticket'
  | 'electronic_miscellaneous_document_associated'
  | 'electronic_miscellaneous_document_standalone'

export interface OrderDocument {
  /**
   *  The identifier for the document, in the case of electronic
   *  tickets this string represents the payment or the entitlement to fly.
   * @example "1252106312810"
   */
  unique_identifier: string

  /**
   * The type of document
   */
  type: OrderDocumentsType
}

export interface OrderPayment {
  /**
   * The type of payment you want to apply to the order.
   * If you are an IATA agent with your own agreements with airlines, in some cases, you can pay using ARC/BSP cash by specifying `arc_bsp_cash`.
   * Otherwise, you must pay using your Duffel account's `balance` by specifying balance. In test mode, your balance is unlimited.
   * If you're not sure which of these options applies to you, get in touch with the Duffel support team at [help@duffel.com](mailto:help@duffel.com).
   */
  type: PaymentType

  /**
   * The amount of the payment. This should be the same as the `total_amount` of the offer specified in `selected_offers` for an instant order or the `total_amount` of the previously created pay later order specified in `order_id`, plus the `total_amount` of all the services specified in `services`.
   * @example "30.20"
   */
  amount: string

  /**
   * The currency of the amount, as an ISO 4217 currency code. For an instant order, this should be the same as the total_currency of the offer specified in selected_offers. For a pay later order, this should be the same as the total_currency of the previously created order specified in order_id.
   * @example "GBP"
   */
  currency: string


  card_id?:string
}

export interface Order {
  /**
   * The amount of tax payable on the order for all the flights booked
   */
  tax_amount?: string
  /**
   * The currency of the `tax_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  tax_currency: string
  /**
   * The total price of the order for all the flights and services booked, including taxes
   */
  total_amount: string
  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  total_currency: string

  /**
   * The [slices](https://duffel.com/docs/api/overview/key-principles) that make up the itinerary of this order.
   * One-way journeys can be expressed using one slice,
   * whereas return trips will need two.
   */
  slices: OrderSlice[]

  /**
   * The services booked along with this order
   */
  services: OrderService[]

  /**
   * The passengers who are travelling
   */
  passengers: OrderPassenger[]

  /**
   * The payment status for this order
   *
   */
  payment_status: OrderPaymentStatus

  /**
   * The airline who owns the order
   */
  owner: Airline

  /**
   * Whether the order was created in live mode.
   * This field will be set to true if the order was created
   * in live mode, or false if it was created in test mode.
   */

  live_mode: boolean

  /**
   * Duffel's unique identifier for the order
   */
  id: string

  /**
   *  The documents issued for this order.
   */
  documents?: OrderDocument[]

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) datetime at which the order was created
   */
  created_at: string

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) datetime at which the order was cancelled, if it has been cancelled
   */
  cancelled_at?: string | null

  /**
   * The airline's reference for the order, sometimes known as a
   * "passenger name record" (PNR) or "record locator".
   * Your customers can use this to check in and manage
   * their booking on the airline's website.
   */
  booking_reference: string

  /**
   * The currency of the base_amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * It will match your organisation's billing currency unless you're
   * using Duffel as an accredited IATA agent, in which case it will
   * be in the currency provided by the airline (which will usually
   * be based on the country where your IATA agency is registered).
   */
  base_currency: string

  /**
   *  The base price of the order for all flights and services booked, excluding taxes
   */
  base_amount: string

  /**
   * The conditions associated with this order, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
   *
   * This information assumes the condition is applied to all of the slices and passengers associated with this order - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the `slices`.
   *
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   *
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: FlightsConditions

  /**
   * Metadata contains a set of key-value pairs that you can attach to an object.
   * It can be useful for storing additional information about the object, in a structured format.
   * Duffel does not use this information.
   * You should not store sensitive information in this field.
   */
  metadata: Record<string, string>
}

export interface CreateOrder {
  /**
   * The `id`s of the offers you want to book. You must specify an array containing exactly one selected offer.
   */
  selected_offers: string[]

  /**
   * The services you want to book along with the first selected offer.
   */
  services?: Pick<OrderService, 'id' | 'quantity'>[]

  /**
   * The personal details of the passengers, expanding on the information initially provided when creating the offer request
   */
  passengers: CreateOrderPassenger[]

  /**
   * The payment details to use to pay for the order
   */
  payments?: OrderPayment[]

  /**
   * The payment action you want to take for your order. You can only use pay_later with offers that contain requires_instant_payment: false.
   */
  type: 'instant' | 'pay_later'
}

export interface ListParamsOrders {
  /**
   * Whether to filter orders that are awaiting payment or not. If not specified, all orders regardless of their payment state will be returned.
   */
  awaiting_payment?: boolean

  /**
   * Whether to filter orders matching a passenger name. Partial and exact matches in given and family names will be returned.
   */
  'passenger_name[]'?: string[]

  /**
   * Whether to filter orders matching a given passenger name record (PNR)
   */
  booking_reference?: string
}

export interface UpdateSingleOrder {
  metadata: Order['metadata']
}

export interface AddServices {
  payment: OrderPayment
  add_services: Pick<OrderService, 'id' | 'quantity'>[]
}

export type OrderAvailableService = OfferAvailableService
