const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const sales = await prisma.sales.findMany()
    res.json(sales)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengambil data sales' })
  }
}

exports.getById = async (req, res) => {
  try {
    const sales = await prisma.sales.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!sales) return res.status(404).json({ message: 'Sales tidak ditemukan' })
    res.json(sales)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengambil sales' })
  }
}

exports.create = async (req, res) => {
  try {
    const { nama, noTelp, alamat } = req.body
    const sales = await prisma.sales.create({ data: { nama, noTelp, alamat } })
    res.status(201).json(sales)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal menambahkan sales' })
  }
}

exports.update = async (req, res) => {
  try {
    const { nama, noTelp, alamat } = req.body
    const sales = await prisma.sales.update({
      where: { id: Number(req.params.id) },
      data: { nama, noTelp, alamat }
    })
    res.json(sales)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengubah sales' })
  }
}

exports.remove = async (req, res) => {
  try {
    await prisma.sales.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: 'Sales berhasil dihapus' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal menghapus sales' })
  }
}
