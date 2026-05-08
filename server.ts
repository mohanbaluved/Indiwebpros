import express from "express";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const CSV_FILE = path.join(process.cwd(), 'leads.csv');
  const INTERNSHIP_CSV = path.join(process.cwd(), 'internship_applications.csv');

  app.use(cors());
  app.use(bodyParser.json());

  // Initialize CSVs
  [CSV_FILE, INTERNSHIP_CSV].forEach(file => {
    if (!fs.existsSync(file)) {
      const headers = file === CSV_FILE ? 'Date,Name,Email,Message\n' : 'Date,Name,Email,Phone,WhatsApp,College,Degree,Year,Domain,Skills,Reason\n';
      fs.writeFileSync(file, headers);
    }
  });

  // Google Sheets Helper
  async function addToGoogleSheet(data: any) {
    try {
      // Priority 1: Apps Script Webhook
      const appsScriptUrl = process.env.VITE_APPS_SCRIPT_URL;
      if (appsScriptUrl) {
        const response = await fetch(appsScriptUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          console.log("Sent to Apps Script successfully");
          return true;
        }
      }

      // Priority 2: Service Account
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      const sheetId = process.env.GOOGLE_SHEET_ID;

      if (!serviceAccountEmail || !privateKey || !sheetId) {
        console.warn("Google Sheets credentials incomplete. Check .env");
        return false;
      }

      const auth = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const doc = new GoogleSpreadsheet(sheetId, auth);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      // Ensure headers are present if it's a fresh sheet
      if (sheet.columnCount === 0 || (await sheet.getRows()).length === 0 && sheet.headerValues.length === 0) {
        const headers = Object.keys(data);
        await sheet.setHeaderRow(headers);
      }

      await sheet.addRow(data);
      return true;
    } catch (err) {
      console.error("Error adding to Google Sheets:", err);
      return false;
    }
  }

  // API: Save Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const date = new Date().toISOString();
    
    const sanitize = (str: string) => str ? String(str).replace(/,/g, ';').replace(/\n/g, ' ') : '';
    const row = `${date},${sanitize(name)},${sanitize(email)},${sanitize(message)}\n`;
    
    fs.appendFileSync(CSV_FILE, row);
    
    // Attempt Google Sheets
    await addToGoogleSheet({
      Date: date,
      Source: 'Contact Form',
      Name: name,
      Email: email,
      Message: message
    });

    res.json({ success: true });
  });

  // API: Internship Application
  app.post("/api/internship-apply", async (req, res) => {
    const data = req.body;
    const date = new Date().toISOString();
    
    const sanitize = (str: string) => str ? String(str).replace(/,/g, ';').replace(/\n/g, ' ') : '';
    const row = `${date},${sanitize(data.fullName)},${sanitize(data.email)},${sanitize(data.phone)},${sanitize(data.whatsapp)},${sanitize(data.college)},${sanitize(data.degree)},${sanitize(data.year)},${sanitize(data.domain)},${sanitize(data.skills)},${sanitize(data.reason)}\n`;
    
    fs.appendFileSync(INTERNSHIP_CSV, row);

    // Attempt Google Sheets
    await addToGoogleSheet({
      Date: date,
      Source: 'Internship Application',
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone,
      WhatsApp: data.whatsapp,
      College: data.college,
      Degree: data.degree,
      Year: data.year,
      Domain: data.domain,
      Skills: data.skills,
      Reason: data.reason
    });

    res.json({ success: true });
  });

  // API: Export CSV (Excel ready)
  app.get("/api/export", (req, res) => {
    if (fs.existsSync(CSV_FILE)) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
      res.sendFile(CSV_FILE);
    } else {
      res.status(404).send("No leads found yet.");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Export your leads at: http://localhost:${PORT}/api/export`);
  });
}

startServer();
