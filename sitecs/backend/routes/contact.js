// ─────────────────────────────────────────────────────────────────────────────
//  backend/routes/contact.js
//
//  Defines all routes under /api/contact.
//  Validation middleware runs first; only if it passes does the controller run.
// ─────────────────────────────────────────────────────────────────────────────

'use strict'

const express    = require('express')
const router     = express.Router()

const { contactValidationRules, handleValidationErrors } = require('../middleware/validateContact')
const { submitContact, getContacts }                     = require('../controllers/contactController')

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/contact
//
//  Flow:  contactValidationRules  →  handleValidationErrors  →  submitContact
//
//  1. contactValidationRules  — express-validator chain that sanitises + validates
//  2. handleValidationErrors  — converts failures into 400 JSON, stops pipeline
//  3. submitContact           — writes clean data to Firestore, returns 201 JSON
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  contactValidationRules,
  handleValidationErrors,
  submitContact
)

// ─────────────────────────────────────────────────────────────────────────────
//  GET /api/contact
//  Returns the 50 most recent submissions (useful for admin / debugging).
//  Remove or protect behind auth in production.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', getContacts)

module.exports = router
