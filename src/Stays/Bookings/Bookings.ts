import { Client } from 'Client'
import { StaysBooking } from 'Stays/types'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export interface StaysBookingPayload {
  quote_id: string
  guests: Array<{
    given_name: string
    family_name: string
    born_on: string
  }>
  email: string
  phone_number: string
  accommodation_special_requests?: string
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
    payload: StaysBookingPayload
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
    bookingId: string
  ): Promise<DuffelResponse<StaysBooking>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${bookingId}`,
    })

  /**
   * list bookings
   */
  public list = async (): Promise<DuffelResponse<StaysBooking>> =>
    this.request({
      method: 'GET',
      path: this.path,
    })
}
