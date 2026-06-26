import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import EditModal from '../components/EditModal'
import SuccessModal from '../components/SuccessModal.tsx'
import { useTemplateTexts } from '../hooks/useTemplateTexts'
import api from '../services/api'
import { shareYousayLink } from '../utils/share'

export default function TemplateView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdHash, setCreatedHash] = useState<string | null>(null)

  const { texts: templateTexts } = useTemplateTexts(id ?? null, i18n.language)

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

  return (
    <>
      <TemplateFrame
        htmlUrl={`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'}/api/templates/${id}/html`}
        onBack={() => navigate('/')}
        onEdit={() => {
          if (templateTexts.length > 0) setShowEditModal(true)
        }}
        onShare={() => shareYousayLink(`https://yousay.fun/template/${id}`, () => {
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