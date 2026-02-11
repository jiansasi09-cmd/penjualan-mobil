const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ============================
// CREATE PURCHASE INVOICE
// ============================
exports.create = async (req, res) => {
  try {
    const { grId, nomor } = req.body

    // 1️⃣ cek GR ada atau tidak
    const gr = await prisma.goodsReceipt.findUnique({
      where: { id: grId },
      include: {
        items: true,
        po: {
          include: {
            items: true
          }
        },
        invoice: true
      }
    })

    if (!gr) {
      return res.status(404).json({ message: 'Goods Receipt tidak ditemukan' })
    }

    // 2️⃣ cek apakah sudah ada invoice
    if (gr.invoice) {
      return res.status(400).json({ message: 'Invoice sudah dibuat untuk GR ini' })
    }

    // 3️⃣ mapping item dari GR
    const invoiceItems = gr.items.map(item => {
      // cari harga dari PO item
      const poItem = gr.po.items.find(p => p.mobilId === item.mobilId)

      const harga = poItem ? poItem.harga : 0
      const subtotal = harga * item.qtyTerima

      return {
        mobilId: item.mobilId,
        qty: item.qtyTerima,
        harga,
        subtotal
      }
    })

    const total = invoiceItems.reduce((sum, i) => sum + i.subtotal, 0)

    // 4️⃣ simpan invoice
    const invoice = await prisma.purchaseInvoice.create({
      data: {
        nomor,
        grId,
        total,
        items: {
          create: invoiceItems
        }
      },
      include: {
        items: true
      }
    })

    res.json(invoice)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal membuat Purchase Invoice' })
  }
}
// ============================
// GET ALL
// ============================
exports.findAll = async (req, res) => {
  try {
    const data = await prisma.purchaseInvoice.findMany({
      include: {
        gr: {
          include: {
            po: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data invoice' })
  }
}
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params

    const invoice = await prisma.purchaseInvoice.findUnique({
      where: { id: Number(id) },
      include: {
        gr: {
          include: {
            po: true
          }
        },
        items: {
          include: {
            mobil: true
          }
        }
      }
    })

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice tidak ditemukan' })
    }

    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil invoice' })
  }
}
exports.markAsPaid = async (req, res) => {
  try {
    const { id } = req.params

    const invoice = await prisma.purchaseInvoice.update({
      where: { id: Number(id) },
      data: {
        status: 'LUNAS'
      }
    })

    res.json(invoice)
  } catch (error) {
    res.status(500).json({
      message: 'Gagal update status invoice'
    })
  }
}
