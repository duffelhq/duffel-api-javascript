import { Resource } from '../../Resource'
import { DuffelResponse, ListOffersParams, Offer } from '../../types'

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
   * @param {string} return_available_services - When set to true, the offer resource returned will include all the available_services returned by the airline. If set to false, the offer resource won't include any available_services.
   * @link https:/duffel.com/docs/api/offers/get-offer-by-id
   */
  public get = async (
    id: string,
    params?: { return_available_services: boolean }
  ): Promise<DuffelResponse<Offer>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}`, params })

  /**
   * Retrieves a page of offers. The results may be returned in any order.
   * @param {Object.<ListOffersParams>} params - Endpoint options (optional: limit, after, before, max_connections, sort)
   * @param {string} params.offer_request_id - Duffel's unique identifier for the offer request, returned when it was created
   * @link https://duffel.com/docs/api/offers/get-offers
   */
  public list = ({
    offer_request_id,
    ...params
  }: ListOffersParams): Promise<DuffelResponse<Offer[]>> =>
    this.request({
      method: 'GET',
      path: this.path,
      params: {
        ...params,
        offer_request_id,
      },
    })

  /**
   * Retrieves a generator of all offers. The results may be returned in any order.
   * @param {Object.<ListOffersParams>} params - Endpoint options (optional: limit, after, before, max_connections, sort)
   * @param {string} params.offer_request_id - Duffel's unique identifier for the offer request, returned when it was created
   * @link https://duffel.com/docs/api/offers/get-offers
   */
  public listWithGenerator = ({
    offer_request_id,
    ...params
  }: ListOffersParams): AsyncGenerator<DuffelResponse<Offer>, void, unknown> =>
    this.paginatedRequest({
      path: this.path,
      params: {
        ...params,
        offer_request_id,
      },
    })
}
