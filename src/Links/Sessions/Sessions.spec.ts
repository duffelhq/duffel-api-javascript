import nock from 'nock'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Links', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /links/sessions when `create` is called', async () => {
    const MOCK_URL = 'https://links.duffel.com/?token=abcdef'
    nock(/(.*)/)
      .post('/links/sessions')
      .reply(200, { data: { url: MOCK_URL } })

    const response = await duffel.links.create({
      reference: 'test',
      success_url: 'https://example.com',
      failure_url: 'https://example.com',
      abandonment_url: 'https://example.com',
    })
    expect(response.data.url).toBe(MOCK_URL)
  })
})
