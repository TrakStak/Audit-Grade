import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return error
}
