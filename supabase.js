
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://rincxoalnhfsnwgwxrfb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbmN4b2Fsbmhmc253Z3d4cmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjE2MzMsImV4cCI6MjA2OTE5NzYzM30.95JhUW9uRbcHSkFCXyh40acSAAnJIj3nbUICQGqW32Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
