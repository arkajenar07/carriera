<template>
  <div class="auth-page">
    <!-- Ambient background glow effects -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>

    <!-- Subtle dot/grid pattern overlay -->
    <div class="bg-grid" aria-hidden="true"></div>

    <div class="auth-layout">
      <!-- Left Panel (branding) -->
      <aside class="auth-panel" aria-hidden="true">
        <div class="panel-inner">
          <!-- Logo -->
          <div class="panel-logo">
            <NuxtLink to="/" class="logo-link">
              <img :src="logo" alt="Carriera Logo" class="logo-img" />
            </NuxtLink>
          </div>

          <!-- Headline -->
          <div class="panel-copy">
            <div class="badge">
              <span class="badge-dot"></span>
              Platform Belajar Masa Depan
            </div>
            <h2 class="panel-title">
              Selamat Datang<br />
              Kembali di <em class="panel-accent">Carriera.</em>
            </h2>
            <p class="panel-desc">
              Lanjutkan perjalanan belajarmu. Setiap sprint membawamu selangkah lebih dekat ke portofolio
              yang berbicara lebih keras dari ijazah.
            </p>
          </div>

          <!-- Decorative code snippet -->
          <div class="panel-code" aria-hidden="true">
            <div class="code-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="code-body">
              <div class="cl"><span class="ck">const</span> <span class="cv">user</span> = <span class="cs">'you'</span></div>
              <div class="cl"><span class="ck">await</span> <span class="cf">login</span>(user)</div>
              <div class="cl"><span class="ck">return</span> <span class="cs">'welcome back 🚀'</span></div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Panel (form) -->
      <main class="auth-form-side">
        <div class="form-wrapper">
          <!-- Mobile logo -->
          <NuxtLink to="/" class="mobile-logo">
            <img :src="logo" alt="Carriera" class="mobile-logo-img" />
          </NuxtLink>

          <div class="form-header">
            <h1 class="form-title">Masuk ke Akunmu</h1>
            <p class="form-subtitle">
              Belum punya akun?
              <NuxtLink to="/register" class="form-link">Daftar sekarang →</NuxtLink>
            </p>
          </div>

          <form class="auth-form" @submit.prevent="handleLogin" novalidate>
            <!-- Email -->
            <div class="field-group" :class="{ 'has-error': errors.email }">
              <label for="email" class="field-label">Email</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="field-input"
                  placeholder="nama@email.com"
                  autocomplete="email"
                />
              </div>
              <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
            </div>

            <!-- Password -->
            <div class="field-group" :class="{ 'has-error': errors.password }">
              <label for="password" class="field-label">
                Password
                <NuxtLink to="/forgot-password" class="forgot-link">Lupa password?</NuxtLink>
              </label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="field-input"
                  placeholder="Masukkan password"
                  autocomplete="current-password"
                />
                <button type="button" class="toggle-pw" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'">
                  <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
            </div>

            <!-- Remember me -->
            <label class="remember-label">
              <input type="checkbox" v-model="form.remember" class="remember-check" />
              <span class="remember-custom"></span>
              Ingat saya di perangkat ini
            </label>

            <!-- Login error banner -->
            <Transition name="err-slide">
              <div v-if="loginError" class="login-error">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="11" x2="8.01" y2="11"/></svg>
                {{ loginError }}
              </div>
            </Transition>

            <!-- Submit -->
            <button type="submit" class="btn-submit" :disabled="isLoading">
              <span v-if="!isLoading">
                Masuk
                <svg class="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span v-else class="loading-spinner"></span>
            </button>

            <!-- Demo accounts hint -->
            <div class="demo-section">
              <button type="button" class="demo-toggle" @click="showHint = !showHint">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><line x1="8" y1="11" x2="8.01" y2="11"/></svg>
                Demo accounts
                <svg class="demo-chevron" :class="{ open: showHint }" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg>
              </button>
              <Transition name="demo-slide">
                <div v-if="showHint" class="demo-list">
                  <p class="demo-desc">Klik untuk isi otomatis ↓</p>
                  <div
                    v-for="acc in demoAccounts"
                    :key="acc.role"
                    class="demo-account"
                    @click="fillDemo(acc)"
                    :style="{ '--ac': acc.color }"
                  >
                    <span class="da-role" :style="{ background: acc.color + '18', color: acc.color }">{{ acc.role }}</span>
                    <div class="da-creds">
                      <code>{{ acc.email }}</code>
                      <code class="da-pw">{{ acc.password }}</code>
                    </div>
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6h8M6 2l4 4-4 4"/></svg>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Divider -->
            <div class="divider"><span>atau</span></div>

            <!-- OAuth -->
            <button type="button" class="btn-oauth" @click="loginWithGoogle">
              <svg class="oauth-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import logo from '~/assets/images/logo-pc.png'

useSeoMeta({
  title: 'Masuk — Carriera Course',
  description: 'Masuk ke akun Carriera Course dan lanjutkan perjalanan belajar coding-mu.'
})

// 'role' middleware: redirect ke dashboard jika sudah login
definePageMeta({
  layout: false,
  middleware: ['role'],
})

const route = useRoute()
const { login, defaultRedirectForRole } = useAuth()

const showPassword  = ref(false)
const isLoading     = ref(false)
const loginError    = ref('')
const showHint      = ref(false)

const form = reactive({
  email:    '',
  password: '',
  remember: false,
})

const errors = reactive({
  email:    '',
  password: '',
})

// ── Demo accounts hint ──────────────────────────────────────────
const demoAccounts = [
  { role: 'Student',  email: 'student@carriera.dev', password: 'student123', color: '#6458f5' },
  { role: 'Mentor',   email: 'mentor@carriera.dev',  password: 'mentor123',  color: '#10B981' },
  { role: 'Admin',    email: 'admin@carriera.dev',   password: 'admin123',   color: '#F59E0B' },
]

function fillDemo(acc: typeof demoAccounts[0]) {
  form.email    = acc.email
  form.password = acc.password
  errors.email  = ''
  errors.password = ''
  loginError.value = ''
  showHint.value = false
}

// ── Validation ──────────────────────────────────────────────────
const validate = () => {
  errors.email    = ''
  errors.password = ''
  let valid = true

  if (!form.email) {
    errors.email = 'Email wajib diisi.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Password wajib diisi.'
    valid = false
  }

  return valid
}

// ── Login handler ───────────────────────────────────────────────
const handleLogin = async () => {
  if (!validate()) return

  isLoading.value  = true
  loginError.value = ''

  const result = await login(form.email, form.password)

  if (!result.success) {
    loginError.value = result.error ?? 'Login gagal.'
    isLoading.value  = false
    return
  }

  // Redirect: ke ?redirect= param jika ada, atau ke dashboard sesuai role
  const { user } = useAuth()
  const redirectTo = (route.query.redirect as string) || defaultRedirectForRole(user.value!.role)
  await navigateTo(redirectTo)
}

const loginWithGoogle = () => {
  // TODO: implement Google OAuth
  alert('Google OAuth belum diimplementasikan. Gunakan demo account di bawah.')
}
</script>

<style scoped>
/* ═══════════════════════ BASE PAGE ═══════════════════════ */
.auth-page {
  position: relative;
  min-height: 100vh;
  background-color: #FAFAFA;
  font-family: 'Instrument Sans', 'Inter', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

/* ═══════════════════════ AMBIENTS ═══════════════════════ */
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(100px); }
.ambient-tl { top: -10%; left: -8%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(99,88,245,.09), transparent 70%); }
.ambient-tr { top: 10%; right: -5%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%); }
.ambient-bl { bottom: 0; left: 45%; width: 55%; height: 28%; background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%); }

/* ═══════════════════════ GRID ═══════════════════════ */
.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image: linear-gradient(to right, rgba(99,88,245,.06) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(99,88,245,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

/* ═══════════════════════ LAYOUT ═══════════════════════ */
.auth-layout {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

@media (max-width: 900px) {
  .auth-layout { grid-template-columns: 1fr; }
}

/* ═══════════════════════ LEFT PANEL ═══════════════════════ */
.auth-panel {
  background: #0F172A;
  position: relative;
  overflow: hidden;
  padding: 3rem;
  display: flex;
  flex-direction: column;
}
.auth-panel::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 1px; height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(99,88,245,.4) 40%, rgba(99,88,245,.4) 60%, transparent);
}
.auth-panel::after {
  content: '';
  position: absolute;
  top: -20%; left: -10%;
  width: 70%; height: 70%;
  background: radial-gradient(circle, rgba(99,88,245,.12), transparent 65%);
  pointer-events: none;
}

.panel-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.panel-logo {}
.logo-link { display: inline-block; }
.logo-img { height: auto; width: 130px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.9; }

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .375rem .875rem;
  border-radius: 9999px;
  border: 1px solid rgba(165,180,252,.25);
  background: rgba(99,88,245,.08);
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: #A5B4FC;
  margin-bottom: 1.25rem;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #818CF8;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }

.panel-copy { flex: 1; }
.panel-title {
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -.03em;
  color: #F9FAFB;
  margin-bottom: 1rem;
}
.panel-accent {
  font-style: italic;
  font-weight: 700;
  color: #818CF8;
}
.panel-desc {
  font-size: .9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  max-width: 380px;
}

/* Testimonial card */
.panel-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px;
  padding: 1.5rem 1.75rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  backdrop-filter: blur(6px);
}
.pc-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #6458f5, #8b83ff);
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.pc-body {}
.pc-quote { font-size: .875rem; font-weight: 300; line-height: 1.65; color: #D1D5DB; margin-bottom: .375rem; font-style: italic; }
.pc-name { font-size: .75rem; font-weight: 600; color: #818CF8; }

/* Code snippet */
.panel-code {
  background: rgba(0,0,0,.3);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 16px;
  overflow: hidden;
}
.code-dots { display: flex; gap: 6px; padding: .75rem 1rem .5rem; }
.code-dots span { width: 9px; height: 9px; border-radius: 50%; background: #374151; }
.code-dots span:first-child { background: #EF4444; }
.code-dots span:nth-child(2) { background: #F59E0B; }
.code-dots span:nth-child(3) { background: #10B981; }
.code-body { padding: .5rem 1.25rem 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: .8125rem; line-height: 1.9; }
.cl { color: #9CA3AF; }
.ck { color: #C084FC; }
.cv { color: #60A5FA; }
.cf { color: #34D399; }
.cs { color: #FBBF24; }

@media (max-width: 900px) {
  .auth-panel { display: none; }
}

/* ═══════════════════════ RIGHT / FORM SIDE ═══════════════════════ */
.auth-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: #FAFAFA;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
}

.mobile-logo { display: none; }
@media (max-width: 900px) {
  .mobile-logo { display: block; margin-bottom: 2.5rem; }
  .mobile-logo-img { width: 120px; height: auto; }
}

.form-header { margin-bottom: 2.25rem; }
.form-title {
  font-size: clamp(1.625rem, 3vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -.025em;
  color: #111827;
  margin-bottom: .5rem;
}
.form-subtitle {
  font-size: .9375rem;
  font-weight: 300;
  color: #6B7280;
}
.form-link {
  color: #6458f5;
  font-weight: 600;
  text-decoration: none;
  transition: color .2s;
}
.form-link:hover { color: #5448e0; }

/* ═══════════════════════ FORM ═══════════════════════ */
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; }

.field-group { display: flex; flex-direction: column; gap: .5rem; }

.field-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .875rem;
  font-weight: 600;
  color: #374151;
}
.forgot-link {
  font-size: .8125rem;
  font-weight: 500;
  color: #6458f5;
  text-decoration: none;
  transition: color .2s;
}
.forgot-link:hover { color: #5448e0; }

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 1rem;
  width: 18px; height: 18px;
  color: #9CA3AF;
  pointer-events: none;
  transition: color .2s;
}
.field-input {
  width: 100%;
  height: 50px;
  padding: 0 3rem 0 2.75rem;
  border-radius: 14px;
  border: 1.5px solid #E5E7EB;
  background: #FFFFFF;
  font-family: inherit;
  font-size: .9375rem;
  color: #111827;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.field-input::placeholder { color: #C4C8D0; }
.field-input:focus {
  border-color: #6458f5;
  box-shadow: 0 0 0 3px rgba(100,88,245,.1);
}
.field-input:focus + .input-icon,
.input-wrap:focus-within .input-icon { color: #6458f5; }
.has-error .field-input { border-color: #F87171; }
.has-error .field-input:focus { box-shadow: 0 0 0 3px rgba(248,113,113,.12); }
.field-error { font-size: .8125rem; color: #DC2626; font-weight: 500; }

.toggle-pw {
  position: absolute;
  right: .875rem;
  background: none; border: none; cursor: pointer;
  padding: .25rem;
  color: #9CA3AF;
  transition: color .2s;
  display: flex; align-items: center;
}
.toggle-pw svg { width: 18px; height: 18px; }
.toggle-pw:hover { color: #6458f5; }

/* Remember me */
.remember-label {
  display: flex;
  align-items: center;
  gap: .625rem;
  font-size: .875rem;
  color: #4B5563;
  cursor: pointer;
  user-select: none;
}
.remember-check { display: none; }
.remember-custom {
  width: 18px; height: 18px;
  border-radius: 5px;
  border: 1.5px solid #D1D5DB;
  background: #fff;
  flex-shrink: 0;
  transition: all .2s;
  position: relative;
}
.remember-check:checked ~ .remember-custom {
  background: #6458f5;
  border-color: #6458f5;
}
.remember-check:checked ~ .remember-custom::after {
  content: '';
  position: absolute;
  top: 2px; left: 5px;
  width: 5px; height: 9px;
  border: 2px solid #fff;
  border-top: none; border-left: none;
  transform: rotate(45deg);
}

/* Submit button */
.btn-submit {
  width: 100%;
  height: 52px;
  border-radius: 14px;
  background: #6458f5;
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: .9375rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  box-shadow: 0 10px 30px rgba(100,88,245,.3);
  transition: all .25s;
  margin-top: .25rem;
}
.btn-submit:hover:not(:disabled) {
  background: #5448e0;
  box-shadow: 0 16px 40px rgba(100,88,245,.4);
  transform: translateY(-1px);
}
.btn-submit:disabled { opacity: .6; cursor: not-allowed; }
.btn-arrow { width: 16px; height: 16px; transition: transform .2s; }
.btn-submit:hover .btn-arrow { transform: translateX(3px); }

/* Loading spinner */
.loading-spinner {
  width: 20px; height: 20px;
  border: 2.5px solid rgba(255,255,255,.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: .25rem 0;
}
.divider::before {
  content: '';
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px;
  background: #E5E7EB;
}
.divider span {
  position: relative;
  background: #FAFAFA;
  padding: 0 1rem;
  font-size: .8125rem;
  color: #9CA3AF;
}

/* OAuth button */
.btn-oauth {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  background: #fff;
  color: #374151;
  border: 1.5px solid #E5E7EB;
  cursor: pointer;
  font-family: inherit;
  font-size: .9375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .75rem;
  transition: all .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.btn-oauth:hover {
  border-color: rgba(100,88,245,.3);
  box-shadow: 0 4px 16px rgba(0,0,0,.07);
  transform: translateY(-1px);
}
.oauth-icon { width: 20px; height: 20px; flex-shrink: 0; }

/* ── Login error banner ── */
.login-error {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .75rem 1rem;
  border-radius: 10px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #B91C1C;
  font-size: .875rem;
  font-weight: 500;
}
.login-error svg { width: 16px; height: 16px; flex-shrink: 0; color: #EF4444; }
.err-slide-enter-active, .err-slide-leave-active { transition: all .25s; }
.err-slide-enter-from, .err-slide-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Demo accounts section ── */
.demo-section { display: flex; flex-direction: column; gap: 0; }
.demo-toggle {
  display: flex;
  align-items: center;
  gap: .5rem;
  background: none;
  border: 1.5px dashed #D1D5DB;
  border-radius: 10px;
  padding: .625rem 1rem;
  font-family: inherit;
  font-size: .8125rem;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all .2s;
  width: 100%;
  justify-content: center;
}
.demo-toggle svg:first-child { width: 15px; height: 15px; color: #9CA3AF; }
.demo-toggle:hover { border-color: #6458f5; color: #6458f5; }
.demo-chevron { width: 12px; height: 12px; margin-left: auto; transition: transform .2s; }
.demo-chevron.open { transform: rotate(180deg); }

.demo-list {
  margin-top: .5rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  background: #FAFAFA;
}
.demo-desc {
  font-size: .6875rem;
  color: #9CA3AF;
  text-align: center;
  padding: .5rem 1rem .25rem;
  font-weight: 500;
}
.demo-account {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .65rem 1rem;
  cursor: pointer;
  transition: background .15s;
  border-top: 1px solid #E5E7EB;
  position: relative;
}
.demo-account:first-of-type { border-top: none; }
.demo-account:hover { background: color-mix(in srgb, var(--ac) 5%, white); }
.demo-account > svg { width: 12px; height: 12px; color: #D1D5DB; flex-shrink: 0; transition: color .15s; }
.demo-account:hover > svg { color: var(--ac); }

.da-role {
  font-size: .625rem;
  font-weight: 800;
  padding: .2rem .5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: .05em;
  flex-shrink: 0;
  min-width: 56px;
  text-align: center;
}
.da-creds {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .1rem;
}
.da-creds code {
  font-family: 'JetBrains Mono', monospace;
  font-size: .6875rem;
  color: #374151;
  background: none;
}
.da-pw { color: #9CA3AF !important; font-size: .625rem !important; }

.demo-slide-enter-active, .demo-slide-leave-active { transition: all .25s ease; }
.demo-slide-enter-from, .demo-slide-leave-to { opacity: 0; transform: translateY(-8px); max-height: 0; }
</style>
