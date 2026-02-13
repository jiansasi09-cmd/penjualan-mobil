import api from './api'

// GET semua penjualan
export const getPenjualan = async () => {
  const res = await api.get('/penjualan')
  return res.data
}

// GET detail penjualan berdasarkan ID
export const getPenjualanById = async (id) => {
  const res = await api.get(`/penjualan/${id}`)
  return res.data
}

// CREATE penjualan baru
export const createPenjualan = async (data) => {
  const res = await api.post('/penjualan/create', data) // endpoint sesuai controller create
  return res.data
}

// UPDATE penjualan berdasarkan ID
export const updatePenjualan = async (id, data) => {
  const res = await api.put(`/penjualan/${id}/edit`, data) // endpoint sesuai controller update
  return res.data
}

// DELETE penjualan berdasarkan ID
export const deletePenjualan = async (id) => {
  const res = await api.delete(`/penjualan/${id}`)
  return res.data
}
