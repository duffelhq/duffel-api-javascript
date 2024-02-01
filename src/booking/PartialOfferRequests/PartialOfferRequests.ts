import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { CreateOfferRequest, DuffelResponse, OfferRequest } from '../../types'
import {
  CreatePartialOfferRequestQueryParam,
  SelectedPartialOffersParams,
} from './PartialOfferRequestTypes'

/**
 * To search for and select flights separately for each slice of the journey, you'll need to create a partial offer request.
 *
 * A partial offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
 * @class
 * @link https://duffel.com/docs/api/partial-offer-requests
 */
export class PartialOfferRequests extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/partial_offer_requests'
  }

  /**
   * Retrieves a partial offers request by its ID, only including partial offers for the current slice of multi-step search flow.
   * @param {string} id - Duffel's unique identifier for the partial offer request
   * @param {Object} [options] - Selected partial offers
   * @link https:/duffel.com/docs/api/partial-offer-requests/get-partial-offer-request-by-id
   */
  public get = async (
    id: string,
    options?: SelectedPartialOffersParams,
  ): Promise<DuffelResponse<OfferRequest>> => {
    return this.request({
      method: 'GET',
      path: `${this.path}/${id}`,
      params: options,
    })
  }

  /**
   * To search for and select flights separately for each slice of the journey, you'll need to create a partial offer request.
   * A partial offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
   * It may also include additional filters (e.g. a particular cabin to travel in).
   * @param {Object} [options] - the parameters for making a partial offer requests (required: slices, passengers; optional: cabin_class)
   * @link https://duffel.com/docs/api/partial-offer-requests/create-partial-offer-request
   */
  public create = async <
    QueryParams extends CreatePartialOfferRequestQueryParam,
  >(
    options: CreateOfferRequest & QueryParams,
  ): Promise<DuffelResponse<OfferRequest>> => {
    const { supplier_timeout, ...data } = options
    return this.request({
      method: 'POST',
      path: `${this.path}/`,
      data: data,
      params: {
        ...(supplier_timeout !== undefined &&
          supplier_timeout !== null && { supplier_timeout }),
      },
    })
  }

  /**
   * Retrieves an offer request with offers for fares matching selected partial offers..
   * @param {string} id - Duffel's unique identifier for the partial offer request
   * @param {Object} [options] - Selected partial offers
   * @link https:/duffel.com/docs/api/partial-offer-requests/get-partial-offer-request-fares-by-id
   */
  public getFaresById = async (
    id: string,
    options?: SelectedPartialOffersParams,
  ): Promise<DuffelResponse<OfferRequest>> => {
    return this.request({
      method: 'GET',
      path: `${this.path}/${id}/fares`,
      params: options,
    })
  }
}
