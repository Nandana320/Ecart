// components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartAPI, getWishlistAPI } from "../services/allAPI";

export default function Header({ insideHome, onSearch }) {
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch counts
  const fetchCounts = async () => {
    try {
      const cartRes = await getCartAPI();
      setCartCount(cartRes.data.length);

      const wishlistRes = await getWishlistAPI();
      setWishlistCount(wishlistRes.data.length);
    } catch (err) {
      console.error("Error fetching cart/wishlist counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <header className="bg-pink-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-pink-700 text-2xl font-bold tracking-wide">
              Shopzy
            </Link>
          </div>

          {/* Search Bar */}
          {insideHome && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-6">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none border border-r-0 border-pink-200 bg-pink-100 text-pink-700 placeholder-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-200 px-4 py-2 rounded-r-lg text-pink-700 hover:bg-pink-300 transition"
              >
                🔍
              </button>
            </form>
          )}

          {/* Nav Links */}
          <div className="flex items-center space-x-6 text-pink-700">
            <Link to="/wishlist" className="hover:text-pink-400 relative">
              ❤️ Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="hover:text-pink-400 relative">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="hover:text-pink-400">
              📦 Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {insideHome && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3 bg-pink-50">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none border border-pink-200 bg-pink-100 text-pink-700 placeholder-pink-500"
          />
        </form>
      )}
    </header>
  );
}
