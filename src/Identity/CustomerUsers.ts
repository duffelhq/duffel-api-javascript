import { Client } from '../Client'
import { Resource } from '../Resource'
import { DuffelResponse, PaginationMeta } from '../types'
import { CustomerUser, CustomerUserPayload } from './IdentityTypes'

export class CustomerUsers extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'identity/customer/users'
  }

  /**
   * Creates a customer user for the organisation.
   */
  public create = async (
    data: CustomerUserPayload,
  ): Promise<DuffelResponse<CustomerUser>> =>
    this.request({ method: 'POST', path: this.path, data })

  /**
   * Retrieves an customer user by its ID
   */
  public get = async (
    id: CustomerUser['id'],
  ): Promise<DuffelResponse<CustomerUser>> =>
    this.request({ method: 'GET', path: `${this.path}/${id}` })

  /**
   * Updates a customer user based on provided ID
   */
  public update = async (
    id: CustomerUser['id'],
    data: CustomerUserPayload,
  ): Promise<DuffelResponse<CustomerUser>> =>
    this.request({ method: 'PUT', path: `${this.path}/${id}`, data })

  /**
   * Retrieves a list of customer user groups
   * Allows filtering by email

   */
  public list = async (
    options?: PaginationMeta & { email?: string },
  ): Promise<DuffelResponse<CustomerUser[]>> =>
    this.request({ method: 'GET', path: this.path, params: options })
}
