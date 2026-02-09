const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const { onlyAdmin } = require('../middlewares/role.middleware')
const poController = require('../controllers/purchaseOrder.controller')

// CRUD PO
router.post('/from-pr/:prId', auth, onlyAdmin, poController.createFromPR)
router.get('/admin', auth, onlyAdmin, poController.getAll)
router.get('/admin/:id', auth, onlyAdmin, poController.getById)
router.put('/admin/:id', auth, onlyAdmin, poController.updateStatus)
router.delete('/admin/:id', auth, onlyAdmin, poController.delete)


module.exports = router
