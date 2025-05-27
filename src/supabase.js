import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pinwznxypmfqhsflqmrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbnd6bnh5cG1mcWhzZmxxbXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTkyMzQsImV4cCI6MjA2Mzg5NTIzNH0.tyML7pEVNlVRWnbWoq5YMjemE9jK8rg-csXwC-edcgM';
export const supabase = createClient(supabaseUrl, supabaseKey);