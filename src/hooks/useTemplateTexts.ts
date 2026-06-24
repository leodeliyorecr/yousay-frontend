import { useState, useEffect } from 'react'
import api from '../services/api'

interface TemplateText {
  id: string
  templateId: string
  languageId: number
  position: number
  textContent: string
  isEditable: boolean
}

export function useTemplateTexts(templateId: string | null, languageCode: string) {
  const [texts, setTexts] = useState<TemplateText[]>([])
  const [loading, setLoading] = useState(true)
  const [errorKey, setErrorKey] = useState<string | null>(null)

  useEffect(() => {
    if (!templateId) return

    setLoading(true)
    api.get(`/templates/${templateId}/texts/${languageCode}`)
      .then(res => setTexts(res.data))
      .catch(() => setErrorKey('errors.loadCard'))
      .finally(() => setLoading(false))
  }, [templateId, languageCode])

  return { texts, loading, errorKey }
}