import api from './api'

export const getSales = async () => {
  const res = await api.get('/sales')
  return res.data
}

export const getSalesById = async (id) => {
  const res = await api.get(`/sales/${id}`)
  return res.data
}

export const createSales = async (data) => {
  const res = await api.post('/sales', data)
  return res.data
}

export const updateSales = async (id, data) => {
  const res = await api.put(`/sales/${id}`, data)
  return res.data
}

export const deleteSales = async (id) => {
  const res = await api.delete(`/sales/${id}`)
  return res.data
}
