// eslint-disable spellcheck/spell-checker
import {
  StaysAccommodation,
  StaysBooking,
  StaysQuote,
  StaysSearchResult,
} from './StaysTypes'
import { StaysBookingPayload } from './Bookings/Bookings'

export const MOCK_ACCOMMODATION: StaysAccommodation = {
  id: 'acc_0000AWr2VsUNIF1Vl91xg0',
  amenities: [
    { type: 'parking', description: 'Parking' },
    { type: 'wifi', description: 'Wi-Fi available' },
    { type: 'gym', description: '24h Gym' },
  ],
  description:
    'On the Freedom Trail and a short walk from Boston Common, this luxury historic hotel features a full-service restaurant, a 24-hour business center, and WiFi. Thirteen historic sites from the Freedom Trail are in close proximity.',
  ratings: [
    {
      value: 4,
      source: 'aaa',
    },
  ],
  rooms: [
    {
      rates: [
        {
          total_currency: 'GBP',
          total_amount: '799.00',
          tax_currency: 'GBP',
          tax_amount: '133.17',
          supplier: 'priceline',
          payment_type: 'prepaid',
          id: 'rat_0000ASuebQfixzpI2v20qe',
          due_at_accommodation_currency: 'USD',
          due_at_accommodation_amount: '39.95',
          conditions: [
            {
              title: 'Parking',
              description: 'Public parking is available nearby for £15 per day',
            },
          ],
          base_currency: 'GBP',
          base_amount: '625.83',
          fee_currency: 'GBP',
          fee_amount: '40.00',
          cancellation_timeline: [],
          board_type: 'room_only',
          payment_method: 'balance',
          quantity_available: 1,
          supported_loyalty_programme: null,
        },
        {
          total_currency: 'GBP',
          total_amount: '899.00',
          tax_currency: 'GBP',
          tax_amount: '133.17',
          supplier: 'priceline',
          payment_type: 'prepaid',
          id: 'rat_0000ASuebQfixzpI2v20bx',
          due_at_accommodation_currency: 'GBP',
          due_at_accommodation_amount: '39.95',
          conditions: [
            {
              title: 'Parking',
              description: 'Public parking is available nearby for £15 per day',
            },
            {
              title: 'Refundable',
              description: 'This rate is fully refundable.',
            },
          ],
          base_currency: 'GBP',
          base_amount: '765.83',
          fee_currency: 'GBP',
          fee_amount: '40.00',
          cancellation_timeline: [],
          board_type: 'room_only',
          payment_method: 'card',
          quantity_available: 1,
          supported_loyalty_programme: 'duffel_hotel_group_rewards',
        },
      ],
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
        },
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
        },
      ],
      name: 'Double Suite',
      beds: [
        {
          type: 'double',
          count: 2,
        },
        {
          type: 'single',
          count: 1,
        },
      ],
    },
  ],
  photos: [
    {
      url: 'https://images.unsplash.com/photo-1584218896971-bf6d300b35ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1641063719037-6e3d561de978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1592839494881-40d0e657099b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80',
    },
  ],
  phone_number: '+44 20 7493 8181',
  name: 'The Ritz London',
  location: {
    geographic_coordinates: {
      longitude: -0.1416,
      latitude: 51.5071,
    },
    address: {
      region: 'England',
      postal_code: 'W1J 9BR',
      line_one: '150 Piccadilly',
      country_code: 'GB',
      city_name: 'London',
    },
  },
  email: 'reservations@theritzlondon.com',
  check_in_information: {
    check_out_before_time: '11:30',
    check_in_after_time: '14:30',
  },
  cheapest_rate_total_amount: '799.00',
  cheapest_rate_currency: 'GBP',
  chain: {
    name: 'The Ritz-Carlton',
  },
}

export const MOCK_SEARCH_RESULT: StaysSearchResult = {
  accommodation: MOCK_ACCOMMODATION,
  id: 'sta_something',
  check_in_date: '2023-03-24',
  check_out_date: '2023-03-28',
}

export const MOCK_BOOKING: StaysBooking = {
  accommodation: MOCK_ACCOMMODATION,
  status: 'confirmed',
  reference: 'dhg-4692ARxBI85qTkbDDEZMO8',
  id: 'bok_0000ARxBI85qTkbDDEZMO3',
  confirmed_at: '2022-12-20T15:45:03.000000Z',
  check_out_date: '2023-05-24',
  check_in_date: '2023-05-20',
  cancelled_at: null,
  guests: [
    {
      given_name: 'Raiden',
      family_name: 'Ei',
    },
  ],
  supported_loyalty_programme: null,
  loyalty_programme_account_number: null,
  rooms: 1,
}

export const MOCK_CREATE_BOOKING_PAYLOAD: StaysBookingPayload = {
  quote_id: 'quo_0000ARxBI85qTkbDDEZMO3',
  loyalty_programme_account_number: '123456789',
  guests: [
    {
      given_name: 'Jean',
      family_name: 'Gunnhildr',
    },
  ],
  email: 'jean@example.com',
  phone_number: '+44 07242242424',
  accommodation_special_requests: '',
}

export const MOCK_QUOTE: StaysQuote = {
  id: 'quo_123456789',
  check_in_date: '2023-06-01',
  check_out_date: '2023-06-10',
  accommodation: MOCK_ACCOMMODATION,
  total_amount: '1500',
  total_currency: 'USD',
  base_amount: null,
  base_currency: 'USD',
  fee_amount: null,
  fee_currency: 'USD',
  tax_amount: null,
  tax_currency: 'USD',
  due_at_accommodation_amount: null,
  due_at_accommodation_currency: 'USD',
  supported_loyalty_programme: 'duffel_hotel_group_rewards',
}
