import { Client } from 'Client'
import { StaysSearchParams, StaysSearchResult } from './types'
import { Resource } from '../Resource'
import { DuffelResponse } from '../types'

export class Stays extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays'
  }

  /**
   * Search for accommodations
   * @param {object} params - The search parameters
   */
  public search = async (
    params: StaysSearchParams
  ): Promise<DuffelResponse<StaysSearchResult>> =>
    this.request({ method: 'POST', path: `${this.path}/search`, data: params })
}
