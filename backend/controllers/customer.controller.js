const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  res.json(await prisma.customer.findMany())
}
