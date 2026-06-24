import { useState, useEffect } from 'react'
import api from '../services/api'

interface Template {
  id: string
  companyId: string | null
  categoryId: number
  name: string
  description: string
  isActive: boolean
}

export function useTemplates(categoryId: number | null, languageCode: string) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [errorKey, setErrorKey] = useState<string | null>(null)

  useEffect(() => {
    if (categoryId === null) return

    setLoading(true)
    api.get(`/templates/category/${categoryId}`, {
      params: { lang: languageCode }
    })
      .then(res => setTemplates(res.data))
      .catch(() => setErrorKey('errors.loadTemplates'))
      .finally(() => setLoading(false))
  }, [categoryId, languageCode])

  return { templates, loading, errorKey }
}