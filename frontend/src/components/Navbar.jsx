import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
const { cartItems } = useCart();
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between ">
      
<div className="flex items-center gap-2">
  <img 
    src="/leaf.png"  
    alt="Plantify" 
    className="h-8 w-8" />
  <Link to="/" className="font-bold text-xl">Plantify</Link>
</div>

       <div className="space-x-4">
        <Link className="hover:text-green-400 font-semibold" to="/">Home</Link>
        <Link className="hover:text-green-400 font-semibold" to="/products">Products</Link>
        <Link className="relative hover:text-green-400 font-semibold" to="/cart">Cart{cartItems.length > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
      {cartItems.reduce((sum, item) => sum + item.qty, 0)}
    </span>
  )}
</Link>
        <Link className="hover:text-green-400 font-semibold" to="/checkout">Checkout</Link>
        <Link className="hover:text-green-400 font-semibold" to="/login">Login</Link>
        <Link to="/register" className="hover:text-green-600 font-semibold">Register</Link>
        <Link className="hover:text-green-400 font-semibold" to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
