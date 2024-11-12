import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

interface Service {
  /**
   * The quantity of the service ID to pay for
   */
  quantity: number
  /**
   * The ID of the service to pay for
   */
  id: string
}

interface ThreeDSecureSessionParameters {
  /**
   * The offer ID, order ID, order change ID or quote ID intended to pay
   */
  resource_id: string

  /**
   * The services inteded to pay
   */
  services: Service[]

  /**
   * The card ID
   */
  card_id: string

  /**
   * The exception name for the 3DS session
   */
  exception: string
}

interface ThreeDSecureSessionRecord {
  id: string
  resource_id: string
  card_id: string
  live_mode: boolean
  expires_at: string
  status: string
  client_id: string
}

export class ThreeDSecureSessions extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(args: any) {
    super(args)
    this.path = 'payments/three_d_secure_sessions'
  }

  /**
   * Create a Duffel ThreeDSecureSession record
   */
  public create = async (
    data: ThreeDSecureSessionParameters,
  ): Promise<DuffelResponse<ThreeDSecureSessionRecord>> =>
    this.request({ method: 'POST', path: this.path, data })
}
