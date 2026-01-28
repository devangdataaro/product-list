<template>
  <div class="container">
    <h1>Product List</h1>

    <!-- Search & Filter -->
    <input v-model="searchInput" @input="onSearchInput($event.target.value)" placeholder="Search products..." />

    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="grid">
  <div
    v-for="n in 8"
    :key="n"
    class="card"
  >
    <div class="skeleton skeleton-img"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text short"></div>
  </div>
</div>

  <!-- Error -->
  <p v-if="error" style="color:red">
    Failed to load products
  </p>

  <!-- Product Grid -->
  <div v-if="!loading && !error" class="grid">
    <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
  </div>

  <!-- Pagination -->
  <div class="pagination" v-if="totalPages > 1">
    <button v-for="page in totalPages" :key="page" @click="currentPage = page"
      :class="{ active: currentPage === page }">
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from './components/ProductCard.vue'

const products = ref([])
const loading = ref(true)
const error = ref(false)

const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const search = ref('')
const searchInput = ref('')
let debounceTimer = null

function onSearchInput(value) {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    search.value = value
  }, 300)
}

// Fetch products
onMounted(async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    products.value = await res.json()
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})

// Categories
const categories = computed(() =>
  [...new Set(products.value.map(p => p.category))]
)

// Filtered products
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesCategory = selectedCategory.value
      ? p.category === selectedCategory.value
      : true

    return matchesSearch && matchesCategory
  })
})


// Reset pagination on filter/search
watch([search, selectedCategory], () => {
  currentPage.value = 1
})

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})
</script>
