/* eslint-disable no-console */

import dotenv from 'dotenv'
import { Duffel } from '../src/index'

dotenv.config()

const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN || '',
  debug: { verbose: true }
})

const example = async () => {
  const aircraft = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
  console.log(aircraft)

  try {
    const airline = await duffel.airlines.get('nonexistent_id')
    console.log(airline)
  } catch (error) {
    console.log('Caught', error)
  }

  const airlinePage = await duffel.airlines.list({ limit: 5 })
  console.log(airlinePage)

  try {
    const airlines = duffel.airlines.listWithGenerator()
    for await (const airline of airlines) {
      console.log(airline)
    }
  } catch (error) {
    console.log('Caught while generating', error)
  }
}

example()
