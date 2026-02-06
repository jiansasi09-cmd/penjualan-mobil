import api from './api'

export const getPembayaran = async () => {
  const res = await api.get('/pembayaran')
  return res.data
}

export const createPembayaran = async (data) => {
  const res = await api.post('/pembayaran', data)
  return res.data
}
