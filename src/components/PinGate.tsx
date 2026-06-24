import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock } from 'lucide-react'
import api from '../services/api'
import styles from './PinGate.module.css'

interface PinGateProps {
  hash: string
  onValidated: (texts: { position: number; textContent: string }[]) => void
}

export default function PinGate({ hash, onValidated }: PinGateProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return
    const updated = [...digits]
    updated[index] = value
    setDigits(updated)
    setError(false)

    if (value && index < 3) {
      document.getElementById(`gate-pin-${index + 1}`)?.focus()
    }
  }

  async function handleSubmit() {
    const pin = digits.join('')
    if (pin.length !== 4) return

    setIsValidating(true)
    try {
      const response = await api.post(`/cards/${hash}/unlock`, { pin })
      if (response.data.valid) {
        onValidated(response.data.texts)
      } else {
        setError(true)
        setDigits(['', '', '', ''])
        document.getElementById('gate-pin-0')?.focus()
      }
    } catch {
      setError(true)
    } finally {
      setIsValidating(false)
    }
  }

  const isComplete = digits.every(d => d !== '')

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Lock size={28} />
      </div>
      <h3 className={styles.title}>{t('pinGate.title')}</h3>
      <p className={styles.subtitle}>{t('pinGate.subtitle')}</p>

      <div className={styles.pinInputs}>
        {digits.map((digit, index) => (
          <input
            key={index}
            id={`gate-pin-${index}`}
            className={`${styles.pinDigit} ${error ? styles.pinDigitError : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="off"
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && isComplete) handleSubmit() }}
          />
        ))}
      </div>

      {error && <p className={styles.error}>{t('pinGate.invalidPin')}</p>}

      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={!isComplete || isValidating}
      >
        {isValidating ? t('pinGate.validating') : t('pinGate.unlock')}
      </button>

      <span className={styles.back} onClick={() => navigate('/')}>
        {t('actions.back')}
      </span>
    </div>
  )
}
