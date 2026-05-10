import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  try {
    let supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
    let supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim();

    // Aggressively remove any hidden non-ASCII characters (like bullets • or smart quotes)
    // that might be accidentally pasted into environment variables.
    supabaseUrl = supabaseUrl.replace(/[^\x21-\x7E]/g, '');
    supabaseAnonKey = supabaseAnonKey.replace(/[^\x21-\x7E]/g, '');

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(`Supabase Credentials Status: URL=${supabaseUrl ? 'SET' : 'MISSING'}, KEY=${supabaseAnonKey ? 'SET' : 'MISSING'}`);
      throw new Error('Supabase credentials missing. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set.');
    }

    // Ensure URL is valid and starts with https
    if (supabaseUrl && !supabaseUrl.startsWith('http')) {
      supabaseUrl = `https://${supabaseUrl}`;
    }

    console.log(`Initializing Supabase with URL: ${supabaseUrl}`);
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (err: any) {
    console.error("Critical error initializing Supabase:", err);
    throw err;
  }
}
