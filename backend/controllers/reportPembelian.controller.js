const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ======================================
// GET ALL PURCHASE INVOICE (REPORT)
// ======================================
exports.getAll = async (req, res) => {

  try {

    const invoices = await prisma.purchaseInvoice.findMany({

      include: {

        gr: {
          include: {

            po: {
              include: {
                supplier: true
              }
            }

          }
        },

        items: {
          include: {
            mobil: true
          }
        }

      },

      orderBy: {
        tanggal: 'desc'
      }

    })

    res.json({
      status: "success",
      data: invoices
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      status: "error",
      message: err.message
    })

  }

}


// ======================================
// GET DETAIL PURCHASE INVOICE
// ======================================
exports.getOne = async (req, res) => {

  try {

    const id = parseInt(req.params.id)

    const invoice = await prisma.purchaseInvoice.findUnique({

      where: { id },

      include: {

        gr: {
          include: {

            po: {
              include: {
                supplier: true
              }
            }

          }
        },

        items: {
          include: {
            mobil: true
          }
        }

      }

    })

    if (!invoice) {
      return res.status(404).json({
        status: "error",
        message: "Invoice tidak ditemukan"
      })
    }

    res.json({
      status: "success",
      data: invoice
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      status: "error",
      message: err.message
    })

  }

}
