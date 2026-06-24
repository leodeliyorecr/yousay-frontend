import { useState, useEffect } from 'react'
import api from '../services/api'

interface Category {
  id: number
  slug: string
  isActive: boolean
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [errorKey, setErrorKey] = useState<string | null>(null)

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => setErrorKey('errors.loadCategories'))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, errorKey }
}