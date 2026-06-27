import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { useTemplates } from '../hooks/useTemplates'
import { useCategories } from '../hooks/useCategories'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.css'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<{ id: number; slug: string } | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const { categories } = useCategories()
  const { templates, loading, errorKey } = useTemplates(activeCategory?.id ?? null, i18n.language)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Select the first category automatically once categories have loaded
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory({ id: categories[0].id, slug: categories[0].slug })
    }
  }, [categories, activeCategory])

  return (
    <div className={styles.wrapper}>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCategory={activeCategory?.slug ?? ''}
        onSelectCategory={(id, slug) => setActiveCategory({ id, slug })}
        isMobile={isMobile}
      />
      <main className={styles.main}>
        <div className={styles.sectionTitle}>
          {activeCategory ? t(`categories.${activeCategory.slug}`) : t('common.loading')}
        </div>
        {loading && <LoadingSpinner />}
        {errorKey && <p>{errorKey}</p>}
        <div className={styles.grid}>
          {templates.map(template => (
            <div
              key={template.id}
              className={styles.card}
              onClick={() => navigate(`/template/${template.id}`)}
            >
              <div className={styles.cardName}>{template.description}</div>
              <div className={styles.cardBadge}>{t('actions.view')}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}