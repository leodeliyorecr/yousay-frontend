import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7179'

const api = axios.create({
  baseURL: `${baseURL}/api`,
})

export default api