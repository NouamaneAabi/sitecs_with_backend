// au lieu de import
require('dotenv').config();
const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!fs.existsSync(serviceAccountPath)) {
  console.error('[Firebase] ❌ serviceAccountKey.json introuvable à', serviceAccountPath);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});
// ─────────────────────────────────────────────────────────────────────────────
//  backend/server.js
//
//  SITECS Express API
//  Entry point — configures all middleware, mounts routes, starts the server.
//
//  Available endpoints:
//    POST  /api/contact      — submit contact form → saves to Firestore
//    GET   /api/contact      — list recent submissions (dev / admin use)
//    GET   /api/translations/:lang — get translations for a language (fr, en, es)
//    GET   /health           — health-check ping
// ─────────────────────────────────────────────────────────────────────────────

'use strict'

// ── Load env vars FIRST (before any other imports that might need them) ──────
require('dotenv').config()

const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')

const contactRoutes = require('./routes/contact')
const translationRoutes = require('./routes/translations')

// ─────────────────────────────────────────────────────────────────────────────
//  App setup
// ─────────────────────────────────────────────────────────────────────────────
const app  = express()
const PORT = process.env.PORT || 5000

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet())

// ── CORS ─────────────────────────────────────────────────────────────────────
//   Reads allowed origins from ALLOWED_ORIGINS env var (comma-separated).
//   Falls back to http://localhost:5173 (Vite dev server) when not set.
const rawOrigins     = process.env.ALLOWED_ORIGINS || 'http://localhost:5173'
const allowedOrigins = rawOrigins.split(',').map(o => o.trim()).filter(Boolean)

const corsOptions = {
  origin(requestOrigin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!requestOrigin) return callback(null, true)

    if (allowedOrigins.includes(requestOrigin)) {
      callback(null, true)
    } else {
      console.warn(`[CORS] ❌ Blocked request from origin: ${requestOrigin}`)
      callback(new Error(`Origin ${requestOrigin} not allowed by CORS policy`))
    }
  },
  methods:     ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // IE11 compatibility
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // Pre-flight for all routes

// ── Request logging ──────────────────────────────────────────────────────────
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
app.use(morgan(morganFormat))

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))            // JSON bodies, max 10 KB
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ── Trust proxy (needed when behind Nginx / Heroku / Railway / Render) ───────
app.set('trust proxy', 1)

// ─────────────────────────────────────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────────────────────────────────────

// Health check — used by hosting platforms and load-balancers
app.get('/health', (req, res) => {
  res.status(200).json({
    status:    'ok',
    service:   'SITECS API',
    timestamp: new Date().toISOString(),
    env:       process.env.NODE_ENV || 'development',
  })
})

// API routes
app.use('/api/contact', contactRoutes)
app.use('/api/translations', translationRoutes)

// Root info route
app.get('/', (req, res) => {
  res.json({
    name:    'SITECS Backend API',
    version: '1.0.0',
    docs:    'POST /api/contact  |  GET /api/translations/:lang  |  GET /health',
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  404 — Unknown routes
// ─────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  Global error handler
//  Express calls this automatically when next(err) is invoked or an async
//  handler throws/rejects without being caught.
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // CORS errors arrive here
  if (err.message && err.message.includes('not allowed by CORS')) {
    return res.status(403).json({ success: false, message: err.message })
  }

  console.error('[Server] Unhandled error:', err)

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Une erreur interne s\'est produite.'
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('')
  console.log('  ┌─────────────────────────────────────────┐')
  console.log(`  │  SITECS API running on port ${PORT}        │`)
  console.log(`  │  ENV: ${(process.env.NODE_ENV || 'development').padEnd(34)}│`)
  console.log(`  │  CORS: ${allowedOrigins[0].padEnd(33)}│`)
  console.log('  └─────────────────────────────────────────┘')
  console.log('')
  console.log('  Endpoints:')
  console.log(`  → POST  http://localhost:${PORT}/api/contact`)
  console.log(`  → GET   http://localhost:${PORT}/api/contact`)
  console.log(`  → GET   http://localhost:${PORT}/api/translations/:lang`)
  console.log(`  → GET   http://localhost:${PORT}/health`)
  console.log('')
})

module.exports = app // useful for testing
