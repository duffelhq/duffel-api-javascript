import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'

/** Aircraft */
export namespace Types {
  export interface Aircraft {
    /** The three-character IATA code for the aircraft */
    name: string
    /** Duffel's unique identifier for the aircraft */
    id: string
    /** The name of the aircraft */
    iataCode: string
  }
}

/** Aircraft are used to describe what passengers will fly in for a given trip */
export class Aircraft extends Resource {
  /**
   * Retrieves an aircraft by its ID
   * @param {string} id - Duffel's unique identifier for the aircraft
   */
  public get = async (id: string): Promise<APIResponse<Types.Aircraft>> => this.request('GET', `air/aircraft/${id}`)

  /**
   * Retrieves a paginated list of all aircraft. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   */
  public list = (options?: PaginationMeta): AsyncGenerator<APIResponse<Types.Aircraft[]>, void, unknown> =>
    this.paginatedRequest('air/aircraft', options)
}
