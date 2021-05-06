import { APIResponse, Offer, PaginationMeta } from 'types'
import { Resource } from '../../Resource'

/**
 * Each offer represents flights you can buy from an airline at a particular price that meet your search criteria.
 * @class
 * @link https://duffel.com/docs/api/offers
 */
export class Offers extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/offers'
  }

  /**
   * Retrieves an offer by its ID
   * @param {string} id - Duffel's unique identifier for the offer
   * @link https:/duffel.com/docs/api/offers/get-offer-by-id
   */
  public get = async (id: string): Promise<APIResponse<Offer>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a paginated list of all offers. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/offers/get-offers
   */
  public list = (options?: PaginationMeta): AsyncGenerator<APIResponse<Offer[]>, void, unknown> =>
    this.paginatedRequest({ path: this.path, ...options })
}
