import { mockOffer } from '../Offers/mockOffer'
import {
  CreateOfferRequest,
  ItineraryOffer,
  OfferRequest,
  OfferRequestItinerariesView,
} from '../../types'

export const mockCreateOfferRequest: CreateOfferRequest = {
  slices: [
    {
      origin: 'LHR',
      destination: 'JFK',
      departure_date: '2020-04-24',
      arrival_time: null,
      departure_time: null,
    },
  ],
  passengers: [
    {
      type: 'adult',
    },
    {
      age: 14,
    },
  ],
  cabin_class: 'economy',
  max_connections: 1,
}

export const mockOfferRequest: OfferRequest = {
  slices: [
    {
      origin_type: 'airport',
      origin: {
        type: 'airport',
        time_zone: 'Europe/London',
        name: 'Heathrow',
        longitude: -141.951519,
        latitude: 64.068865,
        id: 'arp_lhr_gb',
        icao_code: 'EGLL',
        iata_country_code: 'GB',
        iata_code: 'LHR',
        iata_city_code: 'LON',
        city_name: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON',
          type: 'city',
        },
      },
      destination_type: 'airport',
      destination: {
        type: 'airport',
        time_zone: 'Europe/London',
        name: 'Heathrow',
        longitude: -141.951519,
        latitude: 64.068865,
        id: 'arp_lhr_gb',
        icao_code: 'EGLL',
        iata_country_code: 'GB',
        iata_code: 'LHR',
        iata_city_code: 'LON',
        city_name: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON',
          type: 'city',
        },
      },
      departure_date: '2020-04-24',
    },
  ],
  passengers: [
    {
      type: 'adult',
      id: 'pas_00009hj8USM7Ncg31cBCL',
      age: 14,
    },
  ],
  offers: [mockOffer],
  live_mode: false,
  id: 'orq_00009hjdomFOCJyxHG7k7k',
  created_at: '2020-02-12T15:21:01.927Z',
  cabin_class: 'economy',
}

const { available_services: _availableServices, ...mockOfferWithoutServices } =
  mockOffer

const mockSplitTicketOffer: ItineraryOffer = {
  ...mockOfferWithoutServices,
  id: 'off_00009htYpSCXrwaB9Dn456',
  type: 'split_ticket',
}

const mockSingleTicketOffer: ItineraryOffer = {
  ...mockOfferWithoutServices,
  type: 'single_ticket',
}

export const mockItinerariesOfferRequest: OfferRequestItinerariesView = {
  id: mockOfferRequest.id,
  created_at: mockOfferRequest.created_at,
  live_mode: mockOfferRequest.live_mode,
  cabin_class: mockOfferRequest.cabin_class,
  passengers: mockOfferRequest.passengers,
  slices: [
    {
      origin: mockOfferRequest.slices[0].origin,
      destination: mockOfferRequest.slices[0].destination,
      itineraries: [
        {
          segments: mockOffer.slices[0].segments,
          brands: [
            {
              fare_brand_name: 'Economy Basic',
              offers: [mockSplitTicketOffer, mockSingleTicketOffer],
            },
          ],
        },
      ],
    },
  ],
}
