export const useVirtualList = (
  items: Ref<any[]>,
  itemHeight = 320,
  height = 800
) => {
  const scrollTop = ref(0)

  const start = computed(() =>
    Math.floor(scrollTop.value / itemHeight)
  )

  const visible = computed(() =>
    items.value.slice(start.value, start.value + 6)
  )

  return { scrollTop, visible }
}
