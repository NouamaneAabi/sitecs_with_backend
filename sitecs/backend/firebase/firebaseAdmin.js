// ─────────────────────────────────────────────────────────────────────────────
//  backend/firebase/firebaseAdmin.js
//
//  Initialises the Firebase Admin SDK exactly once (singleton pattern).
//  Supports two credential strategies:
//
//    Option A — Service-account JSON file (recommended for local dev):
//      Set FIREBASE_SERVICE_ACCOUNT_PATH=./firebase/serviceAccountKey.json
//
//    Option B — Inline env vars (recommended for CI / cloud platforms):
//      Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
//
//  The module exports `db` (Firestore instance) ready to use.
// ─────────────────────────────────────────────────────────────────────────────

'use strict'

const admin = require('firebase-admin')
const path  = require('path')

// ── Guard: only initialise once ──────────────────────────────────────────────
if (!admin.apps.length) {
  let credential

  // ── Option A: JSON file ───────────────────────────────────────────────────
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const keyPath = path.resolve(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
    try {
      const serviceAccount = require(keyPath)
      credential = admin.credential.cert(serviceAccount)
      console.log('[Firebase] ✅ Initialised using service-account JSON file')
    } catch (err) {
      console.error(
        `[Firebase] ❌ Could not load service-account file at: ${keyPath}\n` +
        `            Make sure the file exists and FIREBASE_SERVICE_ACCOUNT_PATH is correct.\n` +
        `            Error: ${err.message}`
      )
      process.exit(1)
    }

  // ── Option B: Individual env vars ─────────────────────────────────────────
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    credential = admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Newlines are stored as literal \n in env vars — restore them
      privateKey:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
    console.log('[Firebase] ✅ Initialised using environment variable credentials')

  // ── Neither option configured ─────────────────────────────────────────────
  } else {
    console.error(
      '[Firebase] ❌ No credentials found.\n' +
      '            Set FIREBASE_SERVICE_ACCOUNT_PATH   (path to serviceAccountKey.json)\n' +
      '            OR set FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY'
    )
    process.exit(1)
  }

  admin.initializeApp({ credential })
}

// Export the Firestore instance
const db = admin.firestore()

module.exports = { admin, db }
