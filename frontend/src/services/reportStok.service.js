import api from './api'


// ==========================
// GET ALL STOK
// ==========================
export const getReportStok = async () => {

  const res = await api.get('/report/stok')

  return res.data.data

}


// ==========================
// GET DETAIL STOK
// ==========================
export const getReportStokDetail = async (id) => {

  const res = await api.get(`/report/stok/${id}`)

  return res.data.data

}
