import { Client } from 'Client'
import { StaysSearchResult } from 'Stays/types'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class SearchResults extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/search_results'
  }

  /**
   * Fetch all rates for the given search result
   * @param {string} searchResultId - The ID of the search result to fetch rates for
   */
  public fetchAllRates = async (
    searchResultId: string
  ): Promise<DuffelResponse<StaysSearchResult>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/${searchResultId}/actions/fetch_all_rates`,
    })
}
