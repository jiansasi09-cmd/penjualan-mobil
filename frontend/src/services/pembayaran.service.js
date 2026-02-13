import api from './api'

// GET ALL
export const getPembayaran = async () => {
  const res = await api.get('/pembayaran')
  return res.data
}

// GET BY ID
export const getPembayaranById = async (id) => {
  const res = await api.get(`/pembayaran/${id}`)
  return res.data
}

// CREATE
export const createPembayaran = async (data) => {
  const res = await api.post('/pembayaran', data)
  return res.data
}

// DELETE
export const deletePembayaran = async (id) => {
  const res = await api.delete(`/pembayaran/${id}`)
  return res.data
}
