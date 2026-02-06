const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  const data = await prisma.pembelian.findMany({
    orderBy: { tanggal: 'desc' }
  })
  res.json(data)
}

exports.create = async (req, res) => {
  const pembelian = await prisma.pembelian.create({
    data: req.body
  })
  res.status(201).json(pembelian)
}
