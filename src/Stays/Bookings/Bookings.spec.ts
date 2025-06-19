import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_BOOKING } from '../mocks'
import { StaysBookingPayload } from './Bookings'

const mockBookingParams: StaysBookingPayload = {
  quote_id: 'quo_123',
  loyalty_programme_account_number: '123456789',
  guests: [
    {
      given_name: 'John',
      family_name: 'Smith',
    },
  ],
  email: 'a@example.com',
  phone_number: '+447700900000',
  metadata: {
    customer_reference_number: 'ABXYZZ53Z',
  },
}

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Bookings', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/bookings when `create` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/)
      .post('/stays/bookings', (body) => {
        expect(body.data).toEqual(mockBookingParams)
        return true
      })
      .reply(200, mockResponse)
    const response = await duffel.stays.bookings.create(mockBookingParams)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /stays/bookings when `create` is called', async () => {
    nock(/(.*)/)
      .post('/stays/bookings', (body) => {
        expect(body.data).toEqual(mockBookingParams)
        return true
      })
      .reply(202, { data: { message: 'Not done yet' } })
    const response = await duffel.stays.bookings.create(mockBookingParams)
    expect(response.status).toEqual(202)
  })

  it('should get to /stays/bookings when `list` is called', async () => {
    const mockResponse = { data: [MOCK_BOOKING] }

    nock(/(.*)/).get('/stays/bookings').reply(200, mockResponse)
    const response = await duffel.stays.bookings.list()
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get a page of bookings when `list` is called with pagination params', async () => {
    const mockResponse = { data: [MOCK_BOOKING] }

    nock(/(.*)/)
      .get('/stays/bookings')
      .query((queryObject) => {
        expect(queryObject.limit).toEqual('1')
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.bookings.list({ limit: 1 })
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get all bookings paginated', async () => {
    nock(/(.*)/)
      .get(`/stays/bookings`)
      .reply(200, {
        data: [MOCK_BOOKING],
        meta: { limit: 1, before: null, after: null },
      })

    const response = duffel.stays.bookings.listWithGenerator()

    for await (const page of response) {
      expect(page.data.id).toBe(MOCK_BOOKING.id)
    }
  })

  it('should get to /stays/bookings/{id} when `get` is called', async () => {
    const mockResponse = { data: MOCK_BOOKING }

    nock(/(.*)/).get('/stays/bookings/bok_123').reply(200, mockResponse)
    const response = await duffel.stays.bookings.get('bok_123')
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /stays/bookings/{id}/actions/cancel when `cancel` is called', async () => {
    const mockResponse = {
      data: {
        ...MOCK_BOOKING,
        status: 'cancelled',
      },
    }

    nock(/(.*)/)
      .post('/stays/bookings/bok_123/actions/cancel')
      .reply(200, mockResponse)
    const response = await duffel.stays.bookings.cancel('bok_123')
    expect(response.data).toEqual(mockResponse.data)
  })
})
