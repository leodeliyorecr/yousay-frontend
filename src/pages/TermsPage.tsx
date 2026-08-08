import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import styles from './TermsPage.module.css'

export default function TermsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleSelectCategory(id: number, slug: string) {
    setSidebarOpen(false)
    navigate('/', { state: { categoryId: id, categorySlug: slug } })
  }

  return (
    <div className={styles.wrapper}>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCategory=""
        onSelectCategory={handleSelectCategory}
        isMobile={window.innerWidth <= 768}
      />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t('terms.pageTitle')}</h1>

        {/* Contacto */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms.contactTitle')}</h2>
          <table className={styles.contactTable}>
            <tbody>
              <tr>
                <td className={styles.label}>{t('terms.name')}</td>
                <td>Leonardo Deliyore</td>
              </tr>
              <tr>
                <td className={styles.label}>{t('terms.phone')}</td>
                <td><a href="tel:+50672166064" className={styles.link}>+506 7216-6064</a></td>
              </tr>
              <tr>
                <td className={styles.label}>{t('terms.email')}</td>
                <td><a href="mailto:info@yousay.fun" className={styles.link}>info@yousay.fun</a></td>
              </tr>
              <tr>
                <td className={styles.label}>{t('terms.website')}</td>
                <td><a href="https://yousay.fun" className={styles.link}>yousay.fun</a></td>
              </tr>
              <tr>
                <td className={styles.label}>{t('terms.country')}</td>
                <td>Costa Rica</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className={styles.divider} />

        {/* Términos */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms.termsTitle')}</h2>
          <p className={styles.lastUpdated}>{t('terms.lastUpdated')}</p>

          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <div key={n} className={styles.termSection}>
              <h3 className={styles.termTitle}>{t(`terms.s${n}Title`)}</h3>
              <p className={styles.termText}>{t(`terms.s${n}`)}</p>
            </div>
          ))}
        </section>

        <p className={styles.copyright}>{t('terms.copyright')}</p>
      </main>
      <Footer />
    </div>
  )
}
