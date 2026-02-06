const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')

// ❌ TANPA middleware JWT
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router
