const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ================= GET ALL PENJUALAN =================
// ================= GET ALL PENJUALAN =================
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.penjualan.findMany({
      orderBy: { tanggal: 'desc' },
      include: {
        sales: true,
        user: true,

        salesOrder: {
          include: {
            customer: true
          }
        },

        detail: {
          include: {
            mobil: true
          }
        },

        pembayaran: {
          include: {
            user: true // ✅ penting jika ada relasi user di pembayaran
          },
          orderBy: {
            tanggal: 'desc'
          }
        }
      }
    })

    res.json(data)

  } catch (error) {
    console.error('❌ GET PENJUALAN ERROR FULL:', error)

    res.status(500).json({
      message: error.message
    })
  }
}


// ================= GET DETAIL PENJUALAN =================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params

    const penjualan = await prisma.penjualan.findUnique({
      where: { id: Number(id) },
      include: {
        sales: true,
        user: true,

        salesOrder: {
          include: {
            customer: true
          }
        },

        detail: {
          include: {
            mobil: true
          }
        },

        pembayaran: {
          include: {
            user: true
          },
          orderBy: {
            tanggal: 'desc'
          }
        }
      }
    })

    if (!penjualan) {
      return res.status(404).json({
        message: 'Penjualan tidak ditemukan'
      })
    }

    res.json(penjualan)

  } catch (error) {
    console.error('❌ GET DETAIL PENJUALAN ERROR:', error)

    res.status(500).json({
      message: error.message
    })
  }
}


// ================= CREATE PENJUALAN =================
exports.create = async (req, res) => {
  try {
    let { salesId, userId, detail, salesOrderId } = req.body

    if (!detail || detail.length === 0) {
      return res.status(400).json({ message: 'Detail penjualan tidak boleh kosong' })
    }

    const result = await prisma.$transaction(async (tx) => {
      // cek sales order
      if (salesOrderId) {
        const so = await tx.salesOrder.findUnique({ where: { id: salesOrderId } })
        if (!so) throw new Error('Sales Order tidak ditemukan')
        if (so.status !== 'APPROVED') throw new Error('Sales Order belum di-APPROVE')
        if (!salesId) salesId = so.salesId
      }

      // validasi stok
      for (const item of detail) {
        const mobil = await tx.mobil.findUnique({ where: { id: item.mobilId } })
        if (!mobil) throw new Error(`Mobil ID ${item.mobilId} tidak ditemukan`)
        if (mobil.stok < item.qty) throw new Error(`Stok mobil ${mobil.nama} tidak cukup`)
      }

      // hitung total
      const total = detail.reduce((sum, i) => sum + i.qty * i.harga, 0)

      // buat penjualan
      const penjualan = await tx.penjualan.create({
        data: {
          salesId,
          userId,
          total,
          salesOrderId: salesOrderId || undefined,
          nomor: `SALE-${Date.now()}`
        }
      })

      // buat detail, update stok, catat stock mutation
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
          data: { stok: { decrement: item.qty } }
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

      // update status SO menjadi SELESAI jika ada
      if (salesOrderId) {
        await tx.salesOrder.update({
          where: { id: salesOrderId },
          data: { status: 'SELESAI' }
        })
      }

      return penjualan
    })

    res.status(201).json({ message: 'Penjualan berhasil dibuat', penjualan: result })
  } catch (error) {
    console.error('❌ CREATE PENJUALAN ERROR:', error)
    res.status(500).json({ message: error.message || 'Gagal membuat penjualan' })
  }
}

// ================= EDIT / UPDATE PENJUALAN =================
// ================= EDIT / UPDATE PENJUALAN =================
exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const penjualanId = Number(id)

    let { salesId, userId, detail, salesOrderId } = req.body


    const existing = await prisma.penjualan.findUnique({
      where: { id: penjualanId }
    })

    if (!existing) {
      return res.status(404).json({ message: 'Penjualan tidak ditemukan' })
    }

    if (!detail || detail.length === 0) {
      return res.status(400).json({ message: 'Detail penjualan tidak boleh kosong' })
    }

    if (!salesId) {
      return res.status(400).json({ message: 'Sales wajib dipilih' })
    }

    const result = await prisma.$transaction(async (tx) => {

      // ================= KEMBALIKAN STOK LAMA =================
      const oldDetails = await tx.detailPenjualan.findMany({
        where: { penjualanId }
      })

      for (const d of oldDetails) {
        await tx.mobil.update({
          where: { id: d.mobilId },
          data: { stok: { increment: d.qty } }
        })

        await tx.stockMutation.deleteMany({
          where: {
            reference: existing.nomor,
            mobilId: d.mobilId
          }
        })
      }

      // ================= HAPUS DETAIL LAMA =================
      await tx.detailPenjualan.deleteMany({
        where: { penjualanId }
      })

      // ================= VALIDASI STOK BARU =================
      for (const item of detail) {
        const mobil = await tx.mobil.findUnique({
          where: { id: item.mobilId }
        })

        if (!mobil) {
          throw new Error(`Mobil ID ${item.mobilId} tidak ditemukan`)
        }

        if (mobil.stok < item.qty) {
          throw new Error(`Stok mobil ${mobil.nama} tidak cukup`)
        }
      }

      // ================= HITUNG TOTAL =================
      const total = detail.reduce((sum, i) => sum + i.qty * i.harga, 0)

      // ================= UPDATE PENJUALAN =================
      const penjualan = await tx.penjualan.update({
        where: { id: penjualanId },
        data: {
          salesId,
          total,
          salesOrderId: salesOrderId || undefined,
          ...(userId ? { userId } : {}) // hanya update jika ada
        }
      })

      // ================= BUAT DETAIL BARU =================
      for (const item of detail) {
        const subtotal = item.qty * item.harga

        await tx.detailPenjualan.create({
          data: {
            penjualanId: penjualan.id,
            mobilId: item.mobilId,
            qty: item.qty,
            harga: item.harga,
            subtotal
          }
        })

        await tx.mobil.update({
          where: { id: item.mobilId },
          data: { stok: { decrement: item.qty } }
        })

        await tx.stockMutation.create({
          data: {
            mobilId: item.mobilId,
            qty: item.qty,
            type: 'OUT',
            reference: existing.nomor
          }
        })
      }

      return penjualan
    })

    res.json({
      message: 'Penjualan berhasil diperbarui',
      penjualan: result
    })

  } catch (error) {
    console.error('❌ UPDATE PENJUALAN ERROR:', error)
    res.status(500).json({
      message: error.message || 'Gagal memperbarui penjualan'
    })
  }
}


// ================= DELETE PENJUALAN =================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params
    const penjualan = await prisma.penjualan.findUnique({ where: { id: Number(id) } })
    if (!penjualan) return res.status(404).json({ message: 'Penjualan tidak ditemukan' })

    await prisma.$transaction(async (tx) => {
      const details = await tx.detailPenjualan.findMany({ where: { penjualanId: id } })
      for (const d of details) {
        await tx.mobil.update({
          where: { id: d.mobilId },
          data: { stok: { increment: d.qty } }
        })
        await tx.stockMutation.deleteMany({ where: { reference: penjualan.nomor, mobilId: d.mobilId } })
      }

      await tx.detailPenjualan.deleteMany({ where: { penjualanId: id } })
      await tx.penjualan.delete({ where: { id: Number(id) } })
    })

    res.json({ message: 'Penjualan berhasil dihapus' })
  } catch (error) {
    console.error('❌ DELETE PENJUALAN ERROR:', error)
    res.status(500).json({ message: error.message || 'Gagal menghapus penjualan' })
  }
}
