import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_ACCOMMODATION_SUGGESTION } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Accommodation', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/suggestions when `suggestions` is called', async () => {
    const query = 'rits'
    const mockResponse = { data: [MOCK_ACCOMMODATION_SUGGESTION] }

    nock(/(.*)/)
      .post('/stays/accommodation/suggestions', (body) => {
        expect(body.data.query).toEqual(query)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.accommodation.suggestions(query)
    expect(response.data).toEqual(mockResponse.data)
  })
})
