const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// =============================
// CREATE SALES ORDER
// =============================
exports.create = async (req, res) => {
  try {
    const { nomor, customerId, createdById, items } = req.body

    if (!nomor || !customerId || !createdById || !items || items.length === 0) {
      return res.status(400).json({ message: "Data tidak lengkap" })
    }

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
          include: {
            mobil: true
          }
        }
      }
    })

    res.json(salesOrder)

  } catch (error) {
    console.error("❌ CREATE SO ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// =============================
// GET ALL SALES ORDER
// =============================
exports.findAll = async (req, res) => {
  try {

    const allowedStatus = ["PENDING", "APPROVED", "REJECTED"]

    const { status } = req.query

    let filter = {}

    if (status && allowedStatus.includes(status)) {
      filter.status = status
    }

    const data = await prisma.salesOrder.findMany({
      where: filter,
      include: {
        customer: true,
        createdBy: true,
        detail: {
          include: {
            mobil: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(data)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: error.message
    })
  }
}

// =============================
// GET BY ID
// =============================
exports.findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const data = await prisma.salesOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        createdBy: true,
        detail: {
          include: {
            mobil: true
          }
        }
      }
    })

    if (!data) {
      return res.status(404).json({
        message: "Sales Order tidak ditemukan"
      })
    }

    res.json(data)

  } catch (error) {
    console.error("❌ GET ONE SO ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// =============================
// UPDATE STATUS
// =============================
exports.updateStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { status } = req.body

    const so = await prisma.salesOrder.findUnique({
      where: { id },
      include: { detail: true }
    })

    if (!so) {
      return res.status(404).json({
        message: "Sales Order tidak ditemukan"
      })
    }

    const result = await prisma.$transaction(async (tx) => {

      // jika APPROVED → kurangi stok
      if (status === "APPROVED" && so.status !== "APPROVED") {

        for (const item of so.detail) {

          await tx.mobil.update({
            where: { id: item.mobilId },
            data: {
              stok: {
                decrement: item.qty
              }
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

      return await tx.salesOrder.update({
        where: { id },
        data: { status }
      })

    })

    res.json(result)

  } catch (error) {
    console.error("❌ UPDATE STATUS ERROR:", error)
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

    if (so?.penjualan) {
      return res.status(400).json({
        message: "SO sudah dipakai Penjualan, tidak bisa dihapus"
      })
    }

    await prisma.salesOrder.delete({
      where: { id }
    })

    res.json({
      message: "Sales Order berhasil dihapus"
    })

  } catch (error) {
    console.error("❌ DELETE SO ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}
