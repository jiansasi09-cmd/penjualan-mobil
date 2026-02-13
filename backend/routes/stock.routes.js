const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stock.controller')

router.get('/', stockController.getAllStock)
router.get('/mutations/:mobilId', stockController.getStockMutations)

module.exports = router
