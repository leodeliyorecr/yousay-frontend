import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center text-center g-1">
          <div className="col-12 col-md-auto">
            <span>Yousay.fun © 2026</span>
          </div>
          <div className={`col-auto d-none d-md-block ${styles.sep}`}>·</div>
          <div className="col-12 col-md-auto">
            <Link to="/terminos" className={styles.link}>
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}