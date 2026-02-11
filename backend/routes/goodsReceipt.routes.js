const express = require('express')
const router = express.Router()

const goodsReceiptController = require('../controllers/goodsReceipt.controller')

// ================= LIST =================
router.get('/admin', goodsReceiptController.getAll)

// ================= BY PO =================
router.get('/by-po/:poId', goodsReceiptController.getByPO)

// ================= DETAIL =================
router.get('/admin/:id', goodsReceiptController.getById)

// ================= CREATE =================
router.post('/from-po/:poId', goodsReceiptController.createFromPO)

// ================= UPDATE =================
router.put('/admin/:id', goodsReceiptController.update)

// ================= DELETE =================
router.delete('/admin/:id', goodsReceiptController.deleteGoodsReceipt)

module.exports = router
