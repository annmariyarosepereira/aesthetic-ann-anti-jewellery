import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const displayPrice = product.isOnSale && product.salePrice 
    ? product.salePrice 
    : product.price;
  
  const hasDiscount = product.isOnSale && product.salePrice;

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="product-card bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-sm">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
            <span className="text-gray-900 font-semibold">
              Rs. {displayPrice.toLocaleString()}
            </span>
          </div>

          {product.rating > 0 && (
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews.length})
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;