import { Offer } from '../../types'

export const mockPartialOffer: Offer = {
  updated_at: '2020-01-17T10:12:14.545Z',
  total_emissions_kg: '460',
  total_currency: 'GBP',
  total_amount: '45.00',
  tax_currency: 'GBP',
  tax_amount: '40.80',
  slices: [
    {
      comparison_key: 'BmlZDw==',
      ngs_shelf: 1,
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
                  quantity: 1,
                },
              ],
              fare_basis_code: 'KLWC10A',
              cabin: {
                name: 'economy',
                marketing_name: 'Economy Basic',
                amenities: {
                  wifi: null,
                  power: null,
                  seat: null,
                },
              },
            },
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
          stops: [],
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
        city_name: 'London',
        iata_city_code: 'LON',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON',
          type: 'city',
        },
      },
      id: 'sli_00009htYpSCXrwaB9Dn123',
      fare_brand_name: 'Basic',
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
        iata_city_code: 'LON',
        city: {
          name: 'London',
          id: 'cit_lon_gb',
          iata_country_code: 'GB',
          iata_code: 'LON',
          type: 'city',
        },
      },
      conditions: {
        change_before_departure: {
          penalty_currency: 'GBP',
          penalty_amount: '100.00',
          allowed: true,
        },
        refund_before_departure: null,
        advance_seat_selection: false,
        priority_boarding: false,
        priority_check_in: false,
      },
    },
  ],
  payment_requirements: {
    requires_instant_payment: false,
    price_guarantee_expires_at: '2020-01-17T10:42:14.545Z',
    payment_required_by: '2020-01-17T10:42:14.545Z',
  },
  private_fares: [],
  partial: true,
  passengers: [
    {
      type: 'adult',
      id: 'pas_00009hj8USM7Ncg31cBCL',
      age: 14,
      given_name: 'Carol',
      family_name: 'Danvers',
      loyalty_programme_accounts: [
        {
          account_number: '12901014',
          airline_iata_code: 'BA',
        },
      ],
      fare_type: null,
    },
  ],
  passenger_identity_documents_required: false,
  owner: {
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
  live_mode: true,
  id: 'off_00009htYpSCXrwaB9DnUm0',
  expires_at: '2020-01-17T10:42:14.545Z',
  created_at: '2020-01-17T10:12:14.545Z',
  conditions: {
    refund_before_departure: {
      penalty_currency: 'GBP',
      penalty_amount: '100.00',
      allowed: true,
    },
    change_before_departure: {
      penalty_currency: 'GBP',
      penalty_amount: '100.00',
      allowed: true,
    },
  },
  base_currency: 'GBP',
  base_amount: '30.20',
  available_services: [
    {
      id: 'ase_00009UhD4ongolulWd9123',
      maximum_quantity: 1,
      metadata: {
        maximum_depth_cm: 75,
        maximum_height_cm: 90,
        maximum_length_cm: 90,
        maximum_weight_kg: 23,
        type: 'carry_on',
      },
      passenger_ids: ['pas_00009hj8USM7Ncg31cBCL'],
      segment_ids: ['seg_00009htYpSCXrwaB9Dn456'],
      total_amount: '15.00',
      total_currency: 'GBP',
      type: 'baggage',
    },
    {
      id: 'cfa_0000AQlbGwJwVg4M6Z6dF2',
      maximum_quantity: 1,
      metadata: {
        merchant_copy: 'some information for the merchant',
        refund_amount: '33.75',
        terms_and_conditions_url: 'this is a link',
      },
      passenger_ids: ['pas_00009hj8USM7Ncg31cBCL'],
      segment_ids: ['seg_00009htYpSCXrwaB9Dn456'],
      total_amount: '3.25',
      total_currency: 'GBP',
      type: 'cancel_for_any_reason',
    },
  ],
  supported_passenger_identity_document_types: ['passport'],
  supported_loyalty_programmes: [],
}

export const mockUpdatedOffer = {
  type: 'adult',
  loyalty_programme_accounts: [
    {
      airline_iata_code: 'BA',
      account_number: '12901014',
    },
  ],
  id: 'pas_00009hj8USM7Ncg31cBCL',
  given_name: 'Amelia',
  family_name: 'Earhart',
  age: 14,
}
