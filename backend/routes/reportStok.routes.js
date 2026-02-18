const express = require('express')
const router = express.Router()

const controller = require('../controllers/reportStok.controller')


// semua stok
router.get('/', controller.getAll)


// detail stok
router.get('/:id', controller.getOne)


module.exports = router
