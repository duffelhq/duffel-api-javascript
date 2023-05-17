import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_BOOKING } from '../mocks'
import { StaysBookingPayload } from './Bookings'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Bookings', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/bookings when `create` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }
    const mockBookingParams: StaysBookingPayload = {
      quote_id: 'quo_123',
      guests: [
        {
          given_name: 'John',
          family_name: 'Smith',
          born_on: '1980-01-01',
        },
      ],
      email: 'a@example.com',
      phone_number: '+447700900000',
    }

    nock(/(.*)/)
      .post('/stays/bookings', (body) => {
        expect(body.data).toEqual(mockBookingParams)
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.staysBookings.create(mockBookingParams)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get to /stays/bookings when `list` is called', async () => {
    const mockResponse = { data: [MOCK_BOOKING] }

    nock(/(.*)/).get('/stays/bookings').reply(200, mockResponse)
    const response = await duffel.staysBookings.list()
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get to /stays/bookings/{id} when `get` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/).get('/stays/bookings/bok_123').reply(200, mockResponse)
    const response = await duffel.staysBookings.get('bok_123')
    expect(response.data).toEqual(mockResponse.data)
  })
})
