// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { getAllProductsAPI, addToWishlistAPI } from "../services/allAPI";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsAPI();
        if (response.status >= 200 && response.status < 300) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          console.log("Error fetching products:", response);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  // Add product to wishlist
  const handleAddToWishlist = async (product) => {
    try {
      await addToWishlistAPI(product);
      Swal.fire({
        title: "Added to Wishlist!",
        text: `${product.name} has been added to your wishlist.`,
        icon: "success",
        confirmButtonColor: "#ec4899",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Could not add to wishlist.",
        icon: "error",
        confirmButtonColor: "#ec4899",
      });
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header insideHome={true} onSearch={handleSearch} />

      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src="https://img.freepik.com/free-photo/cheerful-lady-standing-with-shopping-bags-smiling-looking-happy-pink-background_1258-122868.jpg"
          alt="Hero Banner"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            New Arrivals
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md">
            Shop the latest fashion trends curated just for you
          </p>
          <a
            href="#products"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <div id="products" className="bg-[#FFF8F5] min-h-screen px-4 py-12">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-pink-700 tracking-wide">
            Our Products
          </h2>
          <div className="w-20 h-1 bg-pink-400 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Discover the latest trends in fashion curated just for you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                {/* Image container */}
                <div className="w-full aspect-[2/3] bg-gray-100">
                  <img
                    src={product.img || "https://via.placeholder.com/400x600?text=No+Image"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Card content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-pink-700 font-semibold text-sm sm:text-base line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-pink-600 mt-1 font-semibold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="w-full bg-pink-100 hover:bg-pink-200 text-pink-700 py-2 rounded-md transition"
                    >
                      Add to Wishlist
                    </button>
                    <Link
                      to={`/view?id=${product.id}`}
                      className="w-full text-center bg-pink-200 hover:bg-pink-300 text-pink-700 py-2 rounded-md transition"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">
              No products available
            </p>
          )}
        </div>
      </div>
    </>
  );
}
