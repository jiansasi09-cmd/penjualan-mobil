import api from './api'

export const getPRs = async () => {
  const res = await api.get('/purchase-request/admin')
  return res.data
}

export const getPRById = async (id) => {
  const res = await api.get(`/purchase-request/admin/${id}`)
  return res.data
}

export const createPR = async (data) => {
  const res = await api.post('/purchase-request/admin', data)
  return res.data
}

export const updatePR = async (id, data) => {
  const res = await api.put(`/purchase-request/admin/${id}`, data)
  return res.data
}

export const deletePR = async (id) => {
  const res = await api.delete(`/purchase-request/admin/${id}`)
  return res.data
}
