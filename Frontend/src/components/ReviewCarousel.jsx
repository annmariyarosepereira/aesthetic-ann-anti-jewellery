import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Andrea",
    text: "They are sooo pretty! I always wanted gold style earrings but real gold is too expensive. These are perfect and look stunning.",
    initials: "A",
    rating: 5
  },
  {
    name: "Zomani",
    text: "Amazing experience purchasing from Aesthetic Ann. The quality and price balance is perfect.",
    initials: "Z",
    rating: 5
  },
  {
    name: "Annabel",
    text: "Exactly like the pictures. Perfect for everyday styling and special occasions.",
    initials: "A",
    rating: 5
  },
  {
    name: "Zanta",
    text: "The anti-tarnish finish really works. I wear my ring daily and it still shines like new.",
    initials: "Z",
    rating: 5
  },
];

const ReviewCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[index];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-accent-cream to-accent-lightRose py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-rose/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-rose"></div>
              <svg className="w-5 h-5 text-accent-rose" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-rose"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-2">
              Trusted by our community
            </h2>
            <p className="text-primary-600 text-sm tracking-wide">Real Stories, Real Sparkle</p>
          </div>
        </div>

        {/* Review Card */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-2xl border border-accent-lightRose/30 transition-all duration-700 ease-in-out transform hover:scale-[1.02]">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-br from-accent-rose to-accent-gold p-4 rounded-full shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-6 mt-4">
              {[...Array(review.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-accent-gold drop-shadow-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-primary-800 text-lg md:text-xl mb-8 italic font-light leading-relaxed max-w-3xl mx-auto">
              "{review.text}"
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-rose to-accent-gold flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-xl">{review.initials}</span>
              </div>
              <div className="text-left">
                <h4 className="font-serif font-semibold text-primary-900 text-lg">{review.name}</h4>
                <p className="text-primary-600 text-sm">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === index
                  ? "w-12 h-3 bg-gradient-to-r from-accent-rose to-accent-gold"
                  : "w-3 h-3 bg-primary-300 hover:bg-primary-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;