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

  const airlinePages = duffel.airlines.list({
    queryParams: { limit: 5 }
  })

  for await (const page of airlinePages) {
    console.log(page)
  }
}

example()
