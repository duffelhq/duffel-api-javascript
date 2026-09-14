import nock from 'nock'
import { Client } from '../../Client'
import { LoyaltyProgrammes } from './LoyaltyProgrammes'
import { mockLoyaltyProgramme } from './mockLoyaltyProgramme'

describe('loyaltyProgrammes', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single loyalty programme', async () => {
    nock(/(.*)/)
      .get(`/air/loyalty_programmes/${mockLoyaltyProgramme.id}`)
      .reply(200, { data: mockLoyaltyProgramme })

    const response = await new LoyaltyProgrammes(
      new Client({ token: 'mockToken' }),
    ).get(mockLoyaltyProgramme.id)
    expect(response.data?.id).toBe(mockLoyaltyProgramme.id)
  })

  test('should get a page of loyalty programmes', async () => {
    nock(/(.*)/)
      .get(`/air/loyalty_programmes?limit=1`)
      .reply(200, {
        data: [mockLoyaltyProgramme],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new LoyaltyProgrammes(
      new Client({ token: 'mockToken' }),
    ).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockLoyaltyProgramme.id)
  })

  test('should follow the pagination cursor across pages', async () => {
    nock(/(.*)/)
      .get(`/air/loyalty_programmes?limit=1`)
      .reply(200, {
        data: [mockLoyaltyProgramme],
        meta: { limit: 1, before: null, after: 'cursor' },
      })
    nock(/(.*)/)
      .get(`/air/loyalty_programmes?after=cursor&limit=1`)
      .reply(200, {
        data: [{ ...mockLoyaltyProgramme, id: 'loy_00001876aqC8c5umZmrRdt' }],
        meta: { limit: 1, before: null, after: null },
      })

    const loyaltyProgrammes = new LoyaltyProgrammes(
      new Client({ token: 'mockToken' }),
    )
    const firstPage = await loyaltyProgrammes.list({ limit: 1 })
    expect(firstPage.meta?.after).toBe('cursor')
    const secondPage = await loyaltyProgrammes.list({
      limit: 1,
      after: firstPage.meta?.after,
    })
    expect(secondPage.data[0].id).toBe('loy_00001876aqC8c5umZmrRdt')
    expect(secondPage.meta?.after).toBeNull()
  })
})
