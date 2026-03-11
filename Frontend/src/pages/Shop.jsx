import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'name-asc',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    // Update filters when URL params change
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || ''
    }));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/products?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.search) params.set('search', newFilters.search);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'name-asc',
      search: ''
    });
    setSearchParams({});
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'bangles', label: 'Bangles' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'jewelry-set', label: 'Jewelry Sets' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary-900 mb-2">
            {filters.search ? `Search Results for "${filters.search}"` : 'Our Collection'}
          </h1>
          <p className="text-primary-600">
            {filters.category 
              ? `Showing ${categories.find(c => c.value === filters.category)?.label || 'products'}`
              : 'Discover our exquisite jewelry collection'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-accent-lightRose/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-rose focus:border-transparent outline-none transition-all"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                placeholder="Min"
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-rose focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                placeholder="Max"
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-rose focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-rose focus:border-transparent outline-none transition-all"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>

          </div>

          {/* Clear Filters Button */}
          {(filters.category || filters.minPrice || filters.maxPrice || filters.search) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-primary-600">
            {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent-rose"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-primary-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-2xl font-serif font-semibold text-primary-900 mb-2">
              No products found
            </h3>
            <p className="text-primary-600 mb-6">
              {filters.search 
                ? `No results for "${filters.search}". Try a different search term.`
                : 'Try adjusting your filters to see more products'}
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;