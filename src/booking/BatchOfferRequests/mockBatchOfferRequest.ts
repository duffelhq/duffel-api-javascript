import { mockOffer } from '../Offers/mockOffer'
import {
  CreateBatchOfferRequest,
  CreateBatchOfferRequestResponse,
  BatchOfferRequest,
} from '../../types'

export const mockCreateBatchOfferRequest: CreateBatchOfferRequest = {
  slices: [
    {
      origin: 'LHR',
      destination: 'JFK',
      departure_date: '2020-04-24',
      arrival_time: null,
      departure_time: null,
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

export const mockBatchOfferRequest: BatchOfferRequest = {
  total_batches: 2,
  remaining_batches: 1,
  offers: [mockOffer],
  live_mode: false,
  id: 'orq_00009hjdomFOCJyxHG7k7k',
  created_at: '2020-02-12T15:21:01.927Z',
  client_key: 'example_client_key',
}

export const mocCreatedBatchOfferRequest: CreateBatchOfferRequestResponse = {
  total_batches: 2,
  remaining_batches: 2,
  live_mode: false,
  id: 'orq_00009hjdomFOCJyxHG7k7k',
  created_at: '2020-02-12T15:21:01.927Z',
  client_key: 'example_client_key',
}
