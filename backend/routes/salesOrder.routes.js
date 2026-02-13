const router = require('express').Router()
const controller = require('../controllers/salesOrder.controller')

router.post('/', controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.put('/:id/status', controller.updateStatus)
router.delete('/:id', controller.remove)


module.exports = router
