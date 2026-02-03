<script setup>
defineProps({ modelValue: String, label: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block">
    <span class="sr-only">{{ label }}</span>
    <input
      class="w-full p-2 border rounded"
      :aria-label="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
