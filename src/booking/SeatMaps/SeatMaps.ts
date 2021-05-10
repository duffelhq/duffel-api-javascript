import { APIResponse, SeatMap } from 'types'
import { Resource } from '../../Resource'

export class SeatMaps extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/seat_maps'
  }

  /**
   * Gets seat maps by specific parameters. At the moment we only support querying by an offer ID.
   * @param {string} offer_id - Duffel's unique identifier for the offer
   * @link https://duffel.com/docs/api/seat-maps/get-seat-maps
   */
  public get = async (id: string): Promise<APIResponse<SeatMap>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })
}
