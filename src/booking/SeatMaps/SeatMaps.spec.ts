import nock from 'nock'
import { Client } from '../../Client'
import { mockSeatMap } from './mockSeatMap'
import { SeatMaps } from './SeatMaps'

describe('SeatMaps', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get SeatMaps', async () => {
    nock(/(.*)/).get(`/air/seat_maps/${mockSeatMap.id}`).reply(200, { data: mockSeatMap })

    const response = await new SeatMaps(new Client({ token: 'mockToken' })).get(mockSeatMap.id)
    expect(response.data?.id).toBe(mockSeatMap.id)
  })
})
