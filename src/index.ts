import { OfferRequests, Offers, OrderCancellations, Orders, Payments, SeatMaps } from './booking'
import { Client, Config } from './Client'
import { Aircraft, Airlines, Airports } from './supportingResources'

export interface DuffelAPIClient {
  aircraft: Aircraft
  airlines: Airlines
  airports: Airports
  offers: Offers
  offerRequests: OfferRequests
  orders: Orders
  orderCancellations: OrderCancellations
  payments: Payments
  seatMaps: SeatMaps
}

export const DuffelAPI = (config: Config): DuffelAPIClient => {
  const client = new Client(config)

  return {
    aircraft: new Aircraft(client),
    airlines: new Airlines(client),
    airports: new Airports(client),
    offerRequests: new OfferRequests(client),
    offers: new Offers(client),
    orders: new Orders(client),
    orderCancellations: new OrderCancellations(client),
    payments: new Payments(client),
    seatMaps: new SeatMaps(client)
  }
}
