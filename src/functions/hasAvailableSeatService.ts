import { SeatMap } from '../types'

export function hasAvailableSeatService(seatMaps?: SeatMap[]): boolean {
  if (!Array.isArray(seatMaps) || seatMaps.length === 0) return false

  for (const seatMap of seatMaps) {
    for (const cabin of seatMap.cabins) {
      for (const rows of cabin.rows) {
        for (const section of rows.sections) {
          for (const element of section.elements) {
            if (
              element.type === 'seat' &&
              element.available_services.length > 0
            ) {
              return true
            }
          }
        }
      }
    }
  }

  return false
}
