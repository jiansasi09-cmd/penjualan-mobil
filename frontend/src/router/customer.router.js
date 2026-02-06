import CustomerLayout from '@/layouts/CustomerLayout.vue'

import CustomerLogin from '@/views/customer/Login.vue'
import CustomerRegister from '@/views/customer/Register.vue'
import CustomerMobil from '@/views/customer/MobilList.vue'
import CustomerPesanan from '@/views/customer/Pesanan.vue'
import CustomerBooking from '@/views/customer/Booking.vue'
import CustomerFavorit from '@/views/customer/Favorit.vue'
import CustomerPembayaran from '@/views/customer/Pembayaran.vue'

export default [
  {
    path: '/customer',
    component: CustomerLayout,
    children: [
      // LOGIN & REGISTER
      { path: 'login', name: 'customer-login', component: CustomerLogin },
      { path: 'register', name: 'customer-register', component: CustomerRegister },

      // MASTER & TRANSAKSI CUSTOMER
      { path: 'mobil', name: 'customer-mobil', component: CustomerMobil, meta: { customerAuth: true } },
      { path: 'pesanan', name: 'customer-pesanan', component: CustomerPesanan, meta: { customerAuth: true } },
      { path: 'booking', name: 'customer-booking', component: CustomerBooking, meta: { customerAuth: true } },
      { path: 'favorit', name: 'customer-favorit', component: CustomerFavorit, meta: { customerAuth: true } },
      { path: 'pembayaran', name: 'customer-pembayaran', component: CustomerPembayaran, meta: { customerAuth: true } }
    ]
  }
]
