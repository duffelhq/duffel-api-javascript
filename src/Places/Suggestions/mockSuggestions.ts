import { Places } from '../../types'

export const mockPlacesSuggestionsResponse: Places = {
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
  country_name: 'United Kingdom',
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
}
