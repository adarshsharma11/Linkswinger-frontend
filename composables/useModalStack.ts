export const useModalStack = () => {
  const router = useRouter()
  const route = useRoute()

  const getStack = () =>
    route.query.modals
      ? route.query.modals.toString().split(',')
      : []

  const openModal = (name: string) => {
    const stack = getStack()
    const isFirstModal = stack.length === 0

    stack.push(name)

    if (isFirstModal) {
      // ✅ create history entry only once
      router.push({
        query: { ...route.query, modals: stack.join(',') }
      })
    } else {
      // ✅ update URL without adding history
      router.replace({
        query: { ...route.query, modals: stack.join(',') }
      })
    }
  }

  const closeTopModal = () => {
    const stack = getStack()
    const hasModal = stack.length === 1
    const wasLastModal = stack.length === 0
    stack.pop()
    if (hasModal || wasLastModal) {
      // ✅ clear modal history completely
      router.back()
      //router.replace({ query: {} })

    }
    else {
      // ✅ update remaining stack
      router.replace({
        query: { ...route.query, modals: stack.join(',') }
      })
    }
  }

  return { openModal, closeTopModal }
}
