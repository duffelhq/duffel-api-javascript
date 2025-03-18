export interface CustomerUserPayload {
  /**
   * The customer user's email address
   */
  email: string

  /**
   * The customer user's given name
   */
  family_name: string

  /**
   * The customer user's family name
   */
  given_name: string

  /**
   * The group you'd like to associate the customer user to
   */
  group_id?: string | null

  /**
   * The customer user's phone number in E.164 (international) format.
   */
  phone_number?: string | null
}

export interface CustomerUser {
  /**
   * The ISO 8601 datetime at which the user was created
   */
  created_at: string

  /**
   * The customer user's email address
   */
  email: string

  /**
   * The customer user's family name
   */
  family_name: string

  /**
   * The customer user's given name
   */
  given_name: string

  /**
   * The group to which the user belongs
   */
  group: {
    /**
     * Duffel's unique identifier for the resource
     */
    id: string

    /**
     * The group's name
     */
    name: string
  } | null

  /**
   * Duffel's unique identifier for the resource
   */
  id: string

  /**
   * This field will be set to true if the customer user was created in live mode, or false if it was created in test mode.
   */
  live_mode: boolean

  /**
   * The customer user's phone number in E.164 (international) format.
   */
  phone_number: string | null
}

export interface CustomerUserGroupPayload {
  /**
   * The customer user group's name
   */
  name: string

  /**
   * The list of customer users that belong to this group
   */
  user_ids: Array<CustomerUser['id']>
}

export interface CustomerUserGroup {
  /**
   * Duffel's unique identifier for the resource
   */
  id: string

  /**
   * The customer user group's name
   */
  name: string

  /**
   * The list of customer users that belong to this group
   */
  user_ids: string[]
}

export type ComponentClientKeyPayload =
  | ComponentClientKeyPayloadNoData
  | ComponentClientKeyPayloadUserOnly
  | ComponentClientKeyPayloadUserAndOrderPayload
  | ComponentClientKeyPayloadUserAndBookingPayload

export interface ComponentClientKeyPayloadNoData {}

export interface ComponentClientKeyPayloadUserOnly {
  /**
   * The ID of the user for whom the client key will be created.
   */
  user_id: string
}

export interface ComponentClientKeyPayloadUserAndOrderPayload
  extends ComponentClientKeyPayloadUserOnly {
  /**
   * The ID of the order for which the client key will be created.
   */
  order_id: string
}

export interface ComponentClientKeyPayloadUserAndBookingPayload
  extends ComponentClientKeyPayloadUserOnly {
  /**
   * The ID of the booking for which the client key will be created.
   */
  booking_id: string
}

export interface ComponentClientKey {
  /**
   * The client key to authenticate Duffel UI components.
   */
  component_client_key: string
}
