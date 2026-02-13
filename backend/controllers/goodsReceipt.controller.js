const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ===============================
// GET ALL
// ===============================
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.goodsReceipt.findMany({
      include: {
        po: { include: { supplier: true } },
        items: { include: { mobil: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(data)
  } catch (err) {
    console.error('❌ GET GOODS RECEIPT ERROR:', err)
    res.status(500).json({ message: 'Gagal load goods receipt', error: err.message })
  }
}

// ===============================
// GET BY PO
// ===============================
exports.getByPO = async (req, res) => {
  try {
    const { poId } = req.params
    const data = await prisma.goodsReceipt.findMany({
      where: { poId: Number(poId) },
      include: { items: { include: { mobil: true } } }
    })
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil data PO' })
  }
}

// ===============================
// GET BY ID
// ===============================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) },
      include: {
        po: { include: { supplier: true, items: true } },
        items: { include: { mobil: true } }
      }
    })
    if (!data) return res.status(404).json({ message: 'Goods Receipt tidak ditemukan' })
    res.json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil detail GR' })
  }
}

// ===============================
// CREATE FROM PO
// ===============================
exports.createFromPO = async (req, res) => {
  const { poId } = req.params
  const { items } = req.body

  try {
    const count = await prisma.goodsReceipt.count()
    const kode = `GR-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Buat GR
      const gr = await tx.goodsReceipt.create({
        data: {
          kode,
          poId: Number(poId),
          status: 'DITERIMA',
          items: { create: items.map(i => ({ mobilId: i.mobilId, qtyTerima: i.qtyTerima })) }
        },
        include: { items: true }
      })

      // 2️⃣ Update stok & buat stock mutation
      for (const item of gr.items) {
        await tx.mobil.update({
          where: { id: item.mobilId },
          data: { stok: { increment: item.qtyTerima } }
        })
        await tx.stockMutation.create({
          data: {
            mobilId: item.mobilId,
            qty: item.qtyTerima,
            type: 'IN',
            reference: `GR-${gr.kode}`
          }
        })
      }

      return gr
    })

    res.status(201).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal membuat penerimaan barang' })
  }
}

// ===============================
// UPDATE
// ===============================
exports.update = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const { id } = req.params
    const { status, items } = req.body

    const existing = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) },
      include: { items: true }
    })

    if (!existing) {
      return res.status(404).json({
        message: 'Goods Receipt tidak ditemukan'
      })
    }

    const gr = await prisma.goodsReceipt.update({
      where: { id: Number(id) },
      data: {
        status
      }
    })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal update penerimaan barang' })
  }
}

// ===============================
// DELETE
// ===============================
exports.deleteGoodsReceipt = async (req, res) => {
  const { id } = req.params

  try {
    const { id } = req.params

    // cek data
    const existing = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) },
      include: { items: true }
    })
    if (!existing) return res.status(404).json({ message: 'Goods Receipt tidak ditemukan' })

    await prisma.$transaction(async (tx) => {
      // Kurangi stok jika GR sebelumnya diterima
      if (existing.status === 'DITERIMA') {
        for (const item of existing.items) {
          await tx.mobil.update({
            where: { id: item.mobilId },
            data: { stok: { decrement: item.qtyTerima } }
          })
          await tx.stockMutation.create({
            data: {
              mobilId: item.mobilId,
              qty: item.qtyTerima,
              type: 'OUT',
              reference: `DEL-GR-${existing.kode}`
            }
          })
        }
      }

      // Hapus item GR
      await tx.goodsReceiptItem.deleteMany({ where: { grId: Number(id) } })

      // Hapus GR
      await tx.goodsReceipt.delete({ where: { id: Number(id) } })
    })

    res.json({ message: 'Goods Receipt berhasil dihapus' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal hapus Goods Receipt' })
  }
}

