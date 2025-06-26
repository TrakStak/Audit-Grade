import { supabase } from '../supabase.js'

export async function uploadEvidenceFile(file, folder = 'evidence') {
  const fileName = `${folder}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('evidence')
    .upload(fileName, file);
  if (error) throw error;
  return data;
}
