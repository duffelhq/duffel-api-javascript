import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_ACCOMMODATION_SUGGESTION, MOCK_ACCOMMODATION } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Accommodation', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/suggestions when `suggestions` is called', async () => {
    const query = 'rits'
    const location = {
      geographic_coordinates: { latitude: 51.5287398, longitude: -0.2664005 },
      radius: 5,
    }

    const mockResponse = { data: [MOCK_ACCOMMODATION_SUGGESTION] }

    nock(/(.*)/)
      .post('/stays/accommodation/suggestions', (body) => {
        expect(body.data.query).toEqual(query)
        expect(body.data.location).toEqual(location)

        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.accommodation.suggestions(
      query,
      location,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /stays/suggestions without a location when `suggestions` is called with only a query', async () => {
    const query = 'rits'
    const mockResponse = { data: [MOCK_ACCOMMODATION_SUGGESTION] }

    nock(/(.*)/)
      .post('/stays/accommodation/suggestions', (body) => {
        expect(body.data.query).toEqual(query)
        expect(body.data.location).toBeUndefined()
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.accommodation.suggestions(query)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should send GET to /stays/{id} when `get` is called', async () => {
    const id = MOCK_ACCOMMODATION.id
    const mockResponse = { data: MOCK_ACCOMMODATION }

    nock(/(.*)/)
      .get(`/stays/accommodation/${id}`, () => {
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.accommodation.get(id)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should send GET to /stays/accommodation when `list` is called', async () => {
    const mockResponse = {
      data: [MOCK_ACCOMMODATION],
      meta: { limit: 1, before: null, after: null },
    }

    const params = {
      radius: 7,
      latitude: 13.5276927,
      longitude: 122.1160988,
    }

    nock(/(.*)/)
      .get(`/stays/accommodation`)
      .query((queryObject) => {
        expect(parseInt(queryObject.radius as string)).toEqual(params.radius)
        expect(parseFloat(queryObject.latitude as string)).toEqual(
          params.latitude,
        )
        expect(parseFloat(queryObject.longitude as string)).toEqual(
          params.longitude,
        )

        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.accommodation.list(params)

    expect(response.data).toEqual(mockResponse.data)
    expect(response.meta).toEqual(mockResponse.meta)
  })

  it('should send GET to /stays/accommodation when an individual item from `listWithGenerator` is executed', async () => {
    const mockFirstPageResponse = {
      data: [MOCK_ACCOMMODATION],
      meta: { limit: 2, before: null, after: 'next_page_token' },
    }

    const mockLastPageResponse = {
      data: [MOCK_ACCOMMODATION],
      meta: { limit: 1, before: 'prev_page_token', after: null },
    }

    const params = {
      radius: 7,
      latitude: 13.5276927,
      longitude: 122.1160988,
    }

    // First Page expectations
    nock(/(.*)/)
      .get(`/stays/accommodation`)
      .query((queryObject) => {
        expect(parseInt(queryObject.radius as string)).toEqual(params.radius)
        expect(parseFloat(queryObject.latitude as string)).toEqual(
          params.latitude,
        )
        expect(parseFloat(queryObject.longitude as string)).toEqual(
          params.longitude,
        )

        return true
      })
      .reply(200, mockFirstPageResponse)

    // Last Page expectations
    nock(/(.*)/)
      .get(`/stays/accommodation`)
      .query((queryObject) => {
        expect(parseInt(queryObject.radius as string)).toEqual(params.radius)
        expect(parseFloat(queryObject.latitude as string)).toEqual(
          params.latitude,
        )
        expect(parseFloat(queryObject.longitude as string)).toEqual(
          params.longitude,
        )

        return true
      })
      .reply(200, mockLastPageResponse)

    const generator = duffel.stays.accommodation.listWithGenerator(params)

    const firstItem = await generator.next()
    expect(firstItem.value.data).toEqual(MOCK_ACCOMMODATION)
    expect(firstItem.done).toBe(false)

    const lastItem = await generator.next()
    expect(lastItem.value.data).toEqual(MOCK_ACCOMMODATION)
    expect(lastItem.done).toBe(false)

    const terminatingItem = await generator.next()
    expect(terminatingItem.value).toBeUndefined()
    expect(terminatingItem.done).toBe(true)
  })
})
