import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TemplateFrame from '../components/TemplateFrame'
import { shareYousayLink } from '../utils/share'

export default function BusinessCardView() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!code) return null

  return (
    <TemplateFrame
      htmlUrl={`/api/bc/${code}/html`}
      hideView={true}
      editLabel={t('actions.createMyVersion')}
      onBack={() => navigate('/')}
      onEdit={() => navigate(`/business-card/create`)}
      onShare={() => shareYousayLink(`https://yousay.fun/c/${code}`, () => {
        alert(t('successModal.linkCopied'))
      })}
    />
  )
}