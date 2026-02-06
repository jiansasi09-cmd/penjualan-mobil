const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAll = async (req, res) => {
  res.json(await prisma.supplier.findMany())
}

exports.getById = async (req, res) => {
  res.json(await prisma.supplier.findUnique({
    where: { id: Number(req.params.id) }
  }))
}

exports.create = async (req, res) => {
  res.status(201).json(
    await prisma.supplier.create({ data: req.body })
  )
}

exports.update = async (req, res) => {
  res.json(
    await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
  )
}

exports.remove = async (req, res) => {
  res.json(
    await prisma.supplier.delete({
      where: { id: Number(req.params.id) }
    })
  )
}
