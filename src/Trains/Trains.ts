import { Client } from '../Client'
import {
  TrainNextJourneyPayload,
  TrainSearch,
  TrainSearchParams,
} from './TrainsTypes'
import { Resource } from '../Resource'
import { DuffelResponse } from '../types'
import { Bookings } from './Bookings'
import { Quotes } from './Quotes'
import { Stations } from './Stations'
import { PassengerCardTypes } from './PassengerCardTypes'
import { TicketAssets } from './TicketAssets'

export class Trains extends Resource {
  /**
   * Endpoint path
   */
  path: string

  public bookings: Bookings
  public quotes: Quotes
  public stations: Stations
  public passengerCardTypes: PassengerCardTypes
  public ticketAssets: TicketAssets

  constructor(client: Client) {
    super(client)
    this.path = 'trains'

    this.bookings = new Bookings(client)
    this.quotes = new Quotes(client)
    this.stations = new Stations(client)
    this.passengerCardTypes = new PassengerCardTypes(client)
    this.ticketAssets = new TicketAssets(client)
  }

  /**
   * Search for available train routes.
   * For a `single` or `open_return` search, pass one journey. For a `return` search, pass two
   * journeys (outward first, then inward) - route results are returned nested within each journey.
   * @param {object} params - The search parameters
   */
  public search = async (
    params: TrainSearchParams,
  ): Promise<DuffelResponse<TrainSearch>> =>
    this.request({ method: 'POST', path: `${this.path}/search`, data: params })

  /**
   * Fetch the available routes for the next (inward) journey in a return search, after an
   * outward offer has been selected.
   * @param {string} searchId - The ID of the train search
   * @param {object} payload - The selected outward journey and offer
   */
  public nextJourney = async (
    searchId: string,
    payload: TrainNextJourneyPayload,
  ): Promise<DuffelResponse<TrainSearch>> =>
    this.request({
      method: 'POST',
      path: `${this.path}/search/${searchId}/actions/next_journey`,
      data: payload,
    })
}
