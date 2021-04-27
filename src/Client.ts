import fetch from 'isomorphic-unfetch'
import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import { URL, URLSearchParams } from 'url'
import { transformDataKeys } from './lib'
import { APIResponse, PaginationMeta } from './types'

export interface Config {
  token: string
}

export class Client {
  private token: string
  private basePath: string
  private apiVersion: string

  constructor({ token }: Config) {
    this.token = token
    this.basePath = 'https://api.duffel.com'
    this.apiVersion = 'beta'
  }

  public request = async <T_Response = any>({
    method,
    path,
    bodyParams,
    queryParams
  }: {
    method: string
    path: string
    bodyParams?: any
    queryParams?: Record<string, any>
  }): Promise<APIResponse<T_Response>> => {
    let body
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
        .reduce((options, option) => {
          if (option[1] !== null) {
            return { ...options, [snakeCase(option[0])]: option[1] }
          }
          return options
        }, {})
      fullPath.search = new URLSearchParams(params).toString()
    }

    // We need to format body to be sent as { "data": bodyParameters }
    if (bodyParams) {
      body = JSON.stringify({
        data: {
          ...bodyParams
        }
      })
    }

    const response = await fetch(fullPath.href, {
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
