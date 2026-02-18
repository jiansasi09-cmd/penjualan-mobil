const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// ===============================
// GET LAPORAN STOK (SEMUA MOBIL)
// ===============================
exports.getAll = async (req, res) => {

  try {

    const stok = await prisma.mobil.findMany({

      include: {
        stockMutations: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },

      orderBy: {
        nama: 'asc'
      }

    })

    res.json({
      status: 'success',
      data: stok
    })

  } catch (err) {

    console.error("ERROR REPORT STOK:", err)

    res.status(500).json({
      status: 'error',
      message: err.message
    })

  }

}



// ===============================
// GET DETAIL STOK MOBIL
// ===============================
exports.getOne = async (req, res) => {

  try {

    const id = parseInt(req.params.id)

    const mobil = await prisma.mobil.findUnique({

      where: { id },

      include: {
        stockMutations: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }

    })

    if (!mobil) {

      return res.status(404).json({
        status: 'error',
        message: 'Mobil tidak ditemukan'
      })

    }

    res.json({
      status: 'success',
      data: mobil
    })

  } catch (err) {

    console.error("ERROR DETAIL STOK:", err)

    res.status(500).json({
      status: 'error',
      message: err.message
    })

  }

}
