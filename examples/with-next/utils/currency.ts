export const formatCurrency = (value: string, currency: string) => {
  return Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(value as any)
}
