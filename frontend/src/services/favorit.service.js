import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/favorit'
})

// pasang token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ambil semua favorit user
export const getFavorit = async () => {
  const res = await api.get('/')
  return res.data
}

// toggle favorit (langsung add/remove)
export const toggleFavorit = async (customerId, mobilId) => {
  const res = await api.post('/toggle', { customerId, mobilId })
  return res.data // { action: 'added' | 'removed', favorit: [...] }
}
// ambil semua mobil
export const getMobils = async () => {
  const res = await api.get('/')
  return res.data
}