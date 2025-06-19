import { Offer, SeatMap } from '../types'
import { hasAvailableSeatService } from './hasAvailableSeatService'

export function hasService(offer: Offer, seatMaps?: SeatMap[]) {
  const offerHasService =
    offer &&
    Array.isArray(offer.available_services) &&
    offer.available_services.some((service) => service.maximum_quantity > 0)

  return offerHasService || hasAvailableSeatService(seatMaps)
}
