import nock from 'nock'
import { Client } from '../../Client'
import { mockOrderChangeOffer } from './mockOrderChangeOffer'
import { OrderChangeOffers } from './OrderChangeOffers'

describe('OrderChangeOffers', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order change offer', async () => {
    nock(/(.*)/).get(`/air/order_change_offers/${mockOrderChangeOffer.id}`).reply(200, { data: mockOrderChangeOffer })

    const response = await new OrderChangeOffers(new Client({ token: 'mockToken' })).get(mockOrderChangeOffer.id)
    expect(response.data?.id).toBe(mockOrderChangeOffer.id)
  })

  test('should get a page of order change offers', async () => {
    nock(/(.*)/)
      .get(`/air/order_change_offers?limit=1`)
      .reply(200, { data: [mockOrderChangeOffer], meta: { limit: 1, before: null, after: null } })

    const response = await new OrderChangeOffers(new Client({ token: 'mockToken' })).list({ queryParams: { limit: 1 } })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockOrderChangeOffer.id)
  })

  test('should get all order change offers paginated', async () => {
    nock(/(.*)/)
      .get(`/air/order_change_offers`)
      .reply(200, { data: [mockOrderChangeOffer], meta: { limit: 1, before: null, after: null } })

    const response = new OrderChangeOffers(new Client({ token: 'mockToken' })).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockOrderChangeOffer.id)
    }
  })
})
