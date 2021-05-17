import { Resource } from '../../Resource'
import { DuffelResponse, OrderChangeOffer, PaginationMeta } from '../../types'

/**
 * After you've searched for flights to add to your order by creating an order change request, we'll send your search to a range of airlines, which may return order change offers.
 * This is still in PREVIEW mode
 * @export
 * @class OrderChangeOffers
 * @extends {Resource}
 */
export class OrderChangeOffers extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/order_change_offers'
  }

  /**
   * Retrieves an order change offer by its ID
   * @param {string} id - The ID of your order change offer
   * @link https://duffel.com/docs/api/order-change-offers/get-order-change-offer-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<OrderChangeOffer>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of order change offers. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   */
  public list = (options?: PaginationMeta): Promise<DuffelResponse<OrderChangeOffer[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all order change offers. The results may be returned in any order.
   */
  public listWithGenerator = (): AsyncGenerator<DuffelResponse<OrderChangeOffer>, void, unknown> =>
    this.paginatedRequest({ path: this.path })
}
