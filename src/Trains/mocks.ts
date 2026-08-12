import {
  ListTrainBookingsParams,
  TrainAvailableSeatReservation,
  TrainBooking,
  TrainBookingCancellation,
  TrainBookingDeliveryMethod,
  TrainBookingPassenger,
  TrainCreateBookingPassenger,
  TrainCreateBookingPayload,
  TrainCreateQuotePayload,
  TrainFare,
  TrainJourney,
  TrainLeg,
  TrainNextJourneyPayload,
  TrainOffer,
  TrainPassenger,
  TrainPassengerCard,
  TrainPassengerCardType,
  TrainQuote,
  TrainRoute,
  TrainSearch,
  TrainSearchJourney,
  TrainSearchParams,
  TrainSeatReservation,
  TrainStation,
  TrainStationSuggestion,
  TrainTicket,
} from './TrainsTypes'

export const MOCK_ORIGIN_STATION: TrainStation = {
  id: 'sta_0000B4oNL9mELrqrQ1cEeu',
  name: 'Duffel Express Central Station',
  country_code: 'ZZ',
}

export const MOCK_DESTINATION_STATION: TrainStation = {
  id: 'sta_0000B4oNL9tfuBo3n76BGK',
  name: 'Duffel Express South Station',
  country_code: 'ZZ',
}

export const MOCK_STATION_SUGGESTION: TrainStationSuggestion = {
  ...MOCK_ORIGIN_STATION,
  latitude: 0,
  longitude: 0,
  timezone: 'Etc/UTC',
  type: 'station',
}

export const MOCK_SEARCH_PARAMS: TrainSearchParams = {
  type: 'single',
  journeys: [
    {
      origin_id: MOCK_ORIGIN_STATION.id,
      destination_id: MOCK_DESTINATION_STATION.id,
      time_mode: 'departs_after',
      date: '2026-05-20',
      time: '10:00',
    },
  ],
  passengers: [{ age: 30 }],
}

export const MOCK_LEG: TrainLeg = {
  id: 'leg_0000B4g6wn4RqJ6n6Qp25w',
  origin: { name: MOCK_ORIGIN_STATION.name },
  destination: { name: MOCK_DESTINATION_STATION.name },
  departure_datetime: '2026-05-20T10:15:00',
  arrival_datetime: '2026-05-20T11:30:00',
  mode: 'train',
  carrier: { name: 'Duffel Express Rail' },
}

export const MOCK_FARE: TrainFare = {
  id: 'far_0000B4g6yw07bxfrNWoxJg',
  passenger_ids: ['pan_0000AwrHw8KES5d3z1l0uu'],
  passenger_card_ids: [],
  legs: [
    {
      leg_id: MOCK_LEG.id,
      travel_class: { type: 'standard', name: 'Standard' },
    },
  ],
  name: 'Standard Single Fare',
  description: 'Valid for travel any time of day.',
  rules: [
    {
      title: 'Fare Conditions',
      text: 'Ticket valid for any eligible train on the selected route.',
    },
  ],
  restrictions: null,
  total_amount: '101.00',
  total_currency: 'USD',
  group_save_applied: false,
}

export const MOCK_OFFER: TrainOffer = {
  id: 'ofr_0000B4g6xePXWcTIXC67pQ',
  total_amount: '101.00',
  total_currency: 'USD',
  travel_class: { type: 'standard', name: 'Standard' },
  fares: [MOCK_FARE],
}

export const MOCK_ROUTE: TrainRoute = {
  id: 'rou_0000B4g6yw07bxfrNWoxJg',
  legs: [MOCK_LEG],
  offers: [MOCK_OFFER],
  is_overtaken: false,
}

export const MOCK_SEARCH_JOURNEY: TrainSearchJourney = {
  id: 'jor_0000AwrHw8KES5d3z1l0uu',
  origin: MOCK_ORIGIN_STATION,
  destination: MOCK_DESTINATION_STATION,
  time_mode: 'departs_after',
  date: '2026-05-20',
  time: '10:00',
  routes: [MOCK_ROUTE],
}

export const MOCK_PASSENGER: TrainPassenger = {
  id: 'pan_0000AwrHw8KES5d3z1l0uu',
  age: 30,
  card_ids: [],
}

export const MOCK_PASSENGER_CARD_TYPE: TrainPassengerCardType = {
  id: 'pct_0000B4qfQjzEa4v4GxIjqK',
  name: 'Duffel Express Discount Card',
  supplier: 'duffel_express',
}

export const MOCK_PASSENGER_CARD: TrainPassengerCard = {
  id: 'pag_0000AwrHw8KES5d3z1l0uu',
  type: MOCK_PASSENGER_CARD_TYPE,
}

export const MOCK_SEARCH: TrainSearch = {
  id: 'tsc_0000AwrHw8KES5d3z1l0uu',
  live_mode: false,
  type: 'single',
  passengers: [MOCK_PASSENGER],
  passenger_cards: [],
  journeys: [MOCK_SEARCH_JOURNEY],
}

export const MOCK_NEXT_JOURNEY_PAYLOAD: TrainNextJourneyPayload = {
  journeys: [
    {
      journey_id: MOCK_SEARCH_JOURNEY.id,
      selected_offer_id: MOCK_OFFER.id,
    },
  ],
}

export const MOCK_QUOTE_JOURNEY: TrainJourney = {
  id: MOCK_SEARCH_JOURNEY.id,
  origin: MOCK_ORIGIN_STATION,
  destination: MOCK_DESTINATION_STATION,
  legs: [MOCK_LEG],
}

export const MOCK_AVAILABLE_SEAT_RESERVATION: TrainAvailableSeatReservation = {
  id: 'asr_0000B4g6xePXWcTIXC67pQ',
  type: 'optional',
  leg_ids: [MOCK_LEG.id],
  passenger_ids: [MOCK_PASSENGER.id],
  preferences: {
    positions: [{ id: 'spo_0000B4g6xePXWcTIXC67pQ', name: 'Window' }],
    directions: null,
    facilities: null,
    seat_types: null,
    carriage_types: null,
  },
}

export const MOCK_CREATE_QUOTE_PAYLOAD: TrainCreateQuotePayload = {
  search_id: MOCK_SEARCH.id,
  journeys: [{ id: MOCK_SEARCH_JOURNEY.id, offer_id: MOCK_OFFER.id }],
}

export const MOCK_QUOTE: TrainQuote = {
  id: 'que_0000B4g6yw07bxfrNWoxJg',
  live_mode: false,
  journeys: [MOCK_QUOTE_JOURNEY],
  passengers: [MOCK_PASSENGER],
  passenger_cards: [],
  fares: [MOCK_FARE],
  supplier_conditions_url: 'https://duffel.com/terms/rail-booking-conditions',
  total_amount: '101.00',
  total_currency: 'USD',
  available_payment_methods: [
    { type: 'card', surcharge_amount: null, surcharge_currency: null },
  ],
  available_delivery_methods: [
    {
      type: 'eticket',
      fee_amount: null,
      fee_currency: null,
      required_data: ['email'],
      collection_at_outbound_station: false,
    },
  ],
  required_passenger_identity_documents: [],
  available_seat_reservations: [MOCK_AVAILABLE_SEAT_RESERVATION],
}

export const MOCK_BOOKING_CREATE_PASSENGER: TrainCreateBookingPassenger = {
  id: MOCK_PASSENGER.id,
  title: 'mr',
  gender: 'male',
  given_name: 'John',
  family_name: 'Smith',
  born_on: '1990-01-01',
  email: 'john.smith@example.com',
}

export const MOCK_CREATE_BOOKING_PAYLOAD: TrainCreateBookingPayload = {
  quote_id: MOCK_QUOTE.id,
  passengers: [MOCK_BOOKING_CREATE_PASSENGER],
  delivery_method: {
    type: 'eticket',
    recipient_email: 'john.smith@example.com',
  },
}

export const MOCK_BOOKING_PASSENGER: TrainBookingPassenger = {
  id: MOCK_PASSENGER.id,
  title: 'mr',
  gender: 'male',
  given_name: 'John',
  family_name: 'Smith',
  born_on: '1990-01-01',
  email: 'john.smith@example.com',
  phone_number: null,
  user_id: null,
}

export const MOCK_TICKET: TrainTicket = {
  id: 'tik_0000B4g6yw07bxfrNWoxJg',
  passenger_ids: [MOCK_PASSENGER.id],
  fare_ids: [MOCK_FARE.id],
  assets: [
    {
      format: 'pdf',
      value:
        'https://assets.duffel.com/trains/tickets/tik_0000B4g6yw07bxfrNWoxJg.pdf',
    },
  ],
}

export const MOCK_SEAT_RESERVATION: TrainSeatReservation = {
  id: 'srn_0000B4g6yw07bxfrNWoxJg',
  passenger_id: MOCK_PASSENGER.id,
  leg_id: MOCK_LEG.id,
  carriage: 'A',
  number: '12',
}

export const MOCK_BOOKING_DELIVERY_METHOD: TrainBookingDeliveryMethod = {
  type: 'eticket',
  recipient_email: 'john.smith@example.com',
}

export const MOCK_BOOKING: TrainBooking = {
  id: 'boi_0000B4g6yw07bxfrNWoxJg',
  created_at: '2024-01-15T10:30:00Z',
  paid_at: '2024-01-15T10:30:05Z',
  cancelled_at: null,
  status: 'ticketed',
  supplier_conditions_url: 'https://duffel.com/terms/rail-booking-conditions',
  total_amount: '101.00',
  total_currency: 'USD',
  tickets: [MOCK_TICKET],
  fares: [MOCK_FARE],
  journeys: [MOCK_QUOTE_JOURNEY],
  passengers: [MOCK_BOOKING_PASSENGER],
  seat_reservations: [MOCK_SEAT_RESERVATION],
  delivery_method: MOCK_BOOKING_DELIVERY_METHOD,
  metadata: { internal_ref: 'abc123' },
  users: [],
}

export const MOCK_LIST_BOOKINGS_PARAMS: ListTrainBookingsParams = {
  limit: 50,
}

export const MOCK_BOOKING_CANCELLATION: TrainBookingCancellation = {
  id: 'bcn_0000B4g6yw07bxfrNWoxJg',
  booking_id: MOCK_BOOKING.id,
  confirmed_at: null,
  expires_at: '2024-01-15T11:00:00Z',
  created_at: '2024-01-15T10:45:00Z',
  updated_at: '2024-01-15T10:45:00Z',
  refunds: [
    {
      amount: '101.00',
      currency: 'USD',
      refund_to: 'card',
      processed_at: null,
    },
  ],
}
