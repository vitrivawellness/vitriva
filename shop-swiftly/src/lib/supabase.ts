import { createClient } from '@supabase/supabase-js';

// These should be in an .env file in a real production app.
// The user provided the project ID 'lpxshyrvkqhgtlitkfpg'.
const supabaseUrl = 'https://lpxshyrvkqhgtlitkfpg.supabase.co';
// WARNING: Missed Anon Key. Requesting from user or using a placeholder.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweHNoeXJ2a3FoZ3RsaXRrZnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTEzOTgsImV4cCI6MjA4OTc2NzM5OH0.N4vmXIVZMmmeABQRWFF8ZXk5wgsv10tRmiUwa_1U1e8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
