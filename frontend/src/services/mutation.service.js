import api from './api'

export const getMutations = async () => {
  const res = await api.get('/admin/mutation')
  return res.data
}

export const getMutationById = async (id) => {
  const res = await api.get(`/admin/mutation/${id}`)
  return res.data
}

export const createMutation = async (data) => {
  const res = await api.post('/admin/mutation', data)
  return res.data
}

export const updateMutation = async (id, data) => {
  const res = await api.put(`/admin/mutation/${id}`, data)
  return res.data
}

export const deleteMutation = async (id) => {
  const res = await api.delete(`/admin/mutation/${id}`)
  return res.data
}
