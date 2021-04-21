import fetch from 'isomorphic-unfetch'
import camelCase from 'lodash/camelCase'
import { transformDataKeys } from './lib'
import { APIResponse, PaginationMeta } from './types'

export interface Config {
  token: string
}

const getPaginationQuery = (path: string, options?: PaginationMeta) =>
  options
    ? `${path}?limit=${options?.limit}${options?.before ? `&before=${options?.before}` : ''}${
        options?.after ? `&after=${options?.after}` : ''
      }`
    : path

export class Client {
  private token: string
  private basePath: string
  private apiVersion: string

  constructor({ token }: Config) {
    this.token = token
    this.basePath = 'https://api.duffel.com'
    this.apiVersion = 'beta'
  }

  public request = async <T_Response = any>(
    method: string,
    path: string,
    body?: any
  ): Promise<APIResponse<T_Response>> => {
    const fullPath = `${this.basePath}/${path}`
    const userAgent = `Duffel/${this.apiVersion} duffel_api_javascript/${process.env.npm_package_version}`
    const headers = {
      'User-Agent': userAgent,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'Content-Type': 'application/json',
      'Duffel-Version': this.apiVersion,
      Authorization: `Bearer ${this.token}`
    }

    const response = await fetch(fullPath, {
      method,
      headers,
      body
    })

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('json')) {
      const responseBody = await response.json()
      const transformedBody = transformDataKeys(responseBody, camelCase)
      return transformedBody
    } else {
      const responseBody = (await response.text()) as any
      return responseBody
    }
  }

  async *paginatedRequest<T_Response = any>(
    path: string,
    options?: PaginationMeta
  ): AsyncGenerator<APIResponse<T_Response>, void, unknown> {
    let response = await this.request('GET', getPaginationQuery(path, options))

    while (response.meta && 'after' in response.meta && response.meta.after) {
      yield response
      response = await this.request('GET', getPaginationQuery(path, response.meta))
    }
  }
}
