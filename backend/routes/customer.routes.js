// customer.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/customer.controller')
const auth = require('../middlewares/auth.middleware')
router.get('/', auth, controller.getAll)
module.exports = router
