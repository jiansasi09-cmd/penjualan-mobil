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
import Supplier from '@/views/admin/Supplier.vue'
import Pembelian from '@/views/admin/Pembelian.vue'
import Penjualan from '@/views/admin/Penjualan.vue'
import Pembayaran from '@/views/admin/Pembayaran.vue'
import MobilDetail from '@/views/admin/MobilDetail.vue'


// ================= CUSTOMER VIEWS =================
import MobilList from '@/views/customer/MobilList.vue'

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

      { path: 'supplier', name: 'admin-supplier', component: Supplier },

      { path: 'pembelian', name: 'admin-pembelian', component: Pembelian },
      { path: 'penjualan', name: 'admin-penjualan', component: Penjualan },
      { path: 'pembayaran', name: 'admin-pembayaran', component: Pembayaran },
      {path: 'mobil/detail/:id',name: 'admin-mobil-detail',component: MobilDetail
}

      
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
      { path: 'mobil', name: 'customer-mobil', component: MobilList }
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
