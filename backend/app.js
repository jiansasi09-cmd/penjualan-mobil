require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================= AUTH =================
app.use('/api/auth', require('./routes/auth.routes'))

// ================= CUSTOMER PANEL =================
app.use('/api/customer', require('./routes/customer.routes'))

// ================= ADMIN MASTER DATA =================
app.use('/api/admin/customers', require('./routes/admin.customer.routes'))

// ================= MASTER DATA =================
app.use('/api/mobil', require('./routes/mobil.routes'))
app.use('/api/supplier', require('./routes/supplier.routes'))
app.use('/api/sales', require('./routes/sales.routes'))
app.use('/api/admin/sales', require('./routes/admin.sales.routes'))

// ================= TRANSAKSI =================
app.use('/api/favorit', require('./routes/favorit.routes'))
app.use('/api/booking', require('./routes/booking.routes'))
app.use('/api/pesanan', require('./routes/pesanan.routes'))
app.use('/api/pembelian', require('./routes/pembelian.routes'))
app.use('/api/penjualan', require('./routes/penjualan.routes'))

// ================= PURCHASING =================
app.use('/api/purchase-request', require('./routes/purchaseRequest.routes'))


// ================= PEMBAYARAN =================
app.use('/api/pembayaran-customer', require('./routes/pembayaranCustomer.routes'))
app.use('/api/pembayaran', require('./routes/pembayaran.routes'))

// ================= DASHBOARD =================
app.use('/api/dashboard', require('./routes/dashboard.routes'))

app.get('/', (req, res) => {
  res.json({ message: 'API Showroom Mobil aktif 🚗' })
})

module.exports = app
