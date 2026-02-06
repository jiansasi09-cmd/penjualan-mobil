import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/favorit'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getFavorit = async () => {
  const res = await api.get('/')
  return res.data
}

export const addFavorit = async (mobilId) => {
  const res = await api.post('/', { mobilId })
  return res.data
}

export const removeFavorit = async (mobilId) => {
  const res = await api.delete(`/${mobilId}`)
  return res.data
}

export const toggleFavorit = async (mobilId, isFavorit) => {
  return isFavorit
    ? removeFavorit(mobilId)
    : addFavorit(mobilId)
}
