# SITECS — Express Backend API

Node.js + Express REST API for the SITECS corporate website.
Handles contact form submissions and persists data to Firebase Firestore via the Admin SDK.

---

## 📁 Structure

```
backend/
├── server.js                          ← Entry point — Express app, middleware, startup
├── routes/
│   └── contact.js                     ← Route definitions for /api/contact
├── controllers/
│   └── contactController.js           ← Business logic — reads req, writes to Firestore
├── middleware/
│   └── validateContact.js             ← express-validator rules + error formatter
├── firebase/
│   ├── firebaseAdmin.js               ← Admin SDK initialiser (singleton)
│   ├── serviceAccountKey.TEMPLATE.json← Instructions — replace with your real key
│   └── serviceAccountKey.json         ← ⚠️ YOUR KEY GOES HERE (gitignored)
├── .env.example                       ← Copy to .env and fill in values
├── .gitignore
└── package.json
```

---

## 🚀 Quick Start

### 1 — Install dependencies
```bash
cd backend
npm install
```

### 2 — Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase/serviceAccountKey.json
```

### 3 — Add Firebase service-account credentials
1. Open [Firebase Console](https://console.firebase.google.com) → your project
2. **Project Settings** → **Service Accounts** tab
3. Click **Generate new private key** → download JSON
4. Rename the file to `serviceAccountKey.json`
5. Place it at `backend/firebase/serviceAccountKey.json`

> See `backend/firebase/serviceAccountKey.TEMPLATE.json` for the expected shape.

### 4 — Start the server
```bash
# Production
npm start

# Development (auto-restart on file change)
npm run dev
```

The server starts on **http://localhost:5000**

---

## 📡 API Reference

### `POST /api/contact`

Validates and saves a contact form submission to Firestore.

**Request**
```http
POST http://localhost:5000/api/contact
Content-Type: application/json
```
```json
{
  "name":    "Jean Dupont",
  "email":   "jean@exemple.com",
  "phone":   "+240 222 000 000",
  "message": "Bonjour, je souhaite un devis pour un projet de construction."
}
```

| Field     | Type   | Required | Rules                         |
|-----------|--------|----------|-------------------------------|
| `name`    | string | ✅       | 2–100 characters              |
| `email`   | string | ✅       | Valid email format            |
| `phone`   | string | ❌       | 6–30 chars, digits/spaces/+() |
| `message` | string | ✅       | 10–2000 characters            |

**Success response — 201**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès. Nous vous répondrons sous 24 heures.",
  "data": {
    "id":        "Kp3mN7xQwRtY...",
    "name":      "Jean Dupont",
    "email":     "jean@exemple.com",
    "phone":     "+240 222 000 000",
    "message":   "Bonjour, je souhaite un devis...",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Validation error — 400**
```json
{
  "success": false,
  "message": "Données invalides. Veuillez corriger les erreurs.",
  "errors": {
    "email": "L'adresse email est invalide.",
    "message": "Le message est requis."
  }
}
```

**Server error — 500**
```json
{
  "success": false,
  "message": "Une erreur interne s'est produite. Veuillez réessayer plus tard."
}
```

---

### `GET /api/contact`

Returns the 50 most recent contact submissions (ordered by `createdAt` desc).
Useful for admin dashboards — protect with authentication in production.

**Response — 200**
```json
{
  "success": true,
  "count": 12,
  "data": [ { "id": "...", "name": "...", ... } ]
}
```

---

### `GET /health`

Health-check endpoint for load-balancers and uptime monitors.
```json
{
  "status":    "ok",
  "service":   "SITECS API",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "env":       "production"
}
```

---

## 🧪 Testing with cURL

```bash
# Valid submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":    "Jean Dupont",
    "email":   "jean@exemple.com",
    "phone":   "+240 222 000 000",
    "message": "Bonjour, je souhaite un devis pour mon projet."
  }'

# Missing required fields → 400
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{ "name": "Jean" }'

# Health check
curl http://localhost:5000/health
```

---

## 🔗 Frontend Integration

The React frontend's `Contact.jsx` calls the backend automatically.

**Development** — no changes needed; defaults to `http://localhost:5000`.

**Production** — create `sitecs/.env.local`:
```env
VITE_API_URL=https://your-api-domain.com
```

---

## 🌐 Deployment

### Railway / Render / Fly.io

1. Push `backend/` folder to its own Git repo (or monorepo sub-dir)
2. Set environment variables in the platform dashboard:
   ```
   PORT=5000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://sitecs.vercel.app
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
   ```
3. Set start command: `npm start`

> Use the **inline env var** approach (Option B in `firebaseAdmin.js`) for cloud platforms — do NOT upload your JSON key file.

### Docker (optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

---

## 🔐 Firestore Security Rules

Add these rules in Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{doc} {
      // Backend writes via Admin SDK (bypasses these rules).
      // Block all direct client access.
      allow read, write: if false;
    }
  }
}
```

---

## 📦 Dependencies

| Package              | Purpose                                   |
|----------------------|-------------------------------------------|
| `express`            | HTTP server and routing                   |
| `cors`               | Cross-Origin Resource Sharing             |
| `helmet`             | Security headers (XSS, clickjack, etc.)   |
| `morgan`             | HTTP request logging                      |
| `dotenv`             | Load `.env` into `process.env`            |
| `express-validator`  | Request validation and sanitisation       |
| `firebase-admin`     | Server-side Firestore access via Admin SDK|
| `nodemon` _(dev)_    | Auto-restart on file changes              |
