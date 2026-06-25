import { useTranslation } from 'react-i18next'
import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  text?: string
}

export default function LoadingSpinner({ fullScreen = false, text }: LoadingSpinnerProps) {
  const { t } = useTranslation()

  return (
    <div className={`${styles.wrapper} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.spinner} />
      <span className={styles.text}>{text || t('common.loading')}</span>
    </div>
  )
}