import { createRouter, createWebHistory } from 'vue-router'

// ================= LAYOUTS =================
import AdminLayout from '@/layouts/AdminLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

// ================= AUTH =================
import Login from '@/views/auth/Login.vue'

// ================= ADMIN VIEWS =================
import AdminDashboard from '@/views/admin/Dashboard.vue'
import Mobil from '@/views/admin/Mobil.vue'
import MobilAdd from '@/views/admin/MobilAdd.vue'
import MobilEdit from '@/views/admin/MobilEdit.vue'
import Sales from '@/views/admin/Sales.vue'
import SalesAdd from '@/views/admin/SalesAdd.vue'
import EditSales from '@/views/admin/SalesEdit.vue'
import Supplier from '@/views/admin/Supplier.vue'
import Pembelian from '@/views/admin/Pembelian.vue'
import Penjualan from '@/views/admin/Penjualan.vue'
import PenjualanCreate from '@/views/admin/PenjualanCreate.vue'
import PenjualanEdit from '@/views/admin/PenjualanEdit.vue'
import PenjualanDetail from '@/views/admin/PenjualanDetail.vue'
import Pembayaran from '@/views/admin/Pembayaran.vue'
import PembayaranCreate from '@/views/admin/PembayaranCreate.vue'
import PembayaranDetail from '@/views/admin/PembayaranDetail.vue'
import MobilDetail from '@/views/admin/MobilDetail.vue'
import SupplierAdd from '@/views/admin/SupplierAdd.vue'
import SupplierDetail from '@/views/admin/SupplierDetail.vue'
import SupplierEdit from '@/views/admin/SupplierEdit.vue'
import Register from '@/views/auth/Register.vue'
import Customer from '@/views/admin/Customer.vue'
import CustomerDetail from '@/views/admin/CustomerDetail.vue'
import CustomerProfile from '@/views/customer/Profile.vue'
import CustomerEdit from '@/views/customer/CustomerEdit.vue'
import PurchaseRequest from '@/views/admin/PurchaseRequest.vue'
import PurchaseRequestAdd from '@/views/admin/PurchaseRequestAdd.vue'
import PurchaseRequestEdit from '@/views/admin/PurchaseRequestEdit.vue'
import PurchaseOrder from '@/views/admin/PurchaseOrder.vue'
import PurchaseOrderAdd from '@/views/admin/PurchaseOrderAdd.vue'
import PurchaseOrderEdit from '@/views/admin/PurchaseOrderEdit.vue'
// ================= GOODS RECEIPT =================
import GoodsReceiptIndex from '@/views/admin/GoodsReceiptIndex.vue'
import GoodsReceiptCreate from '@/views/admin/GoodsReceiptCreate.vue'
import GoodsReceiptDetail from '@/views/admin/GoodsReceiptDetail.vue'
import GoodsReceiptEdit from '@/views/admin/GoodsReceiptEdit.vue'
// ================= PURCHASE INVOICE =================
import PurchaseInvoiceIndex from '@/views/admin/PurchaseInvoiceIndex.vue'
import PurchaseInvoiceCreate from '@/views/admin/PurchaseInvoiceCreate.vue'
import PurchaseInvoiceDetail from '@/views/admin/PurchaseInvoiceDetail.vue'

import ReportPenjualan from '@/views/admin/ReportPenjualan.vue'
import ReportPenjualanDetail from '@/views/admin/ReportPenjualanDetail.vue'
import ReportPembelian from '@/views/admin/ReportPembelian.vue'
import ReportPembelianDetail from '@/views/admin/ReportPembelianDetail.vue'
import ReportStok from '@/views/admin/ReportStok.vue'
import ReportStokDetail from '@/views/admin/ReportStokDetail.vue'




// ================= CUSTOMER VIEWS =================
import MobilList from '@/views/customer/MobilList.vue'
import SalesEdit from '../views/admin/SalesEdit.vue'

// ================= INVENTORY =================
import Stock from '@/views/admin/Stock.vue'
import MutasiStok from '@/views/admin/MutasiStok.vue'
import MutationAdd from '@/views/admin/MutationAdd.vue'
import MutationEdit from '@/views/admin/MutationEdit.vue'
import MutationDetail from '@/views/admin/MutationDetail.vue'

// ================= ADMIN VIEWS =================
import SalesOrder from '@/views/admin/SalesOrder.vue'
import SalesOrderAdd from '@/views/admin/SalesOrderAdd.vue'
import SalesOrderEdit from '@/views/admin/SalesOrderEdit.vue'
import SalesOrderDetail from '@/views/admin/SalesOrderDetail.vue'

const routes = [
  // ================= ROOT REDIRECT =================
  {
    path: '/',
    redirect: () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')

      if (token && ['ADMIN', 'SALES', 'OWNER'].includes(role)) {
        return '/admin/dashboard'
      }
      if (token && role === 'CUSTOMER') {
        return '/customer/mobil'
      }
      return '/login'
    }
  },

  // ================= AUTH =================
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },

  // ================= ADMIN =================
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'SALES', 'OWNER']
    },
    children: [
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboard },

      { path: 'mobil', name: 'admin-mobil', component: Mobil },
      { path: 'mobil/add', name: 'admin-mobil-add', component: MobilAdd },
      { path: 'mobil/edit/:id', name: 'admin-mobil-edit', component: MobilEdit },

      { path: 'sales', name: 'admin-sales', component: Sales },
      { path: 'sales/add', name: 'admin-sales-add', component: SalesAdd },
      {path: 'sales/edit/:id',name: 'admin-sales-edit',component: SalesEdit},
      
      {path: 'supplier',name: 'admin-supplier',component: Supplier},
      {path: 'supplier/add',name: 'admin-supplier-add',component: SupplierAdd},
      {path: 'supplier/detail/:id',name: 'admin-supplier-detail',component: SupplierDetail,props: true},
      {path: 'supplier/edit/:id',name: 'admin-supplier-edit',component: SupplierEdit,props: true},

      {path: 'customer',name: 'admin-customer',component: Customer},
      {path: 'customer/detail/:id',name: 'admin-customer-detail',component: CustomerDetail},

      { path: 'pembelian', name: 'admin-pembelian', component: Pembelian },
      { path: 'penjualan', name: 'admin-penjualan', component: Penjualan },
      {path: '/admin/penjualan',name: 'Penjualan',component: Penjualan},
      { path: 'penjualan/create', name: 'PenjualanCreate', component: PenjualanCreate }, // tambah penjualan
      { path: 'penjualan/:id', name: 'PenjualanDetail', component: PenjualanDetail },    // detail penjualan
      { path: 'penjualan/:id/edit', name: 'PenjualanEdit', component: PenjualanEdit },   // edit penjualan
  
      { path: 'pembayaran', name: 'admin-pembayaran', component: Pembayaran },
      {path: '/admin/pembayaran',component: Pembayaran},
      {path: '/admin/pembayaran/create',component: PembayaranCreate},
      {path: '/admin/pembayaran/:id',component: PembayaranDetail},
      {path: 'mobil/detail/:id',name: 'admin-mobil-detail',component: MobilDetail},

      {path: 'purchase-request',name: 'admin-purchase-request',component: PurchaseRequest},
      {path: 'purchase-request/add',name: 'admin-purchase-request-add',component: PurchaseRequestAdd},
      {path: 'purchase-request/edit/:id',name: 'admin-purchase-request-edit', component: PurchaseRequestEdit,props: true},

      // ================= PURCHASE ORDER =================
      {path: 'purchase-order',name: 'admin-purchase-order',component: PurchaseOrder},
      {path: 'purchase-order/add',name: 'admin-purchase-order-add',component: PurchaseOrderAdd},
      {path: 'purchase-order/edit/:id',name: 'admin-purchase-order-edit',component: PurchaseOrderEdit,props: true},

      {path: 'goods-receipt',name: 'GoodsReceiptIndex',component: GoodsReceiptIndex},
      {path: 'goods-receipt/create',name: 'GoodsReceiptCreate',component: GoodsReceiptCreate},
      {path: 'goods-receipt/detail/:id',name: 'GoodsReceiptDetail', component: GoodsReceiptDetail},
      {path: 'goods-receipt/edit/:id',name: 'GoodsReceiptEdit',component: GoodsReceiptEdit},

      {path: '/admin/purchase-invoice',name: 'PurchaseInvoiceIndex',component: PurchaseInvoiceIndex},
      {path: '/admin/purchase-invoice/create/:grId',name: 'PurchaseInvoiceCreate',component: PurchaseInvoiceCreate},
      {path: '/admin/purchase-invoice/detail/:id',name: 'PurchaseInvoiceDetail',component: PurchaseInvoiceDetail},

      // ================= INVENTORY =================
      { path: 'stock',ame: 'Stock',component: Stock,meta: { title: 'Stok Mobil', menu: 'Inventory' }},
      { path: 'mutasi-stok',name: 'MutasiStok',component: MutasiStok,meta: { title: 'Mutasi Stok', menu: 'Inventory' }},
      { path: 'mutation/add',name: 'MutationAdd',component: MutationAdd},
      { path: 'mutation/edit/:id',name: 'MutationEdit',component: MutationEdit},
      { path: 'mutation/detail/:id',name: 'MutationDetail',component: MutationDetail},

      {path: 'sales-order',component: SalesOrder},
      {path: 'sales-order/create',component: SalesOrderAdd},
      {path: 'sales-order',component: SalesOrder},
      {path: 'sales-order/create',component: SalesOrderAdd},
      {path: 'sales-order/:id',component: SalesOrderDetail},
      {path: 'sales-order/:id/edit',component: SalesOrderEdit},

      {path: '/admin/report/penjualan',name: 'ReportPenjualan',component: ReportPenjualan},
      {path: '/admin/report/penjualan/:id',name: 'ReportPenjualanDetail',component: ReportPenjualanDetail,props: true},
      {path: '/admin/report/pembelian',name: 'ReportPembelian',component: ReportPembelian},
      {path: '/admin/report/pembelian/:id',component: ReportPembelianDetail},
      {path: '/admin/report/stok',component: ReportStok},
      {path: '/admin/report/stok/:id',component: ReportStokDetail}

    ]
  },

  // ================= CUSTOMER =================
  {
    path: '/customer',
    component: CustomerLayout,
    meta: {
      requiresAuth: true,
      role: 'CUSTOMER'
    },
    children: [
      { path: 'mobil', name: 'customer-mobil', component: MobilList },
      {path: 'profile',name: 'customer-profile',component: CustomerProfile},
      { path: 'profile/edit/:id', name: 'customer-profile-edit', component: CustomerEdit }
    ]
  },

  // ================= FALLBACK =================
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ================= GLOBAL AUTH GUARD =================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next('/login')
  }

  if (to.meta.role && to.meta.role !== role) {
    return next('/login')
  }

  next()
})

export default router
