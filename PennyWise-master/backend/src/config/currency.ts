export const currencyConfig = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
  name: 'Indian Rupee'
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(currencyConfig.locale, {
    style: 'currency',
    currency: currencyConfig.code
  }).format(amount)
}