import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

interface SessionParameters {
  /**
   * A tracking reference for the booking that may be created within this Duffel Links session
   */
  reference: string
  /**
   * A url to return to when a flight is booked via Duffel Links
   */
  success_url: string
  /**
   * A url to return to when there is an error within Duffel Links
   */
  failure_url: string
  /**
   * A url to return to when the user exits Duffel Links before booking
   */
  abandonment_url: string
  /**
   * A primary color to show within Duffel Links
   */
  primary_color?: string
  /**
   * A url of the logo to show within Duffel Links
   */
  logo_url?: string
  /**
   * A markup amount to be added to the flights shown within Duffel Links
   */
  markup_amount?: number
  /**
   * A markup amount to be added to the flights shown within Duffel Links
   */
  markup_currency?: string
  /**
   * A markup percentage to be added to the flights shown within Duffel Links
   */
  markup_rate?: number
  /**
   * A text to be shown on the checkout page within Duffel Links
   */
  checkout_display_text?: string
}

interface Session {
  /**
   * The Duffel Links url that contains the specified configuration
   */
  url: string
}

export class Sessions extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'links/sessions'
  }

  /**
   * Create a Duffel Links Session per the configuration
   */
  public create = async (
    data: SessionParameters,
  ): Promise<DuffelResponse<Session>> =>
    this.request({ method: 'POST', path: this.path, data })
}
