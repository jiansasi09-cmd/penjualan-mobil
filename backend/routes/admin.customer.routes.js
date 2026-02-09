const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const { onlyAdmin } = require('../middlewares/role.middleware')
const customerController = require('../controllers/admin.customer.controller')

// 🔐 ADMIN ONLY
router.get('/', auth, onlyAdmin, customerController.getAll)
router.get('/:id', auth, onlyAdmin, customerController.getById)

module.exports = router
