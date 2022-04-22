import { DuffelError } from '@duffel/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { duffel } from '../../utils/duffel'

const bookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method.toLowerCase() !== 'post') return res.status(404).end()

  const { passengers, offerId, currency, amount } = req.body

  try {
    const orderRequest = await duffel.orders.create({
      selected_offers: [offerId],
      passengers,
      type: 'instant',
      payments: [
        {
          type: 'balance',
          currency,
          amount,
        },
      ],
    })

    res.status(200).json({ data: orderRequest.data })
  } catch (error: unknown) {
    if (error instanceof DuffelError) {
      res.status(error.meta.status).send({ errors: error.errors })
      return
    }

    res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
  }
}

export default bookHandler
