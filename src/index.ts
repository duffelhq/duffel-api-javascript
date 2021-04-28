import { OfferRequests, Offers, OrderCancellations, Orders, Payments } from './booking'
import { Client } from './Client'
import { Aircraft, Airlines, Airports } from './supportingResources'

interface Config {
  token: string
}

export const DuffelAPI = ({ token }: Config) => {
  const client = new Client({ token })

  return {
    aircraft: new Aircraft(client),
    airlines: new Airlines(client),
    airports: new Airports(client),
    offerRequests: new OfferRequests(client),
    offers: new Offers(client),
    orders: new Orders(client),
    orderCancellations: new OrderCancellations(client),
    payments: new Payments(client)
  }
}
