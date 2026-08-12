import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_PASSENGER_CARD_TYPE } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/PassengerCardTypes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should get /trains/passenger_card_types when `list` is called', async () => {
    const mockResponse = { data: [MOCK_PASSENGER_CARD_TYPE] }

    nock(/(.*)/).get('/trains/passenger_card_types').reply(200, mockResponse)

    const response = await duffel.trains.passengerCardTypes.list()
    expect(response.data).toEqual(mockResponse.data)
  })
})
