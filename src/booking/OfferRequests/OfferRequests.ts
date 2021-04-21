import { APIResponse } from 'types'
import { Offers } from './types'
import { Resource } from '../../Resource'

/**
 * Retrieves a paginated list of your offer requests. The result may be returned in any order
 * @class
 * @link https://duffel.com/docs/api/offer-requests
 */
export class OfferRequests extends Resource {
  /**
   * Retrieves an offer request by its ID
   * @param {string} id - Duffel's unique identifier for the offer request
   * @link https:/duffel.com/docs/api/offer-requests/get-offer-request-by-id
   */
  public get = async (id: string) => this.request('GET', `air/offer_requests/${id}`) as APIResponse<Offers.OfferRequest>

  /**
   * @param {string} options.after - A cursor pointing to the previous page of records. For more information on how to paginate through records
   * @param {string} options.before - A cursor pointing to the next page of records. For more information on how to paginate through records,
   * @param {integer} options.limit - The maximum number of records to return per page. Defaults to `50`. May be set to any integer between `1` and `200`.
   * @link https://duffel.com/docs/api/overview/pagination
   */
  public list = async () => this.request('GET', `air/offer_requests`) as APIResponse<Offers.OfferRequest[]>

  /**
   * To search for flights, you'll need to create an `offer request`.
   * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
   * It may also include additional filters (e.g. a particular cabin to travel in).
   * @param {boolean} options.returnOffers - When set to `true`, the offer request resource returned will include all the `offers` returned by the airlines.
   * If set to false, the offer request resource won't include any `offers`. To retrieve the associated offers later, use the List Offers endpoint, specifying the `offer_request_id`.
   * @link https://duffel.com/docs/api/offer-requests/create-offer-request
   */
  public create = async (body: Offers.CreateOfferRequest, returnOffers = true) => {
    return this.request(
      'POST',
      `air/offer_requests/?return_offers=${returnOffers}`,
      body
    ) as APIResponse<Offers.OfferRequest>
  }
}
