import nock from 'nock'
import { Duffel } from '../../../index'
import { MOCK_BOOKING, MOCK_BOOKING_CANCELLATION } from '../../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/Bookings/Cancellations', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /trains/bookings/{booking_id}/cancellations when `create` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING_CANCELLATION }

    nock(/(.*)/)
      .post(`/trains/bookings/${MOCK_BOOKING.id}/cancellations`)
      .reply(201, mockResponse)

    const response = await duffel.trains.bookings.cancellations.create(
      MOCK_BOOKING.id,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /trains/bookings/{booking_id}/cancellations/{id}/actions/confirm when `confirm` is called', async () => {
    const mockResponse = {
      data: {
        ...MOCK_BOOKING_CANCELLATION,
        confirmed_at: '2024-01-15T10:50:00Z',
      },
    }

    nock(/(.*)/)
      .post(
        `/trains/bookings/${MOCK_BOOKING.id}/cancellations/${MOCK_BOOKING_CANCELLATION.id}/actions/confirm`,
      )
      .reply(200, mockResponse)

    const response = await duffel.trains.bookings.cancellations.confirm(
      MOCK_BOOKING.id,
      MOCK_BOOKING_CANCELLATION.id,
    )
    expect(response.data).toEqual(mockResponse.data)
  })
})
