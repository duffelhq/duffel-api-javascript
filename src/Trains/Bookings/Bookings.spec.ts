import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_BOOKING, MOCK_CREATE_BOOKING_PAYLOAD } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/Bookings', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /trains/bookings when `create` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/)
      .post('/trains/bookings', (body) => {
        expect(body.data).toEqual(MOCK_CREATE_BOOKING_PAYLOAD)
        return true
      })
      .reply(201, mockResponse)

    const response = await duffel.trains.bookings.create(
      MOCK_CREATE_BOOKING_PAYLOAD,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get /trains/bookings/{id} when `get` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/)
      .get(`/trains/bookings/${MOCK_BOOKING.id}`)
      .reply(200, mockResponse)

    const response = await duffel.trains.bookings.get(MOCK_BOOKING.id)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get /trains/bookings when `list` is called', async () => {
    const mockResponse = { data: [MOCK_BOOKING], meta: { limit: 50 } }

    nock(/(.*)/)
      .get('/trains/bookings')
      .query({ limit: '50' })
      .reply(200, mockResponse)

    const response = await duffel.trains.bookings.list({ limit: 50 })
    expect(response.data).toEqual(mockResponse.data)
  })
})
