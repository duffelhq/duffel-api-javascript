import nock from 'nock'
import { Client } from '../../Client'
import { Aircraft } from './Aircraft'
import { mockAircraft } from './mockAircraft'

describe('aircraft', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single aircraft', async () => {
    nock(/(.*)/)
      .get(`/air/aircraft/${mockAircraft.id}`)
      .reply(200, { data: mockAircraft })

    const response = await new Aircraft(new Client({ token: 'mockToken' })).get(
      mockAircraft.id
    )
    expect(response.data?.id).toBe(mockAircraft.id)
  })

  test('should get a page of aircraft', async () => {
    nock(/(.*)/)
      .get(`/air/aircraft?limit=1`)
      .reply(200, {
        data: [mockAircraft],
        meta: { limit: 1, before: null, after: null },
      })

    const response = await new Aircraft(
      new Client({ token: 'mockToken' })
    ).list({ limit: 1 })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockAircraft.id)
  })

  test('should get all aircraft paginated', async () => {
    nock(/(.*)/)
      .get(`/air/aircraft`)
      .reply(200, {
        data: [mockAircraft],
        meta: { limit: 1, before: null, after: null },
      })

    const response = new Aircraft(
      new Client({ token: 'mockToken' })
    ).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockAircraft.id)
    }
  })
})
