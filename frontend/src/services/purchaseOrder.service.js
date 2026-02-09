import api from './api'

export const getPOs = async () => {
  const res = await api.get('/purchase-order/admin') // ✅ path tanpa /api
  return res.data
}

export const getPOById = async (id) => {
  const res = await api.get(`/purchase-order/admin/${id}`)
  return res.data
}

export const createPOFromPR = async (prId) => {
  const res = await api.post(`/purchase-order/from-pr/${prId}`)
  return res.data
}

export const updatePOStatus = async (id, status) => {
  const res = await api.put(`/purchase-order/admin/${id}`, { status })
  return res.data
}

export const deletePO = async (id) => {
  await api.delete(`/purchase-order/admin/${id}`)
}
