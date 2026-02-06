import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/pembayaran-customer',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// GET SEMUA PEMBAYARAN CUSTOMER
export const getPembayaranCustomer = async () => {
  const res = await api.get('/')
  return res.data
}

// CREATE PEMBAYARAN CUSTOMER
export const createPembayaranCustomer = async (data) => {
  const res = await api.post('/', data)
  return res.data
}

// UPLOAD BUKTI PEMBAYARAN
export const uploadBukti = async (pesananId, formData) => {
  const res = await api.post(
    `/upload-bukti/${pesananId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return res.data
}
