<script setup lang="ts">
import type { Product } from '~/types/product'
defineProps<{ product: Product }>()
</script>

<template>
  <div class="bg-white p-4 rounded shadow">
    <img
      :src="product.image"
      :alt="product.title"
      loading="lazy"
      class="h-40 mx-auto object-contain"
    />
    <h2 class="font-semibold text-sm mt-2 line-clamp-2">
      {{ product.title }}
    </h2>
    <p class="text-xs text-gray-500">{{ product.category }}</p>
    <p class="font-bold">${{ product.price }}</p>
  </div>
</template>
