import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditModal.module.css'

const MAX_CHARS = 15

interface EditModalProps {
  initialTexts: string[]
  onCancel: () => void
  onCreate: (texts: string[], pin: string | null) => void
  isSubmitting: boolean
}

export default function EditModal({ initialTexts, onCancel, onCreate, isSubmitting }: EditModalProps) {
  const { t } = useTranslation()
  const [texts, setTexts] = useState<string[]>(initialTexts)
  const [usePin, setUsePin] = useState(false)
  const [pinDigits, setPinDigits] = useState(['', '', '', ''])

  useEffect(() => {
    setTexts(initialTexts)
  }, [initialTexts])

  function handleTextChange(index: number, value: string) {
    if (value.length > MAX_CHARS) return
    const updated = [...texts]
    updated[index] = value
    setTexts(updated)
  }

  function handlePinChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return
    const updated = [...pinDigits]
    updated[index] = value
    setPinDigits(updated)

    // Auto-focus al siguiente input
    if (value && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`)
      next?.focus()
    }
  }

  function handleSubmit() {
    const pin = usePin ? pinDigits.join('') : null
    if (usePin && pin?.length !== 4) return
    onCreate(texts, pin)
  }

  const isValid = texts.every(text => text.trim().length > 0) &&
    (!usePin || pinDigits.every(d => d !== ''))

  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
        <h3 className={styles.title}>{t('editModal.title')}</h3>

        {texts.map((text, index) => (
          <div key={index} className={styles.field}>
            <div className={styles.label}>
              <span>{t('editModal.textLabel', { number: index + 1 })}</span>
              <span className={`${styles.charCount} ${text.length >= MAX_CHARS ? styles.charCountWarning : ''}`}>
                {text.length}/{MAX_CHARS}
              </span>
            </div>
            <input
              className={styles.input}
              type="text"
              value={text}
              maxLength={MAX_CHARS}
              onChange={e => handleTextChange(index, e.target.value)}
            />
          </div>
        ))}

        <div className={styles.pinSection}>
          <label className={styles.pinToggle}>
            <input
              type="checkbox"
              checked={usePin}
              onChange={e => setUsePin(e.target.checked)}
            />
            {t('editModal.usePin')}
          </label>

          {usePin && (
            <div className={styles.pinInputs}>
              {pinDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  className={styles.pinDigit}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  autoComplete="off"
                  value={digit}
                  onChange={e => handlePinChange(index, e.target.value)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>
            {t('editModal.cancel')}
          </button>
          <button
            className={styles.btnCreate}
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? t('editModal.creating') : t('editModal.create')}
          </button>
        </div>
      </div>
    </div>
  )
}