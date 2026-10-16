import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lenetwmpdrdtdecozzyq.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_JZMwWbxMeboAZJAvjJm48w_RMa8v8Lx';

// Client for public queries
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Optional service role client for backend bypass of RLS if user configures SUPABASE_SERVICE_ROLE_KEY
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = SERVICE_KEY 
  ? createClient(SUPABASE_URL, SERVICE_KEY)
  : supabase;
