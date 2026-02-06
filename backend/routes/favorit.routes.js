// favorit.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/favorit.controller')
router.post('/', controller.create)
module.exports = router
