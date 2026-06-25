import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'

export default function ExpiredCard() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(252, 111, 191, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-pink)',
      }}>
        <Clock size={28} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        color: 'var(--text-primary)',
      }}>
        {t('errors.cardExpiredTitle')}
      </h3>
      <p style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        maxWidth: '280px',
      }}>
        {t('errors.cardExpiredSubtitle')}
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'var(--accent-pink)',
          border: 'none',
          color: '#1a0f17',
          padding: '12px 32px',
          borderRadius: '24px',
          cursor: 'pointer',
          fontFamily: 'var(--font-main)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        {t('errors.goHome')}
      </button>
    </div>
  )
}