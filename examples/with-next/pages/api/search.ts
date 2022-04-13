import { DuffelError } from '@duffel/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { duffel } from '../../utils/duffel'

function getTomorrow() {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  return today.toISOString()
}

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method.toLowerCase() !== 'post') return res.status(404).end()

  const tomorrow = getTomorrow()

  const { destination, origin, sort } = req.body

  try {
    const offerRequest = await duffel.offerRequests.create({
      slices: [
        {
          origin,
          destination,
          departure_date: tomorrow,
        },
      ],
      passengers: [{ age: 21 }],
      return_offers: false,
    })

    const cheapestOffer = await duffel.offers.list({
      offer_request_id: offerRequest.data.id,
      sort,
      limit: 1,
    })

    res.status(200).json({ data: cheapestOffer.data[0] })
  } catch (error: unknown) {
    if (error instanceof DuffelError) {
      res.status(error.meta.status).send({ errors: error.errors })
      return
    }

    res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
  }
}

export default searchHandler
