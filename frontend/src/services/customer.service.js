import api from './api'

// ambil semua customer (ADMIN)
export const getCustomers = async () => {
  const res = await api.get('/admin/customers')
  return res.data
}

// ambil detail customer by id (ADMIN)
export const getCustomerById = async (id) => {
  const res = await api.get(`/admin/customers/${id}`)
  return res.data
}
