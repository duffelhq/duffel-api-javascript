import { Client } from '../../Client'
import { StaysAccommodationBrand } from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class Brands extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/brands'
  }

  /**
   * Get a brand
   * @param {string} brandId - The ID of the brand
   */
  public get = async (
    brandId: string,
  ): Promise<DuffelResponse<StaysAccommodationBrand>> =>
    this.request({
      method: 'GET',
      path: `${this.path}/${brandId}`,
    })

  /**
   * List brands
   */
  public list = async (): Promise<DuffelResponse<StaysAccommodationBrand[]>> =>
    this.request({
      method: 'GET',
      path: this.path,
    })
}
