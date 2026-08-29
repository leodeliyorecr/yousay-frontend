import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import styles from './BusinessCardForm.module.css'

export default function BusinessCardForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    company: '',
    phone1: '',
    whatsapp: '',
    phone2: '',
    email: '',
    website: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    address: '',
    latitude: '',
    longitude: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.fullName || !form.jobTitle || !form.phone1) {
      alert('Nombre, cargo y teléfono son obligatorios')
      return
    }
    setIsSubmitting(true)
    try {
      const response = await api.post('/business-cards', {
        ...form,
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
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Regresar</button>
        <h1 className={styles.title}>Crear Tarjeta de Presentación</h1>
      </div>

      <div className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Información Principal *</h2>
          <div className={styles.field}>
            <label>Nombre completo *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Juan Pérez" />
          </div>
          <div className={styles.field}>
            <label>Cargo / Profesión *</label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Gerente de Ventas" />
          </div>
          <div className={styles.field}>
            <label>Empresa</label>
            <input name="company" value={form.company} onChange={handleChange} placeholder="Empresa S.A." />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contacto *</h2>
          <div className={styles.field}>
            <label>Teléfono *</label>
            <input name="phone1" value={form.phone1} onChange={handleChange} placeholder="+506 8765-4321" />
          </div>
          <div className={styles.field}>
            <label>WhatsApp</label>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+506 8765-4321" />
          </div>
          <div className={styles.field}>
            <label>Teléfono 2</label>
            <input name="phone2" value={form.phone2} onChange={handleChange} placeholder="+506 8765-4321" />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="juan@empresa.com" />
          </div>
          <div className={styles.field}>
            <label>Sitio Web</label>
            <input name="website" value={form.website} onChange={handleChange} placeholder="https://empresa.com" />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Redes Sociales</h2>
          <div className={styles.field}>
            <label>LinkedIn (usuario)</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="juanperez" />
          </div>
          <div className={styles.field}>
            <label>Facebook (usuario)</label>
            <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="juanperez" />
          </div>
          <div className={styles.field}>
            <label>Instagram (usuario)</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="juanperez" />
          </div>
          <div className={styles.field}>
            <label>Twitter / X (usuario)</label>
            <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="juanperez" />
          </div>
          <div className={styles.field}>
            <label>TikTok (usuario)</label>
            <input name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="juanperez" />
          </div>
          <div className={styles.field}>
            <label>YouTube (usuario)</label>
            <input name="youtube" value={form.youtube} onChange={handleChange} placeholder="juanperez" />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ubicación</h2>
          <div className={styles.field}>
            <label>Dirección</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Av. Central, San José, Costa Rica" />
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Latitud</label>
              <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="9.9281" />
            </div>
            <div className={styles.field}>
              <label>Longitud</label>
              <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="-84.0907" />
            </div>
          </div>
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear mi tarjeta'}
        </button>
      </div>
    </div>
  )
}