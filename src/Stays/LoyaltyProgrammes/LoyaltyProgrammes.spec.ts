import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_LOYALTY_PROGRAMMES } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/LoyaltyProgrammes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should send a get to /stays/loyalty_programmes when `list` is called', async () => {
    const mockResponse = { data: MOCK_LOYALTY_PROGRAMMES }

    nock(/(.*)/).get('/stays/loyalty_programmes').reply(200, mockResponse)

    const response = await duffel.stays.loyaltyProgrammes.list()

    expect(response.data).toEqual(mockResponse.data)
  })
})
