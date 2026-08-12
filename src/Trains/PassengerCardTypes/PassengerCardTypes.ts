import { Client } from '../../Client'
import { TrainPassengerCardType } from '../TrainsTypes'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class PassengerCardTypes extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'trains/passenger_card_types'
  }

  /**
   * List all supported passenger discount card types for train journeys.
   * Pass a card's `id` as the `type_id` when creating a search.
   */
  public list = async (): Promise<DuffelResponse<TrainPassengerCardType[]>> =>
    this.request({ method: 'GET', path: this.path })
}
