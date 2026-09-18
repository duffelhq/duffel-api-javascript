import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { DuffelResponse, LoyaltyProgramme, PaginationMeta } from '../../types'

/** Loyalty programmes are used to identify the frequent flyer programmes offered by airlines
 * @class
 * @link https://duffel.com/docs/api/loyalty-programmes
 */
export class LoyaltyProgrammes extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/loyalty_programmes'
  }

  /**
   * Retrieves a loyalty programme by its ID
   * @param {string} id - Duffel's unique identifier for the loyalty programme
   * @link https://duffel.com/docs/api/loyalty-programmes/get-a-single-loyalty-programme
   */
  public get = async (id: string): Promise<DuffelResponse<LoyaltyProgramme>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of loyalty programmes. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/loyalty-programmes/list-loyalty-programmes
   */
  public list = (
    options?: PaginationMeta,
  ): Promise<DuffelResponse<LoyaltyProgramme[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })
}
