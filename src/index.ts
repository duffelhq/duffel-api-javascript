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
  PartialOfferRequests,
  SeatMaps,
  AirlineInitiatedChanges,
} from './booking'
import { Client, Config, DuffelError as _DuffelError } from './Client'
import { Aircraft, Airlines, Airports } from './supportingResources'
import { Suggestions } from './Places/Suggestions'
import { Refunds } from './DuffelPayments/Refunds'
import { Sessions } from './Links'
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
  public airlineInitiatedChanges: AirlineInitiatedChanges
  public airlines: Airlines
  public airports: Airports
  public links: Sessions
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
  public partialOfferRequests: PartialOfferRequests
  public suggestions: Suggestions
  public refunds: Refunds

  constructor(config: Config) {
    this.client = new Client(config)

    this.aircraft = new Aircraft(this.client)
    this.airlines = new Airlines(this.client)
    this.airports = new Airports(this.client)
    this.airlineInitiatedChanges = new AirlineInitiatedChanges(this.client)
    this.links = new Sessions(this.client)
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
    this.partialOfferRequests = new PartialOfferRequests(this.client)
    this.suggestions = new Suggestions(this.client)
    this.refunds = new Refunds(this.client)
  }
}

export const DuffelError = _DuffelError
