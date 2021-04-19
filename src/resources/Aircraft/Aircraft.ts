import { APIResponse } from 'types'
import { Resource } from '../../Resource'

/** Aircraft */
export namespace Types {
  export interface Aircraft {
    /** The three-character IATA code for the aircraft */
    name: string
    /** Duffel's unique identifier for the aircraft */
    id: string
    /** The name of the aircraft */
    iataCode: string
  }
}

// TODO JSDOC - investigate how it works for other editors?
// could work nicely with OpenAPI? Investigate...

/** Aircraft are used to describe what passengers will fly in for a given trip */
export class Aircraft extends Resource {
  /**
   * Retrieves an aircraft by its ID
   * @param id Duffel's unique identifier for the aircraft
   */
  public get = async (id: string) => this.request('GET', `air/aircraft/${id}`) as APIResponse<Types.Aircraft>

  /** Retrieves a paginated list of all aircraft. The results may be returned in any order. Duffel's unique identifier for the aircraft */
  public list = async () => this.request('GET', 'air/aircraft') as APIResponse<Types.Aircraft[]>
}
