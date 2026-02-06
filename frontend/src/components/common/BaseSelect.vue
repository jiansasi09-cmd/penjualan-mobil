<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <select
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="opt in options"
        :key="opt"
        :value="opt"
      >
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>
