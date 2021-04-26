import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { Airline } from '../../types'

/** Airlines are used to identify the air travel companies selling and operating flights
 * @class
 * @link https://duffel.com/docs/api/airlines */
export class Airlines extends Resource {
  /**
   * Retrieves an airline by its ID
   * @param {string} id - Duffel's unique identifier for the airline
   * @link https://duffel.com/docs/api/airlines/get-airline-by-id
   */
  public get = async (id: string): Promise<APIResponse<Airline>> => this.request('GET', `air/airlines/${id}`)

  /**
   * Retrieves a paginated list of all airlines. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/airlines/get-airlines
   */
  public list = (queryParams?: PaginationMeta): AsyncGenerator<APIResponse<Airline[]>, void, unknown> =>
    this.paginatedRequest('air/airlines', queryParams)
}
