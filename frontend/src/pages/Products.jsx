import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]); // MUST be array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const { data } = await api.get("/products");
        console.log("API DATA:", data);

        // ✅ SAFE HANDLING (IMPORTANT FIX)
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }

      } catch (error) {
        console.error("Product fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="p-6">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="border p-4 rounded shadow bg-white hover:shadow-xl transition-shadow"
        >
          <img
            src={p.image}
            alt={p.name}
            className="h-40 w-full object-cover mb-2 rounded"
          />

          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-green-600 font-semibold text-xl mb-4">
            ₹{p.price}
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                addToCart(p);
                alert("Added to cart");
              }}
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>

            <Link
              to={`/product/${p._id}`}
              className="block w-full border-2 border-green-600 text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-600 hover:text-white transition-all text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
