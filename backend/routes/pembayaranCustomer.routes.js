// pembayaranCustomer.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/pembayaranCustomer.controller')
router.post('/', controller.create)
module.exports = router
