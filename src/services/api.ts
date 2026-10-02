import axios from 'axios'

// URL base del API. En producción el API está en el mismo dominio (Nginx), en
// desarrollo se define VITE_API_BASE_URL o se usa el backend local.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'

// Dominio público que se usa en los enlaces para compartir
export const PUBLIC_SITE = 'https://yousay.fun'

const api = axios.create({
  baseURL: `${API_BASE}/api`,
})

export default api
