import api from './api'

export const getGoodsReceipts = async () => {
  const res = await api.get('/goods-receipt/admin')
  return res.data
}

export const getGoodsReceiptById = async (id) => {
  const res = await api.get(`/goods-receipt/admin/${id}`)
  return res.data
}

export const createGoodsReceiptFromPO = async (poId, items) => {
  const res = await api.post(
    `/goods-receipt/from-po/${poId}`,
    { items }
  )
  return res.data
}

export const updateGoodsReceipt = async (id, payload) => {
  const res = await api.put(`/goods-receipt/admin/${id}`, payload)
  return res.data
}
export const deleteGoodsReceipt = async (id) => {
  return api.delete(`/goods-receipt/admin/${id}`)
}