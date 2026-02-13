const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ================= GET ALL PENJUALAN =================
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.penjualan.findMany({
      orderBy: { tanggal: 'desc' },
      include: {
        detail: {          // ambil detail item
          include: { mobil: true }
        },
        sales: true,
        user: true
      }
    })

    res.json(data)
  } catch (error) {
    console.error('❌ GET PENJUALAN ERROR:', error)
    res.status(500).json({ message: 'Gagal mengambil data penjualan' })
  }
}

// ================= CREATE PENJUALAN =================
exports.create = async (req, res) => {
  try {
    const { salesId, userId, detail, total } = req.body
    // detail = [{ mobilId, qty, harga }]

    if (!detail || detail.length === 0) {
      return res.status(400).json({ message: 'Detail penjualan tidak boleh kosong' })
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Buat Penjualan
      const penjualan = await tx.penjualan.create({
        data: {
          salesId,
          userId,
          total
        }
      })

      // 2️⃣ Loop setiap item
      for (const item of detail) {
        const subtotal = item.qty * item.harga

        // Insert ke DetailPenjualan
        await tx.detailPenjualan.create({
          data: {
            penjualanId: penjualan.id,
            mobilId: item.mobilId,
            qty: item.qty,
            harga: item.harga,
            subtotal
          }
        })

        // Kurangi stok mobil
        await tx.mobil.update({
          where: { id: item.mobilId },
          data: {
            stok: {
              decrement: item.qty
            }
          }
        })

        // Catat stock mutation
        await tx.stockMutation.create({
          data: {
            mobilId: item.mobilId,
            qty: item.qty,
            type: 'OUT',
            reference: `SALE-${penjualan.id}`
          }
        })
      }

      return penjualan
    })

    res.status(201).json({ message: 'Penjualan berhasil dibuat', penjualan: result })
  } catch (error) {
    console.error('❌ CREATE PENJUALAN ERROR:', error)
    res.status(500).json({ message: 'Gagal membuat penjualan' })
  }
}

// ================= GET DETAIL PENJUALAN =================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params

    const penjualan = await prisma.penjualan.findUnique({
      where: { id: Number(id) },
      include: {
        detail: { include: { mobil: true } },
        sales: true,
        user: true
      }
    })

    if (!penjualan) {
      return res.status(404).json({ message: 'Penjualan tidak ditemukan' })
    }

    res.json(penjualan)
  } catch (error) {
    console.error('❌ GET DETAIL PENJUALAN ERROR:', error)
    res.status(500).json({ message: 'Gagal mengambil detail penjualan' })
  }
}
