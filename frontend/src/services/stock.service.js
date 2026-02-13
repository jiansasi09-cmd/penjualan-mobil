import api from './api'

// ================= STOCK =================

export const getStock = async () => {
  const res = await api.get('/admin/stock')
  return res.data
}

export const updateStock = async (id, data) => {
  const res = await api.put(`/admin/stock/${id}`, data)
  return res.data
}

export const deleteStock = async (id) => {
  const res = await api.delete(`/admin/stock/${id}`)
  return res.data
}
// ================= STOCK MUTATION =================

export const getMutations = async (mobilId) => {
  const res = await api.get(`/admin/stock/mutations/${mobilId}`)
  return res.data
}

