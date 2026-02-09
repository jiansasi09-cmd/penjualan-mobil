const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createFromPR = async (req, res) => {
  try {
    const prId = Number(req.params.prId)

    // 1. Ambil PR
    const pr = await prisma.purchaseRequest.findUnique({
      where: { id: prId },
      include: { items: true }
    })

    if (!pr) {
      return res.status(404).json({ message: 'PR tidak ditemukan' })
    }

    if (pr.status !== 'APPROVED') {
      return res.status(400).json({ message: 'PR belum di-approve' })
    }

    // 2. Cek apakah PO sudah ada
    const existingPO = await prisma.purchaseOrder.findUnique({
      where: { purchaseRequestId: prId }
    })

    if (existingPO) {
      return res.status(400).json({ message: 'PO sudah dibuat dari PR ini' })
    }

    // 3. Buat PO
    const po = await prisma.purchaseOrder.create({
      data: {
        kode: `PO-${Date.now()}`,
        purchaseRequestId: pr.id,
        supplierId: pr.supplierId,
        items: {
          create: pr.items.map(i => ({
            mobilId: i.mobilId,
            qty: i.qty,
            harga: 0,
            subtotal: 0
          }))
        }
      },
      include: { items: true }
    })

    res.status(201).json(po)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal membuat PO' })
  }
}
exports.getAll = async (req, res) => {
  const data = await prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      purchaseRequest: true,
      items: { include: { mobil: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
  res.json(data)
}
exports.getById = async (req, res) => {
  const po = await prisma.purchaseOrder.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      supplier: true,
      purchaseRequest: true,
      items: { include: { mobil: true } }
    }
  })

  if (!po) return res.status(404).json({ message: 'PO tidak ditemukan' })
  res.json(po)
}
exports.updateStatus = async (req, res) => {
  const { status } = req.body

  const po = await prisma.purchaseOrder.update({
    where: { id: Number(req.params.id) },
    data: { status }
  })

  res.json(po)
}
exports.delete = async (req, res) => {
  await prisma.purchaseOrder.delete({
    where: { id: Number(req.params.id) }
  })

  res.json({ message: 'PO dihapus' })
}
