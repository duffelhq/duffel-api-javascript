import fetch, { Headers } from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import {
  DuffelResponse,
  SDKOptions,
  ApiResponseMeta,
  ApiResponseError,
} from './types'

export interface Config {
  token: string
  basePath?: string
  apiVersion?: string
  debug?: SDKOptions
  source?: string
}

export class DuffelError extends Error {
  public meta: ApiResponseMeta
  public errors: ApiResponseError[]
  public headers: Headers

  constructor({
    meta,
    errors,
    headers,
  }: {
    meta: ApiResponseMeta
    errors: ApiResponseError[]
    headers: Headers
  }) {
    super()
    this.meta = meta
    this.errors = errors
    this.headers = headers
  }
}

const CURRENT_API_VERSION = 'v2'

export class Client {
  private token: string
  private basePath: string
  private apiVersion: string
  private debug: SDKOptions | undefined
  private source: string | undefined

  constructor({ token, basePath, apiVersion, debug, source }: Config) {
    this.token = token
    this.basePath = basePath || 'https://api.duffel.com'
    this.apiVersion = apiVersion || CURRENT_API_VERSION
    this.debug = debug
    this.source = source
  }

  public request = async <T_Data = any>({
    method,
    path,
    data,
    params,
    compress = true,
  }: {
    method: string
    path: string
    data?: Record<string, any>
    params?: Record<string, any>
    compress?: boolean
  }): Promise<DuffelResponse<T_Data>> => {
    let body
    let responseBody
    const fullPath = new URL(path, this.basePath)
    const userAgent = [
      `Duffel/${this.apiVersion}`,
      `duffel_api_javascript/${process.env.npm_package_version}`,
      this.source ? `source/${this.source}` : '',
    ]
      .join(' ')
      .trim()

    const headers = {
      'User-Agent': userAgent,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'Content-Type': 'application/json',
      'Duffel-Version': this.apiVersion,
      Authorization: `Bearer ${this.token}`,
    }

    if (params) {
      const params_with_array_expanded = new URLSearchParams()
      Object.entries(params)
        .sort()
        .filter((option) => option[0] !== null)
        .forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((value) =>
              params_with_array_expanded.append(key, value.toString()),
            )
          } else {
            params_with_array_expanded.append(key, value.toString())
          }
        })
      fullPath.search = params_with_array_expanded.toString()
    }

    // We need to format body to be sent as { "data": data }
    if (data) {
      body = JSON.stringify({
        data: {
          ...data,
        },
      })
    }

    if (this.debug?.verbose) {
      console.info('Endpoint: ', fullPath.href)
      console.info('Method: ', method)
      if (data) console.info('Body Parameters: ', data)
      if (params) console.info('Query Parameters: ', params)
    }

    const response = await fetch(fullPath.href, {
      method,
      headers,
      body,
      compress,
    })

    if (this.debug?.verbose && response.headers.get('x-request-id')) {
      console.info('Request ID: ', response.headers.get('x-request-id'))
    }

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('json')) {
      responseBody = await response.json()
    } else {
      responseBody = (await response.text()) as any
    }

    if (!response.ok || ('errors' in responseBody && responseBody.errors)) {
      throw new DuffelError({
        ...responseBody,
        status: response.status,
        headers: response.headers,
      })
    }

    return {
      ...responseBody,
      status: response.status,
      headers: response.headers,
    }
  }

  async *paginatedRequest<T_Data = any>({
    path,
    params,
  }: {
    path: string
    params?: Record<string, any>
  }): AsyncGenerator<DuffelResponse<T_Data>, void, unknown> {
    let response: DuffelResponse<T_Data[]> = await this.request({
      method: 'GET',
      path,
      params,
    })
    for (const item of response.data) {
      yield { data: item, status: response.status }
    }

    while (response.meta && 'after' in response.meta && response.meta.after) {
      response = await this.request({
        method: 'GET',
        path,
        params: {
          ...params,
          ...{ limit: response.meta.limit, after: response.meta.after },
        },
      })
      for (const item of response.data) {
        yield { data: item, status: response.status }
      }
    }
  }
}
