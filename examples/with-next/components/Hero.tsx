import { FC } from 'react'

export const Hero: FC = () => {
  return (
    <div className="hero">
      <div className="container">
        <h1>Welcome to you Duffel app</h1>
        <p>
          Your’re ready to start building apps using Duffel's Flights API. Check
          out our simple booking flow below, or visit our API docs to learn
          more.
        </p>

        <a
          href="https://duffel.com/docs"
          target="_blank"
          rel="noopenner noreferrer"
          className="hero__link"
        >
          View our API documentation
        </a>
      </div>
    </div>
  )
}
