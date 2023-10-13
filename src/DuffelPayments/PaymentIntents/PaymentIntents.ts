import { DuffelResponse } from '../../types'
import { Resource } from '../../Resource'
import { CreatePaymentIntent, PaymentIntent } from './PaymentIntentsType'

export class PaymentIntents extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'payments/payment_intents'
  }

  /**
   * You should use this API to get the complete, up-to-date information about a Payment Intent.
   * @param {string} id - Duffel's unique identifier for the Payment Intent
   * @link https://duffel.com/docs/api/payment-intents/get-payment-intent-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<PaymentIntent>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Once you've successfully collected the customer's card details, using the `client_token` from when you first created the Payment Intent, you then need to confirm it using this endpoint.
   * Once confirmed, the amount charged to your customer's card will be added to your `Balance` (minus any Duffel Payment fees).
   */
  public confirm = async (id: string): Promise<DuffelResponse<PaymentIntent>> =>
    this.request({ method: 'POST', path: `${this.path}/${id}/actions/confirm` })

  /**
   * To begin the process of collecting a card payment from your customer, you need to create a Payment Intent.
   * The Payment Intent will contain a `client_token` that you use to collect the card payment in your application.
   * If the Payment Intent is created in test mode you should use a [test card](https://duffel.com/docs/api/overview/test-mode/test-card-numbers).
   * @param {Object.<CreatePaymentIntent>} params - Endpoint params (amount and string)
   */
  public create = async (
    params: CreatePaymentIntent,
  ): Promise<DuffelResponse<PaymentIntent>> => {
    return this.request({ method: 'POST', path: this.path, data: params })
  }
}
