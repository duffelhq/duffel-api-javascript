// eslint-disable spellcheck/spell-checker
import {
  StaysAccommodation,
  StaysAccommodationBrand,
  StaysAccommodationReviewResponse,
  StaysAccommodationSuggestion,
  StaysBooking,
  StaysLoyaltyProgramme,
  StaysQuote,
  StaysSearchResult,
} from './StaysTypes'
import { StaysBookingPayload } from './Bookings/Bookings'

export const MOCK_BRAND: StaysAccommodationBrand = {
  id: 'bra_DQPneLbCejxRuxAqD7amaW',
  name: 'The Ritz-Carlton',
}

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
  rating: 4,
  review_score: 8.8,
  rooms: [
    {
      rates: [
        {
          total_currency: 'GBP',
          total_amount: '799.00',
          tax_currency: 'GBP',
          tax_amount: '133.17',
          payment_type: 'pay_now',
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
          available_payment_methods: ['balance'],
          quantity_available: 1,
          supported_loyalty_programme: null,
          loyalty_programme_required: false,
          source: 'duffel_hotel_group',
        },
        {
          total_currency: 'GBP',
          total_amount: '899.00',
          tax_currency: 'GBP',
          tax_amount: '133.17',
          payment_type: 'pay_now',
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
          available_payment_methods: ['card'],
          quantity_available: 1,
          supported_loyalty_programme: 'duffel_hotel_group_rewards',
          loyalty_programme_required: true,
          source: 'duffel_hotel_group',
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
  key_collection: {
    instructions: 'Key is at the property. Collect from the lock box.',
  },
  brand: MOCK_BRAND,
  chain: {
    name: 'Marriott International',
  },
  supported_loyalty_programme: 'duffel_hotel_group_rewards',
}

export const MOCK_REVIEW_RESPONSE: StaysAccommodationReviewResponse = {
  reviews: [
    {
      reviewer_name: 'Alice Johnson',
      score: 5.1,
      text: 'Amazing stay! The staff was incredibly friendly and the rooms were spotless. Highly recommend!',
      created_at: '2023-03-01',
    },
    {
      reviewer_name: 'Bob Smith',
      score: 4.8,
      text: 'Great location and comfortable rooms. The gym could use some more equipment though.',
      created_at: '2023-02-15',
    },
    {
      reviewer_name: 'Catherine Lee',
      score: 3.0,
      text: 'The hotel was decent, but the Wi-Fi was unreliable and the parking was expensive.',
      created_at: '2023-01-20',
    },
    {
      reviewer_name: 'David Brown',
      score: 5.2,
      text: 'Absolutely loved it! The food was fantastic and the view from the room was breathtaking.',
      created_at: '2023-03-10',
    },
  ],
}
export const MOCK_SEARCH_RESULT: StaysSearchResult = {
  accommodation: MOCK_ACCOMMODATION,
  id: 'sta_something',
  check_in_date: '2023-03-24',
  check_out_date: '2023-03-28',
  rooms: 1,
  guests: [{ type: 'adult' }, { type: 'adult' }],
  cheapest_rate_total_amount: '799.00',
  cheapest_rate_currency: 'GBP',
  cheapest_rate_public_amount: null,
  cheapest_rate_public_currency: 'GBP',
}

export const MOCK_BOOKING: StaysBooking = {
  accommodation: MOCK_ACCOMMODATION,
  email: 'jean@example.com',
  phone_number: '+4407242242424',
  status: 'confirmed',
  // eslint-disable-next-line spellcheck/spell-checker
  reference: 'dhg-4692ARxBI85qTkbDDEZMO8',
  id: 'bok_0000ARxBI85qTkbDDEZMO3',
  confirmed_at: '2022-12-20T15:45:03.000000Z',
  check_out_date: '2023-05-24',
  check_in_date: '2023-05-20',
  cancelled_at: null,
  guests: [
    {
      given_name: 'John',
      family_name: 'Ei',
    },
  ],
  supported_loyalty_programme: null,
  loyalty_programme_account_number: null,
  rooms: 1,
  key_collection: {
    instructions: 'Key is at the property. Collect from the lock box.',
  },
  metadata: {
    checkout_reference: 'usr_0000AePJGl5G9ZYfmNllrs',
  },
}

export const MOCK_CREATE_BOOKING_PAYLOAD: StaysBookingPayload = {
  quote_id: 'quo_0000ARxBI85qTkbDDEZMO3',
  loyalty_programme_account_number: '123456789',
  guests: [
    {
      given_name: 'Jean',
      family_name: 'Gun',
    },
  ],
  email: 'jean@example.com',
  phone_number: '+44 07242242424',
  accommodation_special_requests: '',
  users: ['icu_00009htyDGjIfajdNBZRlw'],
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
  rooms: 1,
  guests: [{ type: 'adult' }, { type: 'adult' }],
}

export const MOCK_ACCOMMODATION_SUGGESTION: StaysAccommodationSuggestion = {
  accommodation_id: MOCK_ACCOMMODATION.id,
  accommodation_name: MOCK_ACCOMMODATION.name,
  accommodation_location: MOCK_ACCOMMODATION.location,
}

export const MOCK_LOYALTY_PROGRAMMES: StaysLoyaltyProgramme[] = [
  {
    reference: 'duffel_hotel_group_rewards',
    name: 'Duffel Hotel Group Rewards',
    logo_url_svg:
      'https://assets.duffel.com/img/stays/loyalty-programmes/full-color-logo/duffel_hotel_group_rewards-square.svg',
    logo_url_png_small:
      'https://assets.duffel.com/img/stays/loyalty-programmes/transparent-logo/duffel_hotel_group_rewards.png',
  },
]
