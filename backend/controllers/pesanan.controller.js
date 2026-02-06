const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.create = async (req, res) => {
  res.status(201).json(await prisma.pesanan.create({ data: req.body }))
}
