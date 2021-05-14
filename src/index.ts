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

export class Duffel {
  private client: Client
  public aircraft: Aircraft
  public airlines: Airlines
  public airports: Airports
  public offerRequests: OfferRequests
  public offers: Offers
  public orders: Orders
  public orderCancellations: OrderCancellations
  public payments: Payments
  public seatMaps: SeatMaps

  constructor(config: Config) {
    this.client = new Client(config)

    this.aircraft = new Aircraft(this.client)
    this.airlines = new Airlines(this.client)
    this.airports = new Airports(this.client)
    this.offerRequests = new OfferRequests(this.client)
    this.offers = new Offers(this.client)
    this.orders = new Orders(this.client)
    this.orderCancellations = new OrderCancellations(this.client)
    this.payments = new Payments(this.client)
    this.seatMaps = new SeatMaps(this.client)
  }
}
