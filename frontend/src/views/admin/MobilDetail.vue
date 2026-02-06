<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Detail Mobil</h1>

    <div v-if="mobil" class="grid grid-cols-2 gap-4">
      <DetailItem label="Nama" :value="mobil.nama" />
      <DetailItem label="Merk" :value="mobil.merk" />
      <DetailItem label="Tipe" :value="mobil.tipe" />
      <DetailItem label="Tahun" :value="mobil.tahun" />
      <DetailItem label="Warna" :value="mobil.warna" />
      <DetailItem label="Transmisi" :value="mobil.transmisi" />
      <DetailItem label="Bahan Bakar" :value="mobil.bahan_bakar" />
      <DetailItem label="Kilometer" :value="mobil.kilometer + ' KM'" />
      <DetailItem label="Harga" :value="formatRupiah(mobil.harga_jual)" />
      <DetailItem label="Stok" :value="mobil.stok" />
      <DetailItem label="Status" :value="mobil.status" />
    </div>

    <div class="mt-6">
      <button
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        @click="$router.back()"
      >
        ← Kembali
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMobilById } from '@/services/mobil.service'
import DetailItem from '@/components/common/DetailItem.vue'

const route = useRoute()
const mobil = ref(null)

onMounted(async () => {
  mobil.value = await getMobilById(route.params.id)
})

const formatRupiah = (value) =>
  'Rp ' + Number(value).toLocaleString('id-ID')
</script>
