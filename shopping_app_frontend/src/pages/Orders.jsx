import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrders } from '../services/ordersService';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * Orders
 * Displays a list of orders for the current user (if logged in) or local orders.
 */
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const placed = location.state?.placed;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await getOrders(user?.id || null);
      if (!cancelled) {
        setOrders(data);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  return (
    <div>
      <h2>Orders</h2>
      {placed && <div className="card" style={{ padding: 12, borderColor: 'var(--secondary)', marginBottom: 12 }}>
        🎉 Order placed successfully! Reference: <strong>{placed}</strong>
      </div>}
      {loading ? <div className="muted">Loading orders…</div> : (
        <div className="grid">
          {orders.map((o) => (
            <div key={o.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>Order {o.id}</strong></div>
                <div className="muted">{new Date(o.created_at).toLocaleString()}</div>
              </div>
              <div className="muted">Status: {o.status || 'PLACED'}</div>
              <hr className="sep" />
              <div>
                {(o.items || []).map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <div>{i.name} × {i.quantity}</div>
                    <div>{formatCurrency(i.quantity * i.price)}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'right', fontWeight: 800 }}>Total: {formatCurrency(o.total)}</div>
            </div>
          ))}
          {!orders.length && <div className="muted">No orders yet.</div>}
        </div>
      )}
    </div>
  );
}
