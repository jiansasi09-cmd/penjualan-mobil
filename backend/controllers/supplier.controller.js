const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ================= GET ALL SUPPLIER =================
exports.getAll = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        pembelian: {
          include: {
            detail: {
              include: {
                mobil: true
              }
            }
          }
        }
      }
    })

    res.json(suppliers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal mengambil data supplier' })
  }
}

// ================= GET SUPPLIER BY ID =================
// ================= GET SUPPLIER BY ID =================
exports.getById = async (req, res) => {

  try {

    const supplier = await prisma.supplier.findUnique({

      where: {
        id: Number(req.params.id)
      },

      include: {

        purchaseOrders: {

          include: {

            goodsReceipts: {

              include: {

                invoice: {

                  include: {

                    items: {

                      include: {
                        mobil: true
                      }

                    }

                  }

                }

              }

            }

          }

        }

      }

    })

    if (!supplier) {
      return res.status(404).json({
        message: 'Supplier tidak ditemukan'
      })
    }

    res.json(supplier)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Gagal mengambil detail supplier'
    })

  }

}

// ================= CREATE SUPPLIER =================
exports.create = async (req, res) => {
  try {
    const { nama, noTelp, alamat } = req.body

    if (!nama || !noTelp || !alamat) {
      return res.status(400).json({ message: 'Data supplier tidak lengkap' })
    }

    const supplier = await prisma.supplier.create({
      data: {
        nama,
        noTelp,
        alamat
      }
    })

    res.status(201).json(supplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal menambahkan supplier' })
  }
}

// ================= UPDATE SUPPLIER =================
exports.update = async (req, res) => {
  try {
    const { nama, noTelp, alamat } = req.body

    const supplier = await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: {
        nama,
        noTelp,
        alamat
      }
    })

    res.json(supplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal mengubah data supplier' })
  }
}

// ================= DELETE SUPPLIER =================
exports.remove = async (req, res) => {
  try {
    await prisma.supplier.delete({
      where: { id: Number(req.params.id) }
    })

    res.json({ message: 'Supplier berhasil dihapus' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal menghapus supplier' })
  }
}
