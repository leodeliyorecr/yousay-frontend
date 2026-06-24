import { useTranslation } from 'react-i18next'
import logoYousay from '../assets/logo-yousay.png'
import styles from './Header.module.css'

const LANGUAGES = [
  { code: 'es',    label: 'ES' },
  { code: 'en',    label: 'EN' },
  { code: 'fr',    label: 'FR' },
  { code: 'pt-BR', label: 'PT-BR' },
  { code: 'pt-PT', label: 'PT-PT' },
]

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { i18n, t } = useTranslation()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <button className={styles.hamburger} onClick={onMenuToggle}>
            {[0,1,2].map(i => (
              <span key={i} className={styles.hamburgerLine} />
            ))}
          </button>
          <img src={logoYousay} alt="Yousay" className={styles.logo} />
          <span className={styles.slogan}>{t('slogan')}</span>
        </div>
      </header>

      <div className={styles.langBar}>
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`${styles.langBtn} ${i18n.language === lang.code ? styles.langBtnActive : ''}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </>
  )
}