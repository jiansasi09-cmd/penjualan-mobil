const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ==========================
// GET ALL STOCK
// ==========================
exports.getAllStock = async (req, res) => {
  try {
    const stock = await prisma.mobil.findMany({
      select: {
        id: true,
        nama: true,
        merk: true,
        tipe: true,
        tahun: true, // ✅ TAMBAH
        warna: true, // ✅ TAMBAH
        stok: true
      },
      orderBy: { nama: 'asc' }
    })

    res.json(stock)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil data stok' })
  }
}
exports.getStockMutations = async (req, res) => {
  try {
    const { mobilId } = req.params

    const mutations = await prisma.stockMutation.findMany({
      where: {
        mobilId: Number(mobilId)
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(mutations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal ambil mutasi stok' })
  }
}
