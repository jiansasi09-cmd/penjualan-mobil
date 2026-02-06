const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL
exports.getAll = async (req, res) => {
  const data = await prisma.penjualan.findMany({
    orderBy: { tanggal: 'desc' }
  })
  res.json(data)
}

// CREATE
exports.create = async (req, res) => {
  const penjualan = await prisma.penjualan.create({
    data: req.body
  })
  res.status(201).json(penjualan)
}
