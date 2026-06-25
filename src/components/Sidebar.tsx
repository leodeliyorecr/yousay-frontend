import { useTranslation } from 'react-i18next'
import { Laugh, Heart, Trophy, Cake, Star, Sparkles, type LucideIcon } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import styles from './Sidebar.module.css'

const ICONS: Record<string, LucideIcon> = {
  divertidos: Laugh,
  fanaticos_futbol: Trophy,
  cumpleanos: Cake,
  amor: Heart,
  autoestima: Star,
  espiritual: Sparkles,
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeCategory: string
  onSelectCategory: (id: number, slug: string) => void
  isMobile: boolean
}

export default function Sidebar({ isOpen, onClose, activeCategory, onSelectCategory, isMobile }: SidebarProps) {
  const { t } = useTranslation()
  const { categories, loading, errorKey } = useCategories()

  return (
    <>
      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      <nav className={`${styles.sidebar} ${isMobile && isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarTitle}>
          {t('categoriesTitle')}
        </div>
        {loading && <div className={styles.catItem}>{t('common.loading')}</div>}
        {errorKey && <div className={styles.catItem}>{t(errorKey)}</div>}
        {categories.map((category) => {
          const { id, slug } = category
          const Icon = ICONS[slug] || Sparkles
          return (
            <div
              key={slug}
              onClick={() => { onSelectCategory(id, slug); if (isMobile) onClose() }}
              className={`${styles.catItem} ${activeCategory === slug ? styles.catItemActive : ''}`}
            >
              <Icon size={16} />
              {t(`categories.${slug}`)}
            </div>
          )
        })}
      </nav>
    </>
  )
}