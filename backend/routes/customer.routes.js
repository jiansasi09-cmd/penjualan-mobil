const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth.middleware')
const { onlyCustomer } = require('../middlewares/role.middleware')
const customerController = require('../controllers/customer.controller')

// PROFILE CUSTOMER
router.get('/me', auth, onlyCustomer, customerController.getProfile)
router.put('/me', auth, onlyCustomer, customerController.updateProfile)

module.exports = router
