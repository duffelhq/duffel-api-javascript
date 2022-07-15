import { Client } from 'Client'
import { Resource } from '../../Resource'
import { DuffelResponse, PlacesSuggestionsResponse } from '../../types'

interface PlacesSuggestionsParameters {
  /**
   * A search string for finding matching Places.
   */
  query: string
}

/**
 * A Place is a city or airport that can serve as an origin or destination.
 * * @link https://duffel.com/docs/api/places
 */
export class Suggestions extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'places/suggestions'
  }

  /**
   * Retrieves a list of Places matching the provided query
   */
  public list = async (
    params: PlacesSuggestionsParameters
  ): Promise<DuffelResponse<PlacesSuggestionsResponse[]>> =>
    this.request({ method: 'GET', path: `${this.path}`, params })
}
