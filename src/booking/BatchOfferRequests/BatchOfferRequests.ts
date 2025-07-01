import { Client } from '../../Client'
import { Resource } from '../../Resource'
import {
  BatchOfferRequest,
  CreateBatchOfferRequest,
  CreateBatchOfferRequestResponse,
  CreateBatchOfferRequestQueryParameters,
  DuffelResponse,
} from '../../types'

/**
 * To search for flights, you'll need to create an `offer request`.
 * The batch offer requests endpoint allows you to retrieve orders as soon as they become available.
 * They function as long-polling resources that you can repeatedly retrieve after creating them, returning whatever offers are available at the time or waiting for more to become available. Batches are expected to be consumed promptly, and as such, batch offer requests expire after one minute. However, offers remain accessible and can be retrieved using the offer request ID as usual.
 * @class
 * @link https://duffel.com/docs/api/batch-offer-requests
 */
export class BatchOfferRequests extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'air/batch_offer_requests'
  }

  /**
   * Call this endpoint repeatedly to retrieve all the offers as they become available. The total_batches and remaining_batches properties can be used to estimate the remaining amount of work, although you may receive multiple batches at the same time if multiple batches are available.
   * Once you get a response with remaining_batches of 0 you can stop requesting the endpoint as there are no more offers coming.
   * @param {string} id - Duffel's unique identifier for the offer request
   * @link https:/duffel.com/docs/api/offer-requests/get-offer-request-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<BatchOfferRequest>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * To search for flights, you'll need to create an `offer request`.
   * An offer request describes the passengers and where and when they want to travel (in the form of a list of `slices`).
   * It may also include additional filters (e.g. a particular cabin to travel in).
   * Batch offer requests are a mechanism for retrieving offers as they become available, instead of waiting for the entire offer payload to finish processing.
   * They function as long-polling resources that you can repeatedly retrieve after creating them, returning whatever offers are available at the time or waiting for more to become available. Batches are expected to be consumed promptly, and as such, batch offer requests expire after one minute.
   * However, offers remain accessible and can be retrieved using the offer request ID as usual.
   * @param {Object} [options] - the parameters for making an offer requests (required: slices, passengers; optional: cabin_class)
   * @link https://duffel.com/docs/api/v2/batch-offer-requests/create-batch-offer-request
   */
  public create = async <
    QueryParams extends CreateBatchOfferRequestQueryParameters,
  >(
    options: CreateBatchOfferRequest & QueryParams,
  ): Promise<DuffelResponse<CreateBatchOfferRequestResponse>> => {
    const { supplier_timeout, ...data } = options

    return this.request({
      method: 'POST',
      path: `${this.path}/`,
      data,
      params: {
        ...(supplier_timeout !== undefined &&
          supplier_timeout !== null && { supplier_timeout }),
      },
    })
  }
}
