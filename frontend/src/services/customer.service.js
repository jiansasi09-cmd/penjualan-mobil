import api from './api'

// 1️⃣ Ambil semua customer (hanya untuk admin)
export const getCustomers = async () => {
  const res = await api.get('/admin/customers') // cukup ini, baseURL sudah /api
  return res.data
}

// 2️⃣ Ambil detail customer by ID (admin)
export const getCustomerById = async (id) => {
  const res = await api.get(`/admin/customers/${id}`)
  return res.data
}

// 3️⃣ Ambil profil sendiri (customer login)
export const getMyProfile = async () => {
  const res = await api.get('/customer/me') // ❌ jangan pakai /api di sini
  return res.data
}

// 4️⃣ Update profil sendiri (customer login)
export const updateMyProfile = async (data) => {
  const res = await api.put('/customer/me', data)
  return res.data
}
