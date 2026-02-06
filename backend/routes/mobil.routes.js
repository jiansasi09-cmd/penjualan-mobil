const express = require('express')
const router = express.Router()
const controller = require('../controllers/mobil.controller')

// READ
router.get('/', controller.getAll)
router.get('/:id', controller.getById)

// CREATE
router.post('/', controller.create)

// UPDATE
router.put('/:id', controller.update)

// DELETE (opsional tapi ideal)
router.delete('/:id', controller.remove)

module.exports = router
