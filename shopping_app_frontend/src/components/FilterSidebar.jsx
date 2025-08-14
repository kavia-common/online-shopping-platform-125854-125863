import React from 'react';

/**
 * PUBLIC_INTERFACE
 * FilterSidebar
 * Sidebar for filtering and searching products.
 */
export default function FilterSidebar({ search, category, onSearch, onCategory }) {
  const categories = ['All', 'Electronics', 'Home', 'Fitness', 'Fashion'];

  return (
    <aside className="sidebar">
      <h3 style={{ marginTop: 0 }}>Filters</h3>
      <label className="muted" htmlFor="search">Search</label>
      <input id="search" className="input" value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search products..." />
      <hr className="sep" />
      <label className="muted" htmlFor="category">Category</label>
      <select id="category" className="select" value={category} onChange={(e) => onCategory(e.target.value)}>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </aside>
  );
}
