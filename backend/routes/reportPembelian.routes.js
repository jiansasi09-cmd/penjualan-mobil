const express = require('express')
const router = express.Router()
const controller = require('../controllers/reportPembelian.controller')

router.get('/', controller.getAll)
router.get('/summary', controller.getSummary)

module.exports = router
