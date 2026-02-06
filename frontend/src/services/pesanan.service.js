import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/pesanan'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const createPesanan = async (data) => {
  const res = await api.post('/', data)
  return res.data
}

export const getPesanan = async () => {
  const res = await api.get('/')
  return res.data
}
