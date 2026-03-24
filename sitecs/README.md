# SITECS — Corporate Website (Premium UI)

> Société Industrielle de Transport, d'Énergie, de Construction et de Services

A modern, premium corporate website built with **React + Vite + Tailwind CSS + Firebase**.

---

## 🚀 Quick Start

```bash
cd sitecs
npm install
npm run dev
# → http://localhost:5173
```

---

## 🏗️ Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Frontend     | React 18 + Vite 5       |
| Styling      | Tailwind CSS 3          |
| Routing      | React Router v6         |
| Icons        | React Icons 5           |
| Animations   | CSS scroll-reveal (IntersectionObserver) |
| Database     | Firebase Firestore      |
| Hosting      | Vercel                  |

---

## 📁 Project Structure

```
sitecs/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Sticky, glass-morphism, scroll-aware
│   │   ├── Hero.jsx            ← Full-screen, layered depth, floating badges
│   │   ├── Activities.jsx      ← 5-card grid with reveal animations
│   │   ├── WhyChooseUs.jsx     ← Dark section with glow cards + CTA banner
│   │   ├── Projects.jsx        ← Overlay hover cards
│   │   ├── Contact.jsx         ← Split layout + Firebase form
│   │   ├── Footer.jsx          ← Dark, 4-column
│   │   └── PageHero.jsx        ← Shared inner-page hero banner
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx           ← Timeline + values + stats
│   │   ├── ActivitiesPage.jsx  ← Alternating image/text layout
│   │   ├── ProjectsPage.jsx    ← Filter tabs by category
│   │   └── ContactPage.jsx     ← Info cards + form
│   ├── hooks/
│   │   └── useReveal.js        ← IntersectionObserver scroll animations
│   ├── firebase/
│   │   └── firebaseConfig.js   ← ⚠️ Configure your credentials here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               ← Tailwind + custom animations + CSS vars
├── index.html                  ← Google Font: Montserrat
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 ← SPA rewrites for Vercel
└── package.json
```

---

## 🔥 Firebase Setup

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → enable **Firestore Database**
3. Add a **Web App** → copy your config
4. Paste your credentials in `src/firebase/firebaseConfig.js`:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
}
```

### Recommended Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### Contact Form Data Shape

Each submission creates a document in the `contacts` collection:

```json
{
  "name":      "Jean Dupont",
  "email":     "jean@exemple.com",
  "phone":     "+240 222 000 000",
  "message":   "Bonjour, je souhaite un devis...",
  "createdAt": "<Firebase Timestamp>"
}
```

---

## 🎨 Design System

| Token       | Value     | Usage                       |
|-------------|-----------|------------------------------|
| Primary 900 | `#1e3a8a` | Buttons, headings, nav bg    |
| Primary 950 | `#0f2144` | Dark sections, hero overlay  |
| Accent 500  | `#f59e0b` | CTAs, highlights, badges     |
| Slate 500   | `#64748b` | Body text, descriptions      |

**Font:** Montserrat (Google Fonts) — weights 400, 500, 600, 700, 800, 900

---

## ✨ Premium UI Features

- **Scroll-reveal animations** — `useReveal` hook with `IntersectionObserver`; elements fade/slide in as they enter the viewport with staggered delays
- **Layered hero** — Multiple gradient overlays + noise grain texture + animated geometric circles + floating info badges
- **Glass-morphism navbar** — Transparent on hero, dark solid on scroll with `backdrop-filter: blur`
- **Card depth system** — Custom `--shadow-card` / `--shadow-card-hover` CSS variables for consistent elevation
- **Project overlay cards** — Full image cards with reveal-on-hover content, scale transform on image
- **Dark sections** — `WhyChooseUs` uses radial glow + grid pattern background
- **Amber bottom accent lines** — Cards reveal a gradient bottom border on hover via `scaleX` transform
- **Page hero banners** — Shared `PageHero` component with diagonal left stripe, grain overlay, and centred tag + title

---

## 🌐 Deploy to Vercel

```bash
# Option A — CLI
npm i -g vercel
npm run build
vercel --prod

# Option B — Git integration
# Push to GitHub → connect repo on vercel.com → auto-deploy on push
```

The `vercel.json` already handles SPA routing rewrites.

---

## 📜 License

© 2025 SITECS — All rights reserved.
