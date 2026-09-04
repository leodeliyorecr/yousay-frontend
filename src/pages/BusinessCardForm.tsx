import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import styles from './BusinessCardForm.module.css'

export default function BusinessCardForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const templateId = searchParams.get('template') ?? ''
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [templateStyle, setTemplateStyle] = useState('azul1')
  const [form, setForm] = useState({
    fullName: '', jobTitle: '', company: '',
    phone1: '', whatsapp: '', phone2: '',
    email: '', website: '',
    linkedin: '', facebook: '', instagram: '', twitter: '', tiktok: '', youtube: '',
    address: '', latitude: '', longitude: '',
  })

  useEffect(() => {
    if (templateId) {
      api.get(`/templates/${templateId}`).then(res => {
        if (res.data.template?.templateStyle) {
          setTemplateStyle(res.data.template.templateStyle)
        }
      }).catch(() => {})
    }
  }, [templateId])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.fullName || !form.jobTitle || !form.phone1) {
      alert(t('businessCardForm.validation'))
      return
    }
    setIsSubmitting(true)
    try {
      const response = await api.post('/business-cards', {
        ...form,
        templateStyle: templateStyle,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
      })
      navigate(`/c/${response.data.code}`)
    } catch (error) {
      console.error('Error creando tarjeta:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← {t('actions.back')}</button>
        <h1 className={styles.title}>{t('businessCardForm.title')}</h1>
      </div>
      <div className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('businessCardForm.sectionMain')}</h2>
          <div className={styles.field}>
            <label>{t('businessCardForm.fullName')}</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Juan Pérez" maxLength={60} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.jobTitle')}</label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Gerente de Ventas" maxLength={40} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.company')}</label>
            <input name="company" value={form.company} onChange={handleChange} placeholder="Empresa S.A." maxLength={50} />
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('businessCardForm.sectionContact')}</h2>
          <div className={styles.field}>
            <label>{t('businessCardForm.phone1')}</label>
            <input name="phone1" value={form.phone1} onChange={handleChange} placeholder="+506 8765-4321" maxLength={15} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.whatsapp')}</label>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+506 8765-4321" maxLength={15} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.phone2')}</label>
            <input name="phone2" value={form.phone2} onChange={handleChange} placeholder="+506 8765-4321" maxLength={15} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.email')}</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="juan@empresa.com" maxLength={60} />
          </div>
          <div className={styles.field}>
            <label>{t('businessCardForm.website')}</label>
            <input name="website" value={form.website} onChange={handleChange} placeholder="https://empresa.com" maxLength={60} />
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('businessCardForm.sectionSocial')}</h2>
          <div className={styles.field}>
            <label>LinkedIn</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="juanperez" maxLength={40} />
          </div>
          <div className={styles.field}>
            <label>Facebook</label>
            <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="juanperez" maxLength={30} />
          </div>
          <div className={styles.field}>
            <label>Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="juanperez" maxLength={30} />
          </div>
          <div className={styles.field}>
            <label>Twitter / X</label>
            <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="juanperez" maxLength={30} />
          </div>
          <div className={styles.field}>
            <label>TikTok</label>
            <input name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="juanperez" maxLength={30} />
          </div>
          <div className={styles.field}>
            <label>YouTube</label>
            <input name="youtube" value={form.youtube} onChange={handleChange} placeholder="juanperez" maxLength={30} />
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('businessCardForm.sectionLocation')}</h2>
          <div className={styles.field}>
            <label>{t('businessCardForm.address')}</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Calle, Ciudad, País" maxLength={100} />
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>{t('businessCardForm.latitude')}</label>
              <input name="latitude" type="number" step="0.0001" value={form.latitude} onChange={handleChange} placeholder="9.9281" />
            </div>
            <div className={styles.field}>
              <label>{t('businessCardForm.longitude')}</label>
              <input name="longitude" type="number" step="0.0001" value={form.longitude} onChange={handleChange} placeholder="-84.0907" />
            </div>
          </div>
        </div>
        <button className={styles.submitBtn} onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? t('businessCardForm.submitting') : t('businessCardForm.submit')}
        </button>
      </div>
    </div>
  )
}
