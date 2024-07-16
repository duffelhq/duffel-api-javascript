import { Client } from '../../Client'
import { StaysLoyaltyProgramme } from '../StaysTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class LoyaltyProgrammes extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'stays/loyalty_programmes'
  }

  /**
   * List all the loyalty programmes supported by Duffel Stays
   */
  public list = async (): Promise<DuffelResponse<StaysLoyaltyProgramme[]>> =>
    this.request({
      method: 'GET',
      path: this.path,
    })
}
