import nock from 'nock'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('ThreeDSecureSessions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should create a 3DS session record when `create` is called', async () => {
    const MOCK_ID = '3ds_00009hthhsUZ8W4LxQgkjb'
    nock(/(.*)/)
      .post('/payments/three_d_secure_sessions')
      .reply(200, {
        data: {
          id: MOCK_ID,
          liveMode: false,
          expiresAt: '2024-01-01T00:00:00',
          status: 'ready_for_payment',
          resourceId: 'off_00009hthhsUZ8W4LxQgkjb',
          clientId: 'tds_57aa862f8bf7',
          cardId: 'tcd_00009hthhsUZ8W4LxQgkjb',
        },
      })

    const response = await duffel.three_d_secure_sessions.create({
      resource_id: 'off_00009hthhsUZ8W4LxQgkjb',
      card_id: 'tcd_00009hthhsUZ8W4LxQgkjb',
      services: [{ quantity: 1, id: 'ser_00009UhD4ongolulWd9123' }],
      exception: 'secure_corporate_payment',
    })
    expect(response.data.id).toBe(MOCK_ID)
  })
})
