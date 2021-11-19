import { PaymentIntents } from './DuffelPayments'
import {
  OfferRequests,
  Offers,
  OrderCancellations,
  Orders,
  OrderChangeRequests,
  OrderChangeOffers,
  OrderChanges,
  Payments,
  SeatMaps,
} from './booking'
import { Client, Config } from './Client'
import { Aircraft, Airlines, Airports } from './supportingResources'

export interface DuffelAPIClient {
  aircraft: Aircraft
  airlines: Airlines
  airports: Airports
  offers: Offers
  offerRequests: OfferRequests
  orders: Orders
  orderChangeRequests: OrderChangeRequests
  orderChangeOffers: OrderChangeOffers
  orderChanges: OrderChanges
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
  public orderChangeRequests: OrderChangeRequests
  public orderChangeOffers: OrderChangeOffers
  public orderChanges: OrderChanges
  public orderCancellations: OrderCancellations
  public payments: Payments
  public seatMaps: SeatMaps
  public paymentIntents: PaymentIntents

  constructor(config: Config) {
    this.client = new Client(config)

    this.aircraft = new Aircraft(this.client)
    this.airlines = new Airlines(this.client)
    this.airports = new Airports(this.client)
    this.offerRequests = new OfferRequests(this.client)
    this.offers = new Offers(this.client)
    this.orders = new Orders(this.client)
    this.orderChangeRequests = new OrderChangeRequests(this.client)
    this.orderChangeOffers = new OrderChangeOffers(this.client)
    this.orderChanges = new OrderChanges(this.client)
    this.orderCancellations = new OrderCancellations(this.client)
    this.payments = new Payments(this.client)
    this.seatMaps = new SeatMaps(this.client)
    this.paymentIntents = new PaymentIntents(this.client)
  }
}
