export const formatCurrency = (amount, currency = 'BDT') => {
  if (isNaN(amount)) return '0.00 BDT';

  if( Number.isInteger(amount) ) {
    return `${amount} ${currency}`;
  }
  
  return `${amount.toFixed(2)} ${currency}`
};



export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '--';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};