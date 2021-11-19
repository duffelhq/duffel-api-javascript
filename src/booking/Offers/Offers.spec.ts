import nock from 'nock'
import { Client } from '../../Client'
import { mockOffer, mockUpdatedOffer } from './mockOffer'
import { Offers } from './Offers'

describe('offers', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer', async () => {
    nock(/(.*)/)
      .get(`/air/offers/${mockOffer.id}`)
      .reply(200, { data: { ...mockOffer, available_services: [] } })

    const response = await new Offers(new Client({ token: 'mockToken' })).get(
      mockOffer.id
    )
    expect(response.data?.id).toBe(mockOffer.id)
    expect(response.data?.available_services).toHaveLength(0)
  })

  test('should get a single offer with available services', async () => {
    nock(/(.*)/)
      .get(`/air/offers/${mockOffer.id}?return_available_services=true`)
      .reply(200, { data: mockOffer })

    const response = await new Offers(new Client({ token: 'mockToken' })).get(
      mockOffer.id,
      {
        return_available_services: true,
      }
    )
    expect(response.data?.id).toBe(mockOffer.id)
    expect(response.data?.available_services).toHaveLength(1)
  })

  test('should get a page of offers', async () => {
    nock(/(.*)/)
      .get(`/air/offers`)
      .query((queryObject) => {
        expect(queryObject?.offer_request_id).toBe(mockOffer.id)
        expect(queryObject?.limit).toEqual('1')
        return true
      })
      .reply(200, {
        data: [mockOffer],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Offers(new Client({ token: 'mockToken' })).list({
      offer_request_id: mockOffer.id,
      limit: 1,
    })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOffer.id)
  })

  test('should get all offers paginated', async () => {
    nock(/(.*)/)
      .get(`/air/offers`)
      .query((queryObject) => {
        expect(queryObject?.offer_request_id).toBe(mockOffer.id)
        return true
      })
      .reply(200, {
        data: [mockOffer],
        meta: { limit: 1, before: null, after: null },
      })

    const response = new Offers(
      new Client({ token: 'mockToken' })
    ).listWithGenerator({
      offer_request_id: mockOffer.id,
    })
    for await (const page of response) {
      expect(page.data.id).toBe(mockOffer.id)
    }
  })

  test('should update a single offer', async () => {
    nock(/(.*)/)
      .patch(`/air/offers/${mockOffer.id}/passengers/pas_00009hj8USM7Ncg31cBCL`)
      .reply(200, { data: mockUpdatedOffer })

    const response = await new Offers(
      new Client({ token: 'mockToken' })
    ).update(mockOffer.id, 'pas_00009hj8USM7Ncg31cBCL', {
      loyalty_programme_accounts: [
        {
          airline_iata_code: 'BA',
          account_number: '12901014',
        },
      ],
      given_name: 'Amelia',
      family_name: 'Earhart',
    })
    expect(response.data?.id).toBe('pas_00009hj8USM7Ncg31cBCL')
  })
})
