import api from './api' // axios instance kamu

export const getPurchaseInvoices = async () => {
  const { data } = await api.get('/purchase-invoice')
  return data
}

export const getPurchaseInvoiceById = async (id) => {
  const { data } = await api.get(`/purchase-invoice/${id}`)
  return data
}

export const createPurchaseInvoice = async (payload) => {
  const { data } = await api.post('/purchase-invoice', payload)
  return data
}
