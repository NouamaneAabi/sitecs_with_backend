import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Fonction pour charger les traductions depuis le backend
const loadTranslations = async (lang) => {
  const res = await fetch(`http://localhost:5000/api/translations/${lang}`);
  if (!res.ok) {
    throw new Error(`Erreur de chargement des traductions pour ${lang}: ${res.status}`);
  }
  const data = await res.json();
  return data.translations || {};
};

const i18nInitPromise = (async () => {
  await i18n.use(initReactI18next).init({
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {},
  });

  const langs = ['fr', 'en', 'es'];
  for (const lang of langs) {
    const translations = await loadTranslations(lang);
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
  }

  await i18n.changeLanguage('fr');
  return i18n;
})();

export { i18nInitPromise };
export default i18n;