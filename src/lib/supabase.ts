import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xwisnkyxqgqoyoyrktio.supabase.co'
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aXNua3l4cWdxb3lveXJrdGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODQyNTMsImV4cCI6MjA3MTU2MDI1M30.KfNqescijTwvnAnNLPVxO4w4tiBwVGSIjH0VhkEV5Ho';
export const supabase = createClient(supabaseUrl, supabaseAnonkey)