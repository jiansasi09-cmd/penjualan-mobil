const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Ambil semua penjualan
exports.getAll = async (req, res) => {
  try {
    const penjualan = await prisma.penjualan.findMany({
      include: {
        detail: {
          include: {
            mobil: true
          }
        },
        salesOrder: {
          include: { customer: true }
        },
        sales: true,
        user: true
      },
      orderBy: { tanggal: 'desc' }
    })
    res.json({ status: 'success', data: penjualan })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// Ambil detail per penjualan
exports.getOne = async (req, res) => {
  const { id } = req.params
  try {
    const penjualan = await prisma.penjualan.findUnique({
      where: { id: parseInt(id) },
      include: {
        detail: {
          include: { mobil: true }
        },
        salesOrder: { include: { customer: true } },
        sales: true,
        user: true
      }
    })

    if (!penjualan) {
      return res.status(404).json({ status: 'error', message: 'Penjualan tidak ditemukan' })
    }

    res.json({ status: 'success', data: penjualan })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: err.message })
  }
}
