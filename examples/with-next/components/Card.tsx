import { FC } from 'react'
import cx from 'classnames'

interface SharedProps {
  className?: string
  children?: React.ReactNode
}

export const Root: FC<SharedProps> = ({ className, children }) => (
  <div className={cx('card', className)}>{children}</div>
)

export const Content: FC<SharedProps> = ({ className, children }) => (
  <div className={cx('card__content', className)}>{children}</div>
)

interface TextProps extends SharedProps {
  color: 'dark' | 'light'
}

export const Text: FC<TextProps> = ({
  className,
  children,
  color = 'dark',
}) => (
  <span className={cx('card__text', `card__text--${color}`, className)}>
    {children}
  </span>
)

interface HighlightProps extends SharedProps {
  secondary?: boolean
}

export const Highlight: FC<HighlightProps> = ({
  className,
  children,
  secondary,
}) => (
  <span
    className={cx(
      'card__highlight',
      { 'card__highlight--secondary': secondary },
      className,
    )}
  >
    {children}
  </span>
)

interface AirportProps extends SharedProps {
  onSelect: (iataCode: string) => void
  defaultValue: string
  options: { value: string; label: string }[]
}

export const Select: FC<AirportProps> = ({
  className,
  defaultValue,
  onSelect,
  options,
}) => (
  <select
    className={cx('card__select', className)}
    defaultValue={defaultValue}
    onChange={(event) => onSelect(event.target.value)}
  >
    {options.map(({ value, label }) => (
      <option value={value} key={value}>
        {label}
      </option>
    ))}
  </select>
)

interface ButtonProps extends SharedProps {
  secondary?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  secondary,
  ...props
}) => (
  <button
    className={cx(
      'card__btn',
      { 'card__btn--secondary': secondary },
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
