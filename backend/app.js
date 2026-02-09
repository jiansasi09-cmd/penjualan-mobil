require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================= ROUTES =================
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/customer', require('./routes/customer.routes'))
app.use('/api/mobil', require('./routes/mobil.routes'))
app.use('/api/sales', require('./routes/sales.routes'))
app.use('/api/supplier', require('./routes/supplier.routes'))
app.use('/api/favorit', require('./routes/favorit.routes'))
app.use('/api/booking', require('./routes/booking.routes'))
app.use('/api/pesanan', require('./routes/pesanan.routes'))
app.use('/api/pembayaran-customer', require('./routes/pembayaranCustomer.routes'))
app.use('/api/pembelian', require('./routes/pembelian.routes'))
app.use('/api/penjualan', require('./routes/penjualan.routes'))
app.use('/api/pembayaran', require('./routes/pembayaran.routes'))



// ✅ DASHBOARD (ADMIN)
app.use('/api/dashboard', require('./routes/dashboard.routes'))

app.get('/', (req, res) => {
  res.json({ message: 'API Showroom Mobil aktif 🚗' })
})

module.exports = app
