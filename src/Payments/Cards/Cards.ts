import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

interface CardParameters {
  /**
   * The first line of the card owner's address
   */
  address_line_1: string

  /**
   * The card owner's postal code (or zip code)
   */
  address_postal_code: string
  /**
   * The card owner's city
   */
  address_city: string
  /**
   * The card owner's region or state
   */
  address_region: string
  /**
   * The ISO 3166-1 alpha-2 code for the card owner's country
   */
  address_country_code: string
  /**
   * The month that the card expires in as a two-digit string, e.g. "01"
   */
  expiry_month: string
  /**
   * The year that the card expires in as a two-digit string, e.g. "28"
   */
  expiry_year: string
  /**
   * The card owner's name
   */
  name: string
  /**
   * The card number
   */
  number: string
  /**
   * The card verification code
   */
  cvc: string
  /**
   * Set to true to indicate that this card can be used multiple times
   */
  multi_use: boolean
}

interface CardRecord {
  id: string
  live_mode: boolean
  multi_use: boolean
  unavailable_at: string
  brand: string
  last_4_digits: string
}

export class Cards extends Resource {
  /**
   * Endpoint path
   */
  path: string

  // basePath must be 'https://api.duffel.cards'
  constructor(client: Client) {
    super(client)
    this.path = 'payments/cards'
  }

  /**
   * Create a Duffel card record
   */
  public create = async (
    data: CardParameters,
  ): Promise<DuffelResponse<CardRecord>> =>
    this.request({ method: 'POST', path: this.path, data })
}
