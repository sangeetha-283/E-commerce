import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const increaseQty = (id) => {
  setCartItems(
    cartItems.map(item =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    )
  );
};

const decreaseQty = (id) => {
  setCartItems(
    cartItems
      .map(item =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter(item => item.qty > 0)
  );
};

  const addToCart = product => {
    const exist = cartItems.find(p => p._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map(p =>
          p._id === product._id
            ? { ...p, qty: p.qty + 1 }
            : p
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = id =>
    setCartItems(cartItems.filter(p => p._id !== id));

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};