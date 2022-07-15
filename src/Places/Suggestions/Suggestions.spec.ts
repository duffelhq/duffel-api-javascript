import nock from 'nock'
import { mockPlacesSuggestionsResponse } from './mockSuggestions'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Suggestions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get Suggestions', async () => {
    nock(/(.*)/)
      .get('/places/suggestions')
      .query((queryObject) => {
        expect(queryObject?.query).toBe('heathr')
        return true
      })
      .reply(200, { data: [mockPlacesSuggestionsResponse] })

    const response = await duffel.suggestions.list({ query: 'heathr' })
    expect(response.data[0].id).toBe('arp_lhr_gb')
  })
})
