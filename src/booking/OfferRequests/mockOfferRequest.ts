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
  offers: [
    {
      totalEmissionsKg: '460',
      totalCurrency: 'GBP',
      totalAmount: '45.00',
      taxCurrency: 'GBP',
      taxAmount: '40.80',
      slices: [
        {
          segments: [
            {
              passengers: [
                {
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
              operating_carrier_flight_number: '4321',
              operating_carrier: {
                name: 'British Airways',
                id: 'aln_00001876aqC8c5umZmrRds',
                iataCode: 'BA'
              },
              marketing_carrier_flight_number: '1234',
              marketing_carrier: {
                name: 'British Airways',
                id: 'aln_00001876aqC8c5umZmrRds',
                iataCode: 'BA'
              },
              id: 'seg_00009htYpSCXrwaB9Dn456',
              duration: 'PT02H26M',
              distance: '424.2',
              destination_terminal: '5',
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
              departing_at: '2020-06-13T16:38:02',
              arriving_at: '2020-06-13T16:38:02',
              aircraft: {
                name: 'Airbus Industries A380',
                id: 'arc_00009UhD4ongolulWd91Ky',
                iataCode: '380'
              }
            }
          ],
          origin_type: 'airport',
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
          fare_brand_name: 'Basic',
          duration: 'PT02H26M',
          destination_type: 'airport',
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
            change_before_departure: {
              penalty_currency: 'GBP',
              penalty_amount: '100.00',
              allowed: true
            }
          }
        }
      ],
      paymentRequirements: {
        requiresInstantPayment: false,
        priceGuaranteeExpiresAt: '2020-01-17T10:42:14.545Z',
        paymentRequiredBy: '2020-01-17T10:42:14.545Z'
      },
      passengers: [
        {
          type: 'adult',
          id: 'pas_00009hj8USM7Ncg31cBCL',
          age: 14
        }
      ],
      passengerIdentityDocumentsRequired: false,
      owner: {
        name: 'British Airways',
        id: 'aln_00001876aqC8c5umZmrRds',
        iataCode: 'BA'
      },
      liveMode: true,
      id: 'off_00009htYpSCXrwaB9DnUm0',
      expiresAt: '2020-01-17T10:42:14.545Z',
      createdAt: '2020-01-17T10:12:14.545Z',
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
      baseCurrency: 'GBP',
      baseAmount: '30.20',
      allowedPassengerIdentityDocumentTypes: ['passport']
    }
  ],
  liveMode: false,
  id: 'orq_00009hjdomFOCJyxHG7k7k',
  createdAt: '2020-02-12T15:21:01.927Z',
  cabinClass: 'economy'
}
