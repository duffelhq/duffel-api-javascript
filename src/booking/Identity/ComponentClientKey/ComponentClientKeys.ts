import { Resource } from '../../../Resource'
import { type DuffelResponse } from '../../../types/ClientType'
import { type ComponentClientKey } from './types'
/**
 * A component client key is a unique identifier that allows you to authenticate with the Duffel API.
 */
export class ComponentClientKeys extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'identity/component_client_keys/'
  }

  /**
   * A component client key is a unique identifier that allows you to authenticate with the Duffel API.
   * @param data A JSON object containing the data to create a new component client key
   */
  public create = async (
    data: Record<string, string> = {},
  ): Promise<DuffelResponse<ComponentClientKey>> =>
    this.request({ method: 'POST', path: `${this.path}`, data })
}
