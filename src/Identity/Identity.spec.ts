import { Duffel } from '../index'
import nock from 'nock'

// CustomerUsers mocks
const mockCustomerUserPayload = {
  email: 'john.doe@example.com',
  given_name: 'John',
  family_name: 'Doe',
  group_id: 'usg_12345',
  phone_number: '+1234567890',
}
const mockCreatedCustomerUserResponse = {
  data: {
    id: 'icu_abc123',
    created_at: '2025-03-18T00:00:00Z',
    email: 'john.doe@example.com',
    given_name: 'John',
    family_name: 'Doe',
    group: { id: 'usg_12345', name: 'VIP' },
    live_mode: true,
    phone_number: '+1234567890',
  },
}
const mockUpdatedCustomerUserPayload = {
  email: 'jane.doe@example.com',
  given_name: 'Jane',
  family_name: 'Doe',
  group_id: 'usg_67890',
  phone_number: '+1987654321',
}
const mockUpdatedCustomerUserResponse = {
  data: {
    id: 'icu_abc123',
    created_at: '2025-03-18T00:00:00Z',
    email: 'jane.doe@example.com',
    given_name: 'Jane',
    family_name: 'Doe',
    group: { id: 'usg_67890', name: 'Regular' },
    live_mode: true,
    phone_number: '+1987654321',
  },
}

// CustomerUserGroups mocks
const mockCustomerUserGroupPayload = {
  name: 'VIP Group',
  user_ids: ['icu_abc123', 'icu_def456'],
}
const mockCreatedCustomerUserGroupResponse = {
  data: {
    id: 'usg_12345',
    name: 'VIP Group',
    user_ids: ['icu_abc123', 'icu_def456'],
  },
}
const mockCustomerUserGroupListResponse = {
  data: [
    {
      id: 'usg_12345',
      name: 'VIP Group',
      user_ids: ['icu_abc123', 'icu_def456'],
    },
    {
      id: 'usg_67890',
      name: 'Regular Group',
      user_ids: ['icu_ghi789'],
    },
  ],
}
const mockUpdatedCustomerUserGroupPayload = {
  name: 'Updated VIP Group',
  user_ids: ['icu_abc123'],
}
const mockUpdatedCustomerUserGroupResponse = {
  data: {
    id: 'usg_12345',
    name: 'Updated VIP Group',
    user_ids: ['icu_abc123'],
  },
}

// ComponentClientKeys mocks
const mockComponentClientKeyPayload = { user_id: 'icu_abc123' }
const mockComponentClientKeyResponse = {
  data: { component_client_key: 'eyhader.payload.signature' },
}
const mockEmptyComponentClientKeyResponse = {
  data: { component_client_key: 'eyhader.payload.signature' },
}

const duffel = new Duffel({ token: 'mockToken' })

describe('Identity Endpoints', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('CustomerUsers', () => {
    it('should create a customer user', async () => {
      nock(/(.*)/)
        .post('/identity/customer/users', (body) => {
          expect(body.data).toEqual(mockCustomerUserPayload)
          return true
        })
        .reply(200, mockCreatedCustomerUserResponse)

      const response = await duffel.identity.customerUsers.create(
        mockCustomerUserPayload,
      )
      expect(response.data).toEqual(mockCreatedCustomerUserResponse.data)
    })

    it('should retrieve a customer user by id', async () => {
      const customerUserId = 'icu_abc123'

      nock(/(.*)/)
        .get(`/identity/customer/users/${customerUserId}`)
        .reply(200, mockCreatedCustomerUserResponse)

      const response = await duffel.identity.customerUsers.get(customerUserId)
      expect(response.data).toEqual(mockCreatedCustomerUserResponse.data)
    })

    it('should update a customer user', async () => {
      const customerUserId = 'icu_abc123'

      nock(/(.*)/)
        .put(`/identity/customer/users/${customerUserId}`, (body) => {
          expect(body.data).toEqual(mockUpdatedCustomerUserPayload)
          return true
        })
        .reply(200, mockUpdatedCustomerUserResponse)

      const response = await duffel.identity.customerUsers.update(
        customerUserId,
        mockUpdatedCustomerUserPayload,
      )
      expect(response.data).toEqual(mockUpdatedCustomerUserResponse.data)
    })
  })

  describe('CustomerUserGroups', () => {
    it('should list customer user groups', async () => {
      nock(/(.*)/)
        .get('/identity/customer/user_groups')
        .reply(200, mockCustomerUserGroupListResponse)

      const response = await duffel.identity.customerUserGroups.list()
      expect(response.data).toEqual(mockCustomerUserGroupListResponse.data)
    })

    it('should create a customer user group', async () => {
      nock(/(.*)/)
        .post('/identity/customer/user_groups', (body) => {
          expect(body.data).toEqual(mockCustomerUserGroupPayload)
          return true
        })
        .reply(201, mockCreatedCustomerUserGroupResponse)

      const response = await duffel.identity.customerUserGroups.create(
        mockCustomerUserGroupPayload,
      )
      expect(response.data).toEqual(mockCreatedCustomerUserGroupResponse.data)
    })

    it('should retrieve a customer user group by id', async () => {
      const groupId = 'usg_12345'

      nock(/(.*)/)
        .get(`/identity/customer/user_groups/${groupId}`)
        .reply(200, mockCreatedCustomerUserGroupResponse)

      const response = await duffel.identity.customerUserGroups.get(groupId)
      expect(response.data).toEqual(mockCreatedCustomerUserGroupResponse.data)
    })

    it('should update a customer user group by id', async () => {
      const groupId = 'usg_12345'

      nock(/(.*)/)
        .patch(`/identity/customer/user_groups/${groupId}`, (body) => {
          expect(body.data).toEqual(mockUpdatedCustomerUserGroupPayload)
          return true
        })
        .reply(200, mockUpdatedCustomerUserGroupResponse)

      const response = await duffel.identity.customerUserGroups.update(
        groupId,
        mockUpdatedCustomerUserGroupPayload,
      )
      expect(response.data).toEqual(mockUpdatedCustomerUserGroupResponse.data)
    })

    it('should delete a customer user group by id', async () => {
      const groupId = 'usg_12345'

      nock(/(.*)/)
        .delete(`/identity/customer/user_groups/${groupId}`)
        .reply(200, mockCreatedCustomerUserGroupResponse)

      const response = await duffel.identity.customerUserGroups.delete(groupId)
      expect(response.data).toEqual(mockCreatedCustomerUserGroupResponse.data)
    })
  })

  describe('ComponentClientKeys', () => {
    it('should create a component client key with no data', async () => {
      nock(/(.*)/)
        .post('/identity/component_client_keys', (body) => {
          // When no data is passed, it defaults to an empty object
          expect(body.data).toEqual({})
          return true
        })
        .reply(200, mockEmptyComponentClientKeyResponse)

      const response = await duffel.identity.componentClientKeys.create()
      expect(response.data).toEqual(mockEmptyComponentClientKeyResponse.data)
    })

    it('should create a component client key with user id', async () => {
      nock(/(.*)/)
        .post('/identity/component_client_keys', (body) => {
          expect(body.data).toEqual(mockComponentClientKeyPayload)
          return true
        })
        .reply(200, mockComponentClientKeyResponse)

      const response = await duffel.identity.componentClientKeys.create(
        mockComponentClientKeyPayload,
      )
      expect(response.data).toEqual(mockComponentClientKeyResponse.data)
    })
  })
})
