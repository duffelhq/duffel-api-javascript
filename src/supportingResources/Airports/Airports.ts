import { Resource } from '../../Resource'
import { Airport, DuffelResponse, PaginationMeta } from '../../types'

/** Airports are used to identify origins and destinations in journey slices
 * @class
 * @link https://duffel.com/docs/api/airports
 */
export class Airports extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/airports'
  }

  /**
   * Retrieves an airport by its ID
   * @param {string} id - Duffel's unique identifier for the airport
   * @link https://duffel.com/docs/api/airports/get-airport-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<Airport>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of airports. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/airports/get-airports
   */
  public list = (options?: { queryParams?: PaginationMeta }): Promise<DuffelResponse<Airport[]>> =>
    this.request({ method: 'GET', path: this.path, ...options })

  /**
   * Retrieves a generator of all airports. The results may be returned in any order.
   * @link https://duffel.com/docs/api/airports/get-airports
   */
  public listWithGenerator = (): AsyncGenerator<DuffelResponse<Airport>, void, unknown> =>
    this.paginatedRequest({ path: this.path })
}
