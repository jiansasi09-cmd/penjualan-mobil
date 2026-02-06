import api from './api'
export const getCustomer = () => api.get('/customer')
export const createCustomer = (d) => api.post('/customer', d)
