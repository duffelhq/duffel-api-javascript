import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_NEGOTIATED_RATE } from '../mocks'
import {
  StaysNegotiatedRateCreatePayload,
  StaysNegotiatedRateUpdatePayload,
} from '../StaysTypes'

const duffel = new Duffel({ token: 'mockToken' })

describe('Stays/NegotiatedRates', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /stays/negotiated_rates when `create` is called with chain_id', async () => {
    const negotiatedRateWithChain = {
      ...MOCK_NEGOTIATED_RATE,
      chain_id: 'chn_0000B6QFxO9EOY5cqw5kYK',
      accommodation_ids: null,
    }
    const mockResponse = { data: negotiatedRateWithChain }
    const createPayload: StaysNegotiatedRateCreatePayload = {
      rate_access_code: 'DUFFEL',
      display_name: '2025 Negotiated Rate',
      chain_id: 'chn_0000B6QFxO9EOY5cqw5kYK',
    }

    nock(/(.*)/)
      .post('/stays/negotiated_rates', (body) => {
        expect(body.data).toEqual(createPayload)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.create(createPayload)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should post to /stays/negotiated_rates when `create` is called with accommodation_ids', async () => {
    const mockResponse = { data: MOCK_NEGOTIATED_RATE }
    const createPayload: StaysNegotiatedRateCreatePayload = {
      rate_access_code: 'DUFFEL',
      display_name: '2025 Negotiated Rate',
      accommodation_ids: ['acc_0000AWr2VsUNIF1Vl91xg0'],
    }

    nock(/(.*)/)
      .post('/stays/negotiated_rates', (body) => {
        expect(body.data).toEqual(createPayload)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.create(createPayload)
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get to /stays/negotiated_rates/{id} when `get` is called', async () => {
    const mockResponse = { data: MOCK_NEGOTIATED_RATE }

    nock(/(.*)/)
      .get(`/stays/negotiated_rates/${MOCK_NEGOTIATED_RATE.id}`)
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.get(
      MOCK_NEGOTIATED_RATE.id,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should patch to /stays/negotiated_rates/{id} when `update` is called', async () => {
    const updatedRate = {
      ...MOCK_NEGOTIATED_RATE,
      display_name: 'Updated Negotiated Rate',
    }
    const mockResponse = { data: updatedRate }
    const updatePayload: StaysNegotiatedRateUpdatePayload = {
      display_name: 'Updated Negotiated Rate',
    }

    nock(/(.*)/)
      .patch(`/stays/negotiated_rates/${MOCK_NEGOTIATED_RATE.id}`, (body) => {
        expect(body.data).toEqual(updatePayload)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.update(
      MOCK_NEGOTIATED_RATE.id,
      updatePayload,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should patch to /stays/negotiated_rates/{id} when `update` is called with chain_id', async () => {
    const updatedRate = {
      ...MOCK_NEGOTIATED_RATE,
      chain_id: 'chn_0000B6QFxO9EOY5cqw5kYK',
      accommodation_ids: null,
    }
    const mockResponse = { data: updatedRate }
    const updatePayload: StaysNegotiatedRateUpdatePayload = {
      chain_id: 'chn_0000B6QFxO9EOY5cqw5kYK',
    }

    nock(/(.*)/)
      .patch(`/stays/negotiated_rates/${MOCK_NEGOTIATED_RATE.id}`, (body) => {
        expect(body.data).toEqual(updatePayload)
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.update(
      MOCK_NEGOTIATED_RATE.id,
      updatePayload,
    )
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get to /stays/negotiated_rates when `list` is called', async () => {
    const mockResponse = { data: [MOCK_NEGOTIATED_RATE] }

    nock(/(.*)/).get('/stays/negotiated_rates').reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.list()
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get a page of negotiated rates when `list` is called with pagination params', async () => {
    const mockResponse = { data: [MOCK_NEGOTIATED_RATE] }

    nock(/(.*)/)
      .get('/stays/negotiated_rates')
      .query((queryObject) => {
        expect(queryObject.limit).toEqual('1')
        return true
      })
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.list({ limit: 1 })
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get all negotiated rates paginated', async () => {
    nock(/(.*)/)
      .get('/stays/negotiated_rates')
      .reply(200, {
        data: [MOCK_NEGOTIATED_RATE],
        meta: { limit: 1, before: null, after: null },
      })

    const response = duffel.stays.negotiatedRates.listWithGenerator()

    for await (const page of response) {
      expect(page.data.id).toBe(MOCK_NEGOTIATED_RATE.id)
    }
  })

  it('should delete to /stays/negotiated_rates/{id} when `delete` is called', async () => {
    const mockResponse = { data: MOCK_NEGOTIATED_RATE }

    nock(/(.*)/)
      .delete(`/stays/negotiated_rates/${MOCK_NEGOTIATED_RATE.id}`)
      .reply(200, mockResponse)

    const response = await duffel.stays.negotiatedRates.delete(
      MOCK_NEGOTIATED_RATE.id,
    )
    expect(response.data).toEqual(mockResponse.data)
  })
})
