const express = require('express')
const router = express.Router()
const controller = require('../controllers/reportStok.controller')

router.get('/', controller.getAll)
router.get('/summary', controller.getSummary)

module.exports = router
