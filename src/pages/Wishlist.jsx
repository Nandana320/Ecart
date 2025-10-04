// src/pages/Wishlist.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { getWishlistAPI, removeFromWishlistAPI, addToCartAPI } from "../services/allAPI";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist from JSON Server
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlistAPI();
        if (response.status >= 200 && response.status < 300) {
          setWishlistItems(response.data);
        } else {
          console.error("Error fetching wishlist:", response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Remove item from wishlist with SweetAlert
  const handleRemove = async (id) => {
    try {
      await removeFromWishlistAPI(id);
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));

      Swal.fire({
        title: "Removed!",
        text: "Item has been removed from your wishlist.",
        icon: "success",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Error removing item:", err);
      Swal.fire({
        title: "Error",
        text: "Could not remove item.",
        icon: "error",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "OK",
      });
    }
  };

  // Move item to cart
  const handleMoveToCart = async (item) => {
    try {
      await addToCartAPI({ ...item, quantity: 1 }); // Add to cart with quantity 1
      await removeFromWishlistAPI(item.id); // Remove from wishlist
      setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));

      Swal.fire({
        title: "Added to Cart!",
        text: `${item.name} has been added to your cart.`,
        icon: "success",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Error moving to cart:", err);
      Swal.fire({
        title: "Error",
        text: "Could not move item to cart.",
        icon: "error",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#FFF8F5] min-h-screen px-4 py-12">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-pink-600 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-pink-700 font-semibold">{item.name}</h3>
                <p className="text-pink-600 mb-4">₹{item.price.toLocaleString("en-IN")}</p>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-pink-200 hover:bg-pink-300 text-pink-700 py-2 rounded-md transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 py-2 rounded-md transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
