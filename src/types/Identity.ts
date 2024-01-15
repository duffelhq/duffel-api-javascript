export type AcceptedCurrencies = 'AUD' | 'CAD' | 'EUR' | 'GBP' | 'USD'

export type LegalEntityType =
  | 'corporation'
  | 'non_profit'
  | 'other'
  | 'partnership'
  | 'sole_proprietorship'

export type PersonalAccessTokenRole = 'roles/user/personal'

export type SourceOfFunds = 'capital_invested' | 'debt' | 'other' | 'revenue'

export type TokenRole = 'roles/api/read_write' | 'roles/api/read_only'

export type UserRole =
  | 'roles/duffel/travel_ops'
  | 'roles/user/admin'
  | 'roles/user/agent'
  | 'roles/user/developer'
  | 'roles/user/owner'
  | 'roles/user/viewer'
  | PersonalAccessTokenRole

export type VerificationFlow = 'duffel_2020' | 'stripe_connect'

export interface AccessToken {
  created_at: string
  expires_at: string
  id: string
  last_used_at: string | null
  last_version_used: string | null
  live_mode: boolean | null
  name: string | null
  scope: TokenRole | UserRole
  token: string
}

export interface Invitation {
  accepted_at: string | null
  created_at: string
  expires_at: string | null
  id: string
  organisation: Organisation
  organisation_id: string
  recipient: User | null
  recipient_email: string
  recipient_id: string | null
  revoked_at: string | null
  scope: UserRole
  sender: User
  sender_id: string
  sent_at: string
  token: string
}

export interface Organisation {
  access_tokens: AccessToken[] | null
  avatar_url: string | null
  created_at: string
  id: string
  name: string
  settlement_currency: AcceptedCurrencies
  slug: string
  verified: boolean | null
  legal_entity: LegalEntity | null
  stripe_customer_id: string | null
  stripe_payment_method_id: string | null
  verification_flow: VerificationFlow
  contact_emails: string[] | null
  schedule_change_emails: string[] | null
  is_duffel_links_enabled: boolean
  stays_access_status: 'disabled' | 'live' | 'test'
  password_expiry_timeout_days: number | null
  session_expiry_timeout: number
}

export interface OrganisationMembership {
  avatar_url: string | null
  id: string
  created_at: string
  disabled_at: string | null
  organisation_id: string
  owner: boolean | null
  scope: UserRole
  user_id: string
  user: User
}

export interface User {
  avatar_url: string | null
  created_at: string
  duffel_admin: boolean | null
  email: string
  email_confirmed_at: string | null
  full_name: string
  id: string
  organisation_invitations: Invitation[] | null
  organisation_memberships: UserOrganisationMembership[] | null
  unconfirmed_email: string | null
  temporary_personal_access_tokens: PersonalAccessToken[] | null
  send_marketing_emails: boolean
}

export interface PersonalAccessToken {
  created_at: string
  expires_at: string
  id: string
  last_used_at: null | string
  last_version_used: null | string
  live_mode: true
  name: null
  scope: PersonalAccessTokenRole
  token: string
}

export interface UserOrganisationMembership extends OrganisationMembership {
  organisation: Organisation
}

export interface LegalEntity {
  name: string
  type: LegalEntityType
  type_extra: string | null
  trading_name: string | null
  registered_business_address_line1: string
  registered_business_address_line2: string | null
  registered_business_address_city: string
  registered_business_address_region: string | null
  registered_business_address_postal_code: string
  registered_business_address_country_code: string
  registration_number: string
  registration_country_code: string
  tax_identification_number: string
  key_contact_first_name: string
  key_contact_last_name: string
  key_contact_job_title: string
  key_contact_email: string
  initial_top_up_source_of_funds: SourceOfFunds
  initial_top_up_source_of_funds_description: string | null
}
