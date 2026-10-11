import { createClient } from '@supabase/supabase-js';

// Get credentials from Vite env or localStorage (configured via Admin Panel)
const getCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('moreg_supabase_url');
  const localKey = localStorage.getItem('moreg_supabase_key');

  const url = localUrl || envUrl;
  const key = localKey || envKey;

  return { url, key };
};

export const getSupabaseClient = () => {
  const { url, key } = getCredentials();
  if (url && key && url.startsWith('http')) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn('Error inicializando Supabase:', e);
      return null;
    }
  }
  return null;
};

export const isSupabaseConfigured = () => {
  const { url, key } = getCredentials();
  return Boolean(url && key && url.startsWith('http'));
};

export const saveSupabaseCredentials = (url, key) => {
  if (url) localStorage.setItem('moreg_supabase_url', url.trim());
  if (key) localStorage.setItem('moreg_supabase_key', key.trim());
};

export const clearSupabaseCredentials = () => {
  localStorage.removeItem('moreg_supabase_url');
  localStorage.removeItem('moreg_supabase_key');
};
