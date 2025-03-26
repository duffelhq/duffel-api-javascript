import { SeatMap } from 'types'
import { hasAvailableSeatService } from './hasAvailableSeatService'

describe('hasAvailableSeatService', () => {
  it('should return false when seatMaps is undefined', () => {
    expect(hasAvailableSeatService()).toBe(false)
  })

  it('should return false when seatMaps is an empty array', () => {
    expect(hasAvailableSeatService([])).toBe(false)
  })

  it('should return false when seatMaps do not contain any seat with available services', () => {
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
                        available_services: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      } as any,
    ]
    const result = hasAvailableSeatService(seatMaps)
    expect(result).toBe(false)
  })

  it('should return true when seatMaps contain a seat with available services', () => {
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
      } as any,
    ]
    const result = hasAvailableSeatService(seatMaps)
    expect(result).toBe(true)
  })
})
