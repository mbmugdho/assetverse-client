import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: `${base.replace(/\/$/, '')}/api`,
  withCredentials: true,
})

export default apiClient