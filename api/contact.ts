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
    
    return res.status(200).json({ 
      success: true, 
      sync: result.success,
      warning: result.success ? null : result.error
    });
  } catch (error: any) {
    console.error("Critical error in /api/contact:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
