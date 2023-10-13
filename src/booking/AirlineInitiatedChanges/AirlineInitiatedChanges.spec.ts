import { AirlineInitiatedChanges } from './AirlineInitiatedChanges'
import { Client } from '../../Client'
import nock from 'nock'
import { mockOrder } from '../Orders/mockOrders'
import {
  mockAirlineInitiatedChange,
  mockAirlineInitiatedChangeAccepted,
} from './mockAirlineInitiatedChanges'

const mockClient = new Client({ token: 'mockToken' })
describe('AirlineInitiatedChanges', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should update the airline-initiated change as accepted', async () => {
    nock(/(.*)/)
      .patch(`/air/airline_initiated_changes/${mockAirlineInitiatedChange.id}`)
      .reply(200, { data: mockAirlineInitiatedChangeAccepted })

    const response = await new AirlineInitiatedChanges(mockClient).update(
      mockAirlineInitiatedChange.id,
      'accepted',
    )
    expect(response.data.id).toEqual(mockAirlineInitiatedChange.id)
    expect(response.data.action_taken).toBe('accepted')
  })

  test('should accept the airline-initiated change', async () => {
    nock(/(.*)/)
      .post(
        `/air/airline_initiated_changes/${mockAirlineInitiatedChange.id}/actions/accept`,
      )
      .reply(200, { data: mockAirlineInitiatedChangeAccepted })

    const response = await new AirlineInitiatedChanges(mockClient).accept(
      mockAirlineInitiatedChange.id,
    )

    expect(response.data.id).toEqual(mockAirlineInitiatedChange.id)
    expect(response.data.action_taken).toBe('accepted')
  })

  test('should get airline-initiated changes for an order', async () => {
    nock(/(.*)/)
      .get(`/air/airline_initiated_changes?order_id=${mockOrder.id}`)
      .reply(200, { data: [mockAirlineInitiatedChange] })

    const response = await new AirlineInitiatedChanges(mockClient).list(
      mockOrder.id,
    )

    expect(response.data?.length).toBeGreaterThan(0)
  })
})
