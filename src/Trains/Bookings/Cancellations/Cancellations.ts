import { Client } from '../../../Client'
import { TrainBookingCancellation } from '../../TrainsTypes'
import { Resource } from '../../../Resource'
import { DuffelResponse } from '../../../types'

export class Cancellations extends Resource {
  constructor(client: Client) {
    super(client)
  }

  /**
   * Initiate a cancellation for a train booking. This does not immediately cancel the booking -
   * it must be confirmed before the returned `expires_at` time.
   * @param {string} bookingId - The ID of the booking to cancel
   */
  public create = async (
    bookingId: string,
  ): Promise<DuffelResponse<TrainBookingCancellation>> =>
    this.request({
      method: 'POST',
      path: `trains/bookings/${bookingId}/cancellations`,
    })

  /**
   * Confirm a train booking cancellation, completing the cancellation and triggering any refunds
   * @param {string} bookingId - The ID of the booking being cancelled
   * @param {string} cancellationId - The ID of the cancellation to confirm
   */
  public confirm = async (
    bookingId: string,
    cancellationId: string,
  ): Promise<DuffelResponse<TrainBookingCancellation>> =>
    this.request({
      method: 'POST',
      path: `trains/bookings/${bookingId}/cancellations/${cancellationId}/actions/confirm`,
    })
}
