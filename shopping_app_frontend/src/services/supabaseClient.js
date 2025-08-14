import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_KEY;

/**
 * PUBLIC_INTERFACE
 * supabase
 * The initialized Supabase client or null if env variables are missing.
 */
export const supabase = url && key ? createClient(url, key) : null;

if (!supabase) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase client not initialized. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment.'
  );
}
