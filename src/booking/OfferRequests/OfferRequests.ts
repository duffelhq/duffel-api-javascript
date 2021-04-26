import { APIResponse, PaginationMeta } from 'types'
import { Resource } from '../../Resource'
import { Offers } from './OfferRequestsTypes'

/**
 * To search for flights, you'll need to create an `offer request`.
 * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
 * It may also include additional filters (e.g. a particular cabin to travel in).
 * @class
 * @link https://duffel.com/docs/api/offer-requests
 */
export class OfferRequests extends Resource {
  /**
   * Retrieves an offer request by its ID
   * @param {string} id - Duffel's unique identifier for the offer request
   * @link https:/duffel.com/docs/api/offer-requests/get-offer-request-by-id
   */
  public get = async (id: string): Promise<APIResponse<Offers.OfferRequest>> =>
    this.request('GET', `air/offer_requests/${id}`)

  /**
   * Retrieves a paginated list of all aircraft. The results may be returned in any order.
   * @param {Object} [queryParams] - Pagination options (optional: limit, after, before)
   */
  public list = (queryParams?: PaginationMeta): AsyncGenerator<APIResponse<Offers.OfferRequest[]>, void, unknown> =>
    this.paginatedRequest('air/offer_requests', queryParams)

  /**
   * To search for flights, you'll need to create an `offer request`.
   * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
   * It may also include additional filters (e.g. a particular cabin to travel in).
   * @param {object} [body] - body parameters to create the offer_request
   * @param {boolean} [queryParams.returnOffers] - When set to `true`, the offer request resource returned will include all the `offers` returned by the airlines.
   * If set to false, the offer request resource won't include any `offers`. To retrieve the associated offers later, use the List Offers endpoint, specifying the `offer_request_id`.
   * @link https://duffel.com/docs/api/offer-requests/create-offer-request
   */
  public create = async ({
    body,
    queryParams = { returnOffers: true }
  }: {
    body: Offers.CreateOfferRequest
    queryParams?: Offers.CreateOfferQueryParameters
  }): Promise<APIResponse<Offers.OfferRequest>> => {
    return this.request('POST', `air/offer_requests/`, body, queryParams)
  }
}
