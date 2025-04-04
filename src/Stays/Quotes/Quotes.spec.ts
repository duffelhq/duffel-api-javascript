import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_QUOTE } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Quotes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should get /stays/quote/:id when `get` is called', async () => {
    const quoteId = 'quo_123'
    const mockResponse = { data: MOCK_QUOTE }

    nock(/(.*)/)
      .get(`/stays/quotes/${quoteId}`, (_) => {
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.stays.quotes.get(quoteId)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /stays/quotes when `create` is called', async () => {
    const rateId = 'rat_123'
    const mockResponse = { data: MOCK_QUOTE }

    nock(/(.*)/)
      .post('/stays/quotes', (body) => {
        expect(body.data.rate_id).toEqual(rateId)
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.stays.quotes.create(rateId)
    expect(response.data).toEqual(mockResponse.data)
  })
})
