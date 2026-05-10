import { getSupabase } from './supabase.js';

// Shared utility for saving to Supabase
export async function saveToSupabase(data: any) {
  try {
    const supabase = getSupabase();
    let table = '';
    let payload = {};

    if (data.Source === 'Contact Form') {
      table = 'contacts';
      payload = {
        name: data.Name,
        email: data.Email,
        message: data.Message,
        source: data.Source
      };
    } else if (data.Source === 'Internship Application') {
      table = 'internship_applications';
      payload = {
        full_name: data.Name,
        email: data.Email,
        phone: data.Phone,
        whatsapp: data.WhatsApp,
        college: data.College,
        degree: data.Degree,
        year: data.Year,
        domain: data.Domain,
        skills: data.Skills,
        reason: data.Reason,
        source: data.Source
      };
    } else {
      throw new Error(`Unknown source: ${data.Source}`);
    }

    console.log(`Syncing to Supabase table: ${table}...`);
    
    const { error } = await supabase
      .from(table)
      .insert([payload]);

    if (error) {
      console.error("Supabase Sync Error:", error);
      return { success: false, error: error.message };
    }

    console.log("Supabase Sync Success");
    return { success: true };
  } catch (err: any) {
    console.error("Error connecting to Supabase:", err);
    return { success: false, error: "Connection failure", details: err.message };
  }
}

// Keeping the old name as an alias for compatibility during migration
export const addToGoogleSheet = saveToSupabase;
