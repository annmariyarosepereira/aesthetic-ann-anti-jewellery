import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const popularSearches = [
    { label: 'EARRINGS', category: 'earrings' },
    { label: 'NECKLACES', category: 'necklaces' },
    { label: 'BRACELETS', category: 'bracelets' },
    { label: 'RINGS', category: 'rings' },
    { label: 'BANGLES', category: 'bangles' },
    { label: 'JEWELRY SETS', category: 'jewelry-set' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handlePopularSearch = (category) => {
    navigate(`/shop?category=${category}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white min-h-screen md:min-h-0 md:mt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-primary-600 hover:text-accent-rose transition-colors"
            aria-label="Close search"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jewelry..."
                className="w-full pl-14 pr-4 py-4 text-lg border-b-2 border-primary-200 focus:border-accent-rose outline-none transition-colors bg-transparent"
                autoFocus
              />
            </div>
          </form>

          {/* Popular Searches */}
          <div>
            <h3 className="text-sm font-medium text-primary-600 mb-6 tracking-wide uppercase">
              Popular searches
            </h3>
            <div className="space-y-3">
              {popularSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(item.category)}
                  className="block w-full text-left px-4 py-3 text-primary-800 hover:text-accent-rose hover:bg-accent-cream/30 rounded-lg transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-primary-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                to="/shop?category=rings"
                onClick={onClose}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-cream to-accent-lightRose p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <span className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Rings
                  </span>
                </div>
              </Link>

              <Link
                to="/shop?category=earrings"
                onClick={onClose}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-cream to-accent-lightRose p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Earrings
                  </span>
                </div>
              </Link>

              <Link
                to="/shop?category=necklaces"
                onClick={onClose}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent-cream to-accent-lightRose p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Necklaces
                  </span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchModal;