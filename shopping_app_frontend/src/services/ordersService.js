import { supabase } from './supabaseClient';

const STORAGE_KEY = 'orders_v1';

function getLocalOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/**
 * PUBLIC_INTERFACE
 * createOrder
 * Creates a new order in Supabase when configured; otherwise stores locally.
 * Returns the created order object.
 */
export async function createOrder(order) {
  const payload = { ...order, created_at: new Date().toISOString(), status: 'PLACED' };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('orders').insert(payload).select().single();
      if (!error && data) {
        return data;
      }
    } catch {
      // ignore to fallback
    }
  }

  const orders = getLocalOrders();
  const localOrder = { id: `o_${orders.length + 1}`, ...payload };
  orders.push(localOrder);
  setLocalOrders(orders);
  return localOrder;
}

/**
 * PUBLIC_INTERFACE
 * getOrders
 * Retrieves orders for current user when available, else all local orders.
 */
export async function getOrders(userId = null) {
  if (supabase && userId) {
    try {
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch {
      // ignore to fallback
    }
  }
  return getLocalOrders().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}
