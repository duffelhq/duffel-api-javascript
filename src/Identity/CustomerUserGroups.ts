import { Client } from '../Client'
import { Resource } from '../Resource'
import { DuffelResponse, PaginationMeta } from '../types'
import { CustomerUserGroup, CustomerUserGroupPayload } from './IdentityTypes'

export class CustomerUserGroups extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'identity/customer/user_groups'
  }

  /**
   * Retrieves a list of customer user groups
   */
  public list = async (
    options?: PaginationMeta,
  ): Promise<DuffelResponse<CustomerUserGroup[]>> =>
    // TODO: check other endpoints that do pagination
    this.request({ method: 'GET', path: this.path, params: options })

  /**
   * Creates a customer user group for the organisation.
   */
  public create = async (
    data: CustomerUserGroupPayload,
  ): Promise<DuffelResponse<CustomerUserGroup>> =>
    this.request({ method: 'POST', path: this.path, data })

  /**
   * Deletes a customer user group by its ID
   */
  public delete = async (
    id: CustomerUserGroup['id'],
  ): Promise<DuffelResponse<CustomerUserGroup>> =>
    this.request({ method: 'DELETE', path: `${this.path}/${id}` })

  /**
   * Retrieves an customer user group by its ID
   */
  public get = async (
    id: CustomerUserGroup['id'],
  ): Promise<DuffelResponse<CustomerUserGroup>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Updates an customer user group by its ID
   */
  public update = async (
    id: CustomerUserGroup['id'],
    data: CustomerUserGroupPayload,
  ): Promise<DuffelResponse<CustomerUserGroup>> =>
    this.request({ method: 'PATCH', path: `${this.path}/${id}`, data })
}
