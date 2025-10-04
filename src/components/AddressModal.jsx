// src/components/AddressModal.jsx
import React, { useState, useEffect } from "react";

export default function AddressModal({ isOpen, onClose, onSave, existingAddress }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (existingAddress) setAddress(existingAddress);
  }, [existingAddress]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simple validation
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("Please fill all fields");
      return;
    }
    onSave(address);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add / Edit Address</h2>
        <input
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={address.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="street"
          placeholder="Street / House No."
          value={address.street}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="border px-3 py-2 rounded mb-4 w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Save & Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
