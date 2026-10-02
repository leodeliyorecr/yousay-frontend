import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import { shareYousayLink } from '../utils/share'
import { API_BASE, PUBLIC_SITE } from '../services/api'

export default function BusinessCardView() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!code) return null

  return (
    <TemplateFrame
      htmlUrl={`${API_BASE}/api/bc/${encodeURIComponent(code)}/html`}
      hideView={true}
      editLabel={t('actions.createMyVersion')}
      onBack={() => navigate('/')}
      onEdit={() => navigate(`/business-card/create`)}
      onShare={() => shareYousayLink(`${PUBLIC_SITE}/c/${code}`, () => {
        alert(t('successModal.linkCopied'))
      })}
    />
  )
}