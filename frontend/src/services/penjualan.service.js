import api from './api'

export const getPenjualan = async () => {
  const res = await api.get('/penjualan')
  return res.data
}

export const createPenjualan = async (data) => {
  const res = await api.post('/penjualan', data)
  return res.data
}
