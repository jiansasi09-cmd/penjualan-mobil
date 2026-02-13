const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ================= GET ALL =================
exports.getAll = async (req, res) => {
  try {

    const data = await prisma.pembayaran.findMany({
      include: {
        penjualan: true
      },
      orderBy: {
        tanggal: 'desc'
      }
    })

    res.json(data)

  } catch (error) {

    console.error("GET PEMBAYARAN ERROR:", error)

    res.status(500).json({
      message: "Gagal mengambil pembayaran"
    })

  }
}


// ================= GET BY ID =================
exports.getById = async (req, res) => {

  try {

    const { id } = req.params

    const data = await prisma.pembayaran.findUnique({
      where: { id: Number(id) },
      include: {
        penjualan: true
      }
    })

    if (!data) {
      return res.status(404).json({
        message: "Pembayaran tidak ditemukan"
      })
    }

    res.json(data)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: "Gagal mengambil detail pembayaran"
    })

  }

}


// ================= CREATE =================
exports.create = async (req, res) => {

  try {

    const { penjualanId, jumlah, metode } = req.body

    if (!penjualanId || !jumlah) {
      return res.status(400).json({
        message: "penjualanId dan jumlah wajib"
      })
    }

    const result = await prisma.$transaction(async (tx) => {

      // cek penjualan
      const penjualan = await tx.penjualan.findUnique({
        where: { id: Number(penjualanId) },
        include: { pembayaran: true }
      })

      if (!penjualan) {
        throw new Error("Penjualan tidak ditemukan")
      }

      // buat pembayaran
      const pembayaran = await tx.pembayaran.create({
        data: {
          penjualanId: Number(penjualanId),
          jumlah: Number(jumlah),
          metode,
          tanggal: new Date()
        }
      })

      // hitung total pembayaran
      const totalBayar =
        penjualan.pembayaran.reduce((sum, p) => sum + p.jumlah, 0)
        + Number(jumlah)

      // tentukan status
      let status = "UNPAID"

      if (totalBayar >= penjualan.total) {
        status = "PAID"
      }
      else if (totalBayar > 0) {
        status = "PARTIAL"
      }

      // update status penjualan
      await tx.penjualan.update({
        where: { id: Number(penjualanId) },
        data: { status }
      })

      return pembayaran

    })

    res.status(201).json(result)

  } catch (error) {

    console.error("CREATE PEMBAYARAN ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }

}


// ================= DELETE =================
exports.delete = async (req, res) => {

  try {

    const { id } = req.params

    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id: Number(id) }
    })

    if (!pembayaran) {
      return res.status(404).json({
        message: "Pembayaran tidak ditemukan"
      })
    }

    await prisma.$transaction(async (tx) => {

      await tx.pembayaran.delete({
        where: { id: Number(id) }
      })

      // cek ulang total pembayaran
      const penjualan = await tx.penjualan.findUnique({
        where: { id: pembayaran.penjualanId },
        include: { pembayaran: true }
      })

      const totalBayar =
        penjualan.pembayaran.reduce((sum, p) => sum + p.jumlah, 0)

      let status = "UNPAID"

      if (totalBayar >= penjualan.total) {
        status = "PAID"
      }
      else if (totalBayar > 0) {
        status = "PARTIAL"
      }

      await tx.penjualan.update({
        where: { id: pembayaran.penjualanId },
        data: { status }
      })

    })

    res.json({
      message: "Pembayaran berhasil dihapus"
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: error.message
    })

  }

}
