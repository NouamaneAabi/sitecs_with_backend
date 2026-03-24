// ─────────────────────────────────────────────────────────────────────────────
//  backend/middleware/validateContact.js
//
//  express-validator rules for POST /api/contact.
//  The second export `handleValidationErrors` turns any failures into a clean
//  400 JSON response so the controller stays free of validation boilerplate.
// ─────────────────────────────────────────────────────────────────────────────

'use strict'

const { body, validationResult } = require('express-validator')

// ── Validation rules ─────────────────────────────────────────────────────────
const contactValidationRules = [

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères.')
    .escape(),

  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est requis.")
    .isEmail()
    .withMessage("L'adresse email est invalide.")
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage("L'email est trop long."),

  body('phone')
    .optional({ checkFalsy: true })   // phone is optional — skip if empty
    .trim()
    .matches(/^[+\d\s\-().]{6,30}$/)
    .withMessage('Le numéro de téléphone est invalide.')
    .isLength({ max: 30 })
    .withMessage('Le numéro de téléphone est trop long.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Le message est requis.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères.')
    .escape(),
]

// ── Error handler middleware ─────────────────────────────────────────────────
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    // Build a flat field → message map for easy consumption by the frontend
    const fieldErrors = {}
    errors.array().forEach(({ path, msg }) => {
      if (!fieldErrors[path]) fieldErrors[path] = msg  // keep first error per field
    })

    return res.status(400).json({
      success: false,
      message: 'Données invalides. Veuillez corriger les erreurs.',
      errors:  fieldErrors,
    })
  }

  next()
}

module.exports = { contactValidationRules, handleValidationErrors }
