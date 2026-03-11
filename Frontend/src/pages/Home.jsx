import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import ReviewCarousel from "../components/ReviewCarousel";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    {
      title: 'Rings',
      image: '/images/categories/rings.jpeg',
      link: '/shop?category=rings'
    },
    {
      title: 'Earrings',
      image: '/images/categories/earrings.jpeg',
      link: '/shop?category=earrings'
    },
    {
      title: 'Bracelets',
      image: '/images/categories/bracelets.jpeg',
      link: '/shop?category=bracelets'
    },
    {
      title: 'Chain With Pendant',
      image: '/images/categories/necklaces.jpeg',
      link: '/shop?category=necklaces'
    },
    {
      title: 'Jewelry Set',
      image: '/images/categories/jewelry-set.jpeg',
      link: '/shop?category=jewelry-set'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>

      {/* HERO SECTION WITH VIDEO */}
      <section className="hero-section relative overflow-hidden">

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="hero-overlay"></div>

        {/* Text Content */}
        <div className="relative z-10 px-4 flex items-center justify-center min-h-[75vh]">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-primary-700 mb-4 font-medium">
              Welcome to Aesthetic Ann - The World of Timeless Elegance
            </p>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-900 mb-6 leading-tight">
              Where Timeless Shine Meets Modern Grace
            </h1>

            <Link
              to="/shop"
              className="inline-block btn-primary"
            >
              Explore Collection
            </Link>
          </div>
        </div>

      </section>

      {/* CATEGORY LINKS */}
      {/* CATEGORY LINKS - ELEGANT VERSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cream via-accent-lightRose to-accent-cream rounded-3xl opacity-50 blur-xl"></div>

          {/* Main content */}
          <div className="relative bg-gradient-to-r from-accent-cream/90 via-white/80 to-accent-lightRose/90 backdrop-blur-sm py-10 px-6 rounded-3xl shadow-xl border border-accent-rose/20">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">

              <Link
                to="/shop?category=rings"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Anti-Tarnish<br />Rings
                  </h3>
                </div>
              </Link>

              <Link
                to="/shop?category=earrings"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Anti-Tarnish<br />Earrings
                  </h3>
                </div>
              </Link>

              <Link
                to="/shop?category=bracelets"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Anti-Tarnish<br />Bracelets
                  </h3>
                </div>
              </Link>

              <Link
                to="/shop?category=bangles"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Anti-Tarnish<br />Bangles
                  </h3>
                </div>
              </Link>

              <Link
                to="/shop?category=necklaces"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Chain with<br />Pendant
                  </h3>
                </div>
              </Link>

              <Link
                to="/shop?category=jewelry-set"
                className="group relative overflow-hidden rounded-2xl p-6 bg-white/60 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/0 to-accent-gold/0 group-hover:from-accent-rose/10 group-hover:to-accent-gold/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary-900 group-hover:text-accent-rose transition-colors">
                    Anti-Tarnish<br />Jewelry Set
                  </h3>
                </div>
              </Link>

            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-primary-600 font-medium tracking-wide">
            <span className="inline-block px-4 py-2 rounded-full bg-white/60 shadow-sm">
              Outstanding service | Exclusive pricing | Industry expertise
            </span>
          </p>
        </div>
      </section>
      {/* TOP CATEGORIES */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-accent-gold">
            Shop our top categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                image={category.image}
                link={category.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4">
            Why Choose Aesthetic Ann?
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Experience the perfect blend of timeless elegance and modern craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-accent-lightRose">
            <h3 className="text-xl font-serif font-semibold text-primary-900 mb-2">Anti-Tarnish Quality</h3>
            <p className="text-primary-600 text-sm">
              Long-lasting shine that maintains its brilliance with minimal care
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-accent-lightRose">
            <h3 className="text-xl font-serif font-semibold text-primary-900 mb-2">Premium Materials</h3>
            <p className="text-primary-600 text-sm">
              Crafted with the finest metals and gemstones for exceptional beauty
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-accent-lightRose">
            <h3 className="text-xl font-serif font-semibold text-primary-900 mb-2">Timeless Design</h3>
            <p className="text-primary-600 text-sm">
              Elegant pieces that complement every style and occasion
            </p>
          </div>

        </div>
      </section>

      <ReviewCarousel />

      {/* Jewelry Care Guide Section */}
      <section className="bg-gradient-to-br from-accent-cream to-accent-lightRose py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4">
              You're Set Up for Success
            </h2>
            <p className="text-primary-700 max-w-2xl mx-auto">
              Learn how to care for your precious jewelry and keep it shining forever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                What is Anti-Tarnish Jewelry?
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                Anti-tarnish jewelry is specially designed and finished to resist the dulling, discoloration, and darkening that can happen to metals like sterling silver, brass, or gold overlays when exposed to air, water, or lotions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                Pearl Jewelry: Quick Facts & Care
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                Pearls are naturally luminous, organic gems formed within mollusks in freshwater or saltwater. Each pearl is unique, with its own luster, shape, and size.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                How to Layer Jewelry Like a Pro
              </h3>
              <ul className="text-sm text-primary-700 space-y-2">
                <li>• Mix chain textures and lengths for depth</li>
                <li>• Combine pearls and gold for classic-meets-modern style</li>
                <li>• Stack rings and bracelets, starting from dainty to bold</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                Jewelry Storage Tips
              </h3>
              <ul className="text-sm text-primary-700 space-y-2">
                <li>• Store in a dry, cool place - use a jewelry box, pouch, or zip-bag</li>
                <li>• Keep anti-tarnish strips or silica gel in your container to fight humidity</li>
                <li>• Separate jewelry types to prevent scratches or tangling</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                24/7 Customer Support
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                Your satisfaction is our priority! Contact us anytime for assistance with your orders or questions.
              </p>
            </div>

            <div id="return-policy" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                15-Day Return Policy
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                We offer hassle-free returns within 15 days of delivery for unworn, undamaged items in original packaging.
              </p>
            </div>

            <div id="secure-shopping" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                Secure Shopping Guarantee
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                Our website uses the latest SSL encryption technology to protect your personal and payment information.
              </p>
            </div>

            <div id="terms-conditions" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-serif font-semibold text-primary-900 mb-3">
                Terms and Conditions
              </h3>
              <p className="text-sm text-primary-700 leading-relaxed">
                All jewelry descriptions, prices, and availability are subject to change. We'll notify you of any updates before shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-accent-rose to-accent-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      

    </div>
  );
};

export default Home;