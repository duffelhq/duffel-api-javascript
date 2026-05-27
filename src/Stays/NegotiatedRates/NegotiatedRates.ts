import { Client } from '../../Client'
import {
  StaysNegotiatedRate,
  StaysNegotiatedRateCreatePayload,
  StaysNegotiatedRateUpdatePayload,
} from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse, PaginationMeta } from '../../types'

export class NegotiatedRates extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/negotiated_rates'
  }

  /**
   * Create a negotiated rate.
   * You must provide either chain_id or accommodation_id, but not both.
   * @param {object} payload - The negotiated rate payload
   */
  public create = async (
    payload: StaysNegotiatedRateCreatePayload,
  ): Promise<DuffelResponse<StaysNegotiatedRate>> =>
    this.request({
      method: 'POST',
      path: this.path,
      data: payload,
    })

  /**
   * Get a negotiated rate by ID
   * @param {string} id - The ID of the negotiated rate
   */
  public get = async (
    id: string,
  ): Promise<DuffelResponse<StaysNegotiatedRate>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${id}`,
    })

  /**
   * Update a negotiated rate
   * @param {string} id - The ID of the negotiated rate
   * @param {object} payload - The update payload
   */
  public update = async (
    id: string,
    payload: StaysNegotiatedRateUpdatePayload,
  ): Promise<DuffelResponse<StaysNegotiatedRate>> =>
    this.request({
      method: 'PATCH',
      path: `${this.path}/${id}`,
      data: payload,
    })

  /**
   * List negotiated rates
   * @param {Object} [options] - Pagination options (optional: limit, after, before)
   */
  public list = async (
    options?: PaginationMeta,
  ): Promise<DuffelResponse<StaysNegotiatedRate[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Retrieves a generator of all negotiated rates. The results may be returned in any order.
   */
  public listWithGenerator = (): AsyncGenerator<
    DuffelResponse<StaysNegotiatedRate>,
    void,
    unknown
  > => this.paginatedRequest({ path: this.path })

  /**
   * Delete a negotiated rate
   * @param {string} id - The ID of the negotiated rate
   */
  public delete = async (
    id: string,
  ): Promise<DuffelResponse<StaysNegotiatedRate>> =>
    this.request({
      method: 'DELETE',
      path: `${this.path}/${id}`,
    })
}
