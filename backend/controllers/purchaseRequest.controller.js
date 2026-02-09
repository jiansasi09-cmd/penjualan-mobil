const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET semua PR
exports.getAll = async (req, res) => {
  try {
    const prs = await prisma.purchaseRequest.findMany({
      include: {
        supplier: true,
        createdBy: true,
        items: { include: { mobil: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json(prs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil data PR' })
  }
}

// GET PR by ID
exports.getById = async (req, res) => {
  try {
    const pr = await prisma.purchaseRequest.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        supplier: true,
        createdBy: true,
        items: { include: { mobil: true } }
      }
    })
    if (!pr) return res.status(404).json({ message: 'PR tidak ditemukan' })
    res.json(pr)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil PR' })
  }
}

// CREATE PR
exports.create = async (req, res) => {
  try {
    const { supplierId, items } = req.body
    const prNumber = `PR-${Date.now()}`

    const pr = await prisma.purchaseRequest.create({
      data: {
        prNumber,
        supplierId,
        createdById: req.user.id,
        items: {
          create: items.map(i => ({
            mobilId: i.mobilId,
            qty: i.qty
          }))
        }
      },
      include: { items: true }
    })

    res.status(201).json(pr)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal buat PR' })
  }
}

// UPDATE PR (misal status / supplier)
exports.update = async (req, res) => {
  try {
    const { supplierId, status } = req.body
    const pr = await prisma.purchaseRequest.update({
      where: { id: Number(req.params.id) },
      data: { supplierId, status }
    })
    res.json(pr)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal update PR' })
  }
}

// DELETE PR
exports.delete = async (req, res) => {
  try {
    await prisma.purchaseRequest.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: 'PR berhasil dihapus' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal hapus PR' })
  }
}
exports.approvePR = async (req, res) => {
  try {
    const prId = Number(req.params.id)

    // Ambil PR dulu
    const pr = await prisma.purchaseRequest.findUnique({
      where: { id: prId }
    })

    if (!pr) {
      return res.status(404).json({ message: 'PR tidak ditemukan' })
    }

    if (pr.status !== 'PENDING') {
      return res.status(400).json({ message: 'PR sudah diproses sebelumnya' })
    }

    // Update status menjadi APPROVED
    const updatedPR = await prisma.purchaseRequest.update({
      where: { id: prId },
      data: { status: 'APPROVED' }
    })

    res.json({
      message: 'PR berhasil di-approve',
      pr: updatedPR
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal approve PR' })
  }
}
