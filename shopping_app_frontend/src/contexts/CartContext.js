import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'shopping_cart_v1';
const CartContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useCart
 * Hook for accessing cart state and actions.
 */
export function useCart() {
  return useContext(CartContext);
}

/**
 * PUBLIC_INTERFACE
 * CartProvider
 * Provides cart state with localStorage persistence.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /**
   * PUBLIC_INTERFACE
   * addToCart
   * Adds a product to cart or increases its quantity.
   */
  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { ...product, quantity }];
    });
  }

  /**
   * PUBLIC_INTERFACE
   * removeFromCart
   * Removes product by id.
   */
  function removeFromCart(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  /**
   * PUBLIC_INTERFACE
   * updateQuantity
   * Sets product quantity; removes if 0.
   */
  function updateQuantity(id, quantity) {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, quantity } : x));
    });
  }

  /**
   * PUBLIC_INTERFACE
   * clearCart
   * Empties the cart.
   */
  function clearCart() {
    setItems([]);
  }

  const cartCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const cartTotal = useMemo(() => items.reduce((sum, i) => sum + i.quantity * (i.price || 0), 0), [items]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }),
    [items, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
