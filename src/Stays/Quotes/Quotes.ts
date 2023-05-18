import { Client } from '../../Client'
import { StaysQuote } from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Quotes extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/quotes'
  }

  /**
   * Create a quote for the selected rate
   * @param {string} rateId - The ID of the rate to create a quote for
   */
  public create = async (rateId: string): Promise<DuffelResponse<StaysQuote>> =>
    this.request({
      method: 'POST',
      path: this.path,
      data: {
        rate_id: rateId,
      },
    })
}
