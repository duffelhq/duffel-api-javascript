export interface SelectedPartialOffersParams {
  /**
   * Whether to filter orders that are awaiting payment or not. If not specified, all orders regardless of their payment state will be returned.
   */
  'selected_partial_offer[]'?: string[]
}

export interface CreatePartialOfferRequestQueryParam {
  /**
   * The maximum amount of time in milliseconds to wait for each airline search to complete.
   * This timeout applies to the response time of the call to the airline and includes
   * some additional overhead added by Duffel. Value should be between `2` seconds and `60` seconds.
   * Any values outside the range will be ignored and the default supplier_timeout will be used.
   * If a value is set, the response will only include offers from airline searches that completed
   * within the given time. If a value is not set, the response will only include offers from
   * airline searches that completed within the default supplier_timeout value of 20 seconds.
   * We recommend setting supplier_timeout lower than the timeout on the HTTP request you send to
   * Duffel API as that will allow us to respond with the offers we received before your request
   * times out with an empty response.
   */
  supplier_timeout?: number
}
