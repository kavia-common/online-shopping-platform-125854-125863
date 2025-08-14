import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * ProductCard
 * Displays product information and a link to detail page.
 */
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <div className="card-media" role="img" aria-label={`${product.name} image`} />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className="muted">{product.category || 'General'}</div>
        <div className="card-price">{formatCurrency(product.price)}</div>
        <div className="toolbar">
          <Link to={`/product/${product.id}`} className="btn">View</Link>
          <button className="btn btn-primary" onClick={() => onAdd?.(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
