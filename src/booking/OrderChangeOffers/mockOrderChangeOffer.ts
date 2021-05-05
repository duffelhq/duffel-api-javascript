import { OrderChangeOffer } from 'types'

export const mockOrderChangeOffer: OrderChangeOffer = {
  updated_at: '2020-01-17T10:12:14.545Z',
  slices: {
    remove: [
      {
        segments: [
          {
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
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON'
              }
            },
            operating_carrier_flight_number: '4321',
            operating_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA'
            },
            marketing_carrier_flight_number: '1234',
            marketing_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA'
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
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON'
              }
            },
            departing_at: '2020-06-13T16:38:02',
            arriving_at: '2020-06-13T16:38:02',
            aircraft: {
              name: 'Airbus Industries A380',
              id: 'arc_00009UhD4ongolulWd91Ky',
              iata_code: '380'
            }
          }
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
            iata_code: 'LON'
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
                iata_code: 'LON'
              }
            }
          ]
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
            iata_code: 'LON'
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
                iata_code: 'LON'
              }
            }
          ]
        }
      }
    ],
    add: [
      {
        segments: [
          {
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
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON'
              }
            },
            operating_carrier_flight_number: '4321',
            operating_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA'
            },
            marketing_carrier_flight_number: '1234',
            marketing_carrier: {
              name: 'British Airways',
              id: 'aln_00001876aqC8c5umZmrRds',
              iata_code: 'BA'
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
              city: {
                name: 'London',
                id: 'cit_lon_gb',
                iata_country_code: 'GB',
                iata_code: 'LON'
              }
            },
            departing_at: '2020-06-13T16:38:02',
            arriving_at: '2020-06-13T16:38:02',
            aircraft: {
              name: 'Airbus Industries A380',
              id: 'arc_00009UhD4ongolulWd91Ky',
              iata_code: '380'
            }
          }
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
            iata_code: 'LON'
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
                iata_code: 'LON'
              }
            }
          ]
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
            iata_code: 'LON'
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
                iata_code: 'LON'
              }
            }
          ]
        }
      }
    ]
  },
  refund_to: 'arc_bsp_cash',
  penalty_currency: 'GBP',
  penalty_amount: '10.50',
  order_change_id: 'oce_0000A4QasEUIjJ6jHKfhHU',
  new_total_currency: 'GBP',
  new_total_amount: '35.50',
  id: 'oco_0000A3vUda8dKRtUSQPSXw',
  expires_at: '2020-01-17T10:42:14.545Z',
  created_at: '2020-01-17T10:12:14.545Z',
  change_total_currency: 'GBP',
  change_total_amount: '30.20'
}
