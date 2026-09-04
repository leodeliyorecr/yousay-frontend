import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import EditModal from '../components/EditModal'
import SuccessModal from '../components/SuccessModal.tsx'
import { useTemplateTexts } from '../hooks/useTemplateTexts'
import api from '../services/api'
import { shareYousayLink } from '../utils/share'

const BUSINESS_CARD_CATEGORY_ID = 8

const EXAMPLE_CARDS: Record<string, string> = {
  'es': 'JUAPER001',
  'en': 'JOASMI001',
  'fr': 'JEADUP001',
  'pt-BR': 'JOASIL001',
  'pt': 'JOASIL001',
  'pt-PT': 'JOASOA001',
}

export default function TemplateView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdHash, setCreatedHash] = useState<string | null>(null)
  const [isBusinessCard, setIsBusinessCard] = useState(false)
  const [loadingTemplate, setLoadingTemplate] = useState(true)
  const { texts: templateTexts } = useTemplateTexts(id ?? null, i18n.language)
  const isTemplateFree = true // temporal
  const [templateStyle, setTemplateStyle] = useState('')

  useEffect(() => {
    if (id) {
      api.get(`/templates/${id}`).then(res => {
        if (res.data.template?.categoryId === BUSINESS_CARD_CATEGORY_ID) {
          setIsBusinessCard(true)
        }
        if (res.data.template?.templateStyle) {
          setTemplateStyle(res.data.template.templateStyle)
        }
      }).catch(() => {}).finally(() => setLoadingTemplate(false))
    }
  }, [id])

  async function handleCreateCard(texts: string[], pin: string | null) {
    if (!id) return
    setIsSubmitting(true)
    try {
      const language = await api.get('/languages').then(res =>
        res.data.find((l: any) => l.code === i18n.language)
      )
      const response = await api.post('/cards', {
        templateId: id,
        languageId: language.id,
        pin: pin,
        texts: texts.map((text, index) => ({
          position: index + 1,
          textContent: text
        }))
      })
      setShowEditModal(false)
      setCreatedHash(response.data.hash)
    } catch (error) {
      console.error('Error creando card:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const exampleCode = EXAMPLE_CARDS[i18n.language] ?? 'JUAPER001'
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'

  if (loadingTemplate) return null

  return (
    <>
      <TemplateFrame
        htmlUrl={isBusinessCard
          ? `${apiBase}/api/bc/${exampleCode}/html?lang=${i18n.language}&style=${templateStyle}`
          : `${apiBase}/api/templates/${id}/html?lang=${i18n.language}`
        }
        hideView={isBusinessCard}
        hideEdit={isBusinessCard && !isTemplateFree}
        onBack={() => navigate('/')}
        onEdit={() => {
          if (isBusinessCard) {
            navigate(`/business-card/create?template=${id}`)
          } else if (templateTexts.length > 0) {
            setShowEditModal(true)
          }
        }}
        onShare={() => shareYousayLink(`https://yousay.fun/share/template/${id}?lang=${i18n.language}`, () => {
          alert(t('successModal.linkCopied'))
        })}
      />
      {showEditModal && (
        <EditModal
          initialTexts={templateTexts.map(t => t.textContent)}
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