import api from './api'

// GET ALL
export const getSalesOrders = async () => {
  const res = await api.get('/admin/sales-order')
  return res.data
}

// GET BY ID
export const getSalesOrderById = async (id) => {
  const res = await api.get(`/admin/sales-order/${id}`)
  return res.data
}

// CREATE
export const createSalesOrder = async (data) => {
  const res = await api.post('/admin/sales-order', data)
  return res.data
}

// UPDATE
export const updateSalesOrder = async (id, data) => {
  const res = await api.put(`/admin/sales-order/${id}`, data)
  return res.data
}

// UPDATE STATUS
export const updateStatusSalesOrder = async (id, status) => {
  const res = await api.put(`/admin/sales-order/${id}/status`, { status })
  return res.data
}

// DELETE
export const deleteSalesOrder = async (id) => {
  const res = await api.delete(`/admin/sales-order/${id}`)
  return res.data
}
