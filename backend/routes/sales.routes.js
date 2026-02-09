const express = require('express')
const router = express.Router()
const salesController = require('../controllers/sales.controller')

// ADMIN PANEL
router.get('/', salesController.getAll)
router.get('/:id', salesController.getById)
router.post('/', salesController.create)
router.put('/:id', salesController.update)
router.delete('/:id', salesController.remove)

module.exports = router
