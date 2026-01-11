import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import heroImage from '../assets/hero-image.jpg'

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
.then((res) => {
  const data = res.data;
  if (Array.isArray(data)) {
    setProducts(data.slice(0, 4));
  } else if (Array.isArray(data.products)) {
    setProducts(data.products.slice(0, 4));
  } else {
    setProducts([]);
  }
})
.catch(() => setProducts([]));
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            `url(${heroImage})`,
        }}
      >

        <Link
          to="/products"
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold 
           hover:bg-green-800 shadow-lg transform hover:-translate-y-1 
           transition-all duration-300 mx-auto block mt-4"
        >
          Shop Now🌿
        </Link>
      </div>
      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Featured Plants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded bg-white hover:shadow-lg transition-shadow">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{p.name}</h2>
              <p className="text-green-600 font-bold">₹{p.price}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    addToCart(p);
                    alert("Added to cart");
                  }}
                  className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>

                <Link
                  to={`/product/${p._id}`}
                  className="flex-1 bg-white border-2 border-green-600 text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-600 hover:text-white transition-all text-center"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}