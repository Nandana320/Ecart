// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getOrdersAPI } from "../services/allAPI";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await getOrdersAPI();
      if (res.status >= 200 && res.status < 300) {
        // Ensure data is an array and normalize structure
        const data = Array.isArray(res.data) ? res.data : [];
        setOrders(
          data.map((order) => ({
            ...order,
            products: Array.isArray(order.products) ? order.products : [order.product], // for single-product orders
          }))
        );
      } else {
        console.error("Error fetching orders", res);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[#FFF8F5] min-h-screen px-4 py-12">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-pink-600 text-center">No orders found.</p>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md border border-pink-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-pink-700 font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                {/* Products in the order */}
                <div className="space-y-3 mb-4">
                  {order.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border-b pb-2"
                    >
                      <img
                        src={item.img || "https://via.placeholder.com/100x100"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-pink-700 font-semibold">{item.name}</p>
                        <p className="text-pink-600 text-sm">
                          ₹{item.price} × {item.quantity || 1}
                        </p>
                        {item.size && (
                          <p className="text-pink-500 text-xs">Size: {item.size}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address & Total */}
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address
                    ? `${order.address.name}, ${order.address.phone}, ${order.address.street}, ${order.address.city}, ${order.address.pincode}`
                    : "N/A"}
                </p>
                <p className="text-pink-700 font-semibold mb-2">
                  Total: ₹
                  {order.products
                    .reduce(
                      (acc, item) => acc + item.price * (item.quantity || 1),
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>

                {/* Status */}
                <p
                  className={`font-semibold ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {order.status || "pending"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
