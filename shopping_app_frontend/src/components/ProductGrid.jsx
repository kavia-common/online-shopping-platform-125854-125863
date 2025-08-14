import React from 'react';
import ProductCard from './ProductCard';

/**
 * PUBLIC_INTERFACE
 * ProductGrid
 * Renders a responsive grid of ProductCard components.
 */
export default function ProductGrid({ products = [], onAdd }) {
  return (
    <div className="grid grid-cols-2 grid-cols-3 grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
