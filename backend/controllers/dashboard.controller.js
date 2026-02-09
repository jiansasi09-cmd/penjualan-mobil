const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getDashboard = async (req, res) => {
  try {
    // ======================
    // SUMMARY STATS
    // ======================
    const [
      mobil,
      sales,
      penjualanHariIni,
      invoiceOutstanding
    ] = await Promise.all([
      prisma.mobil.count({
        where: { stok: { gt: 0 } }
      }),
      prisma.sales.count({
        where: { aktif: true }
      }),
      prisma.penjualan.count({
        where: {
          tanggal: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.invoice.count({
        where: { status: 'BELUM_LUNAS' }
      })
    ])

    // ======================
    // ACTION REQUIRED
    // ======================
    const [
      pendingPR,
      unreceivedPO,
      unpaidInvoice,
      lowStock
    ] = await Promise.all([
      prisma.purchaseRequest.count({
        where: { status: 'PENDING' }
      }),
      prisma.purchaseOrder.count({
        where: { status: 'DRAFT' } // ✅ ganti 'AKTIF' jadi 'DRAFT'
      }),
      prisma.invoice.count({
        where: { status: 'BELUM_LUNAS' }
      }),
      prisma.mobil.count({
        where: { stok: { lte: 2 } }
      })
    ])

    // ======================
    // PURCHASING STATUS
    // ======================
    const purchasing = {
      pr_pending: pendingPR,
      po_draft: unreceivedPO, // ganti key biar jelas
      invoice_open: unpaidInvoice
    }

    // ======================
    // INVENTORY ALERT
    // ======================
    const lowStockItems = await prisma.mobil.findMany({
      where: { stok: { lte: 2 } },
      select: {
        id: true,
        nama: true,
        stok: true
      }
    })

    // ======================
    // ACTIVITY LOG (simple MVP)
    // ======================
    const activities = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        message: true,
        createdAt: true
      }
    })

    // ======================
    // RESPONSE
    // ======================
    res.json({
      stats: {
        mobil,
        sales,
        penjualan_hari_ini: penjualanHariIni,
        invoice_outstanding: invoiceOutstanding
      },

      actions: {
        pending_pr: pendingPR,
        unreceived_po: unreceivedPO,
        unpaid_invoice: unpaidInvoice,
        low_stock: lowStock
      },

      purchasing,

      inventory: {
        low_stock: lowStockItems
      },

      activities: activities.map(log => ({
        id: log.id,
        message: log.message,
        time: log.createdAt
      }))
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({
      message: 'Gagal mengambil data dashboard'
    })
  }
}
