import { supabase } from '../supabase.js'

export async function saveLead(email) {
  const { error } = await supabase.from('email_leads').insert([
    {
      email,
    },
  ]);
  if (error) {
    throw new Error('Supabase insert failed: ' + error.message);
  }
}
