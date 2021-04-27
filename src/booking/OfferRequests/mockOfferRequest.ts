import { mockOffer } from '../Offers/mockOffer'
import { Offers } from './OfferRequestsTypes'

export const mockCreateOfferRequest: Offers.CreateOfferRequest = {
  slices: [
    {
      origin: 'LHR',
      destination: 'JFK',
      departureDate: '2020-04-24'
    }
  ],
  passengers: [
    {
      type: 'adult'
    },
    {
      age: 14
    }
  ],
  cabinClass: 'economy'
}

export const mockOfferRequest: Offers.OfferRequest = {
  slices: [
    {
      originType: 'airport',
      origin: {
        type: 'airport',
        timeZone: 'Europe/London',
        name: 'Heathrow',
        longitude: -141.951519,
        latitude: 64.068865,
        id: 'arp_lhr_gb',
        icaoCode: 'EGLL',
        iataCountryCode: 'GB',
        iataCode: 'LHR',
        iataCityCode: 'LON',
        cityName: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iataCountryCode: 'GB',
          iataCode: 'LON'
        },
        airports: [
          {
            timeZone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icaoCode: 'EGLL',
            iataCountryCode: 'GB',
            iataCode: 'LHR',
            cityName: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iataCountryCode: 'GB',
              iataCode: 'LON'
            }
          }
        ]
      },
      destinationType: 'airport',
      destination: {
        type: 'airport',
        timeZone: 'Europe/London',
        name: 'Heathrow',
        longitude: -141.951519,
        latitude: 64.068865,
        id: 'arp_lhr_gb',
        icaoCode: 'EGLL',
        iataCountryCode: 'GB',
        iataCode: 'LHR',
        iataCityCode: 'LON',
        cityName: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iataCountryCode: 'GB',
          iataCode: 'LON'
        },
        airports: [
          {
            timeZone: 'Europe/London',
            name: 'Heathrow',
            longitude: -141.951519,
            latitude: 64.068865,
            id: 'arp_lhr_gb',
            icaoCode: 'EGLL',
            iataCountryCode: 'GB',
            iataCode: 'LHR',
            cityName: 'London',
            city: {
              name: 'London',
              id: 'cit_lon_gb',
              iataCountryCode: 'GB',
              iataCode: 'LON'
            }
          }
        ]
      },
      departureDate: '2020-04-24'
    }
  ],
  passengers: [
    {
      type: 'adult',
      id: 'pas_00009hj8USM7Ncg31cBCL',
      age: 14
    }
  ],
  offers: [mockOffer],
  liveMode: false,
  id: 'orq_00009hjdomFOCJyxHG7k7k',
  createdAt: '2020-02-12T15:21:01.927Z',
  cabinClass: 'economy'
}
