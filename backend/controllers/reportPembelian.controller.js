const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.pembelian.findMany({
      include: { supplier: true, detail: { include: { mobil: true } } },
      orderBy: { tanggal: 'desc' }
    })
    res.json({ success: true, total: data.length, data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Gagal load report pembelian' })
  }
}

exports.getSummary = async (req, res) => {
  try {
    const totalTransaksi = await prisma.pembelian.count()
    const totalPembelian = await prisma.pembelian.aggregate({ _sum: { total: true } })

    res.json({
      success: true,
      data: {
        totalTransaksi,
        totalPembelian: totalPembelian._sum.total || 0
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Gagal load summary pembelian' })
  }
}
