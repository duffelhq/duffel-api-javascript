import nock from 'nock'
import { Duffel } from '../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Links', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should post to /links/generate_link when `generateLink` is called', async () => {
    const MOCK_URL = 'https://links.duffel.com/?token=abcdef'
    nock(/(.*)/)
      .post('/links/generate_link')
      .reply(200, { data: { url: MOCK_URL } })

    const response = await duffel.links.generateLink({
      reference: 'test',
      success_url: 'https://example.com',
      failure_url: 'https://example.com',
      abandonment_url: 'https://example.com',
    })
    expect(response.data.url).toBe(MOCK_URL)
  })
})
