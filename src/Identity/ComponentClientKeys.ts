import { Client } from '../Client'
import { Resource } from '../Resource'
import { DuffelResponse } from '../types'
import {
  ComponentClientKey,
  ComponentClientKeyPayload,
  ComponentClientKeyPayloadNoData,
} from './IdentityTypes'

export class ComponentClientKeys extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'identity/component_client_keys'
  }

  /**
   * The client key to authenticate Duffel UI components.
   */
  public create = async (
    data: ComponentClientKeyPayload = {} as ComponentClientKeyPayloadNoData,
  ): Promise<DuffelResponse<ComponentClientKey>> =>
    this.request({ method: 'POST', path: this.path, data })
}
