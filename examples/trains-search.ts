/* eslint-disable no-console */

import dotenv from 'dotenv'
import { Duffel } from '../src/index'

dotenv.config()

const duffel = new Duffel({
  token: '',
  debug: { verbose: true },
})

const searchTrains = async () => {
  const stations = await duffel.trains.stations.suggestions('Central')
  const origin = stations.data[0]

  const destinations = await duffel.trains.stations.suggestions('South')
  const destination = destinations.data[0]

  const response = await duffel.trains.search({
    type: 'single',
    journeys: [
      {
        origin_id: origin.id,
        destination_id: destination.id,
        time_mode: 'departs_after',
        date: '2026-05-20',
        time: '10:00',
      },
    ],
    passengers: [{ age: 30 }],
  })

  console.log('Search ID:', response.data.id)

  for (const journey of response.data.journeys) {
    console.log(
      `Journey: ${journey.origin.name} -> ${journey.destination.name}`,
    )

    for (const route of journey.routes ?? []) {
      for (const offer of route.offers) {
        console.log(
          `  ${offer.travel_class.name} — ${offer.total_amount} ${offer.total_currency} (offer ${offer.id})`,
        )
      }
    }
  }
}

searchTrains()
