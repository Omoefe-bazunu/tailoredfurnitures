"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

function loadCartFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const savedCart = localStorage.getItem("tailored_cart_vault");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error reestablishing cart vault context memory");
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCartFromStorage); // 👈 lazy initializer

  // No hydration effect needed — state is initialized directly from storage

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("tailored_cart_vault", JSON.stringify(updatedCart));
  };

  const addToCart = (artwork, quantity) => {
    const existingIndex = cart.findIndex((item) => item.id === artwork.id);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        id: artwork.id,
        name: artwork.name,
        price: artwork.price,
        imageUrl: artwork.imageUrl,
        category: artwork.category,
        dimensions: artwork.dimensions,
        quantity: quantity,
      });
    }
    saveCart(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getSubtotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be executed within an explicit CartProvider wrap",
    );
  }
  return context;
}
