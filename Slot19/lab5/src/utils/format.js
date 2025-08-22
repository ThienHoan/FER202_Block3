// Format a price number/string to currency with 2 decimals
export function formatPrice(value) {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(number)) return '$0.00';
  return `$${number.toFixed(2)}`;
}

// Normalize text for search (lowercase + trim)
export function normalizeText(text) {
  return (text || '').toString().trim().toLowerCase();
}

// Sleep helper for simulating async delays
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Ensure asset path resolves from public root (prefix with '/')
export function assetUrl(path) {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}
