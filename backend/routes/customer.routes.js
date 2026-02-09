const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const { onlyCustomer } = require('../middlewares/role.middleware')
const customerController = require('../controllers/customer.controller')

// 🔐 CUSTOMER PROFILE
router.get('/me', auth, onlyCustomer, customerController.getProfile)

module.exports = router
