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
      .post('/vault/cards')
      .reply(200, { data: { id: MOCK_ID, liveMode: false } })

    const response = await duffel.cards.create({
      address_city: 'London',
      address_country_code: 'GB',
      address_line_1: '1 Downing St',
      address_postal_code: 'EC2A 4RQ',
      address_region: 'London',
      brand: 'visa',
      expiry_month: '03',
      expiry_year: '30',
      name: 'Neil Armstrong',
      number: '4242424242424242',
      cvc: '123',
    })
    expect(response.data.id).toBe(MOCK_ID)
  })
})
