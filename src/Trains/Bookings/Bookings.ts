import { Client } from '../../Client'
import {
  ListTrainBookingsParams,
  TrainBooking,
  TrainBookingPending,
  TrainCreateBookingPayload,
} from '../TrainsTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'
import { Cancellations } from './Cancellations'

export class Bookings extends Resource {
  /**
   * Endpoint path
   */
  path: string

  public cancellations: Cancellations

  constructor(client: Client) {
    super(client)
    this.path = 'trains/bookings'

    this.cancellations = new Cancellations(client)
  }

  /**
   * Create a booking from a quote
   *
   * When the booking outcome is not yet known, the API responds with a
   * `TrainBookingPending` message (HTTP 200 or 202) instead of a booking, and
   * a webhook notification follows with the outcome.
   * @param {object} payload - The booking payload, including quote id, passengers, payment and delivery method
   */
  public create = async (
    payload: TrainCreateBookingPayload,
  ): Promise<DuffelResponse<TrainBooking | TrainBookingPending>> =>
    this.request({ method: 'POST', path: this.path, data: payload })

  /**
   * Get a booking by ID
   * @param {string} bookingId - The ID of the booking
   */
  public get = async (
    bookingId: string,
  ): Promise<DuffelResponse<TrainBooking>> =>
    this.request({ method: 'GET', path: `${this.path}/${bookingId}` })

  /**
   * Retrieves a page of train bookings made for your organisation
   * @param {object} [options] - Pagination options (optional: limit, after, before)
   */
  public list = async (
    options?: ListTrainBookingsParams,
  ): Promise<DuffelResponse<TrainBooking[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all train bookings made for your organisation
   * @param {object} [options] - Pagination options (optional: limit, after, before)
   */
  public listWithGenerator = (
    options?: ListTrainBookingsParams,
  ): AsyncGenerator<DuffelResponse<TrainBooking>, void, unknown> =>
    this.paginatedRequest({ path: this.path, params: options })
}
