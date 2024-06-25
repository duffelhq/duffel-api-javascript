import { Client } from '../../Client'
import { StaysAccommodationSuggestion } from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Accommodation extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/accommodation'
  }

  /**
   * Create a booking
   * @param {object} payload - The booking payload, including quote id and guest information
   */
  public suggestions = async (
    query: string,
  ): Promise<DuffelResponse<StaysAccommodationSuggestion[]>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/suggestions`,
      data: {
        query: query,
      },
    })
}
