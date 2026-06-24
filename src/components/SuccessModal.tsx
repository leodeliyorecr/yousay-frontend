import { PartyPopper, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './SuccessModal.module.css'

interface SuccessModalProps {
  hash: string
  onClose: () => void
  onOpen: () => void
}

export default function SuccessModal({ hash, onClose, onOpen }: SuccessModalProps) {
  const { t } = useTranslation()
  const cardUrl = `https://yousay.fun/card/${hash}`

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yousay.fun',
          url: cardUrl,
        })
      } catch {
        // El usuario canceló el share, no hacemos nada
      }
    } else {
      await navigator.clipboard.writeText(cardUrl)
      alert(t('successModal.linkCopied'))
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.icon}>
          <PartyPopper size={28} />
        </div>
        <h3 className={styles.title}>{t('successModal.title')}</h3>
        <p className={styles.subtitle}>{t('successModal.subtitle')}</p>

        <div className={styles.linkBox}>{cardUrl}</div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onOpen}>
            {t('successModal.open')}
          </button>
          <button className={styles.btnPrimary} onClick={handleShare}>
            <Share2 size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {t('successModal.share')}
          </button>
        </div>

        <div className={styles.closeText} onClick={onClose}>
          {t('successModal.close')}
        </div>
      </div>
    </div>
  )
}