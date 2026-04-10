/**
 * middleware/auth.ts
 * Proteksi semua route yang membutuhkan login.
 * Redirect ke /login jika belum auth.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn.value) {
    return navigateTo('/login', {
      redirectCode: 302,
      query: { redirect: to.fullPath !== '/login' ? to.fullPath : undefined },
    })
  }
})
