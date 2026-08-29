import { useParams, useNavigate } from 'react-router-dom'
import TemplateFrame from '../components/TemplateFrame'
import { shareYousayLink } from '../utils/share'
import { useTranslation } from 'react-i18next'

export default function BusinessCardView() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!code) return null

  return (
    <TemplateFrame
      htmlUrl={`/api/bc/${code}/html`}
      hideView={true}
      onBack={() => navigate('/')}
      onEdit={() => navigate(`/business-card/create`)}
      onShare={() => shareYousayLink(`https://yousay.fun/c/${code}`, () => {
        alert(t('successModal.linkCopied'))
      })}
    />
  )
}