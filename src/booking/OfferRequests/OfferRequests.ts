import { Client } from '../../Client'
import { Resource } from '../../Resource'
import {
  CreateOfferRequest,
  CreateOfferRequestQueryParameters,
  DuffelResponse,
  OfferRequest,
  PaginationMeta,
} from '../../types'

/**
 * To search for flights, you'll need to create an `offer request`.
 * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
 * It may also include additional filters (e.g. a particular cabin to travel in).
 * @class
 * @link https://duffel.com/docs/api/offer-requests
 */
export class OfferRequests extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/offer_requests'
  }

  /**
   * Retrieves an offer request by its ID
   * @param {string} id - Duffel's unique identifier for the offer request
   * @link https:/duffel.com/docs/api/offer-requests/get-offer-request-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<OfferRequest>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Retrieves a page of offer requests. The results may be returned in any order.
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   * @link https://duffel.com/docs/api/offer-requests/get-offer-requests
   */
  public list = (
    options?: PaginationMeta,
  ): Promise<DuffelResponse<OfferRequest[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all offer requests. The results may be returned in any order.
   * @link https://duffel.com/docs/api/offer-requests/get-offer-requests
   */
  public listWithGenerator = (): AsyncGenerator<
    DuffelResponse<OfferRequest>,
    void,
    unknown
  > => this.paginatedRequest({ path: this.path })

  /**
   * To search for flights, you'll need to create an `offer request`.
   * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
   * It may also include additional filters (e.g. a particular cabin to travel in).
   * @param {Object} [options] - the parameters for making an offer requests (required: slices, passengers; optional: cabin_class, return_offers)
   * When `return_offers` is set to `true`, the offer request resource returned will include all the `offers` returned by the airlines.
   * If set to false, the offer request resource won't include any `offers`. To retrieve the associated offers later, use the List Offers endpoint, specifying the `offer_request_id`.
   * @link https://duffel.com/docs/api/offer-requests/create-offer-request
   */
  public create = async <QueryParams extends CreateOfferRequestQueryParameters>(
    options: CreateOfferRequest & QueryParams,
  ): Promise<
    DuffelResponse<
      // Ensure that the `offers` field can't be accessed if `return_offers` is false
      QueryParams extends { return_offers: false }
        ? Omit<OfferRequest, 'offers'>
        : OfferRequest
    >
  > => {
    const { return_offers, ...data } = options

    return this.request({
      method: 'POST',
      path: `${this.path}/`,
      data,
      params: {
        ...(return_offers !== undefined &&
          return_offers !== null && { return_offers }),
      },
    })
  }
}
