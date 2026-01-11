import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold">
          Your cart is empty
        </h2>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully (Payment integration pending)");
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      
      {/* Shipping Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="Full Name"
            required
          />
          <input
            className="border p-2 w-full"
            placeholder="Address"
            required
          />
          <input
            className="border p-2 w-full"
            placeholder="City"
            required
          />
          <input
            className="border p-2 w-full"
            placeholder="Pincode"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded mt-4"
          >
            Pay₹{totalPrice}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between mb-2"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-lg font-bold">
          Total: ₹{totalPrice}
        </h3>
      </div>
    </div>
  );
}
