import { Client } from '../../Client'
import { StaysBooking } from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse, PaginationMeta } from '../../types'

export interface StaysBookingPayload {
  quote_id: string
  loyalty_programme_account_number?: string
  guests: Array<{
    given_name: string
    family_name: string
  }>
  email: string
  phone_number: string
  accommodation_special_requests?: string
  payment?: { card_id: string } | { three_d_secure_session_id: string }
}

export class Bookings extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/bookings'
  }

  /**
   * Create a booking
   * @param {object} payload - The booking payload, including quote id and guest information
   */
  public create = async (
    payload: StaysBookingPayload,
  ): Promise<DuffelResponse<StaysBooking>> =>
    this.request({
      method: 'POST',
      path: this.path,
      data: payload,
    })

  /**
   * Get a booking
   * @param {string} bookingId - The ID of the booking
   */
  public get = async (
    bookingId: string,
  ): Promise<DuffelResponse<StaysBooking>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${bookingId}`,
    })

  /**
   * List bookings
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/bookings/list-bookings
   */
  public list = async (
    options?: PaginationMeta,
  ): Promise<DuffelResponse<StaysBooking[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all bookings. The results may be returned in any order.
   * @link https://duffel.com/docs/api/bookings/list-bookings
   */
  public listWithGenerator = (): AsyncGenerator<
    DuffelResponse<StaysBooking>,
    void,
    unknown
  > => this.paginatedRequest({ path: this.path })

  /**
   * Cancel a booking
   * @param {string} bookingId - The ID of the booking
   */
  public cancel = async (
    bookingId: string,
  ): Promise<DuffelResponse<StaysBooking>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${bookingId}/actions/cancel`,
    })
}
