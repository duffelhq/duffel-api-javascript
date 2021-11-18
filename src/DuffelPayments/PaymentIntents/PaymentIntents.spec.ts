import nock from 'nock'
import { Client } from '../../Client'
import { PaymentIntents } from './PaymentIntents'
import {
  mockCreatePaymentIntent,
  mockPaymentIntents,
} from './mockPaymentIntents'

describe('PaymentIntents', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single Payment Intent', async () => {
    nock(/(.*)/)
      .get(`/air/payments/payment_intents/${mockPaymentIntents.id}`)
      .reply(200, { data: mockPaymentIntents })

    const response = await new PaymentIntents(
      new Client({ token: 'mockToken' })
    ).get(mockPaymentIntents.id)
    expect(response.data?.id).toBe(mockPaymentIntents.id)
  })

  test('should create a Payment Intent', async () => {
    nock(/(.*)/)
      .post(`/air/payments/payment_intents`, (body) => {
        expect(body.data).toEqual(mockCreatePaymentIntent)
        return true
      })
      .reply(200, { data: mockPaymentIntents })

    const response = await new PaymentIntents(
      new Client({ token: 'mockToken' })
    ).create(mockCreatePaymentIntent)
    expect(response.data?.id).toBe(mockPaymentIntents.id)
  })

  test('should confirm a Payment Intent', async () => {
    nock(/(.*)/)
      .post(
        `/air/payments/payment_intents/${mockPaymentIntents.id}/actions/confirm`
      )
      .reply(200, { data: mockPaymentIntents })

    const response = await new PaymentIntents(
      new Client({ token: 'mockToken' })
    ).confirm(mockPaymentIntents.id)
    expect(response.data?.id).toBe(mockPaymentIntents.id)
  })
})
