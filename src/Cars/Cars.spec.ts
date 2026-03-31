import nock from 'nock'
import { Duffel } from '../index'
import { MOCK_SEARCH, MOCK_SEARCH_PARAMS } from './mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Cars', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /cars/search when `search` is called', async () => {
    const mockResponse = { data: MOCK_SEARCH }

    nock(/(.*)/)
      .post('/cars/search', (body) => {
        expect(body.data).toEqual(MOCK_SEARCH_PARAMS)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.cars.search(MOCK_SEARCH_PARAMS)
    expect(response.data).toEqual(mockResponse.data)
  })
})
