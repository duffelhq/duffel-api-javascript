import { SeatMap } from '../types'
import { hasService } from './hasService'

describe('hasService', () => {
  // A basic offer with no available services
  const baseOffer = {
    available_services: [],
  } as any

  it('should return false when no seat maps passed and no available services on offer (no services available at all)', () => {
    // No seat maps provided and the offer has no available services
    expect(hasService(baseOffer)).toBe(false)
  })

  it('should return false when seat maps is an empty array and no available services on offer', () => {
    // Seat maps provided as empty array and no service on the offer
    expect(hasService(baseOffer, [])).toBe(false)
  })

  it('should return true when no seat maps passed but offer has a service available', () => {
    // Offer has a service (e.g. a baggage service) with maximum_quantity > 0
    // and seat maps are not provided

    const offerWithService = {
      available_services: [{ maximum_quantity: 1, type: 'baggage' }],
    } as any

    expect(hasService(offerWithService)).toBe(true)
  })

  it('should return true when only seats available in seat maps', () => {
    // Offer has no available services, but seat maps include a seat with available services
    const seatMaps: SeatMap[] = [
      {
        cabins: [
          {
            rows: [
              {
                sections: [
                  {
                    elements: [
                      {
                        type: 'seat',
                        available_services: ['service1', 'service2'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as any

    expect(hasService(baseOffer, seatMaps)).toBe(true)
  })
  it('should return true when only baggages available in offer', () => {
    // Offer has an available baggage service and seat maps are empty
    const offerWithBaggage = {
      available_services: [{ maximum_quantity: 1, type: 'baggage' }],
    } as any

    expect(hasService(offerWithBaggage, [])).toBe(true)
    expect(hasService(offerWithBaggage, undefined)).toBe(true)
  })
})
