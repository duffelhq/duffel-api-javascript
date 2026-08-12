import { Client } from '../../Client'
import { Resource } from '../../Resource'
import { DuffelResponse } from '../../types'

export class TicketAssets extends Resource {
  /**
   * Endpoint path
   */
  path: string

  constructor(client: Client) {
    super(client)
    this.path = 'trains/ticket_assets'
  }

  /**
   * Download a train ticket asset (a PDF or Apple Wallet pass) by its ID.
   * Use the `value` returned for a downloadable ticket asset from a train
   * booking's `tickets[].assets[]` list.
   * @param {string} ticketAssetId - The ID of the ticket asset to download
   */
  public download = async (
    ticketAssetId: string,
  ): Promise<DuffelResponse<Buffer>> =>
    this.requestFile({
      method: 'GET',
      path: `${this.path}/${ticketAssetId}/download`,
    })
}
