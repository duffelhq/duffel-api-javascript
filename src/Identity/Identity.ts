import { Client } from '../Client'
import { Resource } from '../Resource'
import { CustomerUsers } from './CustomerUsers'
import { CustomerUserGroups } from './CustomerUserGroups'
import { ComponentClientKeys } from './ComponentClientKeys'

export class Identity extends Resource {
  /**
   * Endpoint path
   */
  path: string

  public customerUsers: CustomerUsers
  public customerUserGroups: CustomerUserGroups
  public componentClientKeys: ComponentClientKeys

  constructor(client: Client) {
    super(client)
    this.path = 'identity'

    this.customerUsers = new CustomerUsers(client)
    this.customerUserGroups = new CustomerUserGroups(client)
    this.componentClientKeys = new ComponentClientKeys(client)
  }
}
