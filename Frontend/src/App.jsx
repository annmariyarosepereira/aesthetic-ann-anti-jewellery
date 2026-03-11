import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';   // ⭐ ADD THIS
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import JewelryCareTracker from './pages/JewelryCareTracker';
import CustomBuilder from './pages/CustomBuilder';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './App.css';

const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD", // India Sandbox accounts tend to require USD routing unless fully activated
    intent: "capture",
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
      <PayPalScriptProvider options={initialOptions}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          {/* ⭐ ADD THIS ROUTE */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jewelry-care"
            element={
              <ProtectedRoute>
                <JewelryCareTracker />
              </ProtectedRoute>
            }
          />

          <Route path="/custom-builder" element={<CustomBuilder />} />
        </Routes>
        </PayPalScriptProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;