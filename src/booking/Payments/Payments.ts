import { APIResponse } from 'types'
import { Payment, CreatePayment } from './PaymentsTypes'
import { Resource } from '../../Resource'

export class Payments extends Resource {
  /**
   * Creates a payment for an existing pay later order.
   * An order can be paid for up to the time limit indicated in `payment_required_by`, after which the space held for the order will be released and you will have to create a new order.
   * @param {string} body.orderId
   * @param {string} body.payment
   */
  public createPayment = async ({
    body,
    queryParams
  }: {
    body: CreatePayment
    queryParams?: Record<string, any>
  }): Promise<APIResponse<Payment>> => {
    return this.request('POST', `air/payments`, body, queryParams)
  }
}
