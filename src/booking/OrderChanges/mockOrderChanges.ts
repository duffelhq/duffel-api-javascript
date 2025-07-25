import { OrderChange } from '../../types'

export const mockOrderChange: OrderChange = {
  slices: {
    remove: [
      {
        segments: [
          {
            passengers: [],
            origin_terminal: 'B',
            origin: {
              time_zone: 'Europe/London',
              name: 'Heathrow',
              longitude: -141.951519,
              latitude: 64.068865,
              id: 'arp_lhr_gb',
              icao_code: 'EGLL',
              iata_country_code: 'GB',
              iata_code: 'LHR',
              city_name: 'London',
              iata_city_code: 'LON',
              type: 'airport',
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON',
                type: 'city',
              },
            },
            operating_carrier_flight_number: '4321',
            operating_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA',
              logo_symbol_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
              logo_lockup_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
              conditions_of_carriage_url:
                'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
            },
            marketing_carrier_flight_number: '1234',
            marketing_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA',
              logo_symbol_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
              logo_lockup_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
              conditions_of_carriage_url:
                'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
            },
            id: 'seg_00009htYpSCXrwaB9Dn456',
            duration: 'PT02H26M',
            distance: '424.2',
            destination_terminal: '5',
            destination: {
              time_zone: 'Europe/London',
              name: 'Heathrow',
              longitude: -141.951519,
              latitude: 64.068865,
              id: 'arp_lhr_gb',
              icao_code: 'EGLL',
              iata_country_code: 'GB',
              iata_code: 'LHR',
              city_name: 'London',
              iata_city_code: 'LON',
              type: 'airport',
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON',
                type: 'city',
              },
            },
            departing_at: '2020-06-13T16:38:02',
            arriving_at: '2020-06-13T16:38:02',
            aircraft: {
              name: 'Airbus Industries A380',
              id: 'arc_00009UhD4ongolulWd91Ky',
              iata_code: '380',
            },
          },
        ],
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
        id: 'sli_00009htYpSCXrwaB9Dn123',
        duration: 'PT02H26M',
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
      },
    ],
    add: [
      {
        segments: [
          {
            passengers: [],
            origin_terminal: 'B',
            origin: {
              time_zone: 'Europe/London',
              name: 'Heathrow',
              longitude: -141.951519,
              latitude: 64.068865,
              id: 'arp_lhr_gb',
              icao_code: 'EGLL',
              iata_country_code: 'GB',
              iata_code: 'LHR',
              city_name: 'London',
              iata_city_code: 'LON',
              type: 'airport',
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON',
                type: 'city',
              },
            },
            operating_carrier_flight_number: '4321',
            operating_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA',
              logo_symbol_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
              logo_lockup_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
              conditions_of_carriage_url:
                'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
            },
            marketing_carrier_flight_number: '1234',
            marketing_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA',
              logo_symbol_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BA.svg',
              logo_lockup_url:
                'https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/BA.svg',
              conditions_of_carriage_url:
                'https://www.britishairways.com/en-gb/information/legal/british-airways/general-conditions-of-carriage',
            },
            id: 'seg_00009htYpSCXrwaB9Dn456',
            duration: 'PT02H26M',
            distance: '424.2',
            destination_terminal: '5',
            destination: {
              time_zone: 'Europe/London',
              name: 'Heathrow',
              longitude: -141.951519,
              latitude: 64.068865,
              id: 'arp_lhr_gb',
              icao_code: 'EGLL',
              iata_country_code: 'GB',
              iata_code: 'LHR',
              city_name: 'London',
              iata_city_code: 'LON',
              type: 'airport',
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON',
                type: 'city',
              },
            },
            departing_at: '2020-06-13T16:38:02',
            arriving_at: '2020-06-13T16:38:02',
            aircraft: {
              name: 'Airbus Industries A380',
              id: 'arc_00009UhD4ongolulWd91Ky',
              iata_code: '380',
            },
          },
        ],
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
        id: 'sli_00009htYpSCXrwaB9Dn123',
        duration: 'PT02H26M',
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
      },
    ],
  },
  refund_to: 'original_form_of_payment',
  penalty_total_currency: 'GBP',
  penalty_total_amount: '15.50',
  order_id: 'ord_0000A3tQcCRZ9R8OY0QlxA',
  new_total_currency: 'GBP',
  new_total_amount: '60.10',
  live_mode: false,
  id: 'ocr_0000A3tQSmKyqOrcySrGbo',
  expires_at: '2020-01-17T10:42:14.545052Z',
  created_at: '2020-04-11T15:48:11.642Z',
  confirmed_at: '2020-01-17T11:51:43.114803Z',
  change_total_currency: 'GBP',
  change_total_amount: '90.80',
}
