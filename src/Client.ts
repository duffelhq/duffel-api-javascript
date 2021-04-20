import fetch from 'isomorphic-unfetch'
import camelCase from 'lodash/camelCase'
import { transformDataKeys } from './lib'
import { APIResponse } from './types'

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
    body?: any
  ): Promise<APIResponse<T_Response>> => {
    const fullPath = `${this.basePath}/${path}`
    const headers = {
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

    // TODO error handling, status codes...

    if (response.status === 204 || !response.headers.get('content-type')) {
      return {}
    }

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
}
