import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_QUOTE } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Cars/Quotes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /cars/quotes when `create` is called', async () => {
    const rateId = 'rae_0000B4gHZfFvCNgBj3EIaX'
    const mockResponse = { data: MOCK_QUOTE }

    nock(/(.*)/)
      .post('/cars/quotes', (body) => {
        expect(body.data.rate_id).toEqual(rateId)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.cars.quotes.create(rateId)
    expect(response.data).toEqual(mockResponse.data)
  })
})
