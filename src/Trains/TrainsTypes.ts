import { PaginationMeta } from '../types'

export interface TrainStation {
  id: string
  name: string
  country_code: string
}

export type TrainStationSuggestionType = 'station' | 'station_group'

export interface TrainStationSuggestion extends TrainStation {
  latitude: number
  longitude: number
  timezone: string
  type: TrainStationSuggestionType
}

export type TrainSearchType = 'single' | 'return' | 'open_return'

export type TrainTimeMode = 'departs_after'

export interface TrainSearchRequestJourney {
  origin_id: string
  destination_id: string
  time_mode: TrainTimeMode
  date: string
  time: string
}

export interface TrainSearchRequestPassenger {
  age: number
  passenger_card_references?: string[]
}

export interface TrainSearchRequestPassengerCard {
  type_id: string
  reference: string
}

export interface TrainSearchParams {
  type: TrainSearchType
  journeys: TrainSearchRequestJourney[]
  passengers: TrainSearchRequestPassenger[]
  passenger_cards?: TrainSearchRequestPassengerCard[]
}

export interface TrainPassenger {
  id: string
  age: number
  card_ids: string[]
}

export type TrainPassengerCardSupplier = 'duffel_express'

export interface TrainPassengerCardType {
  id: string
  name: string
  supplier: TrainPassengerCardSupplier
}

export interface TrainPassengerCard {
  id: string
  type: TrainPassengerCardType
}

export interface TrainSeatPreferenceOption {
  id: string
  name: string
}

export type TrainTravelClassType = 'standard' | 'premium'

export interface TrainTravelClass {
  type: TrainTravelClassType
  name: string
}

export interface TrainFareLeg {
  leg_id: string
  travel_class: TrainTravelClass | null
}

export interface TrainFareRule {
  title: string
  text: string
}

export interface TrainFare {
  id: string
  passenger_ids: string[]
  passenger_card_ids: string[]
  legs: TrainFareLeg[]
  name: string
  description: string | null
  rules: TrainFareRule[]
  restrictions: string | null
  total_amount: string | null
  total_currency: string | null
  group_save_applied: boolean
}

export interface TrainOffer {
  id: string
  total_amount: string
  total_currency: string
  travel_class: TrainTravelClass
  fares: TrainFare[]
}

export type TrainLegMode =
  | 'train'
  | 'bus'
  | 'ferry'
  | 'walk'
  | 'metro'
  | 'transfer'

export interface TrainLeg {
  id: string
  origin: { name: string }
  destination: { name: string }
  /**
   * ISO 8601 local datetime. This is local time and will not include a UTC offset or trailing Z.
   */
  departure_datetime: string
  /**
   * ISO 8601 local datetime. This is local time and will not include a UTC offset or trailing Z.
   */
  arrival_datetime: string
  mode: TrainLegMode
  carrier: { name: string }
}

export interface TrainRoute {
  id: string
  legs: TrainLeg[]
  offers: TrainOffer[]
  /**
   * When `true`, a later-departing route on this journey arrives before this one.
   */
  is_overtaken: boolean
}

export interface TrainJourney {
  id: string
  origin: TrainStation
  destination: TrainStation
  legs: TrainLeg[]
}

export interface TrainSearchJourney {
  id: string
  origin: TrainStation
  destination: TrainStation
  time_mode: TrainTimeMode
  date: string
  time: string
  /**
   * Present when no offer has been selected yet. Omitted once `selected_offer_id` is set.
   */
  routes?: TrainRoute[]
  /**
   * Set after the `next_journey` action has been called for a return search.
   * Absent when routes are still being selected.
   */
  selected_offer_id?: string | null
}

export interface TrainSearch {
  id: string
  live_mode: boolean
  type: TrainSearchType
  passengers: TrainPassenger[]
  passenger_cards: TrainPassengerCard[]
  journeys: TrainSearchJourney[]
}

export interface TrainNextJourneySelection {
  journey_id: string
  selected_offer_id: string
}

export interface TrainNextJourneyPayload {
  journeys: [TrainNextJourneySelection]
}

export interface TrainQuoteJourneySelection {
  id: string
  offer_id: string
}

export interface TrainCreateQuotePayload {
  search_id: string
  journeys: TrainQuoteJourneySelection[]
}

export type TrainPaymentMethodType = 'card'

export interface TrainAvailablePaymentMethod {
  type: TrainPaymentMethodType
  surcharge_amount: string | null
  surcharge_currency: string | null
}

export type TrainDeliveryMethodType = 'eticket' | 'kiosk'

export interface TrainAvailableDeliveryMethod {
  type: TrainDeliveryMethodType
  fee_amount: string | null
  fee_currency: string | null
  required_data: ['email'] | null
  collection_at_outbound_station: boolean | null
}

export type TrainIdentityDocumentType = 'passport' | 'identity_card'

export type TrainAvailableSeatReservationType = 'optional' | 'mandatory'

export interface TrainAvailableSeatReservationPreferences {
  positions: TrainSeatPreferenceOption[] | null
  directions: TrainSeatPreferenceOption[] | null
  facilities: TrainSeatPreferenceOption[] | null
  seat_types: TrainSeatPreferenceOption[] | null
  carriage_types: TrainSeatPreferenceOption[] | null
}

export interface TrainAvailableSeatReservation {
  id: string
  type: TrainAvailableSeatReservationType
  leg_ids: string[]
  passenger_ids: string[]
  preferences: TrainAvailableSeatReservationPreferences | null
}

export interface TrainQuote {
  id: string
  live_mode: boolean
  journeys: TrainJourney[]
  passengers: TrainPassenger[]
  passenger_cards: TrainPassengerCard[]
  fares: TrainFare[]
  supplier_conditions_url: string
  total_amount: string
  total_currency: string
  available_payment_methods: TrainAvailablePaymentMethod[]
  available_delivery_methods: TrainAvailableDeliveryMethod[]
  required_passenger_identity_documents: TrainIdentityDocumentType[]
  available_seat_reservations: TrainAvailableSeatReservation[]
}

export type TrainBookingPassengerTitle = 'mr' | 'mrs' | 'ms' | 'miss' | 'dr'

export type TrainBookingPassengerGender = 'male' | 'female'

export interface TrainCreateBookingIdentityDocument {
  type: TrainIdentityDocumentType
  /**
   * Required when `type` is `passport`.
   */
  expires_on?: string
  issuing_country_code: string
  unique_identifier: string
}

export interface TrainCreateBookingPassenger {
  /**
   * The ID of the passenger from the search or quote.
   */
  id: string
  title: TrainBookingPassengerTitle
  gender: TrainBookingPassengerGender
  given_name: string
  family_name: string
  born_on: string
  /**
   * Required when the delivery method is `eticket`.
   */
  email?: string
  phone_number?: string
  user_id?: string
  /**
   * Required when the quote's `required_passenger_identity_documents` is non-empty.
   */
  identity_documents?: TrainCreateBookingIdentityDocument[]
}

export interface TrainCreateBookingPayment {
  type: TrainPaymentMethodType
  /**
   * Must match the quote `total_amount`.
   */
  amount: string
  /**
   * Must match the quote `total_currency`.
   */
  currency: string
  /**
   * Required when `type` is `card`.
   */
  three_d_secure_session_id?: string
}

export interface TrainCreateBookingDeliveryMethod {
  type: TrainDeliveryMethodType
  /**
   * Required when `type` is `eticket`.
   */
  recipient_email?: string
}

export interface TrainCreateBookingSeatReservationPreferences {
  positions?: string
  directions?: string
  seat_types?: string
  carriage_types?: string
  facilities?: string[]
}

export interface TrainCreateBookingSeatReservation {
  /**
   * The ID of the available seat reservation from the quote.
   */
  id: string
  preferences?: TrainCreateBookingSeatReservationPreferences
}

export interface TrainCreateBookingPayload {
  quote_id: string
  passengers: TrainCreateBookingPassenger[]
  payments?: TrainCreateBookingPayment[]
  delivery_method: TrainCreateBookingDeliveryMethod
  seat_reservations?: TrainCreateBookingSeatReservation[]
  metadata?: Record<string, string> | null
  users?: string[]
}

export type TrainBookingStatus = 'created' | 'paid' | 'ticketed' | 'cancelled'

export type TrainTicketAssetFormat = 'pdf' | 'pkpass' | 'collection_reference'

export interface TrainTicketAsset {
  format: TrainTicketAssetFormat
  /**
   * A URL for downloadable formats (`pdf`, `pkpass`), or a reference code string for `collection_reference`.
   */
  value: string
}

export interface TrainTicket {
  id: string
  passenger_ids: string[]
  fare_ids: string[]
  assets: TrainTicketAsset[]
}

export interface TrainBookingPassenger {
  id: string
  title: TrainBookingPassengerTitle
  gender: TrainBookingPassengerGender
  given_name: string
  family_name: string
  born_on: string
  email: string | null
  phone_number: string | null
  user_id: string | null
}

export interface TrainSeatReservation {
  id: string
  passenger_id: string
  leg_id: string
  carriage: string | null
  number: string | null
}

export interface TrainBookingDeliveryMethod {
  type: TrainDeliveryMethodType
  /**
   * Only present for `eticket` delivery.
   */
  recipient_email: string | null
}

export interface TrainBooking {
  id: string
  created_at: string
  paid_at: string | null
  cancelled_at: string | null
  status: TrainBookingStatus
  supplier_conditions_url: string
  total_amount: string
  total_currency: string
  tickets: TrainTicket[]
  fares: TrainFare[]
  journeys: TrainJourney[]
  passengers: TrainBookingPassenger[]
  seat_reservations: TrainSeatReservation[]
  delivery_method: TrainBookingDeliveryMethod
  metadata: Record<string, string> | null
  users: string[]
}

export type TrainRefundTo = 'card'

export interface TrainBookingCancellationRefund {
  amount: string
  currency: string
  refund_to: TrainRefundTo
  processed_at: string | null
}

export interface TrainBookingCancellation {
  id: string
  booking_id: string
  confirmed_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
  refunds: TrainBookingCancellationRefund[]
}

export type ListTrainBookingsParams = PaginationMeta
