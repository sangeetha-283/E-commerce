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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-green-600 text-2xl font-semibold mb-4">
        ₹{product.price}
      </p>

      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
