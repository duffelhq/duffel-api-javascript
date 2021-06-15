import { CreateOrder, Order } from '../../types'

export const mockCreateOrderRequest: CreateOrder = {
  type: 'instant',
  services: [
    {
      quantity: 1,
      id: 'ase_00009hj8USM7Ncg31cB123'
    }
  ],
  selected_offers: ['off_00009htyDGjIfajdNBZRlw'],
  payments: [
    {
      type: 'balance',
      currency: 'GBP',
      amount: '30.20'
    }
  ],
  passengers: [
    {
      type: 'adult',
      title: 'mrs',
      phone_number: '+442080160509',
      infant_passenger_id: 'pas_00009hj8USM8Ncg32aTGHL',
      identity_documents: [
        {
          unique_identifier: '19KL56147',
          type: 'passport',
          issuing_country_code: 'GB',
          expires_on: '2025-04-25'
        }
      ],
      id: 'pas_00009hj8USM7Ncg31cBCLL',
      given_name: 'Amelia',
      gender: 'f',
      family_name: 'Earhart',
      email: 'amelia@duffel.com',
      born_on: '1987-07-24'
    }
  ]
}

export const mockOrder: Order = {
  total_currency: 'GBP',
  total_amount: '90.80',
  tax_currency: 'GBP',
  tax_amount: '30.20',
  slices: [
    {
      segments: [
        {
          passengers: [
            {
              seat: {
                name: 'Exit row seat',
                disclosures: [
                  'Do not seat children in exit row seats',
                  'Do not seat passengers with special needs in exit row seats'
                ],
                designator: '14B'
              },
              passenger_id: 'passenger_0',
              cabin_class_marketing_name: 'Economy Basic',
              cabin_class: 'economy',
              baggages: [
                {
                  type: 'checked',
                  quantity: 1
                }
              ]
            }
          ],
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
        city_name: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON'
        }
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
        city_name: 'London',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON'
        }
      },
      conditions: {
        change_before_departure: {
          penalty_currency: 'GBP',
          penalty_amount: '100.00',
          allowed: true
        }
      },
      changeable: false
    }
  ],
  services: [
    {
      type: 'baggage',
      total_currency: 'GBP',
      total_amount: '15.00',
      segment_ids: ['seg_00009hj8USM7Ncg31cB456'],
      quantity: 1,
      passenger_ids: ['pas_00009hj8USM7Ncg31cBCLL'],
      id: 'ser_00009UhD4ongolulWd9123'
    }
  ],
  payment_status: {
    price_guarantee_expires_at: '2020-01-17T10:42:14.545Z',
    payment_required_by: '2020-01-17T10:42:14.545Z',
    awaiting_payment: true
  },
  passengers: [
    {
      type: 'adult',
      title: 'mrs',
      infant_passenger_id: 'pas_00009hj8USM8Ncg32aTGHL',
      id: 'pas_00009hj8USM7Ncg31cBCLL',
      given_name: 'Amelia',
      gender: 'f',
      family_name: 'Earhart',
      born_on: '1987-07-24'
    }
  ],
  owner: {
    name: 'British Airways',
    id: 'aln_00001876aqC8c5umZmrRds',
    iata_code: 'BA'
  },
  metadata: {
    customer_prefs: 'window seat'
  },
  live_mode: false,
  id: 'ord_00009hthhsUZ8W4LxQgkjo',
  documents: [
    {
      unique_identifier: '1252106312810',
      type: 'electronic_ticket'
    }
  ],
  created_at: '2020-04-11T15:48:11.642Z',
  conditions: {
    refund_before_departure: {
      penalty_currency: 'GBP',
      penalty_amount: '100.00',
      allowed: true
    },
    change_before_departure: {
      penalty_currency: 'GBP',
      penalty_amount: '100.00',
      allowed: true
    }
  },
  cancelled_at: '2020-04-11T15:48:11.642Z',
  booking_reference: 'RZPNX8',
  base_currency: 'GBP',
  base_amount: '30.20'
}

export const mockOnHoldOrders: Order[] = [
  {
    total_currency: 'GBP',
    total_amount: '87.90',
    tax_currency: 'GBP',
    tax_amount: '15.90',
    slices: [
      {
        segments: [
          {
            passengers: [
              {
                passenger_id: 'pas_0000A6GinR7kevnCVS69dy',
                cabin_class_marketing_name: 'Economy',
                cabin_class: 'economy',
                baggages: [
                  { type: 'checked', quantity: 0 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'checked', quantity: 0 }
                ]
              }
            ],
            origin_terminal: null,
            origin: {
              type: 'airport',
              time_zone: 'America/Indiana/Indianapolis',
              name: 'Indianapolis International Airport',
              longitude: -86.295526,
              latitude: 39.716605,
              id: 'arp_ind_us',
              icao_code: 'KIND',
              iata_country_code: 'US',
              iata_code: 'IND',
              city_name: 'Indianapolis',
              city: null
            },
            operating_carrier_flight_number: '4721',
            operating_carrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iata_code: 'AA'
            },
            marketing_carrier_flight_number: '4721',
            marketing_carrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iata_code: 'AA'
            },
            id: 'seg_0000A6GioOO1UDbjb7nIi9',
            duration: 'PT2H45M',
            distance: null,
            destination_terminal: null,
            destination: {
              type: 'airport',
              time_zone: 'America/New_York',
              name: 'Miami International Airport',
              longitude: -80.288826,
              latitude: 25.794534,
              id: 'arp_mia_us',
              icao_code: 'KMIA',
              iata_country_code: 'US',
              iata_code: 'MIA',
              city_name: 'Miami',
              city: {
                type: 'city',
                name: 'Miami',
                id: 'cit_mia_us',
                iata_country_code: 'US',
                iata_code: 'MIA'
              }
            },
            departing_at: '2021-08-07T17:53:00',
            arriving_at: '2021-08-07T20:38:00',
            aircraft: {
              name: 'Embraer 175',
              id: 'arc_00009VMF8AiFPp0xSPcfNz',
              iata_code: 'E75'
            }
          }
        ],
        origin_type: 'airport',
        origin: {
          type: 'airport',
          time_zone: 'America/Indiana/Indianapolis',
          name: 'Indianapolis International Airport',
          longitude: -86.295526,
          latitude: 39.716605,
          id: 'arp_ind_us',
          icao_code: 'KIND',
          iata_country_code: 'US',
          iata_code: 'IND',
          city_name: 'Indianapolis',
          city: null
        },
        id: 'sli_0000A6GioOQrJfsNjv7Z8C',
        duration: 'PT2H45M',
        destination_type: 'airport',
        destination: {
          type: 'airport',
          time_zone: 'America/New_York',
          name: 'Miami International Airport',
          longitude: -80.288826,
          latitude: 25.794534,
          id: 'arp_mia_us',
          icao_code: 'KMIA',
          iata_country_code: 'US',
          iata_code: 'MIA',
          city_name: 'Miami',
          city: {
            type: 'city',
            name: 'Miami',
            id: 'cit_mia_us',
            iata_country_code: 'US',
            iata_code: 'MIA'
          }
        },
        conditions: { change_before_departure: null },
        changeable: null
      }
    ],
    services: [],
    payment_status: {
      price_guarantee_expires_at: '2021-04-16T23:59:00Z',
      payment_required_by: '2021-04-16T23:59:00Z',
      awaiting_payment: true
    },
    passengers: [
      {
        type: 'adult',
        title: 'mr',
        infant_passenger_id: null,
        id: 'pas_0000A6GinR7kevnCVS69dy',
        given_name: 'JOHN',
        gender: 'm',
        family_name: 'SMITH',
        born_on: '1995-05-05'
      }
    ],
    owner: {
      name: 'American Airlines',
      id: 'arl_00009VME7DAGiJjwomhv32',
      iata_code: 'AA'
    },
    metadata: {
      customer_prefs: 'window seat'
    },
    live_mode: false,
    id: 'ord_0000A6GioOO1UDbjb7nIi8',
    documents: [],
    created_at: '2021-04-15T11:12:53.465121Z',
    conditions: {
      refund_before_departure: null,
      change_before_departure: null
    },
    cancelled_at: null,
    booking_reference: 'ZVNHEX',
    base_currency: 'GBP',
    base_amount: '72.00'
  },
  {
    total_currency: 'GBP',
    total_amount: '110.50',
    tax_currency: 'GBP',
    tax_amount: '17.50',
    slices: [
      {
        segments: [
          {
            passengers: [
              {
                passenger_id: 'pas_0000A6GiSkqfID7qtKsE2U',
                cabin_class_marketing_name: 'Economy',
                cabin_class: 'economy',
                baggages: [
                  { type: 'checked', quantity: 0 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'checked', quantity: 0 }
                ]
              }
            ],
            origin_terminal: null,
            origin: {
              type: 'airport',
              time_zone: 'America/Indiana/Indianapolis',
              name: 'Indianapolis International Airport',
              longitude: -86.295526,
              latitude: 39.716605,
              id: 'arp_ind_us',
              icao_code: 'KIND',
              iata_country_code: 'US',
              iata_code: 'IND',
              city_name: 'Indianapolis',
              city: null
            },
            operating_carrier_flight_number: '4341',
            operating_carrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iata_code: 'AA'
            },
            marketing_carrier_flight_number: '4341',
            marketing_carrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iata_code: 'AA'
            },
            id: 'seg_0000A6GiZRU4WXtdZJrivU',
            duration: 'PT2H49M',
            distance: null,
            destination_terminal: null,
            destination: {
              type: 'airport',
              time_zone: 'America/New_York',
              name: 'Miami International Airport',
              longitude: -80.288826,
              latitude: 25.794534,
              id: 'arp_mia_us',
              icao_code: 'KMIA',
              iata_country_code: 'US',
              iata_code: 'MIA',
              city_name: 'Miami',
              city: {
                type: 'city',
                name: 'Miami',
                id: 'cit_mia_us',
                iata_country_code: 'US',
                iata_code: 'MIA'
              }
            },
            departing_at: '2021-08-07T11:55:00',
            arriving_at: '2021-08-07T14:44:00',
            aircraft: {
              name: 'Embraer RJ145',
              id: 'arc_00009VMF8AiFPp0xSPcfO7',
              iata_code: 'ER4'
            }
          }
        ],
        origin_type: 'airport',
        origin: {
          type: 'airport',
          time_zone: 'America/Indiana/Indianapolis',
          name: 'Indianapolis International Airport',
          longitude: -86.295526,
          latitude: 39.716605,
          id: 'arp_ind_us',
          icao_code: 'KIND',
          iata_country_code: 'US',
          iata_code: 'IND',
          city_name: 'Indianapolis',
          city: null
        },
        id: 'sli_0000A6GiZRWYNJshh11hnE',
        duration: 'PT2H49M',
        destination_type: 'airport',
        destination: {
          type: 'airport',
          time_zone: 'America/New_York',
          name: 'Miami International Airport',
          longitude: -80.288826,
          latitude: 25.794534,
          id: 'arp_mia_us',
          icao_code: 'KMIA',
          iata_country_code: 'US',
          iata_code: 'MIA',
          city_name: 'Miami',
          city: {
            type: 'city',
            name: 'Miami',
            id: 'cit_mia_us',
            iata_country_code: 'US',
            iata_code: 'MIA'
          }
        },
        conditions: { change_before_departure: null },
        changeable: null
      }
    ],
    services: [],
    payment_status: {
      price_guarantee_expires_at: '2021-04-16T23:59:00Z',
      payment_required_by: '2021-04-16T23:59:00Z',
      awaiting_payment: true
    },
    passengers: [
      {
        type: 'adult',
        title: 'mr',
        infant_passenger_id: null,
        id: 'pas_0000A6GiSkqfID7qtKsE2U',
        given_name: 'JOHN',
        gender: 'm',
        family_name: 'SMITH',
        born_on: '1995-05-05'
      }
    ],
    owner: {
      name: 'American Airlines',
      id: 'arl_00009VME7DAGiJjwomhv32',
      iata_code: 'AA'
    },
    metadata: {
      customer_prefs: 'window seat'
    },
    live_mode: false,
    id: 'ord_0000A6GiZRU4WXtdZJrivT',
    documents: [],
    created_at: '2021-04-15T11:10:11.352074Z',
    conditions: {
      refund_before_departure: null,
      change_before_departure: null
    },
    cancelled_at: null,
    booking_reference: 'RTEMPK',
    base_currency: 'GBP',
    base_amount: '93.00'
  }
]
