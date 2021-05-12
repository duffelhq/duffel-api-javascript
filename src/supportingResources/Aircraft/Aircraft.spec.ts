import nock from 'nock'
import { PaginationMeta } from '../../types'
import { Client } from '../../Client'
import { Aircraft } from './Aircraft'
import { mockAircraft } from './mockAircraft'

describe('aircraft', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single aircraft', async () => {
    nock(/(.*)/).get(`/air/aircraft/${mockAircraft.id}`).reply(200, { data: mockAircraft })

    const response = await new Aircraft(new Client({ token: 'mockToken' })).get(mockAircraft.id)
    expect(response.data?.id).toBe(mockAircraft.id)
  })

  test('should get all aircraft', async () => {
    const nextId = 'next_id'
    nock(/(.*)/)
      .get(`/air/aircraft?limit=1`)
      .reply(200, { data: [mockAircraft], meta: { limit: 1, before: null, after: 'test' } })
    nock(/(.*)/)
      .get(`/air/aircraft?limit=1&after=test`)
      .reply(200, { data: [{ ...mockAircraft, id: nextId }], meta: { limit: 1, before: 'test', after: null } })

    const response = new Aircraft(new Client({ token: 'mockToken' })).list({ queryParams: { limit: 1 } })
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      const expectedId = (page.meta as PaginationMeta)?.after ? mockAircraft.id : nextId
      expect(page.data![0].id).toBe(expectedId)
    }
  })
})
