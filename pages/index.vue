<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Product List',
  ogTitle: 'High Performance Nuxt Store',
  description: 'SSR, virtual scroll, pagination',
})

const search = ref('')
const category = ref('all')

const { page, visiblePages } = usePagination(ref(100))
const { data } = await useProducts(page)

const products = computed(() => data.value?.data ?? [])
const filtered = useProductFilter(products, search, category)

const onSearch = useDebounce((v: string) => (search.value = v))
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <BaseInput label="Search products" @update:modelValue="onSearch" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <ProductCard
        v-for="p in filtered"
        :key="p.id"
        :product="p"
      />
    </div>

    <BasePagination
      :pages="visiblePages"
      :current="page"
      @change="page = $event"
    />
  </div>
</template>
