import { Duffel } from '@duffel/api'

if (typeof process.env.DUFFEL_ACCESS_TOKEN === 'undefined') {
  throw new Error(
    `Duffel access token not found in the environment variables. You can find them on this page https://app.duffel.com/tokens`
  )
}

export const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN,
})
