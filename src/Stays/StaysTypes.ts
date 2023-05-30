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
  /**
   * The source of this rating. Possible values: `"aaa"` (American Automobile Association Diamond Rating), `"northstar"` (Northstar Crown Rating), `"priceline"` (Priceline star rating)
   */
  source: 'aaa' | 'northstar' | 'priceline'

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
  board_type: 'room_only' | 'breakfast' | 'all_inclusive'

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
   * The accepted payment method for this rate. Prepaid rates require payment at time of reservation. Accepted types: prepaid
   */
  payment_type: 'prepaid'

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
  rates: StaysRate[]
}

export interface StaysAmenity {
  /* the type of amenity */
  type: 'parking' | 'wi-fi' | 'gym'
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
   * The setay's region or state
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
   * The total currency for the cheapest rate for this accommodation, as an ISO 4217 currency code. If rooms data is available, this is equivalent to the cheapest rate for the cheapest room.
   */
  cheapest_rate_currency: string

  /**
   * The total amount for the cheapest rate for this accommodation. If rooms data is available, this is equivalent to the cheapest rate for the cheapest room.
   */
  cheapest_rate_total_amount: string

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
   * Rooms for the accommodation
   */
  rooms: StaysRoom[]
}

/**
 * Represents a quote for a stay.
 */
export interface StaysQuote {
  /**
   * The id of the stay quote.
   *
   * Example: "quo_0000AS0NZdKjjnnHZmSUbI"
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
}

export type StaysBookingStatus = 'confirmed' | 'cancelled'

export interface StaysBooking {
  /**
   * The ID of the booking
   */
  id: string

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
   * The ISO 8601 datetime at which the booking was confirmed by the accommodation.
   */
  confirmed_at: string | null

  /**
   * The ISO 8601 datetime of the cancellation of this booking.
   * This is null if the booking is not cancelled.
   */
  cancelled_at: string | null

  /**
   * The guests for the booking
   */
  guests: Array<{ given_name: string; family_name: string }>
}

export interface StaysSearchParams {
  check_in_date: string
  check_out_date: string
  adults: number
  rooms: number
  location: {
    radius: number
    geographic_coordinates: {
      latitude: number
      longitude: number
    }
  }
}

export interface StaysSearchResult {
  id: string
  check_in_date: string
  check_out_date: string
  accommodation: StaysAccommodation
}
