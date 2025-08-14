import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/productsService';
import { useCart } from '../contexts/CartContext';

/**
 * PUBLIC_INTERFACE
 * Home
 * Product browsing page with search and filter sidebar.
 */
export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await fetchProducts({ search, category });
      if (!cancelled) {
        setProducts(data);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [search, category]);

  return (
    <div className="layout">
      <FilterSidebar search={search} category={category} onSearch={setSearch} onCategory={setCategory} />
      <div>
        <div className="toolbar" style={{ marginBottom: 12 }}>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
        </div>
        {loading ? <div className="muted">Loading products…</div> : <ProductGrid products={products} onAdd={(p) => addToCart(p, 1)} />}
      </div>
    </div>
  );
}
