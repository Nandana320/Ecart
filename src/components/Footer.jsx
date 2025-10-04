import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-pink-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Trendora Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Shopzy</h2>
          <p className="text-pink-600 text-sm">
            Your one-stop fashion store for dresses, bags, and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-pink-600 text-sm">
            <li className="hover:text-pink-400 transition cursor-pointer">Home</li>
            <li className="hover:text-pink-400 transition cursor-pointer">Wishlist</li>
            <li className="hover:text-pink-400 transition cursor-pointer">Cart</li>
            <li className="hover:text-pink-400 transition cursor-pointer">About Us</li>
            <li className="hover:text-pink-400 transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex flex-wrap gap-3 text-pink-600 text-sm">
            <a href="#" className="hover:text-pink-400 transition"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaPinterestP size={20} /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-pink-600 text-sm mb-2">Subscribe for latest updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-3 py-2 rounded-lg border border-pink-200 focus:outline-none bg-pink-100 text-pink-700 placeholder-pink-500"
            />
            <button className="px-4 py-2 rounded-lg bg-pink-200 text-pink-700 hover:bg-pink-300 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-pink-100 text-pink-600 text-center py-4 text-sm">
        &copy; 2025 Shopzy. All rights reserved.
      </div>
    </footer>
  );
}
