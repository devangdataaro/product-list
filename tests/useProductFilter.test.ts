import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { useProductFilter } from '../composables/useProductFilter'

describe('useProductFilter', () => {
  it('filters products by title', () => {
    const products = ref([
      { title: 'Apple Phone', category: 'tech' },
      { title: 'Banana', category: 'food' }
    ])

    const search = ref('apple')
    const category = ref('all')

    const filtered = useProductFilter(products, search, category)

    expect(filtered.value.length).toBe(1)
  })
})
