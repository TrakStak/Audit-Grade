import { supabase } from '../supabase-client.js';

export const testConnection = async () => {
  try {
    // Test with organizations table
    const { data, error } = await supabase.from('organizations').select('*').limit(1);
    
    if (error) {
      console.error("Error fetching data: ", error);
      return false;
    } else {
      console.log("✅ Supabase connection successful");
      return true;
    }
  } catch (err) {
    console.error("Error executing query: ", err);
    return false;
  }
};
