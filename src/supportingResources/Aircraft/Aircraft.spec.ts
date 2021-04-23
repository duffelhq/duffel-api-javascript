import nock from 'nock'
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
    function* testResponse() {
      yield { data: [mockAircraft], meta: { limit: 1, before: 'test', after: null } }
    }
    nock(/(.*)/).get(`/air/aircraft?limit=1&after=test`).reply(200, testResponse)

    const response = new Aircraft(new Client({ token: 'mockToken' })).list({ limit: 1, after: 'test' })
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockAircraft.id)
    }
  })
})
