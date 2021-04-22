export interface PaginationMeta {
  limit: number
  before: string
  after: string
}

export interface ApiResponseMeta {
  requestId: string
  status: number
}

export interface ApiResponseError {
  code: string
  documentation_url: string
  message: string
  title: string
  type: string
}

export interface APIResponse<T> {
  data?: T
  meta?: ApiResponseMeta
  errors?: ApiResponseError[]
}
