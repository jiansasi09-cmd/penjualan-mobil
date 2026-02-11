const router = require('express').Router()
const controller = require('../controllers/purchaseInvoice.controller')

router.post('/', controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.patch('/:id/paid', controller.markAsPaid)


module.exports = router
