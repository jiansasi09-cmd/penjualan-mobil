const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(customers)
  } catch (err) {
    console.error('GET CUSTOMERS ERROR:', err)
    res.status(500).json({ message: 'Gagal mengambil data customer' })
  }
}

exports.getById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) }
    })

    if (!customer) {
      return res.status(404).json({ message: 'Customer tidak ditemukan' })
    }

    res.json(customer)
  } catch (err) {
    console.error('GET CUSTOMER DETAIL ERROR:', err)
    res.status(500).json({ message: 'Gagal mengambil detail customer' })
  }
}
