import express from "express";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = 3000;

// API Router
const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(bodyParser.json());

// Handle OPTIONS preflight
apiRouter.options('*', cors());

// Google Sheets Helper
async function addToGoogleSheet(data: any) {
  try {
    const appsScriptUrl = process.env.VITE_APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) return true;
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) return false;

    const authToken = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, authToken);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(data);
    return true;
  } catch (err) {
    console.error("Error adding to Google Sheets:", err);
    return false;
  }
}

// Health Check
apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV });
});

// API: Save Contact Form
apiRouter.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString();
  
  await addToGoogleSheet({ Date: date, Source: 'Contact Form', Name: name, Email: email, Message: message });
  res.json({ success: true });
});

// API: Internship Application
apiRouter.post("/internship-apply", async (req, res) => {
  const data = req.body;
  const date = new Date().toISOString();
  
  await addToGoogleSheet({
    Date: date, Source: 'Internship Application', Name: data.fullName, Email: data.email, Phone: data.phone,
    WhatsApp: data.whatsapp, College: data.college, Degree: data.degree, Year: data.year, Domain: data.domain,
    Skills: data.skills, Reason: data.reason
  });
  res.json({ success: true });
});

// API: Export CSV (Only local)
apiRouter.get("/export", (req, res) => {
  const CSV_FILE = path.join(process.cwd(), 'leads.csv');
  if (fs.existsSync(CSV_FILE)) {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.sendFile(CSV_FILE);
  } else {
    res.status(404).send("No leads found yet.");
  }
});

// Mount API router
app.use("/api", apiRouter);
// Also mount at root for serverless flexibility if /api is stripped
app.use("/", apiRouter);

async function startServer() {
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

  if (process.env.NODE_ENV !== "production" || import.meta.url === `file://${fileURLToPath(import.meta.url)}`) {
     app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  startServer();
}
