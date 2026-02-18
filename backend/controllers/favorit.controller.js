const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.toggleFavorit = async (req, res) => {
  const { customerId, mobilId } = req.body

  if (!customerId || !mobilId) {
    return res.status(400).json({ error: "customerId dan mobilId wajib diisi" })
  }

  try {
    // cek dulu apakah sudah favorit
    const existing = await prisma.favorit.findUnique({
      where: {
        customerId_mobilId: {
          customerId,
          mobilId
        }
      }
    })

    let action
    if (existing) {
      // hapus favorit
      await prisma.favorit.delete({
        where: {
          customerId_mobilId: { customerId, mobilId }
        }
      })
      action = "removed"
    } else {
      // tambah favorit
      await prisma.favorit.create({
        data: { customerId, mobilId }
      })
      action = "added"
    }

    // kirim data terbaru supaya front-end bisa langsung update state
    const favoritBaru = await prisma.favorit.findMany({
      where: { customerId },
      include: { mobil: true }
    })

    res.json({ action, favorit: favoritBaru })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
exports.getFavorit = async (req, res) => {
  try {
    const customerId = req.body.customerId || 1 // sementara hardcode 1
    const favorit = await prisma.favorit.findMany({
      where: { customerId },
      include: { mobil: true }
    })
    res.json(favorit)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
