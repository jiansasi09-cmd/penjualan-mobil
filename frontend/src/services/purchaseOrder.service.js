import api from './api'

export const getPOs = async () => {
  const res = await api.get('/purchase-order/admin')
  return res.data
}

export const getPOById = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error('PO ID tidak valid')
  }

  const res = await api.get(`/purchase-order/admin/${Number(id)}`)
  return res.data
}

export const createPOFromPR = async (prId) => {
  if (!prId || isNaN(Number(prId))) {
    throw new Error('PR ID tidak valid')
  }

  const res = await api.post(
    `/purchase-order/from-pr/${Number(prId)}`
  )
  return res.data
}

export const updatePOStatus = async (id, status) => {
  if (!id || isNaN(Number(id))) {
    throw new Error('PO ID tidak valid')
  }

  const res = await api.put(
    `/purchase-order/admin/${Number(id)}`,
    { status }
  )
  return res.data
}

export const deletePO = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error('PO ID tidak valid')
  }

  await api.delete(`/purchase-order/admin/${Number(id)}`)
}

export const receivePO = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error('PO ID tidak valid')
  }

  const res = await api.post(
    `/goods-receipt/from-po/${Number(id)}`
  )
  return res.data
}

export const getGoodsReceiptById = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error('GR ID tidak valid')
  }

  const res = await api.get(
    `/goods-receipt/admin/${Number(id)}`
  )
  return res.data
}
