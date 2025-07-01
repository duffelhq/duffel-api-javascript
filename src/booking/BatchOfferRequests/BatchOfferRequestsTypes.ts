import { CabinClass, Offer } from '../../types'

import {
  CreateOfferRequestPassenger,
  CreateOfferRequestSlice,
  CreateOfferRequestPrivateFare,
} from '../OfferRequests/OfferRequestsTypes'

export interface BatchOfferRequest {
  /**
   * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime at which the offer request was created
   */
  created_at: string

  /**
   * Duffel's unique identifier for the offer request
   */
  id: string

  /**
   * Whether the offer request was created in live mode. This field will be set to true if the offer request was created in live mode, or false if it was created in test mode.
   */
  live_mode: boolean

  /**
   * A client key to allow the Duffel Ancillaries component to talk to the Duffel API to retrieve information about an offer and its ancillaries. Learn more about how to use this on https://duffel.com/docs/guides/ancillaries-component.
   */
  client_key: string

  /**
   * The total number of batches of offers.
   */
  total_batches: number

  /**
   * The number of batches of offers that are remaining. This can be used with the total_batches to estimate the amount of work remaining. Once this reaches zero, there are no more batches of offers to process.
   */
  remaining_batches: number

  /**
   * The offers related to this batch offer request.
   */
  offers: Omit<Offer, 'available_services'>[]
}

export type CreateBatchOfferRequestResponse = Omit<BatchOfferRequest, 'offers'>

export interface CreateBatchOfferRequest {
  /**
   * The cabin that the passengers want to travel in.
   */
  cabin_class?: CabinClass

  /**
   * The maximum number of connections within any slice of the offer. For
   * example 0 means a direct flight which will have a single segment within
   * each slice and 1 means a maximum of two segments within each slice of the
   * offer.
   */
  max_connections?: 0 | 1 | 2

  /**
   * The passengers who want to travel. If you specify an `age` for a passenger,
   * the `type` may differ for the same passenger in different offers due to
   * airline's different rules. E.g. one airline may treat a 14 year old as an
   * adult, and another as a young adult. You may only specify an `age` or a
   * `type` – not both.
   */
  passengers: CreateOfferRequestPassenger[]

  /**
   * The private fare codes for this Offer Request. You can pass in multiple
   * airlines with their specific private fare codes. The key is the airline's
   * IATA code that provided the private fare code. The `corporate_code` is
   * provided to you by the airline and the `tracking_reference` is to identify
   * your business by the airlines.
   */
  private_fares?: {
    [iataCode: string]: CreateOfferRequestPrivateFare[]
  }

  /**
   * The [slices](https://duffel.com/docs/api/overview/key-principles) that make
   * up this offer request. One-way journeys can be expressed using one slice,
   * whereas return trips will need two.
   */
  slices: CreateOfferRequestSlice[]
}

export interface CreateBatchOfferRequestQueryParameters {
  /**
   * The maximum amount of time in milliseconds to wait for each airline search to complete.
   * This timeout applies to the response time of the call to the airline and includes
   * some additional overhead added by Duffel. Value should be between `2` seconds and `60` seconds.
   * Any values outside the range will be ignored and the default supplier_timeout will be used.
   * If a value is set, the response will only include offers from airline searches that completed
   * within the given time. If a value is not set, the response will only include offers from
   * airline searches that completed within the default supplier_timeout value of 20 seconds.
   * We recommend setting supplier_timeout lower than the timeout on the HTTP request you send to
   * Duffel API as that will allow us to respond with the offers we received before your request
   * times out with an empty response.
   */
  supplier_timeout?: number
}
