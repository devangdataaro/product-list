import { onBeforeUnmount } from 'vue'

export const useDebounce = (fn: Function, delay = 300) => {
  let timer: ReturnType<typeof setTimeout>

  const run = (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return run
}
