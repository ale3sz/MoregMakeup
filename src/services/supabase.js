import { createClient } from '@supabase/supabase-js';

const cleanUrl = (rawUrl) => {
  if (!rawUrl) return '';
  return rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
};

// Default Supabase project credentials
export const DEFAULT_SUPABASE_URL = 'https://ghyklkelmprcdssvshgl.supabase.co';
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_vU15iMeLU8mW-AdKbPQcgA_tUS7IDJX';

const getCredentials = () => {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL;
  const envKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY;
  const localUrl = typeof localStorage !== 'undefined' ? localStorage.getItem('moreg_supabase_url') : null;
  const localKey = typeof localStorage !== 'undefined' ? localStorage.getItem('moreg_supabase_key') : null;

  const url = cleanUrl(localUrl || envUrl || DEFAULT_SUPABASE_URL);
  const key = (localKey || envKey || DEFAULT_SUPABASE_KEY)?.trim();

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
  if (url && typeof localStorage !== 'undefined') localStorage.setItem('moreg_supabase_url', cleanUrl(url));
  if (key && typeof localStorage !== 'undefined') localStorage.setItem('moreg_supabase_key', key.trim());
};

export const clearSupabaseCredentials = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('moreg_supabase_url');
    localStorage.removeItem('moreg_supabase_key');
  }
};
