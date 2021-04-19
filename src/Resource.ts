import { Client } from './Client'
import { APIResponse } from './types'

export class Resource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  protected request = async <T_Response = any>(
    method: string,
    url: string,
    body?: any
  ): Promise<APIResponse<T_Response>> => this.client.request(method, url, body)
}
