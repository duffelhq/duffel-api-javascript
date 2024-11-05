import { PaginationMeta } from './../types'

export type StaysBedType = 'single' | 'double' | 'queen' | 'king' | 'sofabed'

export interface StaysBed {
  /**
   * The type of beds available in the room Available types: "single", "double", "queen", "king", "sofabed"
   */
  type: StaysBedType

  /**
   * The number of beds of this type in the room.
   */
  count: number
}

export interface StaysRating {
  // eslint-disable-next-line spellcheck/spell-checker
  /**
   * The source of this rating. Possible values: `"aaa"` (American Automobile Association Diamond Rating), `"northstar"` (Northstar Crown Rating), `"priceline"` (Priceline star rating)
   */
  source: 'aaa' | 'northstar' | 'priceline' | 'bookingcom'

  /**
   * The rating value. This is an integer from 1 to 5 regardless of the `source`.
   */
  value: number
}

export interface StaysRateCondition {
  /**
   * One or more paragraphs that outline the rate condition
   */
  description: string

  /**
   * The condition title
   */
  title: string
}

export interface StaysRateCancellationTimeline {
  /**
   * The amount refundable up until the specified before date
   */
  refund_amount: string

  /**
   * The ISO 8601 datetime for the deadline of a refund.
   */
  before: string

  /**
   * The currency of the amount, as an ISO 4217 currency code.
   */
  currency: string
}

export type StaysLoyaltyProgrammeReference =
  | 'wyndham_rewards'
  | 'choice_privileges'
  | 'marriott_bonvoy'
  | 'best_western_rewards'
  | 'world_of_hyatt'
  | 'hilton_honors'
  | 'ihg_one_rewards'
  | 'leaders_club'
  | 'stash_rewards'
  | 'omni_select_guest'
  | 'i_prefer'
  | 'accor_live_limitless'
  | 'my_6'
  | 'jumeirah_one'
  | 'global_hotel_alliance_discovery'
  | 'duffel_hotel_group_rewards'

export type StaysPaymentType = 'balance' | 'card'

export interface StaysRate {
  /**
   * The currency of the base_amount, as an ISO 4217 currency code.
   */
  base_amount: string | null

  /**
   * The currency of the base_amount, as an ISO 4217 currency code.
   */
  base_currency: string

  /**
   * The type of boarding offered by this rate.
   */
  board_type:
    | 'room_only'
    | 'breakfast'
    | 'half_board'
    | 'full_board'
    | 'all_inclusive'

  /**
   * A timeline that contains policies, such as possible refunds, once this rate has been booked. This is sorted in ascending chronological order.
   */
  cancellation_timeline: StaysRateCancellationTimeline[]

  /**
   * The conditions or policies that apply to the rate. The information provided should be treated as mandatory and displayed to the traveller during and after the booking process.
   */
  conditions: Array<StaysRateCondition>

  /**
   * Fees are sometimes payable at time of check in. These fees are not collected during the booking process
   */
  due_at_accommodation_amount: string | null

  /**
   * The currency of the due_at_accommodation_amount
   */
  due_at_accommodation_currency: string

  /**
   * ID of a given rate for a accommodation
   */
  id: string

  /**
   * The accepted payment method for this rate. Prepaid rates require payment at time of reservation. Accepted types: pay_now, guarantee
   */
  payment_type: 'pay_now' | 'guarantee'

  /**
   * The supplier from which Duffel got this rate
   */
  supplier: 'priceline'

  /**
   * The fee amount, as an ISO 4217 currency code.
   */
  fee_amount: string | null

  /**
   * The currency of the fee_amount, as an ISO 4217 currency code
   */
  fee_currency: string

  /**
   * The tax amount, as an ISO 4217 currency code.
   */
  tax_amount: string | null

  /**
   * The currency of the tax_amount, as an ISO 4217 currency code
   */
  tax_currency: string

  /**
   * The total price for the room for all nights and for all occupants. Please note, the occupant may be required to pay fees on arrival at the hotel. These are not included in the total_amount, and are included in due_at_accommodation_amount
   */
  total_amount: string

  /**
   * The currency of the total_amount, as an ISO 4217 currency code
   */
  total_currency: string

  /**
   * The methods available for payment of this rate.

   A rate with the `balance` payment type can be paid for using your Duffel Balance.

   A rate with the `card` payment type can be paid for with card details provided at time of booking.
   */
  available_payment_methods: StaysPaymentType[]

  /**
   * The loyalty programme that this rate supports.
   * If the rate does not support a loyalty programme, this will be null.
   * The duffel_hotel_group_rewards value is an example programme for testing and integration purposes, and will only appear on Duffel Hotel Group test hotel rates.
   */
  supported_loyalty_programme: StaysLoyaltyProgrammeReference | null

  /**
   * The source of the rate.
   * Useful in scenarios where a rate requires explicitly showing the source.
   */
  source: 'bookingcom' | 'priceline' | 'travelport' | 'duffel_hotel_group'
}

export interface StaysRoomRate extends StaysRate {
  /**
   * The quantity of rooms available to be booked at this rate. This number is not guaranteed to be accurate. Will be null if this information is unknown.
   */
  quantity_available: number | null
}

export interface StaysPhoto {
  url: string
}

export interface StaysRoom {
  /**
   * The room name.
   */
  name: string

  /**
   * Available beds in the room
   */
  beds?: StaysBed[]

  /**
   * Supplied photos for the room
   */
  photos?: StaysPhoto[]

  /**
   * The available rates for a specific room, including commission, distribution, payment and included services information.
   */
  rates: StaysRoomRate[]
}

export interface StaysAmenity {
  /* the type of amenity */
  type:
    | 'parking'
    | 'gym'
    | 'wifi'
    | '24_hour_front_desk'
    | 'accessibility_hearing'
    | 'accessibility_mobility'
    | 'adult_only'
    | 'business_centre'
    | 'cash_machine'
    | 'childcare_service'
    | 'concierge'
    | 'laundry'
    | 'lounge'
    | 'pets_allowed'
    | 'pool'
    | 'restaurant'
    | 'room_service'
    | 'spa'
  /* label friendly description of the amenity */
  description: string
}

export interface StaysChain {
  /**
   * The hotel chain’s name
   */
  name: string
}

export interface StaysAddress {
  /**
   * The name of the city or metropolitan area where the accommodation is located.
   */
  city_name: string

  /**
   * The ISO 3166-1 alpha-2 code for the country where the hotel is located.
   */
  country_code: string

  /**
   * The first line of the accommodation's address
   */
  line_one: string

  /**
   * The accommodation's postal code (or zip code)
   */
  postal_code: string

  /**
   * The stay's region or state
   */
  region: string
}

export interface GeographicCoordinates {
  /**
   * The latitude position of the accommodation represented in Decimal degrees  with 6 decimal points with a range between -90° and 90°
   */
  latitude: number

  /**
   * The longitude position of the accommodation represented in Decimal degrees with 6 decimal points with a range between -180° and 180°
   */
  longitude: number
}

export interface StaysLocation {
  /**
   * Address information of the location
   */
  address: StaysAddress

  /**
   * The exact latitude-longitude position of the accommodation. Useful for map views.
   */
  geographic_coordinates: GeographicCoordinates | null
}

export interface StaysAccommodation {
  /**
   * Duffel ID for this accommodation. Useful for searching availability
   * for the same accommodation via accommodation based search.
   */
  id: string
  /**
   * The amenities available at the accommodation
   */
  amenities: StaysAmenity[] | null

  /**
   * Information about the chain this accommodation belongs to
   */
  chain: StaysChain | null

  /**
   * Check in and check out related information
   */
  check_in_information: {
    /**
     * The ISO 8601 format for the earliest time a traveller can check-in to their room.
     */
    check_out_before_time: string

    /**
     * The ISO 8601 format for the earliest time a traveller can check-out to their room.
     */
    check_in_after_time: string
  } | null

  /**
   * The key collection details for the accommodation.
   */
  key_collection: StaysBookingKeyCollection | null

  /**
   * The accommodation’s description
   */
  description?: string

  /**
   * The accommodation’s email address. Note that this data may differ from the accommodation’s records if it was updated directly by the accommodation after the booking was created.
   */
  email: string | null

  /**
   * Information on the accommodation's location
   */
  location: StaysLocation

  /**
   * The accommodation's name
   */
  name: string

  /**
   * The accommodation's phone number in E.164 (international) format. Note that this data may differ from the accommodation's records if it was updated directly by the accommodation after the booking was created.
   */
  phone_number: string | null

  /**
   * Photos for the accommodation
   */
  photos?: StaysPhoto[]

  /**
   * Ratings of the accommodation
   */
  ratings: StaysRating[] | null

  /**
   * A "star rating" of this accommodation. If available, this is an integer from 1 to 5 "stars". This value is consolidated by Duffel based on data provided by our sources and accommodation providers. For more detailed rating information, see ratings.
   */
  rating: number | null

  /**
   * A review score of this accommodation, aggregated from guest reviews. If available, the value is a score from the 1.0-10.0 range. This value is consolidated by Duffel based on user review data from multiple sources.
   */
  review_score: number | null

  /**
   * Rooms for the accommodation
   */
  rooms: StaysRoom[]

  /**
   * The loyalty programme that this accommodation supports.
   */
  supported_loyalty_programme: StaysLoyaltyProgrammeReference | null
}

export interface StaysAccommodationSuggestion {
  accommodation_id: StaysAccommodation['id']
  accommodation_name: StaysAccommodation['name']
  accommodation_location: StaysLocation
}

/**
 * Represents a quote for a stay.
 */
export interface StaysQuote {
  /**
   * The id of the stay quote.
   *
   * @example: "quo_0000AS0NZdKjjnnHZmSUbI"
   */
  id: string

  /**
   * The ISO 8601 date on which the guest wants to check in.
   * This comes from the search request this quote originates from.
   *
   * Example: "2023-05-24"
   */
  check_in_date: string

  /**
   * The ISO 8601 date on which the guest wants to check out.
   * This comes from the search request this quote originates from.
   *
   * Example: "2023-05-28"
   */
  check_out_date: string

  /**
   * The accommodation associated with this quote.
   */
  accommodation: StaysAccommodation

  /**
   * The total price for the room for all nights and for all guests.
   * Please note, the guest may be required to pay mandatory fees and taxes at the stay.
   * These are not included in the total_amount, and are included in due_at_accommodation_amount.
   *
   * Example: "799.00"
   */
  total_amount: string

  /**
   * The currency of the total_amount, as an ISO 4217 currency code.
   *
   * Example: "GBP"
   */
  total_currency: string

  /**
   * The base amount for this quote, excluding taxes and fees.
   * Will be null if the base amount is unknown.
   *
   * Example: "665.83"
   */
  base_amount: string | null

  /**
   * The currency of the base_amount, as an ISO 4217 currency code.
   *
   * Example: "GBP"
   */
  base_currency: string

  /**
   * The fee amount for this quote.
   * Will be null if the fee amount is unknown.
   *
   * Example: "50.94"
   */
  fee_amount: string | null

  /**
   * The currency of the fee_amount, as an ISO 4217 currency code.
   *
   * Example: "GBP"
   */
  fee_currency: string

  /**
   * The tax amount for this quote.
   * Will be null if the tax amount is unknown.
   *
   * Example: "133.17"
   */
  tax_amount: string | null

  /**
   * The currency of the tax_amount, as an ISO 4217 currency code.
   *
   * Example: "GBP"
   */
  tax_currency: string

  /**
   * Mandatory fees or taxes that are due by the guest at the accommodation.
   * Depending on the accommodation, these may be payable on check-in or check-out.
   * These fees are not collected during the booking process.
   * Will be null if the amount due at accommodation is unknown.
   *
   * Example: "39.95"
   */
  due_at_accommodation_amount: string | null

  /**
   * The currency of the due_at_accommodation_amount, as an ISO 4217 currency code.
   *
   * Example: "GBP"
   */
  due_at_accommodation_currency: string

  /**
   * The loyalty programme that this quote supports.
   */
  supported_loyalty_programme: StaysLoyaltyProgrammeReference | null

  /*
   * The number of rooms this quote is for
   */
  rooms: number

  /*
   * A list of guests representing the requested occupancy for this quote
   */

  guests: Array<Guest>
}

export type StaysBookingStatus = 'confirmed' | 'cancelled'

export interface StaysBookingKeyCollection {
  instructions: string
}

export interface StaysBooking {
  /**
   * The ID of the booking
   */
  id: string

  /**
   * The email of the lead guest of the booking
   */
  email: string

  /**
   * The phone number of the lead guest of the booking
   */
  phone_number: string

  /**
   * The accommodation object for the booking
   */
  accommodation: StaysAccommodation

  /**
   * The ISO 8601 date on which the guest wants to check in.
   */
  check_in_date: string

  /**
   * The ISO 8601 date on which the guest wants to check out.
   */
  check_out_date: string

  /**
   * A booking reference for the property you’ll be staying in. This is the reference you should use when contacting the accommodation.
   */
  reference: string | null

  /**
   * The status of the booking. Possible values: requested, confirmed, failed,cancellation_requested,cancellation_confirmed.
   */
  status: StaysBookingStatus

  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the booking was made.
   */
  confirmed_at: string

  /**
   * The ISO 8601 datetime of the cancellation of this booking.
   * This is null if the booking is not cancelled.
   */
  cancelled_at: string | null

  /**
   * The guests for the booking
   */
  guests: Array<{ given_name: string; family_name: string }>

  /**
   * The loyalty programme that this booking supports.
   */
  supported_loyalty_programme: StaysLoyaltyProgrammeReference | null

  /**
   * Loyalty account number to associate with this booking. Use this only when the quote has a supported_loyalty_programme indicated. Otherwise, this will result into an error.
   */
  loyalty_programme_account_number: string | null

  /**
   * The number of rooms in the booking.
   */
  rooms: number

  /**
   * Metadata pertaining to this booking, generated by the Duffel API.
   */
  metadata: Record<string, string> | null

  /**
   * Deprecated: Instructions to access the accommodation in the booking
   */
  key_collection: StaysBookingKeyCollection | null
}

// Age is not required for adult, but required for child
type Adult = { type: 'adult'; age?: number }
type Child = { type: 'child'; age: number }

export type Guest = Adult | Child

interface CommonStaysSearchParams {
  check_in_date: string
  check_out_date: string
  rooms: number
  guests: Array<Guest>
}

export type LocationParams = {
  radius: number
  geographic_coordinates: GeographicCoordinates
}

type LocationSearchParams = {
  location: LocationParams
} & CommonStaysSearchParams

type AccommodationSearchParams = {
  accommodation: {
    ids: Array<string>
    fetch_rates?: boolean
  }
} & CommonStaysSearchParams

export type StaysSearchParams = LocationSearchParams | AccommodationSearchParams

export interface ListAccommodationParams extends PaginationMeta {
  radius?: LocationParams['radius']
  latitude: GeographicCoordinates['latitude']
  longitude: GeographicCoordinates['longitude']
}

export interface StaysSearchResult {
  id: string
  check_in_date: string
  check_out_date: string
  accommodation: StaysAccommodation
  rooms: number
  guests: Array<Guest>
  cheapest_rate_total_amount: string
  cheapest_rate_currency: string
}

export interface StaysLoyaltyProgramme {
  reference: StaysLoyaltyProgrammeReference
  name: string
  logo_url_svg: string
  logo_url_png_small: string
}
