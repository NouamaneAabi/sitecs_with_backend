// ─────────────────────────────────────────────────────────────────────────────
//  backend/controllers/contactController.js
//
//  Pure business logic — no Express routing, no validation.
//  Receives already-validated data from the route handler and persists it
//  to the Firestore "contacts" collection via the Admin SDK.
// ─────────────────────────────────────────────────────────────────────────────

'use strict'

const { db, admin } = require('../firebase/firebaseAdmin')

// ── Collection name ──────────────────────────────────────────────────────────
const COLLECTION = 'contacts'

// ─────────────────────────────────────────────────────────────────────────────
//  submitContact
//  POST /api/contact
//
//  Request body (already validated by middleware):
//    { name, email, phone?, message }
//
//  Successful response (201):
//    { success: true, message: '...', data: { id, name, email, phone, message, createdAt } }
//
//  Error response (500):
//    { success: false, message: '...', error: '...' }
// ─────────────────────────────────────────────────────────────────────────────
async function submitContact(req, res) {
  const { name, email, phone = '', message } = req.body

  // Build the document — phone is stored as empty string when not provided
  const contactData = {
    name:      name.trim(),
    email:     email.toLowerCase().trim(),
    phone:     phone.trim(),
    message:   message.trim(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    // Metadata that can be useful for admin dashboards
    meta: {
      ip:        req.ip || null,
      userAgent: req.get('user-agent') || null,
      origin:    req.get('origin') || null,
    },
  }

  try {
    const docRef = await db.collection(COLLECTION).add(contactData)

    console.log(`[Contact] ✅ Saved — doc ID: ${docRef.id} | from: ${email}`)

    return res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons sous 24 heures.',
      data: {
        id:        docRef.id,
        name:      contactData.name,
        email:     contactData.email,
        phone:     contactData.phone,
        message:   contactData.message,
        createdAt: new Date().toISOString(), // client-friendly timestamp
      },
    })

  } catch (err) {
    console.error(`[Contact] ❌ Firestore write failed — ${err.message}`)

    return res.status(500).json({
      success: false,
      message: 'Une erreur interne s\'est produite. Veuillez réessayer plus tard.',
      // Only expose error detail in development
      ...(process.env.NODE_ENV === 'development' && { error: err.message }),
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  getContacts  (optional — for admin use / testing)
//  GET /api/contact
//  Returns the 50 most recent submissions, ordered by createdAt desc.
// ─────────────────────────────────────────────────────────────────────────────
async function getContacts(req, res) {
  try {
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()

    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore Timestamp → ISO string for JSON serialisation
      createdAt: doc.data().createdAt?.toDate().toISOString() ?? null,
    }))

    return res.status(200).json({
      success: true,
      count:   contacts.length,
      data:    contacts,
    })

  } catch (err) {
    console.error(`[Contact] ❌ Firestore read failed — ${err.message}`)

    return res.status(500).json({
      success: false,
      message: 'Impossible de récupérer les contacts.',
      ...(process.env.NODE_ENV === 'development' && { error: err.message }),
    })
  }
}

module.exports = { submitContact, getContacts }
