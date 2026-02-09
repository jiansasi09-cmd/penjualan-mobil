const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const { onlyAdmin, onlySales } = require('../middlewares/role.middleware')
const prController = require('../controllers/purchaseRequest.controller')

// Semua PR (Admin)
router.get('/admin', auth, onlyAdmin, prController.getAll)
router.get('/admin/:id', auth, onlyAdmin, prController.getById)
router.post('/admin', auth, onlyAdmin, prController.create)
router.put('/admin/:id', auth, onlyAdmin, prController.update)
router.delete('/admin/:id', auth, onlyAdmin, prController.delete)
router.put('/approve/:id', auth, onlyAdmin, prController.approvePR)

module.exports = router
