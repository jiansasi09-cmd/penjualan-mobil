const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getProfile = async (req, res) => {
  try {
    const customerId = req.user.id

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        nama: true,
        email: true,
        noTelp: true,
        alamat: true,
        createdAt: true
      }
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
