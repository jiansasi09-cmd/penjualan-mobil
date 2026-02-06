import api from './api'

export const getPembelian = async () => {
  const res = await api.get('/pembelian')
  return res.data
}

export const createPembelian = async (data) => {
  const res = await api.post('/pembelian', data)
  return res.data
}
