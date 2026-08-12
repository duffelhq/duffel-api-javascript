import { Client } from '../../Client'
import { TrainStationSuggestion } from '../TrainsTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Stations extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'trains/stations'
  }

  /**
   * List train stations matching a search query, for letting travellers search for
   * departure and arrival stations by name
   * @param {string} query - A search string to match against station names (3-512 characters)
   */
  public suggestions = async (
    query: string,
  ): Promise<DuffelResponse<TrainStationSuggestion[]>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/suggestions`,
      params: { query },
    })
}
