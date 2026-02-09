exports.getProfile = async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: { id: req.user.id }
  })
  res.json(customer)
}

exports.getAll = async (req, res) => {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' }
  })
  res.json(customers)
}

exports.getById = async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: { id: Number(req.params.id) }
  })

  if (!customer) {
    return res.status(404).json({ message: 'Customer tidak ditemukan' })
  }

  res.json(customer)
}
