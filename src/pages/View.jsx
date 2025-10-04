// src/pages/View.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { addToCartAPI, addOrderAPI } from "../services/allAPI";
import Swal from "sweetalert2";
import AddressModal from "../components/AddressModal";

export default function View() {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];

  // Fetch product by ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      fetch(`http://localhost:3000/products?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) setProduct(data[0]);
          else console.error("Product not found");
        })
        .catch((err) => console.error(err));
    } else {
      console.error("No ID found in URL");
    }
  }, []);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  // Add to cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Select a size",
        text: "Please choose a size before adding to cart.",
        confirmButtonColor: "#d946ef",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/cart");
      const cartData = await res.json();

      const existingItem = cartData.find(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingItem) {
        await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
        });
      } else {
        await addToCartAPI({ ...product, size: selectedSize, quantity: 1 });
      }

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${product.name} (${selectedSize}) has been added to your cart!`,
        confirmButtonColor: "#d946ef",
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add product to cart.",
        confirmButtonColor: "#d946ef",
      });
    }
  };

  // Buy Now → Open address modal
  const handleBuyNow = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Select a size",
        text: "Please choose a size before buying.",
        confirmButtonColor: "#d946ef",
      });
      return;
    }
    setIsModalOpen(true);
  };

  // Save address & place order
  const handleSaveAddress = async (address) => {
    setSavedAddress(address);
    setIsModalOpen(false);

    const orderData = {
      product: { ...product, size: selectedSize },
      address,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await addOrderAPI(orderData);

      if (res.status >= 200 && res.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: `Your order for ${product.name} (${selectedSize}) has been placed!`,
          confirmButtonColor: "#d946ef",
        });
      } else {
        throw new Error("Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to place your order.",
        confirmButtonColor: "#d946ef",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#FFF8F5] min-h-screen px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.img || "https://via.placeholder.com/500x500?text=No+Image"}
              alt={product.name}
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl font-bold text-pink-700 mb-4">{product.name}</h2>
            <p className="text-pink-600 text-xl mb-4">₹{product.price}</p>
            <p className="text-pink-600 mb-6">{product.description}</p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-semibold text-pink-700 mb-2">Select Size:</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded-md font-semibold cursor-pointer transition
                      ${selectedSize === size
                        ? "bg-pink-700 text-white border-pink-700"
                        : "bg-white text-pink-700 border-pink-300 hover:bg-pink-200"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-200 hover:bg-pink-300 text-pink-700 py-2 rounded-md font-semibold transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-pink-700 hover:bg-pink-600 text-white py-2 rounded-md font-semibold transition"
              >
                Buy Now
              </button>
            </div>
          </div>
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
