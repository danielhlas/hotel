import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tmmduhcwahllfauqhkuj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWR1aGN3YWhsbGZhdXFoa3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTA0NzAsImV4cCI6MjA1MjQyNjQ3MH0.iqhuSBS0oDMAQyYgvWuXdyIVR5reEiqBKOHJKz-9FwE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
