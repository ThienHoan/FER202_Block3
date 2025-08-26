    // Price utilities: parse and format while preserving currency from original value

// Detect currency based on symbols/keywords in raw string
export const detectCurrency = (raw) => {
  if (typeof raw !== 'string') return 'VND';
  const s = raw.toLowerCase();
  if (s.includes('$')) return 'USD';
  if (s.includes('vnđ') || s.includes('vnd') || s.includes('đ') || s.includes('₫')) return 'VND';
  return 'VND';
};

// Convert many price string formats to number
export const toNumberPrice = (val) => {
  if (val == null) return 0;
  if (typeof val === 'number') return val;

  let s = String(val).trim().toLowerCase();
  // remove currency labels and spaces
  s = s.replace(/vnđ|vnd|đ|₫|\$|\s/g, '');

  if (s.includes(',') && s.includes('.')) {
    // pick last separator as decimal, others as thousands
    const last = Math.max(s.lastIndexOf(','), s.lastIndexOf('.'));
    s = s.replace(/[.,]/g, (m, idx) => (idx === last ? '.' : ''));
  } else if (s.includes(',')) {
    const parts = s.split(',');
    if (parts[1] && parts[1].length === 2) {
      s = parts[0].replace(/[^0-9\-]/g, '') + '.' + parts[1];
    } else {
      s = s.replace(/[^0-9\-]/g, '');
    }
  } else {
    const last = s.lastIndexOf('.');
    if (last !== -1 && s.length - last - 1 === 2) {
      s = s.replace(/[^0-9.\-]/g, '');
    } else {
      s = s.replace(/[^0-9\-]/g, '');
    }
  }

  const n = parseFloat(s);
  return Number.isNaN(n) ? 0 : n;
};

// Format number based on desired currency
const formatByCurrency = (amount, currency) => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  // default VND
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Public: format a number with provided currency code (USD|VND)
export const formatWithCurrency = (amount, currency) => {
  return formatByCurrency(amount, currency);
};

// Public API: format while preserving currency info from the original value
export const formatPricePreserve = (rawPrice) => {
  const currency = detectCurrency(typeof rawPrice === 'string' ? rawPrice : '');
  const num = toNumberPrice(rawPrice);
  // For USD, keep $ prefix like $1,500.00; for VND show 1.500 ₫
  return formatByCurrency(num, currency);
};
