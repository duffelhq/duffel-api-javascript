import { Offer } from '../../types'

export const mockOffer: Offer = {
  updatedAt: '2020-01-17T10:12:14.545Z',
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
          departing_at: '2020-06-13T16:38:02',
          arriving_at: '2020-06-13T16:38:02',
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
      fareBrandName: 'Basic',
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
        change_before_departure: {
          penaltyCurrency: 'GBP',
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
  availableServices: [
    {
      type: 'baggage',
      totalCurrency: 'GBP',
      totalAmount: '15.00',
      segmentIds: ['seg_00009hj8USM7Ncg31cB456'],
      passengerIds: ['pas_00009hj8USM7Ncg31cBCLL'],
      maximumQuantity: 1,
      id: 'ase_00009UhD4ongolulWd9123'
    }
  ],
  allowedPassengerIdentityDocumentTypes: ['passport']
}
