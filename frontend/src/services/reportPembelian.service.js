import api from './api'

export const getReportPembelian = async () => {

  const res = await api.get('/report/pembelian')

  return res.data.data

}

export const getReportPembelianDetail = async (id) => {

  const res = await api.get(`/report/pembelian/${id}`)

  return res.data.data

}
