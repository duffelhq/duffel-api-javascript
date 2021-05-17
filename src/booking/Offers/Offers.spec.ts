import nock from 'nock'
import { Client } from '../../Client'
import { mockOffer } from './mockOffer'
import { Offers } from './Offers'

describe('offers', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer', async () => {
    nock(/(.*)/)
      .get(`/air/offers/${mockOffer.id}`)
      .reply(200, { data: { ...mockOffer, available_services: [] } })

    const response = await new Offers(new Client({ token: 'mockToken' })).get(mockOffer.id)
    expect(response.data?.id).toBe(mockOffer.id)
    expect(response.data?.available_services).toHaveLength(0)
  })

  test('should get a single offer with available services', async () => {
    nock(/(.*)/).get(`/air/offers/${mockOffer.id}?return_available_services=true`).reply(200, { data: mockOffer })

    const response = await new Offers(new Client({ token: 'mockToken' })).get(mockOffer.id, {
      return_available_services: true
    })
    expect(response.data?.id).toBe(mockOffer.id)
    expect(response.data?.available_services).toHaveLength(1)
  })

  test('should get a page of offers', async () => {
    nock(/(.*)/)
      .get(`/air/offers?limit=1`)
      .reply(200, { data: [mockOffer], meta: { limit: 1, before: null, after: null } })

    const response = await new Offers(new Client({ token: 'mockToken' })).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOffer.id)
  })

  test('should get all offers paginated', async () => {
    nock(/(.*)/)
      .get(`/air/offers`)
      .reply(200, { data: [mockOffer], meta: { limit: 1, before: null, after: null } })

    const response = new Offers(new Client({ token: 'mockToken' })).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockOffer.id)
    }
  })
})
