import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './es.json'
import en from './en.json'
import fr from './fr.json'
import ptBR from './pt-BR.json'
import ptPT from './pt-PT.json'

const SUPPORTED_LANGS = ['es', 'en', 'fr', 'pt-BR', 'pt-PT']
const STORAGE_KEY = 'yousay_lang'

function detectLanguage(): string {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved

  const browserLang = navigator.language || 'en'
  const detected = SUPPORTED_LANGS.find(l =>
    browserLang.toLowerCase().startsWith(l.toLowerCase().split('-')[0])
  )
  return detected || 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es:      { translation: es },
      en:      { translation: en },
      fr:      { translation: fr },
      'pt-BR': { translation: ptBR },
      'pt-PT': { translation: ptPT },
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
})

export default i18n