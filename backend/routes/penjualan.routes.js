const express = require('express')
const router = express.Router()
const controller = require('../controllers/penjualan.controller')

// ================= ROUTES PENJUALAN =================

// GET semua penjualan
router.get('/', controller.getAll)

// GET detail penjualan berdasarkan ID
router.get('/:id', controller.getById)

// CREATE penjualan baru
router.post('/create', controller.create)

// UPDATE penjualan berdasarkan ID
router.put('/:id', controller.update)


// DELETE penjualan berdasarkan ID
router.delete('/:id', controller.delete)

module.exports = router
