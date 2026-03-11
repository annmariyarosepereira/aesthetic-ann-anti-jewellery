import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productAPI.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to submit a review');
      navigate('/login');
      return;
    }

    try {
      await productAPI.addReview(id, review);
      alert('Review submitted successfully!');
      setReview({ rating: 5, comment: '' });
      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const displayPrice = product.isOnSale && product.salePrice 
    ? product.salePrice 
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg mb-4">
            <img
              src={product.images[selectedImage] || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg cursor-pointer border-2 ${
                    selectedImage === index ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-3 mb-6">
            {product.isOnSale && product.salePrice && (
              <span className="text-xl text-gray-400 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              Rs. {displayPrice.toLocaleString()}
            </span>
            {product.isOnSale && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Sale
              </span>
            )}
          </div>

          {product.rating > 0 && (
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>
          )}

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Material:</span> {product.material}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className={`text-sm mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>
          </div>

          {product.careInstructions && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Care Instructions:</h3>
              <p className="text-sm text-gray-700">{product.careInstructions}</p>
            </div>
          )}

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            
            {product.reviews.length === 0 ? (
              <p className="text-gray-600 mb-6">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4 mb-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {review.user?.name || 'Anonymous'}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <h4 className="font-semibold">Write a Review</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                  className="input-field"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  required
                  rows={4}
                  className="input-field"
                  placeholder="Share your experience..."
                />
              </div>
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;