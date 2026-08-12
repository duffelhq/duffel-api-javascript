import nock from 'nock'
import { Duffel } from '../../index'

const duffel = new Duffel({ token: 'mockToken' })
describe('Trains/TicketAssets', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should get /trains/ticket_assets/{id}/download when `download` is called', async () => {
    const ticketAssetId = 'tat_0000B4g6yw07bxfrNWoxJg'
    const fileContents = Buffer.from('%PDF-1.4 mock ticket contents')

    nock(/(.*)/)
      .get(`/trains/ticket_assets/${ticketAssetId}/download`)
      .reply(200, fileContents, { 'Content-Type': 'application/pdf' })

    const response = await duffel.trains.ticketAssets.download(ticketAssetId)
    expect(Buffer.isBuffer(response.data)).toBe(true)
    expect(response.data).toEqual(fileContents)
  })
})
