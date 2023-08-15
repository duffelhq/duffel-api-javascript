import nock from 'nock'
import { Duffel } from '../index'
import { MOCK_SEARCH_RESULT } from './mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post location params to /stays/search when `search` is called', async () => {
    const mockResponse = { data: { results: [MOCK_SEARCH_RESULT] } }
    const mockSearchParams = {
      location: {
        radius: 5,
        geographic_coordinates: {
          latitude: 40.73061,
          longitude: -73.935242,
        },
      },
      check_in_date: '2023-10-20',
      check_out_date: '2023-10-24',
      adults: 2,
      rooms: 1,
    }

    nock(/(.*)/)
      .post('/stays/search', (body) => {
        expect(body.data).toEqual(mockSearchParams)
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.stays.search(mockSearchParams)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post accommodation params to /stays/search when `search` is called', async () => {
    const mockResponse = { data: { results: [MOCK_SEARCH_RESULT] } }
    const mockSearchParams = {
      accommodation: {
        ids: ['acc_12345'],
        fetch_rates: true,
      },
      check_in_date: '2023-10-20',
      check_out_date: '2023-10-24',
      adults: 2,
      rooms: 1,
    }

    nock(/(.*)/)
      .post('/stays/search', (body) => {
        expect(body.data).toEqual(mockSearchParams)
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.stays.search(mockSearchParams)
    expect(response.data).toEqual(mockResponse.data)
  })
})
