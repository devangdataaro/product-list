export const usePagination = (total: Ref<number>, perPage = 10) => {
  const page = ref(1)

  const totalPages = computed(() =>
    Math.ceil(total.value / perPage)
  )

  const visiblePages = computed(() => {
    const start = Math.max(1, page.value - 2)
    return Array.from(
      { length: Math.min(5, totalPages.value) },
      (_, i) => start + i
    )
  })

  return { page, totalPages, visiblePages }
}
