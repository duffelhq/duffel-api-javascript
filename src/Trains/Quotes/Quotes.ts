import { Client } from '../../Client'
import { TrainCreateQuotePayload, TrainQuote } from '../TrainsTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Quotes extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'trains/quotes'
  }

  /**
   * Create a quote by selecting an offer for each journey in a search
   * @param {object} payload - The search ID and the offer selected for each journey
   */
  public create = async (
    payload: TrainCreateQuotePayload,
  ): Promise<DuffelResponse<TrainQuote>> =>
    this.request({ method: 'POST', path: this.path, data: payload })
}
