import express from "express";
import "dotenv/config";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

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

// Google Sheets Helper (Apps Script Only)
async function addToGoogleSheet(data: any) {
  const appsScriptUrl = process.env.VITE_APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    console.error("VITE_APPS_SCRIPT_URL is missing in environment variables.");
    return false;
  }

  try {
    console.log("Attempting Apps Script Sync to:", appsScriptUrl);
    
    // Check if fetch is available (Node 18+)
    if (typeof fetch === 'undefined') {
      throw new Error("fetch is not defined. Please ensure you are using Node.js 18 or higher.");
    }

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      console.log("Apps Script Sync Success");
      return true;
    } else {
      const text = await response.text();
      console.warn("Apps Script Sync failed with status:", response.status, text);
      return false;
    }
  } catch (err) {
    console.error("Error connecting to Apps Script:", err);
    return false;
  }
}

// Health Check
apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV });
});

// API: Save Contact Form
apiRouter.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const date = new Date().toISOString();
    
    await addToGoogleSheet({ Date: date, Source: 'Contact Form', Name: name, Email: email, Message: message });
    res.json({ success: true });
  } catch (error) {
    console.error("Critical error in /api/contact:", error);
    res.status(500).json({ error: "Internal Server Error", details: String(error) });
  }
});

// API: Internship Application
apiRouter.post("/internship-apply", async (req, res) => {
  try {
    const data = req.body;
    const date = new Date().toISOString();
    
    console.log("Processing internship application...");
    
    const success = await addToGoogleSheet({
      Date: date, Source: 'Internship Application', Name: data.fullName, Email: data.email, Phone: data.phone,
      WhatsApp: data.whatsapp, College: data.college, Degree: data.degree, Year: data.year, Domain: data.domain,
      Skills: data.skills, Reason: data.reason
    });

    if (!success) {
      console.warn("Failed to write to Google Sheets, but continuing...");
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Critical error in /api/internship-apply:", error);
    res.status(500).json({ error: "Internal Server Error", details: String(error) });
  }
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

// Global Error Handler for API
apiRouter.use((err: any, req: any, res: any, next: any) => {
  console.error("API Global Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// For local/non-serverless environments
async function startServer() {
  const PORT = 3000;
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (process.env.NODE_ENV !== "production") {
  startServer();
}
