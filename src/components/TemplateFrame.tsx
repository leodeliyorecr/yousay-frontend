import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Play, Pencil, Share2 } from 'lucide-react'
import styles from './TemplateFrame.module.css'

interface TemplateFrameProps {
  htmlUrl: string
  onBack: () => void
  onEdit: () => void
  onShare: () => void
}

export default function TemplateFrame({ htmlUrl, onBack, onEdit, onShare }: TemplateFrameProps) {
  const { t } = useTranslation()
  const [animationEnded, setAnimationEnded] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'YOUSAY_ANIMATION_START') {
        setAnimationStarted(true)
      }
      if (event.data?.type === 'YOUSAY_ANIMATION_END') {
        setAnimationEnded(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  function handleReplay() {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div className={styles.stage}>
      <div className={`${styles.actionBar} ${animationStarted && !animationEnded ? styles.actionBarHidden : ''}`}>
        <button className={styles.actionBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          {t('actions.back')}
        </button>

        <div className={styles.actionGroup}>
          <button className={styles.actionBtn} onClick={handleReplay}>
          <Play size={16} />
          {t('actions.view')}
        </button>
        <button className={styles.actionBtn} onClick={onEdit}>
          <Pencil size={16} />
          {t('actions.edit')}
        </button>
        <button className={styles.actionBtn} onClick={onShare}>
          <Share2 size={16} />
          {t('actions.share')}
        </button>
        </div>
      </div>

      <div className={styles.iframeWrap}>
        <iframe
          ref={iframeRef}
          src={htmlUrl}
          className={styles.iframe}
          title="Yousay card"
        />
      </div>
    </div>
  )
}