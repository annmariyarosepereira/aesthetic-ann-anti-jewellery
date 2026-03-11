import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { orderAPI } from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome back, {user?.name || "User"}
      </p>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Pending Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {
              orders.filter(
                (o) => o.status === "pending" || o.status === "processing"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Delivered Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>

      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">Order History</h2>

        {loading ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (

              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-6"
              >

                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">

                  <div>
                    <p className="text-sm text-gray-600">
                      Order #{order._id.slice(-8)}
                    </p>

                    <p className="text-sm text-gray-600">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status?.charAt(0).toUpperCase() +
                        order.status?.slice(1)}
                    </span>
                  </div>

                </div>

                {/* Order Items */}
                <div className="space-y-3">

                  {order.items?.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center space-x-4"
                    >

                      <img
                        src={
                          item.product?.images?.[0] ||
                          "/placeholder.jpg"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.product?.name || "Product"}
                        </p>

                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × Rs.{" "}
                          {item.price?.toLocaleString()}
                        </p>
                      </div>

                    </div>

                  ))}

                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Total Amount:
                  </span>

                  <span className="text-lg font-bold">
                    Rs. {order.totalAmount?.toLocaleString()}
                  </span>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mt-4 pt-4 border-t border-gray-200">

                    <h4 className="font-semibold mb-2">
                      Shipping Address:
                    </h4>

                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},
                      <br />
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode},
                      <br />
                      {order.shippingAddress.country}
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;