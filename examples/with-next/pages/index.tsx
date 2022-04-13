import { ApiResponseError, Offer, Order } from '@duffel/api'
import { NextPage } from 'next'
import { FC, Fragment, useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import * as Card from '../components/Card'
import { formatCurrency } from '../utils/currency'

const IndexPage: NextPage = () => {
  const [offer, setOffer] = useState<Offer | null>(null)
  const [order, setOrder] = useState<Order | null>(null)

  const onReset = () => {
    setOffer(null)
    setOrder(null)
  }

  return (
    <div className="page">
      <Header />
      <Hero />

      <div className="example-flow">
        <div className="container">
          {!offer && <SearchCard onSuccess={(offer) => setOffer(offer)} />}
          {offer && !order && (
            <BookingCard offer={offer} onSuccess={(order) => setOrder(order)} />
          )}
          {offer && order && <ConfirmationCard order={order} />}
          {offer && (
            <button className="example-flow__reset" onClick={onReset}>
              Start new search
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface SearchCardProps {
  onSuccess(offer: Offer): void
}

const SearchCard: FC<SearchCardProps> = ({ onSuccess }) => {
  const [sort, setSort] = useState<'total_amount' | 'total_duration'>(
    'total_amount'
  )
  const [origin, setOrigin] = useState('JFK')
  const [destination, setDestination] = useState('LHR')
  const [isFetching, setIsFetching] = useState(false)
  const [_errors, setErrors] = useState<ApiResponseError[]>([])

  const fetchCheapestOffer = async () => {
    setIsFetching(true)
    const { data, errors } = await (
      await fetch('/api/search', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin,
          destination,
          sort,
        }),
      })
    ).json()

    if (data) {
      onSuccess(data)
    } else {
      setErrors(errors)
      // eslint-disable-next-line
      console.log(errors)
    }

    setIsFetching(false)
  }

  return (
    <Fragment>
      <h4>Example booking flow</h4>
      <h2>1. Let’s make a simple search</h2>

      <Card.Root>
        <Card.Content>
          <Card.Highlight secondary>Next available</Card.Highlight>
          <Card.Select
            onSelect={(option) => setSort(option as any)}
            defaultValue={sort}
            options={[
              { value: 'total_amount', label: 'cheapest flight' },
              { value: 'total_duration', label: 'shortest flight' },
            ]}
          />
          <Card.Text color="light">from</Card.Text>
          <Card.Select
            onSelect={setOrigin}
            defaultValue={origin}
            options={[
              { value: 'JFK', label: 'JFK' },
              { value: 'MIA', label: 'MIA' },
              { value: 'LAX', label: 'LAX' },
              { value: 'SFO', label: 'SFO' },
            ]}
          />
          <Card.Text color="light">to</Card.Text>
          <Card.Select
            onSelect={setDestination}
            defaultValue={destination}
            options={[
              { value: 'LHR', label: 'LHR' },
              { value: 'CDG', label: 'CDG' },
              { value: 'FRA', label: 'FRA' },
              { value: 'MAD', label: 'MAD' },
            ]}
          />
        </Card.Content>

        <Card.Button
          className="card__btn"
          onClick={fetchCheapestOffer}
          disabled={isFetching}
        >
          {isFetching ? 'Searching…' : 'Search'}
        </Card.Button>
      </Card.Root>
    </Fragment>
  )
}

interface BookingCardProps {
  offer: Offer
  onSuccess: (order: Order) => void
}

const BookingCard: FC<BookingCardProps> = ({ offer, onSuccess }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [_errors, setErrors] = useState<ApiResponseError[]>([])

  const bookOffer = async () => {
    setIsFetching(true)

    const { data, errors } = await (
      await fetch('/api/book', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: offer.id,
          passengers: [
            {
              id: offer.passengers[0].id,
              born_on: '1987-07-24',
              family_name: 'Earheart',
              given_name: 'Amelia',
              gender: 'f',
              title: 'ms',
              email: 'amelia@duffel.com',
              phone_number: '+442080160509',
            },
          ],
          currency: offer.total_currency,
          amount: offer.total_amount,
        }),
      })
    ).json()

    if (data) {
      setIsFetching(false)
      onSuccess(data)
    } else {
      setIsFetching(false)
      setErrors(errors)
      // eslint-disable-next-line
      console.log(errors)
    }
  }

  return (
    <Fragment>
      <h4>Example booking flow</h4>
      <h2>2. We have a result! Let’s book it</h2>

      <Card.Root>
        <Card.Content>
          <img
            src={getAirlineLogoUrl(offer.owner.iata_code)}
            alt={offer.owner.name}
            width={24}
            height={24}
          />
          <Card.Text color="dark">{offer.owner.name}</Card.Text>
          <Card.Text className="offer-currency" color="dark">
            {formatCurrency(offer.total_amount, offer.total_currency)}
          </Card.Text>
        </Card.Content>
        <Card.Button
          className="card__btn"
          disabled={isFetching}
          onClick={async () => await bookOffer()}
        >
          {isFetching ? 'Booking…' : 'Book'}
        </Card.Button>
      </Card.Root>
    </Fragment>
  )
}

interface ConfirmationCardProps {
  order: Order
}

const ConfirmationCard: FC<ConfirmationCardProps> = ({ order }) => {
  return (
    <Fragment>
      <h4>Example booking flow</h4>
      <h2>3. Et voila! Order created</h2>

      <Card.Root>
        <Card.Content>
          <img
            src={getAirlineLogoUrl(order.owner.iata_code)}
            alt={order.owner.name}
            width={24}
            height={24}
          />
          <Card.Text color="dark">{order.owner.name}</Card.Text>
          <Card.Text className="offer-currency" color="dark">
            {formatCurrency(order.total_amount, order.total_currency)}
          </Card.Text>
        </Card.Content>
        <Card.Button className="card__btn" disabled={true} secondary>
          Booked!
        </Card.Button>
      </Card.Root>

      <p>
        Booking reference: <strong>{order.booking_reference}</strong>
      </p>
    </Fragment>
  )
}

function getAirlineLogoUrl(iataCode: string) {
  return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iataCode}.svg`
}

export default IndexPage
