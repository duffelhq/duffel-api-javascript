import { Client } from './Client'
import { DuffelResponse, PaginationMeta } from './types'

export class Resource {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  protected request = async <T_Response = any>({
    method,
    path,
    bodyParams,
    queryParams
  }: {
    method: string
    path: string
    bodyParams?: any
    queryParams?: Record<string, any>
  }): Promise<DuffelResponse<T_Response>> => this.client.request({ method, path, bodyParams, queryParams })

  protected paginatedRequest = <T_Response = any>({
    path,
    queryParams
  }: {
    path: string
    queryParams?: PaginationMeta
  }): AsyncGenerator<DuffelResponse<T_Response>, void, unknown> => this.client.paginatedRequest({ path, queryParams })
}
