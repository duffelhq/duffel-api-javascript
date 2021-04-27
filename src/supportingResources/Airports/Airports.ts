import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { Airport } from '../../types'

/** Airports are used to identify origins and destinations in journey slices
 * @class
 * @link https://duffel.com/docs/api/airports
 */
export class Airports extends Resource {
  /**
   * Retrieves an airport by its ID
   * @param {string} id - Duffel's unique identifier for the airport
   * @link https://duffel.com/docs/api/airports/get-airport-by-id
   */
  public get = async (id: string): Promise<APIResponse<Airport>> => this.request('GET', `air/airports/${id}`)

  /**
   * Retrieves a paginated list of all airports. The results may be returned in any order.
   * @param {Object} [queryParams] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/airports/get-airports
   */
  public list = ({
    queryParams
  }: {
    queryParams?: PaginationMeta
  }): AsyncGenerator<APIResponse<Airport[]>, void, unknown> =>
    this.paginatedRequest({ path: 'air/airports', queryParams })
}
