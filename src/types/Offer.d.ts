/**
 * Each offer represents flights you can buy from an airline at a particular price that meet your search criteria.
 * @link https://duffel.com/docs/api/offers/schema
 */
export interface Offer {
  /**
   * The types of identity documents that may be provided for the passengers when creating an order based on this offer.
   * Currently, the only supported type is `passport`. If this is `[]`, then you must not provide identity documents.
   */
  allowed_passenger_identity_document_types: PassengerIdentityDocumentType[]

  /**
   * The services that can be booked along with the offer but are not included by default, for example an additional checked bag.
   * This field is only returned in the Get single offer endpoint.
   * When there are no services available, or we don't support services for the airline, this list will be empty.
   */
  available_services: OfferAvailableService[]

  /**
   * The base price of the offer for all passengers, excluding taxes.
   * It does not include the base amount of any service(s) that might be booked with the offer.
   */
  base_amount: string

  /**
   * The currency of the `base_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  base_currency: string

  /**
   * The conditions associated with this offer, describing the kinds of modifications you can make post-booking and any penalties that will apply to those modifications.
   * This information assumes the condition is applied to all of the slices and passengers associated with this offer - for information at the slice level (e.g. "what happens if I just want to change the first slice?") refer to the `slices`.
   * If a particular kind of modification is allowed, you may not always be able to take action through the Duffel API.
   * In some cases, you may need to contact the Duffel support team or the airline directly.
   */
  conditions: DuffelAPITypes.FlightsConditions

  /**
   * The ISO 8601 datetime at which the offer was created
   */
  created_at: string

  /**
   * The ISO 8601 datetime at which the offer will expire and no longer be usable to create an order
   */
  expires_at: string

  /**
   * Duffel's unique identifier for the offer
   */
  id: string

  /**
   * Whether the offer request was created in live mode.
   * This field will be set to `true` if the offer request was created in live mode, or `false` if it was created in test mode.
   */
  live_mode: boolean

  /**
   * The airline which provided the offer
   */
  owner: OfferOwner

  /**
   * Whether identity documents must be provided for each of the passengers when creating an order based on this offer.
   * If this is `true`, you must provide an identity document for every passenger.
   */
  passenger_identity_documents_required: boolean

  /**
   * The passengers included in the offer
   */
  passengers: OfferPassenger[]

  /**
   * The payment requirements for this offer
   */
  payment_requirements: PaymentRequirements

  /**
   * The slices that make up this offer. Each slice will include one or more segments,
   * the specific flights that the airline is offering to take the passengers from the slice's `origin` to its `destination`.
   */
  slices: OfferSlice[]

  /**
   * The amount of tax payable on the offer for all passengers
   */
  tax_amount: string | null

  /**
   * The currency of the `tax_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  tax_currency: string | null

  /**
   * The total price of the offer for all passengers, including taxes.
   * It does not include the total price of any service(s) that might be booked with the offer.
   */
  total_amount: string

  /**
   * An estimate of the total carbon dioxide (CO₂) emissions when
   * all of the passengers fly this offer's itinerary, measured in kilograms
   */
  total_emissions_kg: string

  /**
   * The currency of the `total_amount`, as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code
   */
  total_currency: string

  /**
   * The ISO 8601 datetime at which the offer was last updated
   */
  updated_at: string
}
