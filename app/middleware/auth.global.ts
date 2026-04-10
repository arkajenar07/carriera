/**
 * middleware/auth.global.ts
 *
 * Global route guard — runs on every navigation.
 *
 * Rules:
 *   - Routes starting with /student/* → require login
 *   - Routes /login, /register       → redirect to dashboard if already logged in
 *   - Everything else (landing, etc.) → public, no guard
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, user, defaultRedirectForRole } = useAuth()

  const PROTECTED_PREFIXES = ['/student', '/mentor', '/admin']
  const GUEST_ONLY_ROUTES  = ['/login', '/register', '/forgot-password']

  const isProtected = PROTECTED_PREFIXES.some(p => to.path.startsWith(p))
  const isGuestOnly = GUEST_ONLY_ROUTES.some(p => to.path === p || to.path.startsWith(p))

  // 1. Belum login tapi akses protected route → ke /login
  if (isProtected && !isLoggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }

  // 2. Sudah login tapi buka halaman guest-only → ke dashboard
  if (isGuestOnly && isLoggedIn.value && user.value) {
    return navigateTo(defaultRedirectForRole(user.value.role))
  }
})
