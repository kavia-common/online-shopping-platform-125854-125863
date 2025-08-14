import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function CartIcon() {
  const { cartCount } = useCart();
  return (
    <Link to="/cart" className="cart-pill" aria-label={`Cart with ${cartCount} items`}>
      <span>🛒</span>
      <span>{cartCount}</span>
    </Link>
  );
}

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Top navigation bar with brand, navigation links, auth actions and persistent cart icon.
 */
export default function NavBar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await signOut();
    } finally {
      navigate('/');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span>🛍️</span>
          <span>ShopLite</span>
        </Link>
        <nav className="nav-links">
          <Link className="link-btn" to="/orders">Orders</Link>
          {user ? (
            <button className="link-btn btn" onClick={onLogout} aria-label="Logout">Logout</button>
          ) : (
            <>
              <Link className="link-btn" to="/login">Login</Link>
              <Link className="link-btn" to="/register">Register</Link>
            </>
          )}
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}
