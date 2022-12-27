// ganerate a currency formatter hook for a given locale and currency code (e.g. 'en-US', 'USD')
//
export const currencyFormatter = (locale, currency) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format;
};

// use the hook to generate a formatter for USD
export const formatUSD = currencyFormatter('en-US', 'USD');

// use the hook to generate a formatter for EUR
export const formatEUR = currencyFormatter('de-DE', 'EUR');

// use the hook to generate a formatter for GBP
export const formatGBP = currencyFormatter('en-GB', 'GBP');
 
