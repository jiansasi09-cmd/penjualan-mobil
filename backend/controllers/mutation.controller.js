const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ==========================
// GET ALL MUTATION
// ==========================
exports.getAllMutation = async (req, res) => {
  try {
    const mutations = await prisma.stockMutation.findMany({
      include: {
        mobil: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(mutations)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil data mutasi stok' })
  }
}

// ==========================
// CREATE MUTATION
// ==========================
exports.createMutation = async (req, res) => {
  try {
    const { mobilId, qty, type, reference } = req.body

    if (!['IN', 'OUT', 'ADJUSTMENT'].includes(type)) {
      return res.status(400).json({ message: 'Tipe mutasi salah' })
    }

    const qtyNumber = Number(qty)

    const mutation = await prisma.$transaction(async (tx) => {
      const mobil = await tx.mobil.findUnique({
        where: { id: Number(mobilId) }
      })

      if (!mobil) throw new Error('Mobil tidak ditemukan')

      let newStok = mobil.stok

      if (type === 'IN') newStok += qtyNumber
      if (type === 'OUT') newStok -= qtyNumber
      if (type === 'ADJUSTMENT') newStok = qtyNumber

      if (newStok < 0) throw new Error('Stok tidak boleh negatif')

      await tx.mobil.update({
        where: { id: Number(mobilId) },
        data: { stok: newStok }
      })

      return await tx.stockMutation.create({
        data: {
          mobilId: Number(mobilId),
          qty: qtyNumber,
          type,
          reference
        }
      })
    })

    res.status(201).json(mutation)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Gagal membuat mutasi stok',
      error: err.message
    })
  }
}

// ==========================
// UPDATE MUTATION
// ==========================
exports.updateMutation = async (req, res) => {
  try {
    const { id } = req.params
    const { qty, type, reference } = req.body
    const qtyNumber = Number(qty)

    const updated = await prisma.$transaction(async (tx) => {
      const sm = await tx.stockMutation.findUnique({
        where: { id: Number(id) }
      })

      if (!sm) throw new Error('Mutasi tidak ditemukan')

      const mobil = await tx.mobil.findUnique({
        where: { id: sm.mobilId }
      })

      let stok = mobil.stok

      // rollback lama
      if (sm.type === 'IN') stok -= sm.qty
      if (sm.type === 'OUT') stok += sm.qty
      if (sm.type === 'ADJUSTMENT') stok -= sm.qty

      // apply baru
      if (type === 'IN') stok += qtyNumber
      if (type === 'OUT') stok -= qtyNumber
      if (type === 'ADJUSTMENT') stok = qtyNumber

      if (stok < 0) throw new Error('Stok tidak boleh negatif')

      await tx.mobil.update({
        where: { id: sm.mobilId },
        data: { stok }
      })

      return await tx.stockMutation.update({
        where: { id: Number(id) },
        data: {
          qty: qtyNumber,
          type,
          reference
        }
      })
    })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Gagal update mutasi',
      error: err.message
    })
  }
}

// ==========================
// DELETE MUTATION
// ==========================
exports.deleteMutation = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.$transaction(async (tx) => {
      const sm = await tx.stockMutation.findUnique({
        where: { id: Number(id) }
      })

      if (!sm) throw new Error('Mutasi tidak ditemukan')

      const mobil = await tx.mobil.findUnique({
        where: { id: sm.mobilId }
      })

      let stok = mobil.stok

      if (sm.type === 'IN') stok -= sm.qty
      if (sm.type === 'OUT') stok += sm.qty
      if (sm.type === 'ADJUSTMENT') stok -= sm.qty

      if (stok < 0) throw new Error('Stok tidak boleh negatif')

      await tx.mobil.update({
        where: { id: sm.mobilId },
        data: { stok }
      })

      await tx.stockMutation.delete({
        where: { id: Number(id) }
      })
    })

    res.json({ message: 'Mutasi berhasil dihapus' })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Gagal hapus mutasi',
      error: err.message
    })
  }
}
exports.getMutationById = async (req, res) => {
  try {
    const { id } = req.params

    const mutation = await prisma.stockMutation.findUnique({
      where: { id: Number(id) },
      include: {
        mobil: true
      }
    })

    if (!mutation) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }

    res.json(mutation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

