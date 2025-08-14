const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

/**
 * PUBLIC_INTERFACE
 * formatCurrency
 * Formats a number to USD currency string.
 */
export function formatCurrency(value) {
  return formatter.format(value || 0);
}
