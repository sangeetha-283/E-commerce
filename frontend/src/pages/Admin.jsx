import React, { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {Array.isArray(products) && products.length === 0 ? (
        <p className="text-gray-500">
          No products found. Connect MongoDB and add products.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(products) &&
            products.map((p) => (
              <div
                key={p._id}
                className="border p-4 rounded bg-white shadow"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-32 w-full object-cover rounded mb-2"
                />

                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-green-600 font-bold">₹{p.price}</p>

                <p className="text-sm text-gray-600">
                  Category: {p.category || "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  Stock: {p.countInStock ?? "N/A"}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}