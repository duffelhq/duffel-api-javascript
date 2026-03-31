import { Client } from '../Client'
import { CarsSearchParams, CarsSearch } from './CarsTypes'
import { Resource } from '../Resource'
import { DuffelResponse } from '../types'
import { Bookings } from './Bookings'
import { Quotes } from './Quotes'

export class Cars extends Resource {
  /**
   * Endpoint path
   */
  path: string

  public bookings: Bookings
  public quotes: Quotes

  constructor(client: Client) {
    super(client)
    this.path = 'cars'

    this.bookings = new Bookings(client)
    this.quotes = new Quotes(client)
  }

  /**
   * Search for available rental cars
   * @param {object} params - The search parameters
   */
  public search = async (
    params: CarsSearchParams,
  ): Promise<DuffelResponse<CarsSearch>> =>
    this.request({ method: 'POST', path: `${this.path}/search`, data: params })
}
