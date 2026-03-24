const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// GET /api/translations/:lang
router.get('/:lang', (req, res) => {
  const { lang } = req.params

  // Supported languages
  const supportedLangs = ['fr', 'en', 'es']

  if (!supportedLangs.includes(lang)) {
    return res.status(400).json({
      success: false,
      message: `Language '${lang}' not supported. Supported: ${supportedLangs.join(', ')}`
    })
  }

  const filePath = path.join(__dirname, '..', 'translations', `${lang}.json`)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: `Translation file for '${lang}' not found`
    })
  }

  try {
    const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    res.json({
      success: true,
      lang,
      translations
    })
  } catch (error) {
    console.error('[Translations] Error reading file:', error)
    res.status(500).json({
      success: false,
      message: 'Error loading translations'
    })
  }
})

module.exports = router