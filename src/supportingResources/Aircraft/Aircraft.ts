import { APIResponse, PaginationMeta, Aircraft as AircraftType } from 'types'
import { Resource } from '../../Resource'

/** Aircraft are used to describe what passengers will fly in for a given trip
 * @class
 * @link https://duffel.com/docs/api/aircraft
 */
export class Aircraft extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/aircraft'
  }

  /**
   * Retrieves an aircraft by its ID
   * @param {string} id - Duffel's unique identifier for the aircraft
   * @link https://duffel.com/docs/api/aircraft/get-aircraft-by-id
   */
  public get = async (id: string): Promise<APIResponse<AircraftType>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a paginated list of all aircraft. The results may be returned in any order.
   * @param {Object} [options] - Pagination query parameters (optional: limit, after, before)
   * @link https://duffel.com/docs/api/aircraft/get-aircraft
   */
  public list = (options?: {
    queryParams?: PaginationMeta
  }): AsyncGenerator<APIResponse<AircraftType[]>, void, unknown> =>
    this.paginatedRequest({ path: this.path, ...options })
}
