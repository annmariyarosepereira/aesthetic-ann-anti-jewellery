import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderAPI } from "../utils/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (cart.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [isAuthenticated, cart, navigate, orderPlaced]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const required = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    for (let field of required) {
      if (!shippingInfo[field]?.trim()) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    if (!/^\d{6}$/.test(shippingInfo.pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        const orderData = {
          items: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.salePrice || item.product.price,
          })),
          shippingAddress: shippingInfo,
          paymentMethod: paymentMethod,
          totalAmount: getCartTotal(),
        };

        const response = await orderAPI.createOrder(orderData);

        setOrderId(response.data._id);
        setOrderPlaced(true);
        clearCart();
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      
      // 1. Create the base order in the database first
      const orderData = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
        })),
        shippingAddress: shippingInfo,
        paymentMethod: 'paypal',
        totalAmount: getCartTotal(),
      };
      
      const response = await orderAPI.createOrder(orderData);
      
      // 2. Verify and tie the payment to the order
      await orderAPI.verifyPayPalPayment({
        orderId: response.data._id,
        paymentId: details.id
      });
      
      setOrderId(response.data._id);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error("PayPal Capture Error", error);
      alert("Payment processing failed. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">
            Order Placed Successfully 🎉
          </h1>

          <p className="mb-4">
            Order ID: <strong>{orderId.slice(-8)}</strong>
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn-primary"
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Shipping Form */}

          <div className="lg:col-span-2">
            <form
              onSubmit={handlePlaceOrder}
              className="bg-white p-6 rounded shadow"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Shipping Information
              </h2>

              <input
                type="text"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="input-field mb-4"
                required
              />

              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input-field mb-4"
                required
              />

              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="input-field mb-4"
                required
              />

              <textarea
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="input-field mb-4"
                required
              />

              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                className="input-field mb-4"
                required
              />

              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                placeholder="State"
                className="input-field mb-4"
                required
              />

              <input
                type="text"
                name="pincode"
                value={shippingInfo.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="input-field mb-4"
                required
              />

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal / Card
                  </label>
                </div>
              </div>

              {paymentMethod === "cod" ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? "Placing Order..." : "Place Order (COD)"}
                </button>
              ) : (
                <div className="mt-4">
                  <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect" }}
                    createOrder={(data, actions) => {
                       // Validate form details before allowing PayPal popup to open
                       if (!validateForm()) {
                          return actions.reject();
                       }
                       // Create order on PayPal's servers using the cart total
                       // Notice: we convert INR/Local to roughly USD for the sandbox if strictly necessary,
                       // or rely on PayPal converting it if set up properly.
                       return actions.order.create({
                         purchase_units: [
                           {
                             amount: {
                               currency_code: "USD",
                               value: (getCartTotal() / 83).toFixed(2), // Rough conversion to USD for standard demo
                             },
                           },
                         ],
                       });
                    }}
                    onApprove={handlePayPalApprove}
                    onError={(err) => {
                       console.error("PayPal Error:", err);
                    }}
                  />
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between mb-4"
              >
                <span>{item.product.name}</span>

                <span>
                  ₹
                  {(
                    (item.product.salePrice || item.product.price) *
                    item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;