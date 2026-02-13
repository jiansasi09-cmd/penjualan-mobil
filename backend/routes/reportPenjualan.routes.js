const express = require('express')
const router = express.Router()
const reportController = require('../controllers/reportPenjualan.controller')

// GET semua penjualan
router.get('/', reportController.getAll)

// GET detail penjualan
router.get('/:id', reportController.getOne)

module.exports = router
