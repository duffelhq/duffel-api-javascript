import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_CREATE_QUOTE_PAYLOAD, MOCK_QUOTE } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/Quotes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /trains/quotes when `create` is called', async () => {
    const mockResponse = { data: MOCK_QUOTE }

    nock(/(.*)/)
      .post('/trains/quotes', (body) => {
        expect(body.data).toEqual(MOCK_CREATE_QUOTE_PAYLOAD)
        return true
      })
      .reply(201, mockResponse)

    const response = await duffel.trains.quotes.create(
      MOCK_CREATE_QUOTE_PAYLOAD,
    )
    expect(response.data).toEqual(mockResponse.data)
  })
})
