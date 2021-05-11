import { APIResponse, PaginationMeta, Airline } from '../../types'
import { Resource } from '../../Resource'

/** Airlines are used to identify the air travel companies selling and operating flights
 * @class
 * @link https://duffel.com/docs/api/airlines */
export class Airlines extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/airlines'
  }

  /**
   * Retrieves an airline by its ID
   * @param {string} id - Duffel's unique identifier for the airline
   * @link https://duffel.com/docs/api/airlines/get-airline-by-id
   */
  public get = async (id: string): Promise<APIResponse<Airline>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a paginated list of all airlines. The results may be returned in any order.
   * @param {Object} [options] - Pagination query parameters (optional: limit, after, before)
   * @link https://duffel.com/docs/api/airlines/get-airlines
   */
  public list = (options?: { queryParams?: PaginationMeta }): AsyncGenerator<APIResponse<Airline[]>, void, unknown> =>
    this.paginatedRequest({ path: this.path, ...options })
}
