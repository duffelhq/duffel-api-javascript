import nock from 'nock'
import { Client } from '../../Client'
import { Aircraft } from './Aircraft'
import { mockAircraft } from './mockAircraft'

describe('aircraft', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('Get a single aircraft', async () => {
    nock(/(.*)/).get(`/air/aircraft/${mockAircraft.id}`).reply(200, { data: mockAircraft })
    const response = await new Aircraft(new Client({ token: 'mockToken' })).get(mockAircraft.id)
    expect(response.data?.name).toBe(mockAircraft.name)

    // TODO const response = await aircraft.retrieve("nonexistent_id") // (after we do error hand)
  })

  test('Get all aircrafts', async () => {
    nock(/(.*)/)
      .get(`/air/aircraft`)
      .reply(200, { data: [mockAircraft] })
    const response = await new Aircraft(new Client({ token: 'mockToken' })).list()
    expect(response.data).toHaveLength(1)
    expect(response.data![0].name).toBe(mockAircraft.name)
  })
})
