import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

interface BusinessCard {
  id: string
  code: string
  fullName: string
  jobTitle?: string
  company?: string
  phone1?: string
  whatsapp?: string
  phone2?: string
  email?: string
  website?: string
  linkedin?: string
  facebook?: string
  instagram?: string
  twitter?: string
  tiktok?: string
  youtube?: string
  address?: string
  latitude?: number
  longitude?: number
  primaryColor?: string
  logoUrl?: string
  viewCount: number
}

export default function BusinessCardView() {
  const { code } = useParams<{ code: string }>()
  const [card, setCard] = useState<BusinessCard | null>(null)
  const [loading, setLoading] = useState(true)
  //const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (code) {
      api.get(`/business-cards/${code}`)
        .then(res => setCard(res.data))
        .catch(() => setCard(null))
        .finally(() => setLoading(false))
    }
  }, [code])

  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>Cargando...</div>
  if (!card) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>Tarjeta no encontrada</div>

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'#f0f0f0'}}>
      <p>Tarjeta: {card.fullName}</p>
    </div>
  )
}