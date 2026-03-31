import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_BOOKING, MOCK_CREATE_BOOKING_PAYLOAD } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Cars/Bookings', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /cars/bookings when `create` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/)
      .post('/cars/bookings', (body) => {
        expect(body.data).toEqual(MOCK_CREATE_BOOKING_PAYLOAD)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.cars.bookings.create(
      MOCK_CREATE_BOOKING_PAYLOAD,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get /cars/bookings/{id} when `get` is called', async () => {
    const bookingId = 'boo_0000Cx4Af0b5l45AT50eqO'
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/).get(`/cars/bookings/${bookingId}`).reply(200, mockResponse)

    const response = await duffel.cars.bookings.get(bookingId)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /cars/bookings/{id}/actions/cancel when `cancel` is called', async () => {
    const bookingId = 'boo_0000Cx4Af0b5l45AT50eqO'
    const mockResponse = {
      data: {
        ...MOCK_BOOKING,
        status: 'cancelled',
        cancelled_at: '2024-01-16T10:00:00Z',
      },
    }

    nock(/(.*)/)
      .post(`/cars/bookings/${bookingId}/actions/cancel`)
      .reply(200, mockResponse)

    const response = await duffel.cars.bookings.cancel(bookingId)
    expect(response.data).toEqual(mockResponse.data)
  })
})
