import nock from 'nock'
import { Client } from './Client'

const client = new Client({ token: 'mockToken' })

describe('Client', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('should keep the status of a JSON error response', async () => {
    nock(/(.*)/)
      .get('/air/offers/off_123')
      .reply(404, {
        meta: { request_id: 'req_123', status: 404 },
        errors: [
          {
            code: 'not_found',
            title: 'Resource not found',
            message: 'The resource you requested could not be found.',
            type: 'invalid_request_error',
            documentation_url: '',
          },
        ],
      })

    await expect(
      client.request({ method: 'GET', path: '/air/offers/off_123' }),
    ).rejects.toMatchObject({
      status: 404,
      meta: { request_id: 'req_123', status: 404 },
    })
  })

  test('should keep the status when the error response is not JSON', async () => {
    nock(/(.*)/)
      .get('/air/offer_requests')
      .reply(503, '<html>503 Service Unavailable</html>', {
        'content-type': 'text/html',
      })

    // A gateway responding on Duffel's behalf produces no `meta`, so `status` is the only
    // indication of what went wrong.
    await expect(
      client.request({ method: 'GET', path: '/air/offer_requests' }),
    ).rejects.toMatchObject({
      status: 503,
      meta: undefined,
    })
  })
})
