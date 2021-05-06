import nock from 'nock'
import { Client } from '../../Client'
import { Payments } from './Payments'
import { mockPayment } from './mockPayment'
import { CreatePayment } from './PaymentsTypes'

describe('Payments', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  test('should create a payment', async () => {
    const bodyParams: CreatePayment = {
      order_id: 'ord_00003x8pVDGcS8y2AWCoWv',
      payment: { amount: '30.20', currency: 'GBP', type: 'balance' }
    }
    nock(/(.*)/).post(`/air/payments`).query(true).reply(200, { data: mockPayment })

    const response = await new Payments(new Client({ token: 'mockToken' })).create({ bodyParams: bodyParams })
    expect(response.data?.id).toBe(mockPayment.id)
  })
})
