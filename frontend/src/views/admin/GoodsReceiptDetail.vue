<template>
  <div>
    <div class="flex items-center mb-4">
      <button
        @click="goBack"
        class="mr-3 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>

      <h1 class="text-xl font-bold">Detail Penerimaan</h1>
    </div>

    <p><b>PO :</b> {{ gr.po?.kode || '-' }}</p>
    <p><b>Tanggal :</b> {{ formatDate(gr.tanggal) }}</p>

    <table class="w-full border mt-4">
      <thead>
        <tr>
          <th class="border p-2">Mobil</th>
          <th class="border p-2">Qty</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in gr.items" :key="item.id">
          <td class="border p-2">{{ item.mobil.nama }}</td>
          <td class="border p-2">{{ item.qtyTerima }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsReceiptById } from '@/services/goodsReceipt.service'

const route = useRoute()
const router = useRouter()

const gr = ref({
  po: null,
  items: []
})

const load = async () => {
  gr.value = await getGoodsReceiptById(route.params.id)
}

const goBack = () => {
  router.back()
}

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('id-ID') : '-'

onMounted(load)

</script>
