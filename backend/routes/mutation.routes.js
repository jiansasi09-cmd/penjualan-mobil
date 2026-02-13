const express = require('express')
const router = express.Router()
const mutationController = require('../controllers/mutation.controller')

router.get('/', mutationController.getAllMutation)
router.get('/:id', mutationController.getMutationById) // ✅ TAMBAH INI
router.post('/', mutationController.createMutation)
router.put('/:id', mutationController.updateMutation)
router.delete('/:id', mutationController.deleteMutation)

module.exports = router
