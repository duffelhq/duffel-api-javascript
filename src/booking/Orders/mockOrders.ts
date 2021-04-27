import { Order, CreateOrder, OrderCancellationResponse } from './OrdersTypes'

export const mockCreateOrderRequest: CreateOrder = {
  type: 'instant',
  services: [{ quantity: 1, id: 'ase_00009hj8USM7Ncg31cB123' }],
  selectedOffers: ['off_00009htyDGjIfajdNBZRlw'],
  payments: [{ type: 'balance', currency: 'GBP', amount: '30.20' }],
  passengers: [
    {
      type: 'adult',
      title: 'mrs',
      infantPassengerId: 'pas_00009hj8USM8Ncg32aTGHL',
      identityDocuments: [
        { uniqueIdentifier: '19KL56147', type: 'passport', issuingCountryCode: 'GB', expiresOn: '2025-04-25' }
      ],
      id: 'pas_00009hj8USM7Ncg31cBCLL',
      givenName: 'Amelia',
      gender: 'f',
      familyName: 'Earhart',
      email: 'amelia@duffel.com',
      bornOn: '1987-07-24'
    }
  ]
}

export const mockOrder: Order = {
  totalCurrency: 'GBP',
  totalAmount: '90.80',
  taxCurrency: 'GBP',
  taxAmount: '30.20',
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
              passengerId: 'passenger_0',
              cabinClassMarketingName: 'Economy Basic',
              cabinClass: 'economy',
              baggages: [
                {
                  type: 'checked',
                  quantity: 1
                }
              ]
            }
          ],
          originTerminal: 'B',
          origin: {
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
          },
          operatingCarrierFlightNumber: '4321',
          operatingCarrier: {
            name: 'British Airways',
            id: 'aln_00001876aqC8c5umZmrRds',
            iataCode: 'BA'
          },
          marketingCarrierFlightNumber: '1234',
          marketingCarrier: {
            name: 'British Airways',
            id: 'aln_00001876aqC8c5umZmrRds',
            iataCode: 'BA'
          },
          id: 'seg_00009htYpSCXrwaB9Dn456',
          duration: 'PT02H26M',
          distance: '424.2',
          destinationTerminal: '5',
          destination: {
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
          },
          departingAt: '2020-06-13T16:38:02',
          arrivingAt: '2020-06-13T16:38:02',
          aircraft: {
            name: 'Airbus Industries A380',
            id: 'arc_00009UhD4ongolulWd91Ky',
            iataCode: '380'
          }
        }
      ],
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
      id: 'sli_00009htYpSCXrwaB9Dn123',
      duration: 'PT02H26M',
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
      conditions: {
        changeBeforeDeparture: {
          penaltyCurrency: 'GBP',
          penaltyAmount: '100.00',
          allowed: true
        }
      },
      changeable: false
    }
  ],
  services: [
    {
      type: 'baggage',
      totalCurrency: 'GBP',
      totalAmount: '15.00',
      segmentIds: ['seg_00009hj8USM7Ncg31cB456'],
      quantity: 1,
      passengerIds: ['pas_00009hj8USM7Ncg31cBCLL'],
      id: 'ser_00009UhD4ongolulWd9123',
      metadata: {
        type: null,
        name: 'DEFAULT FREE SEAT',
        maximumWeightKg: null,
        maximumLengthCm: null,
        maximumHeightCm: null,
        maximumDepthCm: null,
        disclosures: [],
        designator: '27A'
      }
    }
  ],
  paymentStatus: {
    priceGuaranteeExpiresAt: '2020-01-17T10:42:14.545Z',
    paymentRequiredBy: '2020-01-17T10:42:14.545Z',
    awaitingPayment: true
  },
  passengers: [
    {
      type: 'adult',
      title: 'mrs',
      infantPassengerId: 'pas_00009hj8USM8Ncg32aTGHL',
      id: 'pas_00009hj8USM7Ncg31cBCLL',
      givenName: 'Amelia',
      gender: 'f',
      familyName: 'Earhart',
      bornOn: '1987-07-24'
    }
  ],
  owner: {
    name: 'British Airways',
    id: 'aln_00001876aqC8c5umZmrRds',
    iataCode: 'BA'
  },
  liveMode: false,
  id: 'ord_00009hthhsUZ8W4LxQgkjo',
  documents: [
    {
      uniqueIdentifier: '1252106312810',
      type: 'electronic_ticket'
    }
  ],
  createdAt: '2020-04-11T15:48:11.642Z',
  conditions: {
    refundBeforeDeparture: {
      penaltyCurrency: 'GBP',
      penaltyAmount: '100.00',
      allowed: true
    },
    changeBeforeDeparture: {
      penaltyCurrency: 'GBP',
      penaltyAmount: '100.00',
      allowed: true
    }
  },
  cancelledAt: '2020-04-11T15:48:11.642Z',
  bookingReference: 'RZPNX8',
  baseCurrency: 'GBP',
  baseAmount: '30.20'
}

export const mockOnHoldOrders: Order[] = [
  {
    totalCurrency: 'GBP',
    totalAmount: '87.90',
    taxCurrency: 'GBP',
    taxAmount: '15.90',
    slices: [
      {
        segments: [
          {
            passengers: [
              {
                passengerId: 'pas_0000A6GinR7kevnCVS69dy',
                cabinClassMarketingName: 'Economy',
                cabinClass: 'economy',
                baggages: [
                  { type: 'checked', quantity: 0 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'checked', quantity: 0 }
                ]
              }
            ],
            originTerminal: null,
            origin: {
              type: 'airport',
              timeZone: 'America/Indiana/Indianapolis',
              name: 'Indianapolis International Airport',
              longitude: -86.295526,
              latitude: 39.716605,
              id: 'arp_ind_us',
              icaoCode: 'KIND',
              iataCountryCode: 'US',
              iataCode: 'IND',
              iataCityCode: 'IND',
              cityName: 'Indianapolis',
              city: null
            },
            operatingCarrierFlightNumber: '4721',
            operatingCarrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iataCode: 'AA'
            },
            marketingCarrierFlightNumber: '4721',
            marketingCarrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iataCode: 'AA'
            },
            id: 'seg_0000A6GioOO1UDbjb7nIi9',
            duration: 'PT2H45M',
            distance: null,
            destinationTerminal: null,
            destination: {
              type: 'airport',
              timeZone: 'America/New_York',
              name: 'Miami International Airport',
              longitude: -80.288826,
              latitude: 25.794534,
              id: 'arp_mia_us',
              icaoCode: 'KMIA',
              iataCountryCode: 'US',
              iataCode: 'MIA',
              iataCityCode: 'MIA',
              cityName: 'Miami',
              city: {
                type: 'city',
                timeZone: null,
                name: 'Miami',
                longitude: null,
                latitude: null,
                id: 'cit_mia_us',
                icaoCode: null,
                iataCountryCode: 'US',
                iataCode: 'MIA',
                iataCityCode: 'MIA',
                cityName: null
              }
            },
            departingAt: '2021-08-07T17:53:00',
            arrivingAt: '2021-08-07T20:38:00',
            aircraft: {
              name: 'Embraer 175',
              id: 'arc_00009VMF8AiFPp0xSPcfNz',
              iataCode: 'E75'
            }
          }
        ],
        originType: 'airport',
        origin: {
          type: 'airport',
          timeZone: 'America/Indiana/Indianapolis',
          name: 'Indianapolis International Airport',
          longitude: -86.295526,
          latitude: 39.716605,
          id: 'arp_ind_us',
          icaoCode: 'KIND',
          iataCountryCode: 'US',
          iataCode: 'IND',
          iataCityCode: 'IND',
          cityName: 'Indianapolis',
          city: null
        },
        id: 'sli_0000A6GioOQrJfsNjv7Z8C',
        duration: 'PT2H45M',
        destinationType: 'airport',
        destination: {
          type: 'airport',
          timeZone: 'America/New_York',
          name: 'Miami International Airport',
          longitude: -80.288826,
          latitude: 25.794534,
          id: 'arp_mia_us',
          icaoCode: 'KMIA',
          iataCountryCode: 'US',
          iataCode: 'MIA',
          iataCityCode: 'MIA',
          cityName: 'Miami',
          city: {
            type: 'city',
            timeZone: null,
            name: 'Miami',
            longitude: null,
            latitude: null,
            id: 'cit_mia_us',
            icaoCode: null,
            iataCountryCode: 'US',
            iataCode: 'MIA',
            iataCityCode: 'MIA',
            cityName: null
          }
        },
        conditions: { changeBeforeDeparture: null },
        changeable: null
      }
    ],
    services: [],
    paymentStatus: {
      priceGuaranteeExpiresAt: '2021-04-16T23:59:00Z',
      paymentRequiredBy: '2021-04-16T23:59:00Z',
      awaitingPayment: true
    },
    passengers: [
      {
        type: 'adult',
        title: 'mr',
        infantPassengerId: null,
        id: 'pas_0000A6GinR7kevnCVS69dy',
        givenName: 'JOHN',
        gender: 'm',
        familyName: 'SMITH',
        bornOn: '1995-05-05'
      }
    ],
    owner: {
      name: 'American Airlines',
      id: 'arl_00009VME7DAGiJjwomhv32',
      iataCode: 'AA'
    },
    liveMode: false,
    id: 'ord_0000A6GioOO1UDbjb7nIi8',
    documents: [],
    createdAt: '2021-04-15T11:12:53.465121Z',
    conditions: {
      refundBeforeDeparture: null,
      changeBeforeDeparture: null
    },
    cancelledAt: null,
    bookingReference: 'ZVNHEX',
    baseCurrency: 'GBP',
    baseAmount: '72.00'
  },
  {
    totalCurrency: 'GBP',
    totalAmount: '110.50',
    taxCurrency: 'GBP',
    taxAmount: '17.50',
    slices: [
      {
        segments: [
          {
            passengers: [
              {
                passengerId: 'pas_0000A6GiSkqfID7qtKsE2U',
                cabinClassMarketingName: 'Economy',
                cabinClass: 'economy',
                baggages: [
                  { type: 'checked', quantity: 0 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'carry_on', quantity: 1 },
                  { type: 'checked', quantity: 0 }
                ]
              }
            ],
            originTerminal: null,
            origin: {
              type: 'airport',
              timeZone: 'America/Indiana/Indianapolis',
              name: 'Indianapolis International Airport',
              longitude: -86.295526,
              latitude: 39.716605,
              id: 'arp_ind_us',
              icaoCode: 'KIND',
              iataCountryCode: 'US',
              iataCode: 'IND',
              iataCityCode: 'IND',
              cityName: 'Indianapolis',
              city: null
            },
            operatingCarrierFlightNumber: '4341',
            operatingCarrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iataCode: 'AA'
            },
            marketingCarrierFlightNumber: '4341',
            marketingCarrier: {
              name: 'American Airlines',
              id: 'arl_00009VME7DAGiJjwomhv32',
              iataCode: 'AA'
            },
            id: 'seg_0000A6GiZRU4WXtdZJrivU',
            duration: 'PT2H49M',
            distance: null,
            destinationTerminal: null,
            destination: {
              type: 'airport',
              timeZone: 'America/New_York',
              name: 'Miami International Airport',
              longitude: -80.288826,
              latitude: 25.794534,
              id: 'arp_mia_us',
              icaoCode: 'KMIA',
              iataCountryCode: 'US',
              iataCode: 'MIA',
              iataCityCode: 'MIA',
              cityName: 'Miami',
              city: {
                type: 'city',
                timeZone: null,
                name: 'Miami',
                longitude: null,
                latitude: null,
                id: 'cit_mia_us',
                icaoCode: null,
                iataCountryCode: 'US',
                iataCode: 'MIA',
                iataCityCode: 'MIA',
                cityName: null
              }
            },
            departingAt: '2021-08-07T11:55:00',
            arrivingAt: '2021-08-07T14:44:00',
            aircraft: {
              name: 'Embraer RJ145',
              id: 'arc_00009VMF8AiFPp0xSPcfO7',
              iataCode: 'ER4'
            }
          }
        ],
        originType: 'airport',
        origin: {
          type: 'airport',
          timeZone: 'America/Indiana/Indianapolis',
          name: 'Indianapolis International Airport',
          longitude: -86.295526,
          latitude: 39.716605,
          id: 'arp_ind_us',
          icaoCode: 'KIND',
          iataCountryCode: 'US',
          iataCode: 'IND',
          iataCityCode: 'IND',
          cityName: 'Indianapolis',
          city: null
        },
        id: 'sli_0000A6GiZRWYNJshh11hnE',
        duration: 'PT2H49M',
        destinationType: 'airport',
        destination: {
          type: 'airport',
          timeZone: 'America/New_York',
          name: 'Miami International Airport',
          longitude: -80.288826,
          latitude: 25.794534,
          id: 'arp_mia_us',
          icaoCode: 'KMIA',
          iataCountryCode: 'US',
          iataCode: 'MIA',
          iataCityCode: 'MIA',
          cityName: 'Miami',
          city: {
            type: 'city',
            timeZone: null,
            name: 'Miami',
            longitude: null,
            latitude: null,
            id: 'cit_mia_us',
            icaoCode: null,
            iataCountryCode: 'US',
            iataCode: 'MIA',
            iataCityCode: 'MIA',
            cityName: null
          }
        },
        conditions: { changeBeforeDeparture: null },
        changeable: null
      }
    ],
    services: [],
    paymentStatus: {
      priceGuaranteeExpiresAt: '2021-04-16T23:59:00Z',
      paymentRequiredBy: '2021-04-16T23:59:00Z',
      awaitingPayment: true
    },
    passengers: [
      {
        type: 'adult',
        title: 'mr',
        infantPassengerId: null,
        id: 'pas_0000A6GiSkqfID7qtKsE2U',
        givenName: 'JOHN',
        gender: 'm',
        familyName: 'SMITH',
        bornOn: '1995-05-05'
      }
    ],
    owner: {
      name: 'American Airlines',
      id: 'arl_00009VME7DAGiJjwomhv32',
      iataCode: 'AA'
    },
    liveMode: false,
    id: 'ord_0000A6GiZRU4WXtdZJrivT',
    documents: [],
    createdAt: '2021-04-15T11:10:11.352074Z',
    conditions: {
      refundBeforeDeparture: null,
      changeBeforeDeparture: null
    },
    cancelledAt: null,
    bookingReference: 'RTEMPK',
    baseCurrency: 'GBP',
    baseAmount: '93.00'
  }
]

export const mockOrderCancellation: OrderCancellationResponse = {
  refund_to: 'arc_bsp_cash',
  refund_currency: 'GBP',
  refund_amount: '90.80',
  order_id: 'ord_00009hthhsUZ8W4LxQgkjo',
  live_mode: false,
  id: 'ore_00009qzZWzjDipIkqpaUAj',
  expires_at: '2020-01-17T10:42:14.545052Z',
  created_at: '2020-04-11T15:48:11.642Z',
  confirmed_at: '2020-01-17T11:51:43.114803Z'
}
