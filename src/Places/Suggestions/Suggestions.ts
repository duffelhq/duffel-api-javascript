import { Client } from 'Client'
import { Resource } from '../../Resource'
import { DuffelResponse, Places } from '../../types'

interface PlacesSuggestionsParameters {
  /**
   * A search string for finding matching Places.
   * Deprecated in favour of "name".
   */
  query?: string

  /**
   * A search string for finding matching Places by name.
   */
  name?: string

  /**
   * The radius, in metres, to search within.
   */
  rad?: string

  /**
   * The latitude to search by.
   */
  lat?: string

  /**
   * The longitude to search by.
   */
  lng?: string
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
  ): Promise<DuffelResponse<Places[]>> =>
    this.request({ method: 'GET', path: `${this.path}`, params })
}
