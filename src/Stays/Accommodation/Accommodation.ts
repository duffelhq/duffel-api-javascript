import { Client } from '../../Client'
import {
  LocationParams,
  ListAccommodationParams,
  StaysAccommodationSuggestion,
  StaysAccommodation,
} from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Accommodation extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/accommodation'
  }

  /**
   * Get suggestions for accommodation given a query string.
   * @param {string} query - The query string for the search
   */
  public suggestions = async (
    query: string,
    location?: LocationParams,
  ): Promise<DuffelResponse<StaysAccommodationSuggestion[]>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/suggestions`,
      data: {
        query: query,
        location: location,
      },
    })

  /**
   * Get information about an accommodation with a specific Duffel ID
   * @param {string} id - The Duffel ID of the Accommodation
   */
  public get = async (
    id: StaysAccommodation['id'],
  ): Promise<DuffelResponse<StaysAccommodation>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${id}`,
    })

  public list = (
    params: ListAccommodationParams,
  ): Promise<DuffelResponse<StaysAccommodation[]>> =>
    this.request({
      method: 'GET',
      path: `${this.path}`,
      params: params,
    })
}
