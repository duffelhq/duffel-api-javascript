import fetch from 'isomorphic-unfetch'
import { URL, URLSearchParams } from 'url'
import { APIResponse, PaginationMeta, SDKOptions } from './types'

export interface Config {
  token: string
  basePath?: string
  apiVersion?: string
  options?: SDKOptions
}

export class Client {
  private token: string
  private basePath: string
  private apiVersion: string
  private options: SDKOptions | undefined

  constructor({ token, basePath, apiVersion, options }: Config) {
    this.token = token
    this.basePath = basePath || 'https://api.duffel.com'
    this.apiVersion = apiVersion || 'beta'
    this.options = options
  }

  public request = async <T_Response = any>({
    method,
    path,
    bodyParams,
    queryParams,
    compress = true
  }: {
    method: string
    path: string
    bodyParams?: any
    queryParams?: Record<string, any>
    compress?: boolean
  }): Promise<APIResponse<T_Response>> => {
    let body
    let responseBody
    const fullPath = new URL(path, this.basePath)
    const userAgent = `Duffel/${this.apiVersion} duffel_api_javascript/${process.env.npm_package_version}`
    const headers = {
      'User-Agent': userAgent,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'Content-Type': 'application/json',
      'Duffel-Version': this.apiVersion,
      Authorization: `Bearer ${this.token}`
    }

    if (queryParams) {
      const params = Object.entries(queryParams)
        .sort()
        .filter((option) => option[0] !== null)
      fullPath.search = new URLSearchParams(params).toString()
    }

    // We need to format body to be sent as { "data": bodyParams }
    if (bodyParams) {
      body = JSON.stringify({
        data: {
          ...bodyParams
        }
      })
    }

    if (this.options?.debug?.verbose) {
      console.info('Endpoint: ', fullPath.href)
      console.info('Method: ', method)
      if (bodyParams) console.info('Body Parameters: ', bodyParams)
      if (queryParams) console.info('Query Parameters: ', queryParams)
    }

    const response = await fetch(fullPath.href, {
      method,
      headers,
      body,
      compress
    })

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('json')) {
      responseBody = await response.json()
    } else {
      responseBody = (await response.text()) as any
    }

    return responseBody
  }

  async *paginatedRequest<T_Response = any>({
    path,
    queryParams
  }: {
    path: string
    queryParams?: PaginationMeta
  }): AsyncGenerator<APIResponse<T_Response>, void, unknown> {
    let response = await this.request({ method: 'GET', path, queryParams })
    yield response

    while (response.meta && 'after' in response.meta && response.meta.after) {
      response = await this.request({
        method: 'GET',
        path,
        queryParams: { limit: response.meta.limit, after: response.meta.after }
      })
      yield response
    }
  }
}
