export default defineEventHandler(async (event) => {
  const { page = 1, limit = 10 } = getQuery(event)

  const products = await $fetch<any[]>(
    'https://fakestoreapi.com/products'
  )

  const start = (+page - 1) * +limit

  return {
    data: products.slice(start, start + +limit),
    total: products.length
  }
})
