import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n/config'
import { i18nInitPromise } from './i18n/config'

// Attendre le chargement des ressources de traduction avant le premier rendu
i18nInitPromise
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </React.StrictMode>,
    )
  })
  .catch((err) => {
    console.error('Erreur i18n initialization :', err)
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <div>Failed to load translations</div>
      </React.StrictMode>,
    )
  })
