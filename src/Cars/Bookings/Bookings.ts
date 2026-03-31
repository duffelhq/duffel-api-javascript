import { Client } from '../../Client'
import { CarsBooking } from '../CarsTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export interface CarsBookingPayload {
  quote_id: string
  driver: {
    given_name: string
    family_name: string
    email: string
    phone_number: string
    date_of_birth: string
    user_id?: string
  }
  inbound_flight_number?: string
  supplier_loyalty_programme_account_number?: string
  payment?: {
    method: 'card'
    card_id: string
  }
  metadata?: Record<string, string>
  users?: string[]
}

export class Bookings extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'cars/bookings'
  }

  /**
   * Create a booking from a quote
   * @param {object} payload - The booking payload, including quote id and driver information
   */
  public create = async (
    payload: CarsBookingPayload,
  ): Promise<DuffelResponse<CarsBooking>> =>
    this.request({
      method: 'POST',
      path: this.path,
      data: payload,
    })

  /**
   * Get a booking by ID
   * @param {string} bookingId - The ID of the booking
   */
  public get = async (
    bookingId: string,
  ): Promise<DuffelResponse<CarsBooking>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${bookingId}`,
    })

  /**
   * Cancel a booking
   * @param {string} bookingId - The ID of the booking to cancel
   */
  public cancel = async (
    bookingId: string,
  ): Promise<DuffelResponse<CarsBooking>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${bookingId}/actions/cancel`,
    })
}
