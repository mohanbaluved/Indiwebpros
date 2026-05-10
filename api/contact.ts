import type { VercelRequest, VercelResponse } from '@vercel/node';
import { addToGoogleSheet } from '../src/lib/sheets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const date = new Date().toISOString();
    const result = await addToGoogleSheet({ 
      Date: date, 
      Source: 'Contact Form', 
      Name: name || 'Anonymous', 
      Email: email, 
      Message: message || '' 
    });
    
    if (!result.success) {
      console.error("Supabase sync failed:", result.error);
      // Return 200 but with sync: false so the user can still see success on UI
      // but developers know something is wrong.
      return res.status(200).json({ 
        success: true, 
        sync: false,
        error: result.error 
      });
    }

    return res.status(200).json({ 
      success: true, 
      sync: true
    });
  } catch (error: any) {
    console.error("Critical error in /api/contact:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
