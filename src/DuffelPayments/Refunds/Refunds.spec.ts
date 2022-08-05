import nock from 'nock'
import { mockRefund } from './mockRefunds'
import { Duffel } from '../../index'
import { CreateRefund } from './RefundsType'

const duffel = new Duffel({ token: 'mockToken' })
describe('Refunds', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a refund', async () => {
    nock(/(.*)/)
      .get(`/payments/refunds/${mockRefund.id}`)
      .reply(200, { data: mockRefund })

    const response = await duffel.refunds.get('ref_00009hthhsUZ8W4LxQgkjo')
    expect(response.data?.id).toBe(mockRefund.id)
  })

  test('should create a refund', async () => {
    const param: CreateRefund = {
      payment_intent_id: 'pit_00009hthhsUZ8W4LxQgkjo',
      currency: 'GBP',
      amount: '30.20',
    }
    nock(/(.*)/).post('/payments/refunds').reply(200, { data: mockRefund })

    const response = await duffel.refunds.create(param)
    expect(response.data?.payment_intent_id).toBe('pit_00009hthhsUZ8W4LxQgkjo')
  })
})
