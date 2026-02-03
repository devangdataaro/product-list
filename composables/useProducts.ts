import type { Product } from '~/types/product'

export const useProducts = (page: Ref<number>) => {
  return useAsyncData(
    () =>
      $fetch<{ data: Product[]; total: number }>(
        '/api/products',
        { params: { page: page.value, limit: 10 } }
      ),
    { watch: [page] }
  )
}
