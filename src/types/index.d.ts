export * from './shared'
export * from './supportingResources'

export interface PaginationMeta {
  /** The number of results to be returned in a page, between 1 and 200 (optional, default is 50) */
  limit?: number
  /** "Before" cursor for pagination */
  before?: string
  /** "After" cursor for pagination */
  after?: string | null
}

export interface ApiResponseMeta {
  requestId: string
  status: number
}

export interface ApiResponseError {
  code: string
  documentationUrl: string
  message: string
  title: string
  type: string
}

export interface APIResponse<T> {
  data?: T
  meta?: ApiResponseMeta | PaginationMeta
  errors?: ApiResponseError[]
}
