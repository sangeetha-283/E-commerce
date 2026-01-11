import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();        // ✅ get product id from URL
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded shadow"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 text-2xl font-bold mb-6">
          ₹{product.price}
        </p>

        <button
          onClick={() => {
            addToCart(product);
            alert("Added to cart");
          }}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
