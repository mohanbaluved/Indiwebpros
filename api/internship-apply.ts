import type { VercelRequest, VercelResponse } from '@vercel/node';
import { addToGoogleSheet } from '../src/lib/sheets.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    if (!data.email) return res.status(400).json({ error: "Email is required" });

    const date = new Date().toISOString();
    
    console.log("Processing internship application for:", data.email);
    
    const result = await addToGoogleSheet({
      Date: date, 
      Source: 'Internship Application', 
      Name: data.fullName || 'Anonymous', 
      Email: data.email, 
      Phone: data.phone || '',
      WhatsApp: data.whatsapp || '', 
      College: data.college || '', 
      Degree: data.degree || '', 
      Year: data.year || '', 
      Domain: data.domain || '',
      Skills: data.skills || '', 
      Reason: data.reason || ''
    });

    return res.status(200).json({ 
      success: true, 
      sync: result.success,
      warning: result.success ? null : result.error
    });
  } catch (error: any) {
    console.error("Critical error in /api/internship-apply:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
