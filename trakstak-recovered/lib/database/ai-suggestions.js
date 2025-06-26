import { supabase } from '../supabase.js'

export async function saveAISuggestion(data) {
  const { data: suggestion, error } = await supabase
    .from('ai_suggestions')
    .insert([data])
    .select()
    .single();
  return { suggestion, error };
}
