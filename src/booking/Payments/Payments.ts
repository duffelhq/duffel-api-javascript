import { APIResponse, Payment, CreatePayment } from 'types'
import { Resource } from '../../Resource'

export class Payments extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'air/payments'
  }

  /**
   * Creates a payment for an existing pay later order.
   * An order can be paid for up to the time limit indicated in `payment_required_by`, after which the space held for the order will be released and you will have to create a new order.
   * @param {string} body.order_id
   * @param {string} body.payment
   */
  public create = async ({
    bodyParams,
    queryParams
  }: {
    bodyParams: CreatePayment
    queryParams?: Record<string, any>
  }): Promise<APIResponse<Payment>> => {
    return this.request({ method: 'POST', path: this.path, bodyParams, queryParams })
  }
}
