import { Client } from 'Client'
import { StaysSearchParams, StaysSearchResult } from './types'
import { Resource } from '../Resource'
import { DuffelResponse } from '../types'
import { Bookings } from './Bookings'
import { Quotes } from './Quotes'
import { SearchResults } from './SearchResults'

export class Stays extends Resource {
  /**
   * Endpoint path
   */
  path: string

  public searchResults: SearchResults
  public quotes: Quotes
  public bookings: Bookings

  constructor(client: Client) {
    super(client)
    this.path = 'stays'

    this.searchResults = new SearchResults(client)
    this.quotes = new Quotes(client)
    this.bookings = new Bookings(client)
  }

  /**
   * Search for accommodations
   * @param {object} params - The search parameters
   */
  public search = async (
    params: StaysSearchParams
  ): Promise<DuffelResponse<StaysSearchResult>> =>
    this.request({ method: 'POST', path: `${this.path}/search`, data: params })
}
