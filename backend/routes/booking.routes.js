// booking.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/booking.controller')
router.post('/', controller.create)
module.exports = router
