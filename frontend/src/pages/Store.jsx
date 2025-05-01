import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const Store = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fallback jika env tidak tersedia
  const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${baseURL}/item`);
        console.log("Data items diterima:", res.data); // Log the response for debugging

        // Check if the response contains the expected structure
        if (res.data && res.data.payload && Array.isArray(res.data.payload)) {
          setItems(res.data.payload); // Use the payload array from the response
        } else {
          console.error("Unexpected response structure:", res.data);
          setItems([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error("Failed to load items:", err);
        setItems([]); // Fallback to an empty array
      }
    };
    fetchItems();
  }, [baseURL]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-8 min-h-screen bg-gray-200 text-valorant-red pt-12">
        <div className="relative mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">STORE</h1>

          <div className="absolute top-0 right-0 text-valorant-light px-4">
            <FaShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Find item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl w-full md:w-1/3 text-white bg-valorant-dark"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-contain rounded-xl mb-3 bg-gray-700"
                />
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm mb-2">Rp {item.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mb-2">
                  Stock: {item.stock}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 w-full py-2 rounded-xl mt-auto"
                >
                  Add to cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No items available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Store;
