import nock from 'nock'
import { Client } from '../../Client'
import { mockOffer } from './mockOffer'
import { Offers } from './Offers'

describe('offers', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single offer', async () => {
    nock(/(.*)/).get(`/air/offers/${mockOffer.id}`).reply(200, { data: mockOffer })

    const response = await new Offers(new Client({ token: 'mockToken' })).get(mockOffer.id)
    expect(response.data?.id).toBe(mockOffer.id)
  })

  test('should get all offers', async () => {
    nock(/(.*)/)
      .get(`/air/offers`)
      .reply(200, { data: [mockOffer], meta: { limit: 1, before: null, after: null } })

    const response = new Offers(new Client({ token: 'mockToken' })).list()
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockOffer.id)
    }
  })
})
