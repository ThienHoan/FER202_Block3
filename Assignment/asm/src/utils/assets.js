// Utilities to resolve asset URLs consistently regardless of component depth

export function resolveImageUrl(imagePath) {
  const base = import.meta?.env?.BASE_URL || '/';

  if (!imagePath || typeof imagePath !== 'string') {
    return `${base}images/placeholder.png`;
  }

  // Keep absolute URLs as-is
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Normalize leading slash and prepend BASE_URL for public assets
  const normalized = imagePath.replace(/^\/+/, '');
  return `${base}${normalized}`;
}


