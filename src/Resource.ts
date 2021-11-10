import { Client } from './Client'
import { DuffelResponse } from './types'

export class Resource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  protected request = async <T_Data = any>({
    method,
    path,
    data,
    params,
  }: {
    method: string
    path: string
    data?: Record<string, any>
    params?: Record<string, any>
  }): Promise<DuffelResponse<T_Data>> =>
    this.client.request({ method, path, data, params })

  protected paginatedRequest = <T_Data = any>({
    path,
    params,
  }: {
    path: string
    params?: Record<string, any>
  }): AsyncGenerator<DuffelResponse<T_Data>, void, unknown> =>
    this.client.paginatedRequest({ path, params })
}
