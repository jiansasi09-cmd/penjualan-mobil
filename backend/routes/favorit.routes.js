// favorit.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/favorit.controller')

// POST /api/favorit/toggle
router.post('/toggle', controller.toggleFavorit)
router.get('/', controller.getFavorit)
module.exports = router
