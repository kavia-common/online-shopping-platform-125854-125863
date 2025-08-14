import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * Cart
 * Shopping cart view with quantity management and checkout link.
 */
export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!items.length) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link className="btn" to="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="card" style={{ padding: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <strong>{item.name}</strong>
              <div className="muted">{formatCurrency(item.price)}</div>
            </div>
            <div>
              <input
                type="number"
                min={1}
                className="input"
                style={{ width: 90 }}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value || '1', 10))}
              />
            </div>
            <div style={{ fontWeight: 700 }}>{formatCurrency(item.price * item.quantity)}</div>
            <div>
              <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}>
          <button className="btn" onClick={clearCart}>Clear Cart</button>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Total: {formatCurrency(cartTotal)}</div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link className="btn btn-accent" to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
