const router = require('express').Router()
const { getDashboard } = require('../controllers/dashboard.controller')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, getDashboard)

module.exports = router
