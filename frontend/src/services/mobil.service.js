import api from './api'

export const getMobil = async () => {
  const res = await api.get('/mobil')
  return res.data
}

export const getMobilById = async (id) => {
  const res = await api.get(`/mobil/${id}`)
  return res.data
}

export const createMobil = async (data) => {
  const res = await api.post('/mobil', data)
  return res.data
}

export const updateMobil = async (id, data) => {
  const res = await api.put(`/mobil/${id}`, data)
  return res.data
}

export const deleteMobil = async (id) => {
  const res = await api.delete(`/mobil/${id}`)
  return res.data
}
