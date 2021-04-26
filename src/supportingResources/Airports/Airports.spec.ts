import nock from 'nock'
import { Client } from '../../Client'
import { Airports } from './Airports'
import { mockAirport } from './mockAirport'

describe('airports', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single airport', async () => {
    nock(/(.*)/).get(`/air/airports/${mockAirport.id}`).reply(200, { data: mockAirport })

    const response = await new Airports(new Client({ token: 'mockToken' })).get(mockAirport.id)
    expect(response.data?.id).toBe(mockAirport.id)
  })

  test('should get all airports', async () => {
    const param = { limit: 1, after: 'test' }
    function* testResponse() {
      yield { data: [mockAirport], meta: { limit: 1, before: 'test', after: null } }
    }
    nock(/(.*)/).get('/air/airports').query(param).reply(200, testResponse)

    const response = new Airports(new Client({ token: 'mockToken' })).list({ limit: 1, after: 'test' })
    for await (const page of response) {
      expect(page.data).toHaveLength(1)
      expect(page.data![0].id).toBe(mockAirport.id)
    }
  })
})
