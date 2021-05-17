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

  test('should get a page of airports', async () => {
    nock(/(.*)/)
      .get(`/air/airports?limit=1`)
      .reply(200, { data: [mockAirport], meta: { limit: 1, before: null, after: null } })

    const response = await new Airports(new Client({ token: 'mockToken' })).list({ queryParams: { limit: 1 } })
    expect(response.data).toHaveLength(1)
    expect(response.data[0].id).toBe(mockAirport.id)
  })

  test('should get all airports paginated', async () => {
    nock(/(.*)/)
      .get(`/air/airports`)
      .reply(200, { data: [mockAirport], meta: { limit: 1, before: null, after: null } })

    const response = new Airports(new Client({ token: 'mockToken' })).listWithGenerator()
    for await (const page of response) {
      expect(page.data.id).toBe(mockAirport.id)
    }
  })
})
