import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import EditModal from '../components/EditModal'
import SuccessModal from '../components/SuccessModal'
import PinGate from '../components/PinGate'
import api from '../services/api'
import { shareYousayLink } from '../utils/share'
import ExpiredCard from '../components/ExpiredCard'
import LoadingSpinner from '../components/LoadingSpinner'

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
  const { t } = useTranslation()
  const [card, setCard] = useState<CardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [pinValidated, setPinValidated] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdHash, setCreatedHash] = useState<string | null>(null)

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
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner fullScreen />
  if (errorKey === 'errors.cardExpired') return <ExpiredCard />
  if (errorKey) return <p>{errorKey}</p>
  if (!card) return null

  if (card.hasPin && !pinValidated) {
    return (
      <PinGate
        hash={hash!}
        onValidated={(texts: { position: number; textContent: string }[]) => {
          setCard({ ...card, texts })
          setPinValidated(true)
        }}
      />
    )
  }

  return (
    <>
      <TemplateFrame
        htmlUrl={`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'}/api/cards/${hash}/html`}
        onBack={() => navigate('/')}
        onEdit={() => setShowEditModal(true)}
        onShare={() => shareYousayLink(`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'}/share/card/${hash}`, () => {
          alert(t('successModal.linkCopied'))
        })}
      />
      {showEditModal && (
        <EditModal
          initialTexts={card.texts.map(t => t.textContent)}
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
