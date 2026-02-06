const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  res.json(await prisma.sales.findMany())
}

exports.getById = async (req, res) => {
  res.json(
    await prisma.sales.findUnique({
      where: { id: Number(req.params.id) }
    })
  )
}

exports.create = async (req, res) => {
  res.status(201).json(
    await prisma.sales.create({
      data: req.body
    })
  )
}

exports.update = async (req, res) => {
  res.json(
    await prisma.sales.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
  )
}

exports.remove = async (req, res) => {
  res.json(
    await prisma.sales.delete({
      where: { id: Number(req.params.id) }
    })
  )
}
