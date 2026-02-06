<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">
      {{ label }}
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})

defineEmits(['update:modelValue'])
</script>
