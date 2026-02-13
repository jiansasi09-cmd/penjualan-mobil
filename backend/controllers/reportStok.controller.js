const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.mobil.findMany({
      select: { id:true,nama:true,merk:true,tipe:true,tahun:true,warna:true,harga:true,stok:true,status:true },
      orderBy: { nama: 'asc' }
    })
    res.json({ success: true, total: data.length, data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Gagal load report stok' })
  }
}

exports.getSummary = async (req, res) => {
  try {
    const totalMobil = await prisma.mobil.count()
    const totalUnit = await prisma.mobil.aggregate({ _sum: { stok: true } })
    const totalNilai = await prisma.mobil.aggregate({ _sum: { harga: true } })

    res.json({
      success: true,
      data: {
        totalMobil,
        totalUnit: totalUnit._sum.stok || 0,
        totalNilai: totalNilai._sum.harga || 0
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Gagal load summary stok' })
  }
}
