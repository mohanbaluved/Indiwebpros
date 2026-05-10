import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  try {
    // Check both process.env (Node) and import.meta.env (Vite) for maximum compatibility 
    // across server-side and browser execution contexts.
    const url = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
    const key = process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

    let supabaseUrl = typeof url === 'string' ? url.trim() : '';
    let supabaseAnonKey = typeof key === 'string' ? key.trim() : '';

    // Aggressively remove any hidden non-ASCII characters that might be accidentally pasted
    supabaseUrl = supabaseUrl.replace(/[^\x21-\x7E]/g, '');
    supabaseAnonKey = supabaseAnonKey.replace(/[^\x21-\x7E]/g, '');

    if (!supabaseUrl || !supabaseAnonKey) {
      const status = `URL=${supabaseUrl ? 'PRESENT' : 'MISSING'}, KEY=${supabaseAnonKey ? 'PRESENT' : 'MISSING'}`;
      console.error(`Supabase Config Check: ${status}`);
      throw new Error(`Supabase credentials missing (${status}). Please check your environment variables in Settings.`);
    }

    if (!supabaseUrl.startsWith('http')) {
      supabaseUrl = `https://${supabaseUrl}`;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (err: any) {
    console.error("Critical error in getSupabase:", err.message);
    throw err;
  }
}
