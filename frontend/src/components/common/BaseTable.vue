<template>
  <table class="min-w-full border border-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="border px-3 py-2 text-left text-sm font-semibold"
        >
          {{ header }}
        </th>
        <th v-if="$slots.action" class="border px-3 py-2">Aksi</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in data" :key="index" class="hover:bg-gray-50">
        <td
          v-for="key in keys"
          :key="key"
          class="border px-3 py-2 text-sm"
        >
          {{ row[key] }}
        </td>
        <td v-if="$slots.action" class="border px-3 py-2">
          <slot name="action" :row="row" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: Array,
  keys: Array,
  data: Array
})
</script>
