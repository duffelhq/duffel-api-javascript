export interface CarsGeographicCoordinates {
  latitude: number
  longitude: number
}

export interface CarsSearchLocation {
  radius?: number
  geographic_coordinates: CarsGeographicCoordinates
}

export interface CarsSearchDriver {
  age: number
  residence_country_code: string
}

export interface CarsSearchParams {
  pickup_date: string
  pickup_time: string
  dropoff_date: string
  dropoff_time: string
  pickup_location: CarsSearchLocation
  dropoff_location: CarsSearchLocation
  driver: CarsSearchDriver
}

export type CarsPaymentType = 'postpaid' | 'guarantee' | 'prepaid'

export type CarsMileageUnit = 'kilometres' | 'miles'

export type CarsMileage =
  | { type: 'unlimited' }
  | { type: 'limited'; unit: CarsMileageUnit; limit: number }

export interface CarsSupplier {
  name: string
  logo_url: string | null
}

export type CarsCategory =
  | 'mini'
  | 'mini_elite'
  | 'economy'
  | 'economy_elite'
  | 'compact'
  | 'compact_elite'
  | 'intermediate'
  | 'intermediate_elite'
  | 'standard'
  | 'standard_elite'
  | 'fullsize'
  | 'fullsize_elite'
  | 'premium'
  | 'premium_elite'
  | 'luxury'
  | 'luxury_elite'
  | 'special'

export type CarsVehicleType =
  | 'two_door'
  | 'two_or_four_door'
  | 'four_door'
  | 'wagon_estate'
  | 'passenger_van'
  | 'limousine'
  | 'sport'
  | 'convertible'
  | 'suv'
  | 'open_air_all_terrain'
  | 'special'
  | 'pickup_regular_cab'
  | 'pickup_extended_cab'
  | 'special_offer_car'
  | 'coupe'
  | 'monospace'
  | 'recreational_vehicle'
  | 'two_wheel_vehicle'

export type CarsTransmission = 'manual' | 'automatic'

export type CarsFuel =
  | 'unspecified_fuel'
  | 'diesel'
  | 'hybrid'
  | 'electric'
  | 'lpg'
  | 'hydrogen'
  | 'multi_fuel'
  | 'petrol'

export interface CarsBaggage {
  large: number
  small: number
}

export interface CarsImage {
  url: string
}

export interface Car {
  name: string
  /**
   * The ACRISS or SIPP code for this car. A four-letter code describing the car's attributes.
   */
  code: string
  category: CarsCategory
  type: CarsVehicleType
  transmission: CarsTransmission
  fuel: CarsFuel
  air_conditioning: boolean
  max_passengers: number | null
  baggage: CarsBaggage | null
  images: CarsImage[] | null
}

export type CarsLocationAccess =
  | 'in_terminal'
  | 'shuttle'
  | 'meet_and_greet'
  | 'call_for_pickup'

export interface CarsLocationAdditionalInformation {
  title: string
  text: string
}

export interface CarsLocationOpeningHours {
  from: string
  to: string
}

export interface CarsLocationAddress {
  line_one: string | null
  city_name: string | null
  postal_code: string | null
  region: string | null
  country_code: string
}

export interface CarsLocation {
  name: string
  geographic_coordinates: CarsGeographicCoordinates
  address: CarsLocationAddress
  phone_number: string | null
  access: CarsLocationAccess | null
  additional_information: CarsLocationAdditionalInformation[]
  opening_hours: CarsLocationOpeningHours[]
}

export interface CarsRate {
  id: string
  base_amount: string | null
  base_currency: string | null
  total_amount: string
  total_currency: string
  payment_type: CarsPaymentType
  mileage: CarsMileage
  supplier: CarsSupplier
  car: Car
  pickup_location: CarsLocation
  dropoff_location: CarsLocation
}

export interface CarsSearch {
  id: string
  live_mode: boolean
  created_at: string
  pickup_date: string
  pickup_time: string
  dropoff_date: string
  dropoff_time: string
  pickup_location: CarsSearchLocation
  dropoff_location: CarsSearchLocation
  driver: CarsSearchDriver
  rates: CarsRate[]
}

export interface CarsCharge {
  amount: string
  currency: string
  description: string | null
}

export interface CarsCondition {
  title: string
  text: string
}

export interface CarsPrivacyPolicy {
  title: string
  text: string
}

export interface CarsQuote {
  id: string
  live_mode: boolean
  rate_id: string
  search_id: string
  base_amount: string | null
  base_currency: string
  total_amount: string
  total_currency: string
  charges: CarsCharge[] | null
  payment_type: CarsPaymentType
  mileage: CarsMileage
  supplier: CarsSupplier
  car: Car
  conditions: CarsCondition[]
  privacy_policies: CarsPrivacyPolicy[] | null
  pickup_location: CarsLocation
  dropoff_location: CarsLocation
  pickup_date: string
  pickup_time: string
  dropoff_date: string
  dropoff_time: string
}

export type CarsBookingStatus = 'confirmed' | 'cancelled'

export interface CarsBookingDriver {
  given_name: string
  family_name: string
  date_of_birth: string
  email: string
  phone_number: string
  user_id: string | null
}

export interface CarsBooking {
  id: string
  live_mode: boolean
  reference: string
  confirmed_at: string | null
  cancelled_at: string | null
  status: CarsBookingStatus
  driver: CarsBookingDriver
  quote_id: string
  base_amount: string | null
  base_currency: string
  total_amount: string
  total_currency: string
  charges: CarsCharge[] | null
  payment_type: CarsPaymentType
  mileage: CarsMileage
  supplier: CarsSupplier
  metadata: Record<string, string> | null
  users: string[]
  car: Car
  conditions: CarsCondition[]
  privacy_policies: CarsPrivacyPolicy[] | null
  pickup_location: CarsLocation
  dropoff_location: CarsLocation
  pickup_date: string
  pickup_time: string
  dropoff_date: string
  dropoff_time: string
}
