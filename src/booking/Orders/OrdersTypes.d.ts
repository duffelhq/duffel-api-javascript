import { Aircraft, Airline, Airport } from 'types'
import * as DuffelAPITypes from 'types/shared'

/**
 * @TODO move to Offers type
 */
export interface OfferAvailableServiceBaggageMetadata {
  /**
   * The maximum weight that the baggage can have in kilograms
   */
  maximumWeightKg: number | null

  /**
   * The maximum height that the baggage can have in centimetres
   */
  maximumHeightCm: number | null

  /**
   * The maximum length that the baggage can have in centimetres
   */
  maximumLengthCm: number | null

  /**
   * The maximum depth that the baggage can have in centimetres
   */
  maximumDepthCm: number | null

  /**
   * The type of the baggage
   */
  type: BaggageType
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
  metadata: OrderServiceBaggageMetadata | DuffelAPITypes.Seat
  /**
   * List of passenger ids the service applies to. The service applies to all the passengers in this list.
   * @example ["pas_00009hj8USM7Ncg31cBCLL"]
   */
  passengerIds: string[]
  /**
   * The quantity of the service that was booked
   * @example 1
   */
  quantity: number
  /**
   * List of segment `ids` the service applies to. The service applies to all the segments in this list.
   * @example "["seg_00009hj8USM7Ncg31cB456"]"
   */
  segmentIds: string[]
  /**
   * The total price of the service for all passengers and segments it applies to, accounting for quantity and including taxes
   * @example "15.00"
   */
  totalAmount: string
  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * It will match your organisation's billing currency unless you’re using Duffel as an accredited IATA agent, in which case it will be in the currency provided by the airline (which will usually be based on the country where your IATA agency is registered).
   * @example "GBP"
   */
  totalCurrency: string
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
  cabinClass: DuffelAPITypes.CabinClass
  /**
   * The name that the marketing carrier uses to market this cabin class
   */
  cabinClassMarketingName: string
  /**
   * The identifier for the passenger. You may have specified this ID yourself when creating the offer request, or otherwise, Duffel will have generated its own random ID.
   */
  passengerId?: string
  /**
   * An object containing metadata about the service, like the designator of the seat.
   */
  seat?: DuffelAPITypes.Seat
}

export interface OrderPassenger {
  id: string
  /**
   * The passenger's date of birth
   * @example "1987-07-24"
   */
  bornOn: string
  /**
   * The passenger's family name
   * @example "Earheart"
   */
  familyName: string
  /**
   * The passenger's given name
   * @xample "Amelia"
   */
  givenName: string
  /**
   * The passenger's gender
   * @return "m" or "f"
   */
  gender: DuffelAPITypes.DuffelPassengerGender
  /**
   * The passenger's title
   * @returns "mr", "ms", "mrs", or "miss"
   */
  title: DuffelAPITypes.DuffelPassengerTitle
  /**
   * The type of the passenger
   * @return "adult", "child", or "infant_without_seat"
   */
  type: DuffelAPITypes.DuffelPassengerType
  /**
   * The id of the infant associated with this passenger
   * @return "adult", "child", or "infant_without_seat"
   */
  infantPassengerId?: string | null
}

export interface OrderPassengerIdentityDocument {
  /**
   * The type of the identity document. Currently, the only supported type is passport. This must be one of the allowed_passenger_identity_document_types on the offer.
   */
  type: Types.PassengerIdentityDocumentType

  /**
   * The unique identifier of the identity document
   */
  uniqueIdentifier: string

  /**
   * The ISO 3166-1 alpha-2 code of the country that issued this identity document
   */
  issuingCountryCode: string

  /**
   * The date on which the identity document expires
   */
  expiresOn: string
}

export interface CreateOrderPassenger extends OrderPassenger {
  /**
   * The passenger's identity documents. You may only provide one identity document per passenger. The identity document's type must be included in the offer's allowed_passenger_identity_document_types. If the offer's passenger_identity_documents_required is set to true, then an identity document must be provided.
   */
  identityDocuments: OrderPassengerIdentityDocument[]

  /**
   * The passenger's email address
   * @example "amelia@duffel.com"
   */
  email: string
}

export interface OrderAirportSlice extends Airport {
  type?: DuffelAPITypes.PlaceType
  iataCityCode?: string
}

export interface OrderSliceSegment {
  /**
   * The aircraft that the operating carrier will use to operate this segment
   */
  aircraft?: Aircraft
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the segment is scheduled to arrive, in the destination airport timezone (see destination.timezone)
   */
  arrivingAt: string
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the segment is scheduled to depart, in the origin airport timezone
   */
  departingAt: string
  destination: OrderAirportSlice
  /**
   * The terminal at the destination airport where the segment is scheduled to arrive
   * @example "5"
   */
  destinationTerminal?: string | null
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
  marketingCarrier: Airline
  /**
   * The flight number assigned by the marketing carrier
   * @example "1234"
   */
  marketingCarrierFlightNumber: string
  /**
   * The airline actually operating this segment. This may differ from the `marketing_carrier` in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  operatingCarrier: Airline
  /**
   * The flight number assigned by the operating carrier. This may not be present, in which case you should display the `marketing_carrier`'s information and the `marketing_carrier_flight_number`, and simply state the name of the `operating_carrier`.
   * @example "4321"
   */
  operatingCarrierFlightNumber: string
  /**
   * The airport from which the flight is scheduled to depart
   */
  origin: OrderAirportSlice
  /**
   * The terminal at the origin airport from which the segment is scheduled to depart
   * @example "B"
   */
  originTerminal?: string | null
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

export interface OrderPaymentStatus {
  /**
   * Whether a payment has been made, or the airline is waiting for a payment to be made
   */
  awaitingPayment: boolean

  /**
   *  The ISO 8601 datetime by which you must pay for this order.
   * At this time, if still unpaid, the reserved space on the flight(s)
   * will be released and you will have to create a new order.
   * This will be null only for orders where `awaiting_payment` is `false`.
   * Payment Required by means it will hold space
   */
  paymentRequiredBy?: string

  /**
   *  The ISO 8601 datetime at which the price associated
   * with the order will no longer be guaranteed by the airline
   * and the order will need to be repriced before payment.
   * This can be null when there is no price guarantee.
   * Price Guarantee means it will hold price
   */
  priceGuaranteeExpiresAt?: string
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
  uniqueIdentifier: string

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
   * If you're not sure which of these options applies to you, get in touch with the Duffel support team at help@duffel.com.
   */
  type: DuffelAPITypes.PaymentType

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
}

export interface CreateOrderPayment {
  /**
   * Duffel's unique identifier for the order
   * Example: "ord_00009hthhsUZ8W4LxQgkjo"
   */
  orderId: string
  payment: OrderPayment
}

export interface Order {
  /**
   * The amount of tax payable on the order for all the flights booked
   */
  taxAmount?: string
  /**
   * The currency of the `tax_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  taxCurrency: string
  /**
   * The total price of the order for all the flights and services booked, including taxes
   */
  totalAmount: string
  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  totalCurrency: string

  /**
   * The [slices](https://duffel.com/docs/api/overview/key-principles) that make up the itinerary of this order.
   * One-way journeys can be expressed using one slice,
   * whereas return trips will need two.
   */
  slices: Array<DuffelAPITypes.Slices & { segments: OrderSliceSegment[] }>

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
  paymentStatus: OrderPaymentStatus

  /**
   * The airline who owns the order
   */
  owner: DuffelAPI.Types.Airline

  /**
   * Whether the order was created in live mode.
   * This field will be set to true if the order was created
   * in live mode, or false if it was created in test mode.
   */

  liveMode: boolean

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
  createdAt: string

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) datetime at which the order was cancelled, if it has been cancelled
   */
  cancelledAt?: string | null

  /**
   * The airline's reference for the order, sometimes known as a
   * "passenger name record" (PNR) or "record locator".
   * Your customers can use this to check in and manage
   * their booking on the airline's website.
   */
  bookingReference: string

  /**
   * The currency of the base_amount, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
   * It will match your organisation's billing currency unless you’re
   * using Duffel as an accredited IATA agent, in which case it will
   * be in the currency provided by the airline (which will usually
   * be based on the country where your IATA agency is registered).
   */
  baseCurrency: string

  /**
   *  The base price of the order for all flights and services booked, excluding taxes
   */
  baseAmount: string

  /**
   * The conditions associated with this order, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
   *
   * This information assumes the condition is applied to all of the slices and passengers associated with this order - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the `slices`.
   *
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   *
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: DuffelAPITypes.FlightsConditions
}

export interface CreateOrder {
  /**
   * The `id`s of the offers you want to book. You must specify an array containing exactly one selected offer.
   */
  selectedOffers: string[]

  /**
   * The services you want to book along with the first selected offer.
   */
  services?: Pick<OrderService, 'id', 'quantity'>[]

  /**
   * The personal details of the passengers, expanding on the information initially provided when creating the offer request
   */
  passengers: CreateOrderPassenger[]

  /**
   * The payment details to use to pay for the order
   */
  payments: OrderPayment[]

  /**
   * The payment action you want to take for your order. You can only use pay_later with offers that contain requires_instant_payment: false.
   */
  type: 'instant' | 'pay_later'
}
