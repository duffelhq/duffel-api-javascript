import { Duffel } from '@duffel/api'

if (typeof process.env.DUFFEL_ACCESS_TOKEN === 'undefined') {
  throw new Error(
    `Duffel access token not found in the environment variables. You can find them on this page https://app.duffel.com/tokens`,
  )
}

if (process.env.DUFFEL_ACCESS_TOKEN.indexOf('live') >= 0) {
  throw new Error(
    `Live Duffel token detected. Please only use a test token to avoid booking real flights.`,
  )
}

export const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN,
})
