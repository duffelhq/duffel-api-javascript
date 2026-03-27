import {
  Car,
  CarsBooking,
  CarsBookingDriver,
  CarsCharge,
  CarsCondition,
  CarsLocation,
  CarsMileage,
  CarsPrivacyPolicy,
  CarsQuote,
  CarsRate,
  CarsSearch,
  CarsSearchParams,
  CarsSupplier,
} from './CarsTypes'
import { CarsBookingPayload } from './Bookings/Bookings'

export const MOCK_CAR: Car = {
  name: 'Successful Postpaid Booking',
  code: 'SSAV',
  category: 'standard',
  type: 'sport',
  transmission: 'automatic',
  fuel: 'petrol',
  air_conditioning: true,
  max_passengers: 5,
  baggage: {
    large: 3,
    small: 2,
  },
  images: [
    {
      url: 'https://assets.duffel.com/img/cars/duffel-test-drive/sport.png',
    },
  ],
}

export const MOCK_SUPPLIER: CarsSupplier = {
  name: 'Duffel Test Drive',
  logo_url:
    'https://assets.duffel.com/duffel-lockup/Duffel_Logo_Lock-up_Positive_RGB.png',
}

export const MOCK_MILEAGE: CarsMileage = {
  type: 'unlimited',
}

export const MOCK_LOCATION: CarsLocation = {
  name: 'Duffel Test Drive Pickup',
  geographic_coordinates: {
    latitude: -24.38,
    longitude: -128.32,
  },
  address: {
    line_one: '1 Rental Road',
    city_name: 'Henderson Island',
    postal_code: 'PCRN 1ZZ',
    region: null,
    country_code: 'GB',
  },
  phone_number: null,
  access: null,
  additional_information: [],
  opening_hours: [],
}

export const MOCK_DROPOFF_LOCATION: CarsLocation = {
  ...MOCK_LOCATION,
  name: 'Duffel Test Drive Dropoff',
  address: {
    ...MOCK_LOCATION.address,
    line_one: '2 Rental Road',
  },
}

export const MOCK_CONDITION: CarsCondition = {
  title: 'Cancellation Policy',
  text: 'Free cancellation up to 24 hours before pickup.',
}

export const MOCK_PRIVACY_POLICY: CarsPrivacyPolicy = {
  title: 'Customer Data Use',
  text: 'Your data may be shared with the supplier to process your booking.',
}

export const MOCK_CHARGE: CarsCharge = {
  amount: '6.12',
  currency: 'GBP',
  description: 'Insurance fee',
}

export const MOCK_RATE: CarsRate = {
  id: 'rae_0000B4gHZfFvCNgBj3EIaX',
  base_amount: '95.22',
  base_currency: 'GBP',
  total_amount: '101.34',
  total_currency: 'GBP',
  payment_type: 'postpaid',
  mileage: MOCK_MILEAGE,
  supplier: MOCK_SUPPLIER,
  car: MOCK_CAR,
  pickup_location: MOCK_LOCATION,
  dropoff_location: MOCK_DROPOFF_LOCATION,
}

export const MOCK_SEARCH_PARAMS: CarsSearchParams = {
  pickup_date: '2026-05-27',
  pickup_time: '10:00',
  dropoff_date: '2026-06-01',
  dropoff_time: '15:00',
  pickup_location: {
    radius: 10,
    geographic_coordinates: {
      latitude: -24.38,
      longitude: -128.32,
    },
  },
  dropoff_location: {
    radius: 10,
    geographic_coordinates: {
      latitude: -24.38,
      longitude: -128.32,
    },
  },
  driver: {
    age: 31,
    residence_country_code: 'GB',
  },
}

export const MOCK_SEARCH: CarsSearch = {
  id: 'seh_0000B4gHZfDRLbh7bM4Jii',
  live_mode: false,
  created_at: '2026-03-27T11:16:15.743337Z',
  pickup_date: '2026-05-27',
  pickup_time: '10:00',
  dropoff_date: '2026-06-01',
  dropoff_time: '15:00',
  pickup_location: MOCK_SEARCH_PARAMS.pickup_location,
  dropoff_location: MOCK_SEARCH_PARAMS.dropoff_location,
  driver: MOCK_SEARCH_PARAMS.driver,
  rates: [MOCK_RATE],
}

export const MOCK_DRIVER: CarsBookingDriver = {
  given_name: 'Amelia',
  family_name: 'Earheart',
  date_of_birth: '1990-01-01',
  email: 'amelia.earheart@duffel.com',
  phone_number: '+442080160509',
  user_id: null,
}

export const MOCK_QUOTE: CarsQuote = {
  id: 'qut_0000Bx4Af0b5l45AT50eqO',
  live_mode: false,
  rate_id: 'rae_0000B4gHZfFvCNgBj3EIaX',
  search_id: 'seh_0000B4gHZfDRLbh7bM4Jii',
  base_amount: '95.22',
  base_currency: 'GBP',
  total_amount: '101.34',
  total_currency: 'GBP',
  charges: [MOCK_CHARGE],
  payment_type: 'postpaid',
  mileage: MOCK_MILEAGE,
  supplier: MOCK_SUPPLIER,
  car: MOCK_CAR,
  conditions: [MOCK_CONDITION],
  privacy_policies: [MOCK_PRIVACY_POLICY],
  pickup_location: MOCK_LOCATION,
  dropoff_location: MOCK_DROPOFF_LOCATION,
  pickup_date: '2026-05-27',
  pickup_time: '10:00',
  dropoff_date: '2026-06-01',
  dropoff_time: '15:00',
}

export const MOCK_BOOKING: CarsBooking = {
  id: 'boo_0000Cx4Af0b5l45AT50eqO',
  live_mode: false,
  reference: 'DTD-ABC123',
  confirmed_at: '2026-03-27T11:20:00.000000Z',
  cancelled_at: null,
  status: 'confirmed',
  driver: MOCK_DRIVER,
  quote_id: 'qut_0000Bx4Af0b5l45AT50eqO',
  base_amount: '95.22',
  base_currency: 'GBP',
  total_amount: '101.34',
  total_currency: 'GBP',
  charges: [MOCK_CHARGE],
  payment_type: 'postpaid',
  mileage: MOCK_MILEAGE,
  supplier: MOCK_SUPPLIER,
  metadata: { custom_field: 'custom_value_123' },
  users: ['icu_0000B0nwceAOyWuOFJ23NJ'],
  car: MOCK_CAR,
  conditions: [MOCK_CONDITION],
  privacy_policies: [MOCK_PRIVACY_POLICY],
  pickup_location: MOCK_LOCATION,
  dropoff_location: MOCK_DROPOFF_LOCATION,
  pickup_date: '2026-05-27',
  pickup_time: '10:00',
  dropoff_date: '2026-06-01',
  dropoff_time: '15:00',
}

export const MOCK_CREATE_BOOKING_PAYLOAD: CarsBookingPayload = {
  quote_id: 'qut_0000Bx4Af0b5l45AT50eqO',
  driver: {
    given_name: 'Amelia',
    family_name: 'Earheart',
    email: 'amelia.earheart@duffel.com',
    phone_number: '+442080160509',
    date_of_birth: '1990-01-01',
  },
  metadata: { custom_field: 'custom_value_123' },
  users: ['icu_0000B0nwceAOyWuOFJ23NJ'],
}
