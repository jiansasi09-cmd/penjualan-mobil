const express = require('express')
const router = express.Router()
const salesController = require('../controllers/sales.controller')

// ambil semua sales
router.get('/', salesController.getAll)

// ambil sales by ID
router.get('/:id', salesController.getById)

// tambah sales
router.post('/', salesController.create)

// update sales
router.put('/:id', salesController.update)

// hapus sales
router.delete('/:id', salesController.remove)

module.exports = router
