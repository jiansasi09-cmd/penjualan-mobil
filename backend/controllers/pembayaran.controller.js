const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL
exports.getAll = async (req, res) => {
  const data = await prisma.pembayaran.findMany({
    orderBy: { tanggal: 'desc' }
  })
  res.json(data)
}

// CREATE
exports.create = async (req, res) => {
  const pembayaran = await prisma.pembayaran.create({
    data: req.body
  })
  res.status(201).json(pembayaran)
}
