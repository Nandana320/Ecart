// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import AddressModal from "../components/AddressModal";
import { getCartAPI, removeFromCartAPI, addToCartAPI, addOrderAPI } from "../services/allAPI";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await getCartAPI();
      if (res.status >= 200 && res.status < 300) {
        setCartItems(res.data);
      } else {
        console.error("Error fetching cart", res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Increase or decrease quantity
  const handleQuantityChange = async (item, delta) => {
    const newQty = (item.quantity || 1) + delta;
    if (newQty < 1) return;

    try {
      await removeFromCartAPI(item.id);
      const updatedItem = { ...item, quantity: newQty };
      await addToCartAPI(updatedItem);
      setCartItems((prev) =>
        prev.map((i) => (i.id === item.id ? updatedItem : i))
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update quantity.",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  // Remove item from cart
  const handleRemove = async (id) => {
    try {
      await removeFromCartAPI(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item removed from cart.",
        confirmButtonColor: "#ec4899",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not remove item.",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Open Address Modal on Order Now
  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is empty",
        text: "Add items to cart before placing an order.",
        confirmButtonColor: "#ec4899",
      });
      return;
    }
    setIsModalOpen(true);
  };

  // Save address, place order, and store it in backend
  const handleSaveAddress = async (address) => {
    setSavedAddress(address);
    setIsModalOpen(false);

    try {
      // Prepare a single order with all products
      const orderData = {
        products: cartItems.map(item => ({ ...item })),
        address,
        date: new Date().toISOString(),
        total,
        status: "pending",
      };

      await addOrderAPI(orderData);

      // Clear all items from cart in backend
      for (const item of cartItems) {
        await removeFromCartAPI(item.id);
      }

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been successfully placed!",
        confirmButtonColor: "#ec4899",
      });

      // Clear cart locally
      setCartItems([]);
    } catch (err) {
      console.error("Error placing order:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to place your order.",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#FFF8F5] min-h-screen px-4 py-12">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-pink-600 text-center mb-6">Your cart is empty.</p>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <img
                    src={item.img || "https://via.placeholder.com/100x100"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-pink-700 font-semibold">{item.name}</h3>
                    <p className="text-pink-600">₹{item.price}</p>
                    {item.size && (
                      <p className="text-pink-500 text-sm">Size: {item.size}</p>
                    )}
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="px-3 py-1 bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-md transition font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-pink-700 font-semibold">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="px-3 py-1 bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-md transition font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-1 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Total & Order Now */}
        <div className="max-w-6xl mx-auto flex justify-end items-center gap-6 mt-6">
          <p className="text-xl font-semibold text-pink-700">
            Total: ₹{total.toLocaleString("en-IN")}
          </p>
          <button
            onClick={handleOrderNow}
            disabled={cartItems.length === 0}
            className={`px-6 py-2 rounded-md font-semibold transition text-white ${
              cartItems.length === 0
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-700 hover:bg-pink-600"
            }`}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        existingAddress={savedAddress}
      />
    </>
  );
}
