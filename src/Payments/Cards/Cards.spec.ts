import nock from 'nock'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Cards', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should create a card record when `create` is called', async () => {
    const MOCK_ID = 'tcd_00009hthhsUZ8W4LxQgkjb'
    nock(/(.*)/)
      .post('/payments/cards')
      .reply(200, {
        data: {
          id: MOCK_ID,
          liveMode: false,
          unavailableAt: '2024-01-01T00:00:00',
          brand: 'visa',
          multiUse: false,
          last4Digits: '4242',
        },
      })

    const response = await duffel.cards.create({
      address_city: 'London',
      address_country_code: 'GB',
      address_line_1: '1 Downing St',
      address_postal_code: 'EC2A 4RQ',
      address_region: 'London',
      expiry_month: '03',
      expiry_year: '30',
      name: 'Neil Armstrong',
      number: '4242424242424242',
      cvc: '123',
      multi_use: false,
    })
    expect(response.data.id).toBe(MOCK_ID)
  })
})
