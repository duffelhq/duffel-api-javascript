import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_SEARCH_RESULT } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/SearchResults', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/search_results/{id}/actions/fetch_all_rates when `fetchAllRates` is called', async () => {
    nock(/(.*)/)
      .post('/stays/search_results/rat_123/actions/fetch_all_rates')
      .reply(200, { data: MOCK_SEARCH_RESULT })

    const response = await duffel.staysSearchResults.fetchAllRates('rat_123')
    expect(response.data).toEqual(MOCK_SEARCH_RESULT)
  })
})
