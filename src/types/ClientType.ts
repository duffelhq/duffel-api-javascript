import { Headers } from 'node-fetch'

/**
 * Our list APIs will only return a limited number of results at a time.
 * By default, we'll return 50 results per page, but you can set this to any number between 1 and 200.
 * @link https://duffel.com/docs/api/overview/pagination
 */
export interface PaginationMeta {
  /**
   * The number of results to be returned in a page, between 1 and 200 (optional, default is 50)
   */
  limit?: number

  /**
   * "Before" cursor for pagination
   */
  before?: string

  /**
   * "After" cursor for pagination
   */
  after?: string | null
}

export interface ApiResponseMeta {
  /**
   * The identifier of the request
   */
  request_id: string

  /**
   * The [HTTP status](https://httpstatuses.com/) of the request
   */
  status: number
}

/**
 * Duffel uses standard [HTTP response codes](https://httpstatuses.com/) to indicate the success or failure of API requests.
 * @link https://duffel.com/docs/api/overview/errors
 */
export interface ApiResponseError {
  /**
   * A machine-readable identifier for this specific error
   */
  code: string

  /**
   * A URL pointing to a place in our documentation where you can read about the error
   */
  documentation_url: string

  /**
   * A more detailed human-readable description of what went wrong
   */
  message: string

  /**
   * A quick and simple description of what went wrong
   */
  title: string

  /**
   * A machine-readable identifier for the general category of error
   */
  type: string
}

export interface DuffelResponse<T_Data> {
  /**
   * The body of the response
   */
  data: T_Data

  /**
   * Optional metadata for the request
   */
  meta?: PaginationMeta

  /**
   * The headers from the http response
   */
  headers?: Headers
}

export interface SDKOptions {
  /**
   * If `true` it will output the path and the method called
   */
  verbose?: boolean
}
