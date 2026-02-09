const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Ambil profile sendiri (customer login)
exports.getProfile = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.user.id }
    })

    if (!customer) {
      return res.status(404).json({ message: 'Customer tidak ditemukan' })
    }

    res.json(customer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengambil profile' })
  }
}

// Ambil semua customer (untuk admin)
exports.getAll = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(customers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengambil data customer' })
  }
}

// Ambil customer by ID (admin)
exports.getById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (!customer) return res.status(404).json({ message: 'Customer tidak ditemukan' })

    res.json(customer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengambil data customer' })
  }
}

// Update profile sendiri
exports.updateProfile = async (req, res) => {
  try {
    const { nama, noTelp, alamat } = req.body

    const customer = await prisma.customer.update({
      where: { id: req.user.id },
      data: { nama, noTelp, alamat }
    })

    res.json(customer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal mengupdate profile' })
  }
}
