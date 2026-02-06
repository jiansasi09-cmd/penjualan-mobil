import AdminLayout from '@/layouts/AdminLayout.vue'

// DASHBOARD
import Dashboard from '@/views/dashboard/Index.vue'

// MOBIL
import Mobil from '@/views/admin/Mobil.vue'           // halaman tabel mobil
import MobilAdd from '@/views/admin/MobilAdd.vue'     // halaman tambah mobil
import MobilEdit from '@/views/admin/MobilEdit.vue'   // halaman edit mobil

// CUSTOMER
import CustomerList from '@/views/customer/CustomerList.vue'
import CustomerForm from '@/views/customer/CustomerForm.vue'

// TRANSAKSI
import PenjualanList from '@/views/penjualan/PenjualanList.vue'
import PenjualanForm from '@/views/penjualan/PenjualanForm.vue'
import PembelianForm from '@/views/pembelian/PembelianForm.vue'

export default [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'ADMIN' },
    redirect: '/admin/dashboard',
    children: [
      // ================= DASHBOARD =================
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: Dashboard
      },

      // ================= MOBIL =================
      {
        path: 'mobil',
        name: 'admin-mobil',
        component: Mobil
      },
      {
        path: 'mobil/add',
        name: 'admin-mobil-add',
        component: MobilAdd
      },
      {
        path: 'mobil/edit/:id',
        name: 'admin-mobil-edit',
        component: MobilEdit,
        props: true
      },

      // ================= CUSTOMER =================
      {
        path: 'customer',
        name: 'admin-customer',
        component: CustomerList
      },
      {
        path: 'customer/tambah',
        name: 'admin-customer-tambah',
        component: CustomerForm
      },

      // ================= TRANSAKSI =================
      {
        path: 'penjualan',
        name: 'admin-penjualan',
        component: PenjualanList
      },
      {
        path: 'penjualan/tambah',
        name: 'admin-penjualan-tambah',
        component: PenjualanForm
      },
      {
        path: 'pembelian/tambah',
        name: 'admin-pembelian-tambah',
        component: PembelianForm
      }
    ]
  }
]
