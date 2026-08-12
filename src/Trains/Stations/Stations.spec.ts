import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_STATION_SUGGESTION } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/Stations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should get /trains/stations/suggestions when `suggestions` is called', async () => {
    const mockResponse = { data: [MOCK_STATION_SUGGESTION] }

    nock(/(.*)/)
      .get('/trains/stations/suggestions')
      .query({ query: 'Central' })
      .reply(200, mockResponse)

    const response = await duffel.trains.stations.suggestions('Central')
    expect(response.data).toEqual(mockResponse.data)
  })
})
