const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// =============================
// CREATE SALES ORDER
// =============================
exports.create = async (req, res) => {
  try {
    const { nomor, customerId, createdById, items } = req.body

    // hitung total
    let total = 0
    items.forEach(item => {
      total += item.qty * item.harga
    })

    const salesOrder = await prisma.salesOrder.create({
      data: {
        nomor,
        customerId,
        createdById,
        total,
        detail: {
          create: items.map(item => ({
            mobilId: item.mobilId,
            qty: item.qty,
            harga: item.harga,
            subtotal: item.qty * item.harga
          }))
        }
      },
      include: {
        customer: true,
        createdBy: true,
        detail: {
          include: { mobil: true }
        }
      }
    })

    res.json(salesOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// =============================
// GET ALL
// =============================
exports.findAll = async (req, res) => {
  try {
    const data = await prisma.salesOrder.findMany({
      include: {
        customer: true,
        createdBy: true,
        detail: { include: { mobil: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// =============================
// GET BY ID
// =============================
exports.findOne = async (req, res) => {
  try {
    const data = await prisma.salesOrder.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        customer: true,
        createdBy: true,
        detail: { include: { mobil: true } }
      }
    })

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// =============================
// UPDATE STATUS
// =============================
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const id = parseInt(req.params.id)

    const so = await prisma.salesOrder.findUnique({
      where: { id },
      include: { detail: true }
    })

    if (!so) return res.status(404).json({ message: "SO tidak ditemukan" })

    const result = await prisma.$transaction(async (tx) => {

      // kalau APPROVED → kurangi stok
      if (status === "APPROVED" && so.status !== "APPROVED") {
        for (let item of so.detail) {
          await tx.mobil.update({
            where: { id: item.mobilId },
            data: {
              stok: { decrement: item.qty }
            }
          })

          await tx.stockMutation.create({
            data: {
              mobilId: item.mobilId,
              qty: item.qty,
              type: "OUT",
              reference: so.nomor
            }
          })
        }
      }

      const updated = await tx.salesOrder.update({
        where: { id },
        data: { status }
      })

      return updated
    })

    res.json(result)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// =============================
// DELETE
// =============================
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const so = await prisma.salesOrder.findUnique({
      where: { id },
      include: { penjualan: true }
    })

    if (so.penjualan) {
      return res.status(400).json({
        message: "SO sudah dipakai Penjualan, tidak bisa dihapus"
      })
    }

    await prisma.salesOrder.delete({
      where: { id }
    })

    res.json({ message: "Sales Order deleted" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

