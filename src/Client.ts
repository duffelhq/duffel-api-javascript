import fetch from 'isomorphic-unfetch'
import camelCase from 'lodash/camelCase'
import { URL, URLSearchParams } from 'url'
import { transformDataKeys } from './lib'
import { APIResponse, Dictionary, PaginationMeta } from './types'

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

  public request = async <T_Response = any>(
    method: string,
    path: string,
    options?: Record<string, any>,
    body?: any
  ): Promise<APIResponse<T_Response>> => {
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

    if (options) {
      // if we want to cache the requests at some point we need to sort options
      const params = Object.fromEntries(Object.entries(options).sort()) as Dictionary<string>
      fullPath.search = new URLSearchParams(params).toString()
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

  async *paginatedRequest<T_Response = any>(
    path: string,
    options?: PaginationMeta
  ): AsyncGenerator<APIResponse<T_Response>, void, unknown> {
    let response = await this.request('GET', path, options)

    while (response.meta && 'after' in response.meta && response.meta.after) {
      yield response
      response = await this.request('GET', path, response.meta)
    }
  }
}
