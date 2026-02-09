import axios from '@/utils/axios'

export const getCustomers = async () => {
  const res = await axios.get('/admin/customer')
  return res.data
}

export const getCustomerById = async (id) => {
  const res = await axios.get(`/admin/customer/${id}`)
  return res.data
}
