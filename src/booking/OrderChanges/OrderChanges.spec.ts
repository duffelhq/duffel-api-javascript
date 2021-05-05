import nock from 'nock'
import { Client } from '../../Client'
import { OrderChanges } from './OrderChanges'
import { mockOrderChange } from './mockOrderChanges'

describe('OrderChanges', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should get a single order change', async () => {
    nock(/(.*)/).get(`/air/order_changes/${mockOrderChange.id}`).reply(200, { data: mockOrderChange })

    const response = await new OrderChanges(new Client({ token: 'mockToken' })).get(mockOrderChange.id)
    expect(response.data?.id).toBe(mockOrderChange.id)
  })

  test('should create a pending order change', async () => {
    nock(/(.*)/).post(`/air/order_changes`).reply(200, { data: mockOrderChange })

    const response = await new OrderChanges(new Client({ token: 'mockToken' })).create({
      bodyParams: { selected_order_change_offer: mockOrderChange.id }
    })
    expect(response.data?.id).toBe(mockOrderChange.id)
  })

  test('should confirm a pending order change', async () => {
    nock(/(.*)/).post(`/air/order_changes/${mockOrderChange.id}`).reply(200, { data: mockOrderChange })

    const response = await new OrderChanges(new Client({ token: 'mockToken' })).confirm(mockOrderChange.id)
    expect(response.data?.id).toBe(mockOrderChange.id)
  })
})
