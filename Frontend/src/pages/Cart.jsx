import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent-cream to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <svg className="w-32 h-32 mx-auto text-primary-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">Your Cart is Empty</h2>
          <p className="text-primary-600 mb-8">Add some beautiful jewelry to your cart!</p>
          <Link to="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-cream to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-serif font-bold text-primary-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => {
                const displayPrice = item.product.salePrice || item.product.price;
                return (
                  <div key={item.product._id} className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-6 border border-accent-lightRose/30 hover:shadow-xl transition-shadow">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-primary-900">{item.product.name}</h3>
                      <p className="text-primary-600">₹{displayPrice.toLocaleString()}</p>
                      {item.product.salePrice && (
                        <span className="text-xs text-red-600 font-semibold">SALE</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border-2 border-primary-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-primary-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 border-x-2 border-primary-300 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-primary-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={clearCart}
              className="mt-6 px-6 py-3 bg-red-50 text-red-600 rounded-full font-semibold hover:bg-red-100 transition-all border border-red-200"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-accent-lightRose/30 sticky top-24">
              
              <h2 className="text-2xl font-serif font-semibold text-primary-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-primary-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-primary-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                
                <div className="border-t border-primary-200 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-primary-900">
                    <span>Total</span>
                    <span className="text-accent-rose">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary text-center block mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="w-full px-6 py-3 bg-white text-primary-900 rounded-full font-semibold hover:bg-primary-50 transition-all border-2 border-primary-200 text-center block"
              >
                Continue Shopping
              </Link>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;