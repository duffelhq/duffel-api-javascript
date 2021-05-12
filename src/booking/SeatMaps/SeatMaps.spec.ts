import nock from 'nock'
import { Client } from '../../Client'
import { mockSeatMap } from './mockSeatMap'
import { SeatMaps } from './SeatMaps'

describe('SeatMaps', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get SeatMaps', async () => {
    const mockOfferId = 'off_123'
    nock(/(.*)/).get(`/air/seat_maps?offer_id=${mockOfferId}`).reply(200, { data: mockSeatMap })

    const response = await new SeatMaps(new Client({ token: 'mockToken' })).get({
      queryParams: { offer_id: mockOfferId }
    })
    expect(response.data?.id).toBe(mockSeatMap.id)
  })
})
