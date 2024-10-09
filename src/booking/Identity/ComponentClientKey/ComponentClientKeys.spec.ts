import nock from 'nock'
import { Client } from '../../../Client'
import { ComponentClientKeys } from './ComponentClientKeys'
import { mockComponentClientKey } from './mockComponentClientKey'

describe('component client keys', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('creates a component client key', async () => {
    nock(/(.*)/)
      .post(`/identity/component_client_keys/`)
      .reply(200, { data: mockComponentClientKey })

    const response = await new ComponentClientKeys(
      new Client({ token: 'mockToken' }),
    ).create()

    const regex_to_match_jwt = new RegExp(
      // eslint-disable-next-line spellcheck/spell-checker
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.[a-zA-Z0-9_-]*.[a-zA-Z0-9_-]*',
    )
    expect(response.data.component_client_key).toMatch(regex_to_match_jwt)
  })
})
