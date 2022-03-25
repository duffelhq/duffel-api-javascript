import fetch from 'node-fetch'
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

  constructor({
    meta,
    errors,
  }: {
    meta: ApiResponseMeta
    errors: ApiResponseError[]
  }) {
    super()
    this.meta = meta
    this.errors = errors
  }
}

export class Client {
  private token: string
  private basePath: string
  private apiVersion: string
  private debug: SDKOptions | undefined
  private source: string | undefined

  constructor({ token, basePath, apiVersion, debug, source }: Config) {
    this.token = token
    this.basePath = basePath || 'https://api.duffel.com'
    this.apiVersion = apiVersion || 'beta'
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
      const sortedParams = Object.entries(params)
        .sort()
        .filter((option) => option[0] !== null)
      fullPath.search = new URLSearchParams(sortedParams).toString()
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

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('json')) {
      responseBody = await response.json()
    } else {
      responseBody = (await response.text()) as any
    }

    if (!response.ok || ('errors' in responseBody && responseBody.errors)) {
      throw new DuffelError(responseBody)
    }

    return responseBody
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
      yield { data: item }
    }

    while (response.meta && 'after' in response.meta && response.meta.after) {
      response = await this.request({
        method: 'GET',
        path,
        params: { limit: response.meta.limit, after: response.meta.after },
      })
      for (const item of response.data) {
        yield { data: item }
      }
    }
  }
}
