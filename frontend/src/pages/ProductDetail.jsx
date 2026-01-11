import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        console.log("PRODUCT DETAIL API:", data);

        if (data && data._id) {
          setProduct(data);
        } else if (data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Product detail error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image - Left Side */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details - Right Side */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-green-600 text-3xl font-bold mb-6">
              ₹{product.price}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
