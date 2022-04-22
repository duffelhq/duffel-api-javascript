import { FC } from 'react'
import { Logo } from './Logo'

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="https://duffel.com" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>

        <nav>
          <a
            href="https://changelog.duffel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Changelog
          </a>
          <a
            href="https://duffel.com/docs/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Reference
          </a>
          <a
            href="https://duffel.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Guides
          </a>
        </nav>
      </div>
    </header>
  )
}
