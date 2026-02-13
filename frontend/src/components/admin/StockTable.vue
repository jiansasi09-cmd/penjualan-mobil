<template>
  <table class="min-w-full border">
    <thead>
      <tr class="bg-gray-100">
        <th class="p-2 border">#</th>
        <th class="p-2 border">Nama</th>
        <th class="p-2 border">Merk</th>
        <th class="p-2 border">Tipe</th>
        <th class="p-2 border">Tahun</th>
        <th class="p-2 border">Warna</th>
        <th class="p-2 border">Stok</th>
        <th class="p-2 border">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in stockList"
        :key="item.id"
        class="border-t"
      >
        <td class="p-2 border">{{ index + 1 }}</td>
        <td class="p-2 border">{{ item.nama }}</td>
        <td class="p-2 border">{{ item.merk }}</td>
        <td class="p-2 border">{{ item.tipe }}</td>
        <td class="p-2 border">{{ item.tahun }}</td>
        <td class="p-2 border">{{ item.warna }}</td>
        <td class="p-2 border">{{ item.stok }}</td>
        <td class="p-2 border flex gap-2">
          <button
            @click="$emit('detail', item)"
            class="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Detail
          </button>

          <button
            @click="$emit('edit', item)"
            class="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>

          <button
            @click="$emit('delete', item.id)"
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Hapus
          </button>
        </td>
      </tr>

      <tr v-if="!stockList.length">
        <td colspan="8" class="text-center p-4">
          Data stok kosong
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  stockList: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'detail', 'delete'])
</script>
