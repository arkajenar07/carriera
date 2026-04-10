<template>
  <!-- ── Sidebar ── -->
  <aside class="sidebar" :class="{ 'sidebar-open': open }">
    <div class="sidebar-inner">

      <!-- Logo -->
      <div class="sidebar-logo">
        <NuxtLink to="/" class="logo-link">
          <div class="logo-mark">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="#6458f5"/>
              <path d="M8 10h6l4 6-4 6H8l4-6L8 10z" fill="#fff" opacity=".9"/>
              <path d="M16 10h8l-4 6 4 6h-8l4-6-4-6z" fill="#fff" opacity=".5"/>
            </svg>
          </div>
          <span class="logo-text">Carriera</span>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main Menu</div>
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: currentPath === item.to || currentPath.startsWith(item.to + '/') }"
          @click="emit('update:open', false)"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </NuxtLink>
      </nav>

      <!-- User card bottom -->
      <div class="sidebar-user">
        <div class="user-avatar">{{ user?.avatar ?? 'U' }}</div>
        <div class="user-info">
          <span class="user-name">{{ user?.name ?? 'Guest' }}</span>
          <span class="user-role">{{ user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : '' }} · {{ user?.batch ?? '' }}</span>
        </div>
        <button class="user-logout" aria-label="Logout" title="Logout" @click="logout()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>

    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// ── Props & Emits ──────────────────────────────────────────────────
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'logout'): void
}>()

// ── Auth ───────────────────────────────────────────────────────────
const { user, logout } = useAuth()

// ── Active route detection ─────────────────────────────────────────
const route = useRoute()
const currentPath = computed(() => route.path)

// ── Nav items ──────────────────────────────────────────────
const navItems = [
  {
    to: '/student/dashboard', label: 'Dashboard',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    badge: null
  },
  {
    to: '/student/workspace', label: 'Workspace',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
    badge: null
  },
  {
    to: '/student/tasks', label: 'Tasks',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    badge: '3'
  },
  {
    to: '/student/skill-report', label: 'Skill Report',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    badge: null
  },
  {
    to: '/student/feedback', label: 'Feedback',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    badge: '2'
  },
  {
    to: '/student/mentorship', label: 'Mentorship',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    badge: null
  },
  {
    to: '/student/portfolio', label: 'Portfolio',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
    badge: null
  },
  {
    to: '/student/resources', label: 'Resources',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    badge: null
  },
  {
    to: '/student/notifications', label: 'Notifikasi',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
    badge: '5'
  },
]
</script>

<style scoped>
/* ══════════════════════════════════════
   SIDEBAR
══════════════════════════════════════ */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #0F172A;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  transition: transform .3s cubic-bezier(.4,0,.2,1);
  box-shadow: 4px 0 24px rgba(0,0,0,.12);
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.07) transparent;
}

/* ── Logo ── */
.sidebar-logo {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.logo-link {
  display: flex;
  align-items: center;
  gap: .75rem;
  text-decoration: none;
}
.logo-mark svg { width: 32px; height: 32px; flex-shrink: 0; }
.logo-text {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #F9FAFB;
  letter-spacing: -.02em;
}

/* ── Nav ── */
.sidebar-nav {
  padding: 1.25rem .75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.nav-section-label {
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #4B5563;
  padding: 0 .75rem;
  margin-bottom: .5rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .625rem .875rem;
  border-radius: 10px;
  text-decoration: none;
  color: #6B7280;
  font-size: .875rem;
  font-weight: 500;
  transition: all .2s;
  position: relative;
}
.nav-item:hover               { background: rgba(255,255,255,.05); color: #D1D5DB; }
.nav-item.active              { background: rgba(100,88,245,.15);  color: #A5B4FC; }
.nav-item.active .nav-icon    { color: #818CF8; }
.nav-icon {
  width: 18px; height: 18px;
  flex-shrink: 0;
  display: flex; align-items: center;
}
.nav-icon :deep(svg) { width: 18px; height: 18px; }
.nav-label { flex: 1; }
.nav-badge {
  font-size: .6875rem;
  font-weight: 700;
  background: #6458f5;
  color: #fff;
  border-radius: 9999px;
  padding: .1rem .45rem;
  min-width: 18px;
  text-align: center;
}

/* ── User card ── */
.sidebar-user {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,.06);
}
.user-avatar {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6458f5, #818CF8);
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.user-info { flex: 1; min-width: 0; }
.user-name {
  display: block;
  font-size: .8125rem;
  font-weight: 600;
  color: #F9FAFB;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-role { display: block; font-size: .6875rem; color: #6B7280; }
.user-logout {
  background: none; border: none; cursor: pointer;
  color: #4B5563; padding: .375rem; border-radius: 8px;
  transition: all .2s; display: flex;
}
.user-logout svg { width: 16px; height: 16px; }
.user-logout:hover { background: rgba(255,255,255,.07); color: #F87171; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .sidebar           { transform: translateX(-100%); }
  .sidebar.sidebar-open { transform: translateX(0); }
}
</style>
