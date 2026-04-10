<template>
  <div class="hub-page">

    <!-- ── Ambient ── -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient a-tl"></div>
      <div class="ambient a-tr"></div>
      <div class="ambient a-br"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <!-- ── Sidebar ── -->
    <StudentSidebar />

    <!-- ── Main ── -->
    <div class="main-wrap">

      <!-- ─── Topbar ─── -->
      <header class="topbar">
        <button class="topbar-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="topbar-left">
          <h1 class="page-title">Project Workspace 🗂️</h1>
          <p class="page-sub">Kelola semua simulasi proyek kerjamu — seperti freelancer sungguhan.</p>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>
            <input type="text" placeholder="Cari project..." v-model="searchQ" />
          </div>
        </div>
      </header>

      <!-- ─── Content ─── -->
      <main class="hub-content">

        <!-- ═══ STATS ROW ═══ -->
        <section class="stats-row">
          <div v-for="s in stats" :key="s.label" class="stat-card" :style="{ '--accent': s.accent }">
            <div class="sc-icon" v-html="s.icon"></div>
            <div class="sc-data">
              <span class="sc-val">{{ s.value }}</span>
              <span class="sc-label">{{ s.label }}</span>
            </div>
          </div>
        </section>

        <!-- ═══ FILTER TABS ═══ -->
        <div class="filter-bar">
          <div class="filter-tabs">
            <button v-for="f in filters" :key="f.id" class="ftab" :class="{ active: activeFilter === f.id }" @click="activeFilter = f.id">
              {{ f.label }}
              <span class="ftab-count">{{ f.count }}</span>
            </button>
          </div>
          <div class="view-toggle">
            <button class="vt-btn" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'" aria-label="Grid view">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="10" y="1" width="5" height="5" rx="1"/><rect x="1" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/></svg>
            </button>
            <button class="vt-btn" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" aria-label="List view">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="3" x2="15" y2="3"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="13" x2="15" y2="13"/></svg>
            </button>
          </div>
        </div>

        <!-- ═══ PROJECT GRID ═══ -->
        <TransitionGroup :name="viewMode === 'grid' ? 'card-pop' : 'list-slide'" tag="div" :class="viewMode === 'grid' ? 'project-grid' : 'project-list'">
          <NuxtLink
            v-for="proj in filteredProjects"
            :key="proj.slug"
            :to="`/student/workspace/${proj.slug}`"
            class="project-card"
            :class="[`pc-${proj.status}`, viewMode === 'list' ? 'pc-list' : '']"
          >
            <!-- Card top accent -->
            <div class="pc-accent" :style="{ background: proj.color }"></div>

            <!-- Header -->
            <div class="pc-header">
              <div class="pc-logo" :style="{ background: proj.color }">
                <span>{{ proj.initials }}</span>
              </div>
              <div class="pc-header-info">
                <h3 class="pc-name">{{ proj.name }}</h3>
                <span class="pc-client">{{ proj.client }}</span>
              </div>
              <span class="pc-status" :class="`pcs-${proj.status}`">
                <span class="pcs-dot"></span>
                {{ statusLabels[proj.status] }}
              </span>
            </div>

            <!-- Description -->
            <p class="pc-desc">{{ proj.desc }}</p>

            <!-- Tags -->
            <div class="pc-tags">
              <span v-for="t in proj.tech.slice(0, 4)" :key="t" class="pc-tag">{{ t }}</span>
              <span v-if="proj.tech.length > 4" class="pc-tag pc-tag-more">+{{ proj.tech.length - 4 }}</span>
            </div>

            <!-- Progress bar -->
            <div class="pc-progress-wrap">
              <div class="pc-progress-head">
                <span>Sprint {{ proj.sprint }} / {{ proj.totalSprints }}</span>
                <span class="pc-pct">{{ proj.progress }}%</span>
              </div>
              <div class="pc-bar">
                <div class="pc-bar-fill" :style="{ width: proj.progress + '%', background: proj.color }"></div>
              </div>
            </div>

            <!-- Footer -->
            <div class="pc-footer">
              <div class="pc-team">
                <div v-for="m in proj.team.slice(0, 4)" :key="m.init" class="pc-avatar" :title="m.name">{{ m.init }}</div>
                <span v-if="proj.team.length > 4" class="pc-avatar pc-av-more">+{{ proj.team.length - 4 }}</span>
              </div>
              <div class="pc-meta">
                <span class="pc-deadline" :class="{ 'dl-urgent': isUrgent(proj.deadline) }">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/></svg>
                  {{ proj.deadline }}
                </span>
                <span class="pc-tasks">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="2,6 5,9 10,3"/></svg>
                  {{ proj.tasksDone }}/{{ proj.tasksTotal }}
                </span>
              </div>
            </div>

            <!-- Hover arrow -->
            <div class="pc-arrow">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round"/></svg>
            </div>
          </NuxtLink>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="filteredProjects.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
          <p>Tidak ada project yang cocok</p>
        </div>

      </main>
    </div>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import StudentSidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Workspace — Carriera Course',
  description: 'Project hub — kelola semua simulasi proyek kerjamu di satu tempat.'
})
definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)
const searchQ = ref('')
const activeFilter = ref('all')
const viewMode = ref<'grid' | 'list'>('grid')

type ProjectStatus = 'active' | 'revision' | 'review' | 'completed'

const statusLabels: Record<ProjectStatus, string> = {
  active:    'In Progress',
  revision:  'Revisi',
  review:    'Under Review',
  completed: 'Selesai',
}

interface Project {
  slug: string
  name: string
  client: string
  desc: string
  initials: string
  color: string
  status: ProjectStatus
  sprint: number
  totalSprints: number
  progress: number
  tasksDone: number
  tasksTotal: number
  tech: string[]
  team: { init: string; name: string }[]
  deadline: string
  lastActivity: string
}

const projects = ref<Project[]>([
  {
    slug: 'threadmark',
    name: 'ThreadMark E-Commerce',
    client: 'ThreadMark Streetwear',
    desc: 'Platform e-commerce fashion streetwear full-stack — dari katalog produk, cart system, checkout dengan Stripe, hingga admin dashboard.',
    initials: 'TM',
    color: '#6458f5',
    status: 'revision',
    sprint: 4,
    totalSprints: 6,
    progress: 68,
    tasksDone: 18,
    tasksTotal: 26,
    tech: ['Nuxt 3', 'Pinia', 'Supabase', 'Stripe API', 'Figma'],
    team: [
      { init: 'AJ', name: 'Arka Jenar' },
      { init: 'RS', name: 'Rizky Satria' },
      { init: 'DP', name: 'Dinda Putri' },
      { init: 'MW', name: 'Maulana W.' },
    ],
    deadline: '14 Apr 2026',
    lastActivity: '2 jam lalu',
  },
  {
    slug: 'kopikita-cms',
    name: 'KopiKita CMS & Blog',
    client: 'KopiKita Coffee Co.',
    desc: 'Content Management System untuk brand kopi lokal — artikel, resep, promo, dan analytics dashboard untuk admin marketing.',
    initials: 'KK',
    color: '#D97706',
    status: 'active',
    sprint: 2,
    totalSprints: 4,
    progress: 45,
    tasksDone: 9,
    tasksTotal: 20,
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'TipTap Editor', 'Vercel'],
    team: [
      { init: 'AJ', name: 'Arka Jenar' },
      { init: 'FN', name: 'Farel Nugraha' },
      { init: 'SA', name: 'Sinta Amelia' },
    ],
    deadline: '28 Apr 2026',
    lastActivity: 'Kemarin',
  },
  {
    slug: 'greenplate',
    name: 'GreenPlate Food Delivery',
    client: 'GreenPlate Healthy Food',
    desc: 'Aplikasi web food delivery dengan fitur menu real-time, order tracking, rating system, dan integrasi payment gateway Midtrans.',
    initials: 'GP',
    color: '#059669',
    status: 'active',
    sprint: 1,
    totalSprints: 5,
    progress: 20,
    tasksDone: 4,
    tasksTotal: 22,
    tech: ['Vue 3', 'Pinia', 'Firebase', 'Midtrans', 'Leaflet.js'],
    team: [
      { init: 'AJ', name: 'Arka Jenar' },
      { init: 'BK', name: 'Bayu Kurniawan' },
    ],
    deadline: '15 Mei 2026',
    lastActivity: '3 hari lalu',
  },
  {
    slug: 'designfolio',
    name: 'DesignFolio Portfolio',
    client: 'Internal / Personal',
    desc: 'Portfolio website premium untuk showcase case study proyek-proyek yang sudah selesai. Focus on storytelling dan visual impact.',
    initials: 'DF',
    color: '#8B5CF6',
    status: 'completed',
    sprint: 3,
    totalSprints: 3,
    progress: 100,
    tasksDone: 12,
    tasksTotal: 12,
    tech: ['Nuxt 3', 'GSAP', 'Three.js', 'Vercel'],
    team: [
      { init: 'AJ', name: 'Arka Jenar' },
    ],
    deadline: '3 Apr 2026',
    lastActivity: '1 minggu lalu',
  },
  {
    slug: 'eventpulse',
    name: 'EventPulse Ticketing',
    client: 'EventPulse Indonesia',
    desc: 'Platform ticketing event — browse events, seat selection, QR code ticket, dan check-in system untuk penyelenggara.',
    initials: 'EP',
    color: '#EC4899',
    status: 'review',
    sprint: 3,
    totalSprints: 4,
    progress: 78,
    tasksDone: 14,
    tasksTotal: 18,
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'QRCode.js'],
    team: [
      { init: 'AJ', name: 'Arka Jenar' },
      { init: 'DW', name: 'Dewi Wulandari' },
      { init: 'RH', name: 'Raihan Hakim' },
    ],
    deadline: '20 Apr 2026',
    lastActivity: '5 jam lalu',
  },
])

/* ─── Stats ─── */
const stats = computed(() => [
  {
    label: 'Total Projects',
    value: projects.value.length,
    accent: '#6458f5',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6458f5" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>'
  },
  {
    label: 'Aktif',
    value: projects.value.filter(p => p.status === 'active' || p.status === 'revision').length,
    accent: '#10B981',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
  },
  {
    label: 'Perlu Revisi',
    value: projects.value.filter(p => p.status === 'revision').length,
    accent: '#EF4444',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  },
  {
    label: 'Selesai',
    value: projects.value.filter(p => p.status === 'completed').length,
    accent: '#6458f5',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6458f5" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  },
])

/* ─── Filters ─── */
const filters = computed(() => [
  { id: 'all',       label: 'Semua',     count: projects.value.length },
  { id: 'active',    label: 'Aktif',     count: projects.value.filter(p => p.status === 'active').length },
  { id: 'revision',  label: 'Revisi',    count: projects.value.filter(p => p.status === 'revision').length },
  { id: 'review',    label: 'Review',    count: projects.value.filter(p => p.status === 'review').length },
  { id: 'completed', label: 'Selesai',   count: projects.value.filter(p => p.status === 'completed').length },
])

const filteredProjects = computed(() => {
  let list = projects.value
  if (activeFilter.value !== 'all') list = list.filter(p => p.status === activeFilter.value)
  if (searchQ.value) {
    const q = searchQ.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tech.some(t => t.toLowerCase().includes(q))
    )
  }
  return list
})

function isUrgent(dateStr: string) {
  // simple mock check
  return dateStr.includes('14 Apr')
}
</script>

<style scoped>
/* ══════════════════════════════════════════
   BASE
══════════════════════════════════════════ */
.hub-page {
  display: flex; min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative; overflow-x: hidden;
}
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.a-tl { top: -5%; left: -5%; width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.a-tr { top: 0; right: -8%; width: 30%; height: 25%; background: radial-gradient(circle, rgba(236,72,153,.04), transparent 70%); }
.a-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }
.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image: linear-gradient(to right, rgba(100,88,245,.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,88,245,.03) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}
.main-wrap { margin-left: 260px; flex: 1; min-width: 0; position: relative; z-index: 10; display: flex; flex-direction: column; }

/* TOPBAR */
.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.92); backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.07);
}
.topbar-toggle { display: none; background: none; border: none; cursor: pointer; padding: .375rem; border-radius: 8px; color: #374151; }
.topbar-toggle svg { width: 20px; height: 20px; }
.topbar-left { flex: 1; }
.page-title { font-size: 1.125rem; font-weight: 700; color: #111827; letter-spacing: -.025em; margin: 0; }
.page-sub { font-size: .8125rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-right { display: flex; align-items: center; gap: .75rem; }

.search-box {
  position: relative; display: flex; align-items: center;
}
.search-box svg { position: absolute; left: .7rem; width: 14px; height: 14px; color: #9CA3AF; pointer-events: none; }
.search-box input {
  padding: .55rem .75rem .55rem 2.1rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #fff;
  font-size: .8125rem; color: #111827; outline: none;
  width: 220px; font-family: inherit; transition: all .2s;
}
.search-box input:focus { border-color: #6458f5; box-shadow: 0 0 0 3px rgba(100,88,245,.08); }
.search-box input::placeholder { color: #9CA3AF; }

/* ══════════════════════════════════════════
   CONTENT
══════════════════════════════════════════ */
.hub-content { padding: 1.75rem 2rem 4rem; display: flex; flex-direction: column; gap: 1.5rem; }

/* STATS */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.stat-card {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 14px;
  padding: 1.125rem 1.25rem; display: flex; align-items: center; gap: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
  transition: transform .2s, box-shadow .2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
.sc-icon {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.sc-icon :deep(svg) { width: 20px; height: 20px; }
.sc-data { display: flex; flex-direction: column; }
.sc-val { font-size: 1.375rem; font-weight: 800; color: #111827; line-height: 1; letter-spacing: -.03em; }
.sc-label { font-size: .75rem; color: #9CA3AF; margin-top: .25rem; font-weight: 500; }

/* FILTER BAR */
.filter-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .75rem; }
.filter-tabs { display: flex; gap: .375rem; flex-wrap: wrap; }
.ftab {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .4rem .8rem; border-radius: 9px;
  border: 1.5px solid #E5E7EB; background: #fff;
  font-size: .75rem; font-weight: 600; color: #6B7280;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.ftab:hover { border-color: #6458f5; color: #6458f5; }
.ftab.active { background: rgba(100,88,245,.08); border-color: rgba(100,88,245,.25); color: #6458f5; }
.ftab-count {
  font-size: .625rem; font-weight: 800; min-width: 18px; height: 18px;
  border-radius: 9px; background: #F3F4F6; color: #6B7280;
  display: inline-flex; align-items: center; justify-content: center; padding: 0 .3rem;
}
.ftab.active .ftab-count { background: rgba(100,88,245,.15); color: #6458f5; }

.view-toggle { display: flex; border: 1.5px solid #E5E7EB; border-radius: 9px; overflow: hidden; }
.vt-btn {
  width: 36px; height: 34px; border: none; background: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: #9CA3AF;
  transition: all .15s;
}
.vt-btn svg { width: 14px; height: 14px; }
.vt-btn:first-child { border-right: 1px solid #E5E7EB; }
.vt-btn.active { background: rgba(100,88,245,.08); color: #6458f5; }
.vt-btn:hover { color: #6458f5; }

/* ══════════════════════════════════════════
   PROJECT CARDS — GRID
══════════════════════════════════════════ */
.project-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
}
.project-list { display: flex; flex-direction: column; gap: .625rem; }

.project-card {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 16px;
  padding: 0; display: flex; flex-direction: column; gap: 0;
  text-decoration: none; color: inherit; position: relative;
  overflow: hidden; transition: all .25s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(0,0,0,.08);
  border-color: #D1D5DB;
}
.project-card:hover .pc-arrow { opacity: 1; transform: translateX(0); }

.pc-accent { height: 4px; border-radius: 16px 16px 0 0; }

.pc-header { display: flex; align-items: center; gap: .875rem; padding: 1.25rem 1.375rem .75rem; }
.pc-logo {
  width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: .8125rem; font-weight: 800; color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.12);
}
.pc-header-info { flex: 1; min-width: 0; }
.pc-name { font-size: 1rem; font-weight: 700; color: #111827; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pc-client { font-size: .75rem; color: #9CA3AF; font-weight: 500; }

.pc-status {
  display: inline-flex; align-items: center; gap: .375rem;
  font-size: .6875rem; font-weight: 700; padding: .3rem .7rem;
  border-radius: 999px; text-transform: uppercase; letter-spacing: .04em; flex-shrink: 0;
}
.pcs-dot { width: 6px; height: 6px; border-radius: 50%; }
.pcs-active    { background: #EEF2FF; color: #4338CA; } .pcs-active .pcs-dot    { background: #6366F1; }
.pcs-revision  { background: #FEF2F2; color: #DC2626; } .pcs-revision .pcs-dot  { background: #EF4444; animation: blink 2s ease-in-out infinite; }
.pcs-review    { background: #FFFBEB; color: #B45309; } .pcs-review .pcs-dot    { background: #F59E0B; }
.pcs-completed { background: #ECFDF5; color: #047857; } .pcs-completed .pcs-dot { background: #10B981; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.pc-desc {
  font-size: .8125rem; color: #4B5563; line-height: 1.55; margin: 0;
  padding: 0 1.375rem .75rem;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.pc-tags { display: flex; flex-wrap: wrap; gap: .375rem; padding: 0 1.375rem .875rem; }
.pc-tag {
  font-size: .6875rem; font-weight: 600; padding: .15rem .5rem;
  border-radius: 5px; background: #F3F4F6; color: #4B5563;
  font-family: 'JetBrains Mono', monospace;
}
.pc-tag-more { background: rgba(100,88,245,.08); color: #6458f5; }

.pc-progress-wrap { padding: 0 1.375rem .875rem; }
.pc-progress-head { display: flex; justify-content: space-between; font-size: .6875rem; font-weight: 600; color: #9CA3AF; margin-bottom: .35rem; }
.pc-pct { color: #111827; font-weight: 800; }
.pc-bar { height: 5px; background: #F3F4F6; border-radius: 999px; overflow: hidden; }
.pc-bar-fill { height: 100%; border-radius: 999px; transition: width .6s cubic-bezier(.4,0,.2,1); }

.pc-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: .875rem 1.375rem; border-top: 1px solid #F3F4F6;
}
.pc-team { display: flex; align-items: center; }
.pc-avatar {
  width: 26px; height: 26px; border-radius: 50%; margin-left: -.4rem;
  background: linear-gradient(135deg, #1e293b, #475569); color: #fff;
  font-size: .6rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,.1);
}
.pc-avatar:first-child { margin-left: 0; }
.pc-av-more { background: #F3F4F6; color: #6B7280; border-color: #fff; }

.pc-meta { display: flex; align-items: center; gap: .75rem; }
.pc-deadline, .pc-tasks {
  display: inline-flex; align-items: center; gap: .25rem;
  font-size: .6875rem; font-weight: 600; color: #6B7280;
}
.pc-deadline svg, .pc-tasks svg { width: 11px; height: 11px; }
.dl-urgent { color: #DC2626; }

.pc-arrow {
  position: absolute; right: 1rem; top: 50%; transform: translateX(8px) translateY(-50%);
  opacity: 0; transition: all .2s;
  width: 32px; height: 32px; border-radius: 8px; background: rgba(100,88,245,.08);
  display: flex; align-items: center; justify-content: center; color: #6458f5;
}
.pc-arrow svg { width: 16px; height: 16px; }

/* ── LIST VIEW variants ── */
.pc-list {
  flex-direction: row; align-items: center; gap: 0;
  border-radius: 14px;
}
.pc-list .pc-accent { width: 4px; height: 100%; border-radius: 14px 0 0 14px; flex-shrink: 0; }
.pc-list .pc-header { flex: 1; padding: 1rem 1.25rem; }
.pc-list .pc-desc { display: none; }
.pc-list .pc-tags { display: none; }
.pc-list .pc-progress-wrap { padding: 1rem 1.25rem; width: 180px; flex-shrink: 0; }
.pc-list .pc-footer { padding: 1rem 1.25rem; border-top: none; border-left: 1px solid #F3F4F6; flex-direction: column; gap: .5rem; width: 180px; flex-shrink: 0; }
.pc-list .pc-team { justify-content: center; }

/* ══════════════════════════════════════════
   EMPTY / OVERLAY
══════════════════════════════════════════ */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 4rem 2rem; color: #9CA3AF; text-align: center; gap: .75rem;
}
.empty-state svg { width: 40px; height: 40px; }
.empty-state p { font-size: .9375rem; font-weight: 500; }

.sidebar-overlay {
  display: none; position: fixed; inset: 0; z-index: 190;
  background: rgba(0,0,0,.5); backdrop-filter: blur(2px);
}

/* ANIMATIONS */
.card-pop-move, .card-pop-enter-active, .card-pop-leave-active { transition: all .3s ease; }
.card-pop-enter-from, .card-pop-leave-to { opacity: 0; transform: scale(.96) translateY(8px); }
.card-pop-leave-active { position: absolute; }

.list-slide-move, .list-slide-enter-active, .list-slide-leave-active { transition: all .25s ease; }
.list-slide-enter-from, .list-slide-leave-to { opacity: 0; transform: translateX(-8px); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; }
  .hub-content { padding: 1.25rem 1rem 3rem; }
  .sidebar-overlay { display: block; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .project-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .stats-row { grid-template-columns: 1fr; }
  .search-box input { width: 160px; }
}
</style>
