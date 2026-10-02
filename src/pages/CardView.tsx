import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import EditModal from '../components/EditModal'
import SuccessModal from '../components/SuccessModal'
import PinGate from '../components/PinGate'
import api, { API_BASE, PUBLIC_SITE } from '../services/api'
import { shareYousayLink } from '../utils/share'
import ExpiredCard from '../components/ExpiredCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTemplateTexts } from '../hooks/useTemplateTexts'

interface CardData {
  hashCode: string
  templateId: string
  languageId: number
  hasPin: boolean
  expiresAt: string | null
  viewCount: number
  texts: { position: number; textContent: string }[]
}

export default function CardView() {
  const { hash } = useParams<{ hash: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [card, setCard] = useState<CardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [pinValidated, setPinValidated] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdHash, setCreatedHash] = useState<string | null>(null)
  const [pinToken, setPinToken] = useState<string | null>(null)
  // Límites de caracteres por posición, definidos por la plantilla
  const { texts: templateTexts } = useTemplateTexts(card?.templateId ?? null, i18n.language)

  useEffect(() => {
    if (!hash) return
    api.get(`/cards/${hash}`)
      .then(res => {
        setCard(res.data)
        if (!res.data.hasPin) setPinValidated(true)
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setErrorKey('errors.cardExpired')
        } else {
          setErrorKey('errors.cardNotFound')
        }
      })
      .finally(() => setLoading(false))
  }, [hash])

  async function handleCreateCard(texts: string[], pin: string | null) {
    if (!card) return
    setIsSubmitting(true)
    try {
      const response = await api.post('/cards', {
        templateId: card.templateId,
        languageId: card.languageId,
        pin: pin,
        texts: texts.map((text, index) => ({
          position: index + 1,
          textContent: text
        }))
      })
      setShowEditModal(false)
      setCreatedHash(response.data.hash)
    } catch (error) {
      console.error('Error creating card:', error)
      alert(t('errors.generic'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner fullScreen />
  if (errorKey === 'errors.cardExpired') return <ExpiredCard />
  if (errorKey) return <p>{t(errorKey)}</p>
  if (!card) return null

  if (card.hasPin && !pinValidated) {
    return (
      <PinGate
        hash={hash!}
        onValidated={(texts: { position: number; textContent: string }[], token: string) => {
          setCard({ ...card, texts })
          setPinToken(token)
          setPinValidated(true)
        }}
      />
    )
  }

  return (
    <>
      <TemplateFrame
        htmlUrl={`${API_BASE}/api/cards/${hash}/html${pinToken ? `?t=${encodeURIComponent(pinToken)}` : ''}`}
        onBack={() => navigate('/')}
        onEdit={() => setShowEditModal(true)}
        onShare={() => shareYousayLink(`${PUBLIC_SITE}/share/card/${hash}`, () => {
          alert(t('successModal.linkCopied'))
        })}
      />
      {showEditModal && (
        <EditModal
          initialTexts={card.texts.map(t => t.textContent)}
          maxLengths={card.texts.map(ct => templateTexts.find(tt => tt.position === ct.position)?.maxLength ?? 15)}
          onCancel={() => setShowEditModal(false)}
          onCreate={handleCreateCard}
          isSubmitting={isSubmitting}
        />
      )}
      {createdHash && (
        <SuccessModal
          hash={createdHash}
          onClose={() => setCreatedHash(null)}
          onOpen={() => {
            setCreatedHash(null)
            navigate(`/card/${createdHash}`)
          }}
        />
      )}
    </>
  )
}
