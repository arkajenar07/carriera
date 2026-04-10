/**
 * middleware/role.ts  (used as "guest" guard)
 * Jika sudah login, jangan bisa buka /login atau /register lagi.
 * Redirect ke dashboard sesuai role.
 */
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn, user, defaultRedirectForRole } = useAuth()

  if (isLoggedIn.value && user.value) {
    return navigateTo(defaultRedirectForRole(user.value.role), { redirectCode: 302 })
  }
})
