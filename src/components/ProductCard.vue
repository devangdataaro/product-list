<template>
  <div class="card">
    <img
      :src="product.image"
      :alt="product.title"
      loading="lazy"
    />

    <h3>{{ product.title }}</h3>
    <p>{{ product.category }}</p>
    <p class="price">${{ product.price }}</p>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
