import { useMemo } from 'react';

export const useProductFilters = (products, searchQuery, sortBy, filterBy) => {
  const filteredAndSortedProducts = useMemo(() => {
    // Filter by search query
    let filtered = products;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category/type
    if (filterBy && filterBy !== 'all') {
      filtered = filtered.filter(product => product.category === filterBy);
    }

    // Sort products
    let sorted = [...filtered];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [products, searchQuery, sortBy, filterBy]);

  return filteredAndSortedProducts;
};
