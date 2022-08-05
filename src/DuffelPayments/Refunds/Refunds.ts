import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'
import { CreateRefund, Refund } from './RefundsType'

export class Refunds extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'payments/refunds'
  }

  /**
   * You should use this API to get the complete, up-to-date information about a Refund.
   * @param {string} id - Duffel's unique identifier for the Refund
   * @link https://duffel.com/docs/api/refunds/get-refund-by-id
   */
  public get = async (id: string): Promise<DuffelResponse<Refund>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Create a Refund to refund some money to a customer that they paid using a Payment Intent. You must specify the amount and currency. The currency is currently limited to the currency in which the Payment Intent was made.
   * @param {Object.<CreateFund>} params - Endpoint params (amount, currency and payment_intent_id)
   */
  public create = async (
    params: CreateRefund
  ): Promise<DuffelResponse<Refund>> => {
    return this.request({ method: 'POST', path: this.path, data: params })
  }
}
