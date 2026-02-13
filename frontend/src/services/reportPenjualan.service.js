import api from './api'

// Ambil semua report penjualan
export const getReportPenjualan = async () => {
  const res = await api.get('/report/penjualan/')
  return res.data.data
}

// Ambil detail per penjualan
export const getReportPenjualanDetail = async (id) => {
  const res = await api.get(`/report/penjualan/${id}`)
  return res.data.data
}
