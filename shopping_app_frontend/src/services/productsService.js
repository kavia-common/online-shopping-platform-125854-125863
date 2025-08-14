import { supabase } from './supabaseClient';

const FALLBACK_PRODUCTS = [
  { id: 'p1', name: 'Wireless Headphones', price: 89.99, category: 'Electronics', image: '', description: 'Comfortable over-ear headphones with noise isolation.' },
  { id: 'p2', name: 'Smart Watch', price: 129.99, category: 'Electronics', image: '', description: 'Track health metrics and notifications on the go.' },
  { id: 'p3', name: 'Espresso Maker', price: 59.99, category: 'Home', image: '', description: 'Brew barista-quality espresso at home.' },
  { id: 'p4', name: 'Yoga Mat', price: 24.99, category: 'Fitness', image: '', description: 'Non-slip mat for workouts and yoga sessions.' },
  { id: 'p5', name: 'Running Shoes', price: 74.99, category: 'Fitness', image: '', description: 'Lightweight and comfortable with breathable mesh.' },
];

/**
 * PUBLIC_INTERFACE
 * fetchProducts
 * Fetch products with optional search and filters. Falls back to local data if Supabase is unavailable.
 */
export async function fetchProducts({ search = '', category = 'All' } = {}) {
  let products = FALLBACK_PRODUCTS;

  if (supabase) {
    try {
      let query = supabase.from('products').select('*').limit(100);
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data) {
        products = data.map((p) => ({
          id: p.id?.toString?.() ?? p.id,
          name: p.name,
          price: p.price,
          category: p.category || 'General',
          image: p.image_url || '',
          description: p.description || '',
        }));
      }
    } catch (e) {
      // ignore and use fallback
    }
  }

  const term = search.toLowerCase();
  const filtered = products.filter((p) => {
    const matchSearch = term ? (p.name.toLowerCase().includes(term) || (p.description || '').toLowerCase().includes(term)) : true;
    const matchCat = category === 'All' ? true : p.category === category;
    return matchSearch && matchCat;
  });

  return filtered;
}

/**
 * PUBLIC_INTERFACE
 * fetchProductById
 * Returns a single product by id using Supabase when possible or local fallback.
 */
export async function fetchProductById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (!error && data) {
        return {
          id: data.id?.toString?.() ?? data.id,
          name: data.name,
          price: data.price,
          category: data.category || 'General',
          image: data.image_url || '',
          description: data.description || '',
        };
      }
    } catch (e) {
      // ignore and fallback
    }
  }
  return FALLBACK_PRODUCTS.find((p) => p.id.toString() === id.toString()) || null;
}
