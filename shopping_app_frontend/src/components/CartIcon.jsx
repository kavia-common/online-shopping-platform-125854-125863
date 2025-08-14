import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

/**
 * PUBLIC_INTERFACE
 * CartIcon
 * A reusable persistent cart icon component with item count.
 */
export default function CartIcon() {
  const { cartCount } = useCart();
  return (
    <Link to="/cart" className="cart-pill" aria-label={`Cart with ${cartCount} items`}>
      <span>🛒</span>
      <span>{cartCount}</span>
    </Link>
  );
}
