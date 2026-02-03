<script setup>
defineProps({ pages: Array, current: Number })
defineEmits(['change'])
</script>

<template>
  <div class="flex justify-center gap-2 mt-6">
    <button
      v-for="p in pages"
      :key="p"
      :aria-label="`Go to page ${p}`"
      @click="$emit('change', p)"
      class="px-3 py-1 border rounded"
      :class="p === current ? 'bg-black text-white' : ''"
    >
      {{ p }}
    </button>
  </div>
</template>
