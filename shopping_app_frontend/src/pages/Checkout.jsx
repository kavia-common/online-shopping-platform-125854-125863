import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/ordersService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * Checkout
 * Collects basic shipping info and places an order.
 */
export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [info, setInfo] = useState({ name: '', address: '', city: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!items.length) {
    return <div>Your cart is empty.</div>;
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderPayload = {
        user_id: user?.id || null,
        items,
        total: cartTotal,
        shipping: info,
      };
      const order = await createOrder(orderPayload);
      clearCart();
      navigate('/orders', { state: { placed: order.id } });
    } catch (err) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div className="layout">
        <form className="card" onSubmit={submit} style={{ padding: 12 }}>
          <h3 style={{ margin: 0 }}>Shipping information</h3>
          <label className="muted">Name</label>
          <input className="input" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} required />
          <label className="muted">Address</label>
          <input className="input" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <label className="muted">City</label>
              <input className="input" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} required />
            </div>
            <div>
              <label className="muted">Country</label>
              <input className="input" value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} required />
            </div>
          </div>
          <hr className="sep" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><strong>Order total:</strong> {formatCurrency(cartTotal)}</div>
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Placing Order…' : 'Place Order'}</button>
          </div>
          {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}
        </form>
        <div className="sidebar">
          <h3 style={{ marginTop: 0 }}>Items</h3>
          {items.map((i) => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <div>{i.name} × {i.quantity}</div>
              <div style={{ fontWeight: 700 }}>{formatCurrency(i.price * i.quantity)}</div>
            </div>
          ))}
          <div style={{ fontWeight: 800, marginTop: 8, textAlign: 'right' }}>Total: {formatCurrency(cartTotal)}</div>
        </div>
      </div>
    </div>
  );
}
