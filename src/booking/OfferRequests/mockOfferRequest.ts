import { mockOffer } from '../Offers/mockOffer'
import { CreateOfferRequest, OfferRequest } from '../../types'

export const mockCreateOfferRequest: CreateOfferRequest = {
  slices: [
    {
      origin: {
        iata_code: 'LHR',
        type: 'airport',
        name: 'Heathrow Airport',
        longitude: -0.458118,
        latitude: 51.470311,
        id: 'arp_lhr_gb',
        icao_code: 'EGLL',
        iata_country_code: 'GB',
        iata_city_code: 'LON',
        time_zone: 'Europe/London',
        city_name: 'London',
      },
      destination: {
        iata_code: 'JFK',
        type: 'airport',
        time_zone: 'America/New_York',
        name: 'John F. Kennedy International Airport',
        longitude: -73.778519,
        latitude: 40.640556,
        id: 'arp_jfk_us',
        icao_code: 'KJFK',
        iata_country_code: 'US',
        iata_city_code: 'NYC',
        city_name: 'New York',
      },
      departure_date: '2020-04-24',
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
        },
        airports: [
          {
            time_zone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icao_code: 'EGLL',
            iata_country_code: 'GB',
            iata_code: 'LHR',
            city_name: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iata_country_code: 'GB',
              iata_code: 'LON',
            },
          },
        ],
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
        },
        airports: [
          {
            time_zone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icao_code: 'EGLL',
            iata_country_code: 'GB',
            iata_code: 'LHR',
            city_name: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iata_country_code: 'GB',
              iata_code: 'LON',
            },
          },
        ],
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
