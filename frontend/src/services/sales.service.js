import api from './api'

// 1️⃣ ambil semua sales
export const getSales = async () => {
  const res = await api.get('/admin/sales')
  return res.data
}

// 2️⃣ ambil detail sales
export const getSalesById = async (id) => {
  const res = await api.get(`/admin/sales/${id}`)
  return res.data
}

// 3️⃣ tambah sales
export const addSales = async (data) => {
  const res = await api.post('/admin/sales', data)
  return res.data
}

// 4️⃣ update sales
export const updateSales = async (id, data) => {
  const res = await api.put(`/admin/sales/${id}`, data)
  return res.data
}

// 5️⃣ hapus sales
export const deleteSales = async (id) => {
  const res = await api.delete(`/admin/sales/${id}`)
  return res.data
}
