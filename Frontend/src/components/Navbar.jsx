import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import SearchModal from './SearchModal';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-primary-800 to-accent-rose text-white text-center py-2.5 text-sm font-medium tracking-wide">
        Enjoy Flat 10% off On Every First Order
      </div>

      <nav className="bg-primary-900 text-white sticky top-0 z-50 shadow-lg border-b border-accent-rose/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Link to="/" className="flex items-center group">
              <div className="text-xl font-serif font-semibold tracking-widest text-accent-gold group-hover:scale-105 transition-transform">
                AESTHETIC ANN
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="hover:text-accent-gold transition-colors font-serif font-medium tracking-wide relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/shop"
                className="hover:text-accent-gold transition-colors font-serif font-medium tracking-wide relative group"
              >
                Catalog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/contact"
                className="hover:text-accent-gold transition-colors font-serif font-medium tracking-wide relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">

              {/* Search - Opens Modal */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
                title="Search Products"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="hover:text-accent-gold transition-colors flex items-center space-x-1 hover:scale-110 transform duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white text-primary-900 rounded-lg shadow-2xl border-2 border-accent-rose overflow-hidden z-50">

                      <div className="bg-gradient-to-r from-accent-cream to-accent-lightRose px-4 py-3 border-b border-accent-rose/30">
                        <p className="text-xs font-medium text-primary-700">Hello,</p>
                        <p className="text-sm font-semibold text-primary-900 truncate">{user?.name}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-accent-cream transition-colors group"
                      >
                        <svg className="w-5 h-5 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                        </svg>
                        <span className="group-hover:text-accent-rose transition-colors font-medium">Dashboard</span>
                      </Link>

                      <Link
                        to="/jewelry-care"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-accent-cream transition-colors group"
                      >
                        <svg className="w-5 h-5 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="group-hover:text-accent-rose transition-colors font-medium">Jewelry Care</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent-cream transition-colors group border-t border-accent-rose/20"
                      >
                        <svg className="w-5 h-5 text-accent-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        </svg>
                        <span className="group-hover:text-accent-rose transition-colors font-medium">Logout</span>
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-rose text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden border-t border-accent-rose/20">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className="block py-2 hover:text-accent-gold transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="block py-2 hover:text-accent-gold transition-colors font-medium">
              Catalog
            </Link>
            <Link to="/contact" className="block py-2 hover:text-accent-gold transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
    </>
  );
};

export default Navbar;