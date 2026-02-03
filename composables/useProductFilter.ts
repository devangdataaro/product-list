import { computed, type Ref } from 'vue'

interface Product {
  title: string
  category: string
}

export function useProductFilter(
  products: Ref<Product[]>,
  search: Ref<string>,
  category: Ref<string>
) {
  return computed(() =>
    products.value.filter(p =>
      p.title.toLowerCase().includes(search.value.toLowerCase()) &&
      (category.value === 'all' || p.category === category.value)
    )
  )
}
