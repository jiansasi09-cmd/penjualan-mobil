const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL MOBIL
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.mobil.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal mengambil data mobil' })
  }
}

// CREATE MOBIL
exports.create = async (req, res) => {
  try {
    const {
      nama,
      merk,
      tipe,
      tahun,
      warna,
      kilometer,
      transmisi,
      bahan_bakar,
      harga,
      stok,
      status
    } = req.body

    if (
      !nama ||
      !merk ||
      !tipe ||
      tahun === undefined ||
      !warna ||
      kilometer === undefined ||
      !transmisi ||
      !bahan_bakar ||
      harga === undefined
    ) {
      return res.status(400).json({
        message: 'Field wajib tidak lengkap'
      })
    }

    const mobil = await prisma.mobil.create({
      data: {
        nama,
        merk,
        tipe,
        tahun: Number(tahun),
        warna,
        kilometer: Number(kilometer),
        transmisi,
        bahan_bakar,
        harga: Number(harga),
        stok: Number(stok ?? 0),
        status: status ?? 'READY'
      }
    })

    res.status(201).json(mobil)
  } catch (error) {
    console.error('PRISMA ERROR:', error)
    res.status(500).json({
      message: 'Gagal menambahkan mobil',
      error: error.message
    })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const mobil = await prisma.mobil.findUnique({
      where: { id }
    })

    if (!mobil) {
      return res.status(404).json({
        message: 'Mobil tidak ditemukan'
      })
    }

    res.json(mobil)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Gagal mengambil detail mobil'
    })
  }
}
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const {
      nama,
      merk,
      tipe,
      tahun,
      warna,
      kilometer,
      transmisi,
      bahan_bakar,
      harga,
      stok,
      status
    } = req.body

    const mobil = await prisma.mobil.update({
      where: { id },
      data: {
        nama,
        merk,
        tipe,
        tahun: Number(tahun),
        warna,
        kilometer: Number(kilometer),
        transmisi,
        bahan_bakar,
        harga: Number(harga),
        stok: Number(stok),
        status
      }
    })

    res.json(mobil)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message
    })
  }
}

exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.mobil.delete({
      where: { id }
    })

    res.json({ message: 'Mobil berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Gagal menghapus mobil'
    })
  }
}
