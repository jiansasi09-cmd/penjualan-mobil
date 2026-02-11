const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.goodsReceipt.findMany({
      include: {
        po: {
          include: {
            supplier: true
          }
        },
        items: {
          include: {
            mobil: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(data)
  } catch (err) {
    console.error('❌ GET GOODS RECEIPT ERROR:', err)
    res.status(500).json({
      message: 'Gagal load goods receipt',
      error: err.message
    })
  }
}



exports.getByPO = async (req, res) => {
  try {
    const { poId } = req.params
    const data = await prisma.goodsReceipt.findMany({
      where: { poId: Number(poId) },
      include: {
        items: { include: { mobil: true } }
      }
    })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data PO' })
  }
}

exports.getById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) },
      include: {
        po: true,
        items: { include: { mobil: true } }
      }
    })

    if (!data) {
      return res.status(404).json({ message: 'Goods Receipt tidak ditemukan' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil detail GR' })
  }
}

exports.createFromPO = async (req, res) => {
  try {
    const { poId } = req.params
    const { items } = req.body

    const count = await prisma.goodsReceipt.count()
    const kode = `GR-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`

    const goodsReceipt = await prisma.goodsReceipt.create({
      data: {
        kode,
        poId: Number(poId),
        status: 'DITERIMA',
        items: {
          create: items.map(i => ({
            mobilId: i.mobilId,
            qtyTerima: i.qtyTerima
          }))
        }
      },
      include: {
        po: true,
        items: { include: { mobil: true } }
      }
    })

    res.status(201).json(goodsReceipt)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal membuat penerimaan barang' })
  }
}
exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { status, items } = req.body

    const existing = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) }
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

    res.json(gr)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal update penerimaan barang' })
  }
}
exports.deleteGoodsReceipt = async (req, res) => {
  try {
    const { id } = req.params

    // cek data
    const existing = await prisma.goodsReceipt.findUnique({
      where: { id: Number(id) }
    })

    if (!existing) {
      return res.status(404).json({ message: 'Goods Receipt tidak ditemukan' })
    }

    // 🔥 HAPUS ITEM DULU
    await prisma.goodsReceiptItem.deleteMany({
      where: { grId: Number(id) }
    })

    // 🔥 BARU HAPUS GR
    await prisma.goodsReceipt.delete({
      where: { id: Number(id) }
    })

    res.json({ message: 'Goods Receipt berhasil dihapus' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal hapus Goods Receipt' })
  }
}

