import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productsService';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * ProductDetail
 * Displays detailed information about a single product.
 */
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const p = await fetchProductById(id);
      if (!cancelled) setProduct(p);
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (!product) return <div className="muted">Loading…</div>;

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="card-media" aria-hidden="true" />
      </div>
      <div>
        <h2 style={{ marginTop: 0 }}>{product.name}</h2>
        <div className="muted">{product.category}</div>
        <p>{product.description}</p>
        <div className="card-price" style={{ fontSize: 24, marginBottom: 12 }}>{formatCurrency(product.price)}</div>
        <button className="btn btn-primary" onClick={() => addToCart(product, 1)}>Add to Cart</button>
      </div>
    </div>
  );
}
