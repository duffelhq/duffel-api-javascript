import nock from 'nock'
import { Duffel } from '../index'
import {
  MOCK_NEXT_JOURNEY_PAYLOAD,
  MOCK_SEARCH,
  MOCK_SEARCH_PARAMS,
} from './mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /trains/search when `search` is called', async () => {
    const mockResponse = { data: MOCK_SEARCH }

    nock(/(.*)/)
      .post('/trains/search', (body) => {
        expect(body.data).toEqual(MOCK_SEARCH_PARAMS)
        return true
      })
      .reply(201, mockResponse)

    const response = await duffel.trains.search(MOCK_SEARCH_PARAMS)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /trains/search/{id}/actions/next_journey when `nextJourney` is called', async () => {
    const searchId = MOCK_SEARCH.id
    const mockResponse = { data: MOCK_SEARCH }

    nock(/(.*)/)
      .post(`/trains/search/${searchId}/actions/next_journey`, (body) => {
        expect(body.data).toEqual(MOCK_NEXT_JOURNEY_PAYLOAD)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.trains.nextJourney(
      searchId,
      MOCK_NEXT_JOURNEY_PAYLOAD,
    )
    expect(response.data).toEqual(mockResponse.data)
  })
})
