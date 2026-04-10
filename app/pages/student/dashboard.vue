<template>
  <div class="dash-page">

    <!-- ── Ambient background ── -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-br"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <!-- ── Sidebar ── -->
    <Sidebar />

    <!-- ── Main content ── -->
    <div class="main-wrap">

      <!-- Top bar -->
      <header class="topbar">
        <button class="topbar-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle sidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div class="topbar-greeting">
          <h1 class="greeting-title">Selamat datang kembali, <em>Arka</em> 👋</h1>
          <p class="greeting-sub">{{ todayStr }} · Sprint {{ sprintNumber }} sedang berjalan</p>
        </div>
        <div class="topbar-actions">
          <button class="action-btn notif-btn" @click="notifOpen = !notifOpen" :class="{ active: unreadCount > 0 }" aria-label="Notifikasi">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span v-if="unreadCount > 0" class="notif-dot">{{ unreadCount }}</span>
          </button>
        </div>
      </header>

      <!-- Notification dropdown -->
      <Transition name="fade-down">
        <div v-if="notifOpen" class="notif-panel">
          <div class="notif-header">
            <span>Notifikasi</span>
            <button class="notif-mark-all" @click="markAllRead">Tandai semua dibaca</button>
          </div>
          <ul class="notif-list">
            <li v-for="n in notifications" :key="n.id" class="notif-item" :class="{ unread: !n.read, [`type-${n.type}`]: true }">
              <div class="notif-icon-wrap">
                <span class="notif-icon" v-html="n.icon"></span>
              </div>
              <div class="notif-body">
                <p class="notif-msg">{{ n.message }}</p>
                <span class="notif-time">{{ n.time }}</span>
              </div>
            </li>
          </ul>
        </div>
      </Transition>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">

        <!-- ═══ ROW 1: Stats Summary ═══ -->
        <section class="stats-row">
          <div v-for="stat in summaryStats" :key="stat.label" class="stat-card">
            <div class="stat-icon-wrap" :style="{ background: stat.bg }">
              <span v-html="stat.icon"></span>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <div class="stat-trend" :class="stat.trendUp ? 'up' : 'neutral'">
              {{ stat.trend }}
            </div>
          </div>
        </section>

        <!-- ═══ ROW 2: Active Project + Deadlines ═══ -->
        <section class="grid-row-2">

          <!-- Active Project card -->
          <div class="card card-project">
            <div class="card-header">
              <div class="card-title-group">
                <div class="section-badge badge-purple">
                  <span class="badge-dot"></span> Proyek Aktif
                </div>
                <h2 class="card-title">{{ activeProject.title }}</h2>
              </div>
              <span class="project-status" :class="`status-${activeProject.status}`">{{ activeProject.statusLabel }}</span>
            </div>

            <p class="project-desc">{{ activeProject.desc }}</p>

            <!-- Sprint bar -->
            <div class="sprint-info">
              <div class="sprint-meta">
                <span class="sprint-label">Sprint {{ activeProject.sprint }} / {{ activeProject.totalSprints }}</span>
                <span class="sprint-date">Berakhir {{ activeProject.sprintEnd }}</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar" :style="{ width: activeProject.progress + '%' }"></div>
              </div>
              <div class="progress-labels">
                <span>Progress keseluruhan</span>
                <span class="progress-pct">{{ activeProject.progress }}%</span>
              </div>
            </div>

            <!-- Tech stack tags -->
            <div class="tech-tags">
              <span v-for="tag in activeProject.tech" :key="tag" class="tech-tag">{{ tag }}</span>
            </div>

            <!-- Team -->
            <div class="project-team">
              <div class="team-avatars">
                <div v-for="m in activeProject.team" :key="m.init" class="team-av" :title="m.name">{{ m.init }}</div>
              </div>
              <span class="team-label">{{ activeProject.team.length }} anggota tim</span>
              <NuxtLink to="/student/workspace" class="btn-goto">
                Buka Workspace
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Deadlines card -->
          <div class="card card-deadlines">
            <div class="card-header">
              <div class="section-badge badge-orange">
                <span class="badge-dot"></span> Deadline Terdekat
              </div>
            </div>
            <ul class="deadline-list">
              <li v-for="dl in deadlines" :key="dl.id" class="deadline-item" :class="`urgency-${dl.urgency}`">
                <div class="dl-left">
                  <div class="dl-urgency-bar"></div>
                  <div class="dl-info">
                    <span class="dl-name">{{ dl.name }}</span>
                    <span class="dl-project">{{ dl.project }}</span>
                  </div>
                </div>
                <div class="dl-right">
                  <span class="dl-date">{{ dl.date }}</span>
                  <span class="dl-remaining" :class="`remaining-${dl.urgency}`">{{ dl.remaining }}</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- ═══ ROW 3: Task Progress + Feedback ═══ -->
        <section class="grid-row-3">

          <!-- Task progress -->
          <div class="card card-tasks">
            <div class="card-header">
              <div class="section-badge badge-green">
                <span class="badge-dot"></span> Task Progress
              </div>
              <NuxtLink to="/student/tasks" class="card-link">Lihat semua →</NuxtLink>
            </div>

            <!-- Donut chart visual -->
            <div class="task-overview">
              <div class="donut-wrap">
                <svg class="donut-svg" viewBox="0 0 80 80">
                  <circle class="donut-track" cx="40" cy="40" r="32" fill="none" stroke-width="10"/>
                  <circle class="donut-done" cx="40" cy="40" r="32" fill="none" stroke-width="10"
                    :stroke-dasharray="`${taskStats.donePercent * 2.0106} ${200 - taskStats.donePercent * 2.0106}`"
                    stroke-dashoffset="50"/>
                  <circle class="donut-inprog" cx="40" cy="40" r="32" fill="none" stroke-width="10"
                    :stroke-dasharray="`${taskStats.inProgPercent * 2.0106} ${200 - taskStats.inProgPercent * 2.0106}`"
                    :stroke-dashoffset="`${50 - taskStats.donePercent * 2.0106}`"/>
                </svg>
                <div class="donut-center">
                  <span class="donut-pct">{{ taskStats.donePercent }}%</span>
                  <span class="donut-lbl">Selesai</span>
                </div>
              </div>
              <div class="task-legend">
                <div class="legend-item" v-for="l in taskLegend" :key="l.label">
                  <span class="legend-dot" :style="{ background: l.color }"></span>
                  <span class="legend-label">{{ l.label }}</span>
                  <span class="legend-count">{{ l.count }}</span>
                </div>
              </div>
            </div>

            <!-- Individual tasks -->
            <div class="task-list">
              <div v-for="task in recentTasks" :key="task.id" class="task-row" :class="`task-${task.status}`">
                <div class="task-check">
                  <svg v-if="task.status === 'done'" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="3,8 6,11 13,4"/>
                  </svg>
                  <svg v-else-if="task.status === 'inprog'" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="8" cy="8" r="5"/>
                    <path d="M8 5v3l2 1"/>
                  </svg>
                  <svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="8" cy="8" r="5"/>
                  </svg>
                </div>
                <div class="task-info">
                  <span class="task-name">{{ task.name }}</span>
                  <span class="task-cat">{{ task.category }}</span>
                </div>
                <span class="task-status-pill" :class="`pill-${task.status}`">{{ task.statusLabel }}</span>
              </div>
            </div>
          </div>

          <!-- Mentor Feedback -->
          <div class="card card-feedback">
            <div class="card-header">
              <div class="section-badge badge-indigo">
                <span class="badge-dot"></span> Feedback Mentor
              </div>
              <NuxtLink to="/student/feedback" class="card-link">Semua feedback →</NuxtLink>
            </div>

            <div v-for="fb in mentorFeedbacks" :key="fb.id" class="feedback-item">
              <div class="fb-mentor">
                <div class="fb-avatar" :style="{ background: fb.avatarBg }">{{ fb.mentorInit }}</div>
                <div class="fb-meta">
                  <span class="fb-name">{{ fb.mentorName }}</span>
                  <span class="fb-time">{{ fb.time }}</span>
                </div>
                <div class="fb-rating">
                  <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= fb.rating }">★</span>
                </div>
              </div>
              <div class="fb-task-ref">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="2" y="2" width="12" height="12" rx="2"/><line x1="5" y1="6" x2="11" y2="6"/><line x1="5" y1="9" x2="9" y2="9"/>
                </svg>
                {{ fb.taskRef }}
              </div>
              <blockquote class="fb-quote">"{{ fb.comment }}"</blockquote>
              <div class="fb-tags">
                <span v-for="tag in fb.tags" :key="tag" class="fb-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 4: Notifications ═══ -->
        <section class="card card-notifications">
          <div class="card-header">
            <div class="section-badge badge-red">
              <span class="badge-dot anim"></span> Notifikasi Penting
            </div>
            <span class="notif-count-badge">{{ urgentNotifications.filter(n => !n.read).length }} baru</span>
          </div>
          <div class="notif-grid">
            <div v-for="n in urgentNotifications" :key="n.id" class="notif-card" :class="[`nctype-${n.type}`, { 'nc-unread': !n.read }]">
              <div class="nc-icon-wrap">
                <span v-html="n.icon"></span>
              </div>
              <div class="nc-body">
                <div class="nc-header-row">
                  <span class="nc-title">{{ n.title }}</span>
                  <span v-if="!n.read" class="nc-new">Baru</span>
                </div>
                <p class="nc-desc">{{ n.desc }}</p>
                <span class="nc-time">{{ n.time }}</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Sidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Dashboard — Carriera Course',
  description: 'Overview aktivitas belajar, proyek aktif, deadline, dan feedback mentor kamu di Carriera Course.'
})

definePageMeta({ layout: 'dashboard' })

/* ─── Sidebar state ─── */
const sidebarOpen = ref(false)
const notifOpen = ref(false)

/* ─── Date & Sprint ─── */
const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const sprintNumber = ref(4)

/* ─── Nav items ─── */
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
    to: '/student/progress', label: 'Progress',
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

/* ─── Summary stats ─── */
const summaryStats = [
  {
    label: 'Tasks Selesai',
    value: '18 / 24',
    trend: '+3 minggu ini',
    trendUp: true,
    bg: 'rgba(100,88,245,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6458f5" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>'
  },
  {
    label: 'Sprint Progress',
    value: '68%',
    trend: 'Tepat waktu',
    trendUp: true,
    bg: 'rgba(16,185,129,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
  },
  {
    label: 'Feedback Diterima',
    value: '7',
    trend: '2 belum dibaca',
    trendUp: false,
    bg: 'rgba(99,102,241,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
  },
  {
    label: 'Deadline Minggu Ini',
    value: '3',
    trend: '1 hari lagi terdekat',
    trendUp: false,
    bg: 'rgba(245,158,11,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  }
]

/* ─── Active project ─── */
const activeProject = reactive({
  title: 'E-Commerce Platform — "ThreadMark"',
  desc: 'Membangun platform e-commerce fashion streetwear dari nol dengan fitur lengkap: katalog produk, cart, checkout, dan dashboard admin. Real client brief dari brand lokal.',
  status: 'active',
  statusLabel: 'On Track',
  sprint: 4,
  totalSprints: 6,
  sprintEnd: '14 Apr 2026',
  progress: 68,
  tech: ['Nuxt 3', 'Pinia', 'TailwindCSS', 'Supabase', 'Figma'],
  team: [
    { init: 'AJ', name: 'Arka Jenar' },
    { init: 'RS', name: 'Rizky Satria' },
    { init: 'DP', name: 'Dinda Putri' },
    { init: 'MW', name: 'Maulana W.' },
  ]
})

/* ─── Deadlines ─── */
const deadlines = ref([
  { id: 1, name: 'Prototype UI — Checkout Flow', project: 'ThreadMark',  date: '11 Apr', remaining: '1 hari',  urgency: 'critical' },
  { id: 2, name: 'API Integration — Product List',  project: 'ThreadMark',  date: '14 Apr', remaining: '4 hari',  urgency: 'warning' },
  { id: 3, name: 'Sprint 4 Review Presentation',    project: 'ThreadMark',  date: '14 Apr', remaining: '4 hari',  urgency: 'warning' },
  { id: 4, name: 'Unit Test — Auth Module',          project: 'ThreadMark',  date: '18 Apr', remaining: '8 hari',  urgency: 'normal' },
  { id: 5, name: 'Portfolio Case Study Write-up',   project: 'Portfolio',    date: '25 Apr', remaining: '15 hari', urgency: 'normal' },
])

/* ─── Task stats ─── */
const taskStats = reactive({ donePercent: 75, inProgPercent: 17 })
const taskLegend = [
  { label: 'Selesai',      color: '#6458f5', count: 18 },
  { label: 'Dalam progres', color: '#F59E0B', count: 4 },
  { label: 'Belum mulai',  color: '#E5E7EB', count: 2 },
]
const recentTasks = ref([
  { id: 1, name: 'Design system & component library',       category: 'UI/UX',       status: 'done',   statusLabel: 'Selesai' },
  { id: 2, name: 'Auth flow — login & register',           category: 'Frontend',    status: 'done',   statusLabel: 'Selesai' },
  { id: 3, name: 'Checkout page prototype',                category: 'UI/UX',       status: 'inprog', statusLabel: 'Progres' },
  { id: 4, name: 'Integrasi Supabase — product table',    category: 'Backend',     status: 'inprog', statusLabel: 'Progres' },
  { id: 5, name: 'Unit testing auth module',               category: 'Testing',     status: 'todo',   statusLabel: 'Belum' },
])

/* ─── Mentor feedbacks ─── */
const mentorFeedbacks = ref([
  {
    id: 1,
    mentorName: 'Kak Yudha Pratama',
    mentorInit: 'YP',
    avatarBg: 'linear-gradient(135deg,#6458f5,#818cf8)',
    time: '2 jam lalu',
    rating: 4,
    taskRef: 'Design System & Component Library',
    comment: 'Konsistensi komponen sudah bagus! Pastikan naming convention di Figma dan kode sinkron. Typography scale-nya perlu sedikit penyesuaian untuk mobile.',
    tags: ['UI/UX', 'Revisi Minor', 'Good Progress']
  },
  {
    id: 2,
    mentorName: 'Kak Sari Dewi',
    mentorInit: 'SD',
    avatarBg: 'linear-gradient(135deg,#10B981,#34D399)',
    time: 'Kemarin, 15:30',
    rating: 5,
    taskRef: 'Auth Flow — Login & Register',
    comment: 'Excellent! Validasi sudah lengkap dan UX-nya sangat smooth. Implementasi loading state-nya sangat baik. Bisa dijadikan referensi untuk task lain.',
    tags: ['Frontend', 'Approved', 'Best Practice']
  }
])

/* ─── Notifications (panel dropdown) ─── */
const notifications = ref([
  { id: 1, type: 'revision', message: 'Kak Yudha meminta revisi pada task "Checkout Page Prototype"', time: '30 menit lalu', read: false, icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 4H13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h2"/><path d="M9 2H7a1 1 0 00-1 1v1h4V3a1 1 0 00-1-1z"/></svg>' },
  { id: 2, type: 'deadline', message: 'Deadline "Prototype UI Checkout" tinggal 1 hari lagi!', time: '1 jam lalu', read: false, icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1"/></svg>' },
  { id: 3, type: 'feedback', message: 'Kak Sari memberikan feedback baru untuk task Auth Flow', time: 'Kemarin', read: true, icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 10a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1h10a1 1 0 011 1z"/></svg>' },
  { id: 4, type: 'update', message: 'Brief proyek ThreadMark Sprint 4 telah diupdate', time: '2 hari lalu', read: true, icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1z"/><line x1="5" y1="6" x2="11" y2="6"/><line x1="5" y1="9" x2="8" y2="9"/></svg>' },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
const markAllRead = () => { notifications.value.forEach(n => n.read = true) }

/* ─── Urgent notifications (dashboard card) ─── */
const urgentNotifications = ref([
  {
    id: 1, type: 'revision', read: false,
    title: 'Revisi Diminta',
    desc: 'Kak Yudha meminta revisi pada "Checkout Page Prototype" — fokus pada mobile viewport dan state management cart.',
    time: '30 menit lalu',
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>'
  },
  {
    id: 2, type: 'deadline', read: false,
    title: 'Deadline Mendekat!',
    desc: '"Prototype UI Checkout Flow" jatuh tempo besok 11 April 2026 pukul 23:59. Segera finalisasi!',
    time: '1 jam lalu',
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 1.5"/></svg>'
  },
  {
    id: 3, type: 'brief', read: false,
    title: 'Brief Sprint 4 Diupdate',
    desc: 'Project manager memperbarui scope Sprint 4. Ada penambahan fitur wishlist dan perubahan prioritas API integration.',
    time: '3 jam lalu',
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M9 12h6m-6-4h6m2 8H3a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z"/></svg>'
  },
  {
    id: 4, type: 'mentorship', read: true,
    title: 'Sesi Mentorship Terjadwal',
    desc: 'Kak Yudha menjadwalkan sesi 1-on-1 pada Jumat 12 April 2026 jam 16.00 WIB. Siapkan pertanyaan!',
    time: '5 jam lalu',
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>'
  },
])
</script>

<style scoped>
/* ══════════════════════════════════════
   BASE
══════════════════════════════════════ */
.dash-page {
  display: flex;
  min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: hidden;
}

/* ── Ambients ── */
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.ambient-tl { top: -5%;  left: -5%;  width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(165,180,252,.05), transparent 70%); }
.ambient-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }

.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right,  rgba(100,88,245,.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100,88,245,.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}

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

/* Logo */
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

/* Nav */
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
.nav-item:hover { background: rgba(255,255,255,.05); color: #D1D5DB; }
.nav-item.active { background: rgba(100,88,245,.15); color: #A5B4FC; }
.nav-item.active .nav-icon { color: #818CF8; }
.nav-icon { width: 18px; height: 18px; flex-shrink: 0; display: flex; align-items: center; }
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

/* User card */
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
.user-name  { display: block; font-size: .8125rem; font-weight: 600; color: #F9FAFB; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role  { display: block; font-size: .6875rem; color: #6B7280; }
.user-logout {
  background: none; border: none; cursor: pointer;
  color: #4B5563; padding: .375rem; border-radius: 8px;
  transition: all .2s; display: flex;
}
.user-logout svg { width: 16px; height: 16px; }
.user-logout:hover { background: rgba(255,255,255,.07); color: #F87171; }

/* Mobile sidebar overlay */
.sidebar-overlay {
  display: none;
  position: fixed; inset: 0; z-index: 190;
  background: rgba(0,0,0,.5);
  backdrop-filter: blur(2px);
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
.main-wrap {
  margin-left: 260px;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

/* ── Topbar ── */
.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.topbar-toggle {
  display: none;
  background: none; border: none; cursor: pointer;
  padding: .375rem; border-radius: 8px; color: #374151;
  transition: background .2s;
}
.topbar-toggle:hover { background: rgba(0,0,0,.06); }
.topbar-toggle svg { width: 20px; height: 20px; }
.topbar-greeting { flex: 1; }
.greeting-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -.02em;
  margin: 0;
}
.greeting-title em { font-style: normal; color: #6458f5; }
.greeting-sub { font-size: .8125rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-actions { display: flex; gap: .5rem; }
.action-btn {
  width: 40px; height: 40px;
  border-radius: 10px;
  border: 1.5px solid #E5E7EB;
  background: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #6B7280;
  transition: all .2s;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.action-btn:hover { border-color: #6458f5; color: #6458f5; }
.action-btn svg { width: 18px; height: 18px; }
.notif-dot {
  position: absolute; top: 5px; right: 5px;
  width: 8px; height: 8px; border-radius: 50%; background: #EF4444;
  border: 2px solid #fff;
  font-size: .5rem; color: #fff;
  display: flex; align-items: center; justify-content: center;
  min-width: 16px; width: auto; padding: 0 3px;
  top: -2px; right: -2px;
}

/* Notification dropdown */
.notif-panel {
  position: fixed; top: 65px; right: 1.5rem; z-index: 500;
  width: 360px;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,.12);
  overflow: hidden;
}
.notif-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #F3F4F6;
  font-size: .875rem; font-weight: 600; color: #111827;
}
.notif-mark-all {
  font-size: .75rem; color: #6458f5; background: none; border: none; cursor: pointer;
  font-weight: 500;
}
.notif-list { list-style: none; max-height: 340px; overflow-y: auto; }
.notif-item {
  display: flex; gap: .875rem;
  padding: .875rem 1.25rem;
  transition: background .15s; cursor: pointer;
  border-bottom: 1px solid #F9FAFB;
}
.notif-item:hover { background: #F9FAFB; }
.notif-item.unread { background: rgba(100,88,245,.03); }
.notif-icon-wrap {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #F3F4F6; color: #6B7280;
}
.notif-icon-wrap :deep(svg) { width: 15px; height: 15px; }
.type-revision .notif-icon-wrap  { background: rgba(239,68,68,.08);  color: #EF4444; }
.type-deadline .notif-icon-wrap  { background: rgba(245,158,11,.08); color: #F59E0B; }
.type-feedback .notif-icon-wrap  { background: rgba(100,88,245,.08); color: #6458f5; }
.type-update   .notif-icon-wrap  { background: rgba(16,185,129,.08); color: #10B981; }
.notif-body { flex: 1; min-width: 0; }
.notif-msg  { font-size: .8125rem; color: #374151; line-height: 1.5; margin-bottom: .25rem; }
.notif-time { font-size: .75rem; color: #9CA3AF; }

/* ── Dashboard content ── */
.dash-content {
  padding: 1.75rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ════════════════════ STATS ROW ════════════════════ */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.stat-card {
  background: #fff;
  border: 1px solid #E9EBF0;
  border-radius: 16px;
  padding: 1.25rem 1.375rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  transition: transform .2s, box-shadow .2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.07); }
.stat-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.stat-icon-wrap :deep(svg) { width: 22px; height: 22px; }
.stat-data { flex: 1; min-width: 0; }
.stat-value { display: block; font-size: 1.25rem; font-weight: 700; color: #111827; letter-spacing: -.025em; }
.stat-label { display: block; font-size: .75rem; color: #9CA3AF; font-weight: 500; margin-top: .1rem; }
.stat-trend { font-size: .6875rem; font-weight: 600; color: #9CA3AF; white-space: nowrap; }
.stat-trend.up { color: #10B981; }

/* ════════════════════ ROW 2 ════════════════════ */
.grid-row-2 {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1.25rem;
}

/* ── Card base ── */
.card {
  background: #fff;
  border: 1px solid #E9EBF0;
  border-radius: 20px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.125rem;
  gap: .75rem;
}
.card-title-group { display: flex; flex-direction: column; gap: .5rem; }
.card-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -.02em;
  margin: 0;
  line-height: 1.3;
}
.card-link {
  font-size: .8125rem; color: #6458f5; text-decoration: none;
  font-weight: 600; white-space: nowrap; flex-shrink: 0;
}
.card-link:hover { color: #5448e0; }

/* Section badges */
.section-badge {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .6875rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; padding: .3rem .75rem;
  border-radius: 9999px; border: 1px solid transparent;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50; flex-shrink: 0;
}
.badge-dot.anim { animation: pulse-dot 1.5s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }

.badge-purple { background: rgba(100,88,245,.08); color: #6458f5; border-color: rgba(100,88,245,.18); }
.badge-purple .badge-dot { background: #6458f5; }
.badge-orange { background: rgba(245,158,11,.08); color: #D97706; border-color: rgba(245,158,11,.18); }
.badge-orange .badge-dot { background: #F59E0B; }
.badge-green  { background: rgba(16,185,129,.08); color: #059669; border-color: rgba(16,185,129,.18); }
.badge-green  .badge-dot { background: #10B981; }
.badge-indigo { background: rgba(99,102,241,.08); color: #4F46E5; border-color: rgba(99,102,241,.18); }
.badge-indigo .badge-dot { background: #6366F1; }
.badge-red    { background: rgba(239,68,68,.08); color: #DC2626; border-color: rgba(239,68,68,.18); }
.badge-red    .badge-dot { background: #EF4444; }

/* ── Active Project ── */
.project-status {
  font-size: .6875rem; font-weight: 700; padding: .3rem .75rem;
  border-radius: 9999px; flex-shrink: 0; letter-spacing: .04em;
}
.status-active { background: rgba(16,185,129,.1); color: #059669; }
.status-behind { background: rgba(239,68,68,.1);  color: #DC2626; }
.status-paused { background: rgba(245,158,11,.1); color: #D97706; }

.project-desc {
  font-size: .875rem; color: #6B7280; line-height: 1.7;
  margin-bottom: 1.25rem;
}

.sprint-info { margin-bottom: 1.25rem; }
.sprint-meta {
  display: flex; justify-content: space-between;
  font-size: .8125rem; font-weight: 600; color: #374151;
  margin-bottom: .5rem;
}
.sprint-date { color: #9CA3AF; font-weight: 400; }

.progress-bar-wrap {
  height: 8px; background: #F3F4F6; border-radius: 9999px; overflow: hidden;
  margin-bottom: .375rem;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6458f5, #818CF8);
  border-radius: 9999px;
  transition: width .8s cubic-bezier(.4,0,.2,1);
  position: relative;
}
.progress-bar::after {
  content: ''; position: absolute; right: 0; top: 0; bottom: 0;
  width: 12px; border-radius: 9999px;
  background: rgba(255,255,255,.5);
  animation: shimmer 2s infinite;
}
@keyframes shimmer { 0%,100%{opacity:0;} 50%{opacity:1;} }

.progress-labels {
  display: flex; justify-content: space-between;
  font-size: .75rem; color: #9CA3AF;
}
.progress-pct { font-weight: 700; color: #6458f5; }

.tech-tags { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: 1.25rem; }
.tech-tag {
  font-size: .6875rem; font-weight: 600;
  padding: .25rem .625rem; border-radius: 6px;
  background: #F3F4F6; color: #4B5563;
  border: 1px solid #E5E7EB;
}

.project-team {
  display: flex; align-items: center; gap: .875rem;
  padding-top: 1.125rem;
  border-top: 1px solid #F3F4F6;
}
.team-avatars { display: flex; }
.team-av {
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, #6458f5, #818CF8);
  font-size: .625rem; font-weight: 700; color: #fff;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
  margin-left: -6px;
}
.team-av:first-child { margin-left: 0; }
.team-label { font-size: .8125rem; color: #9CA3AF; flex: 1; }

.btn-goto {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .5rem 1rem; border-radius: 10px;
  background: #6458f5; color: #fff;
  text-decoration: none;
  font-size: .8125rem; font-weight: 600;
  box-shadow: 0 4px 14px rgba(100,88,245,.3);
  transition: all .2s; white-space: nowrap;
}
.btn-goto svg { width: 14px; height: 14px; transition: transform .2s; }
.btn-goto:hover { background: #5448e0; box-shadow: 0 8px 24px rgba(100,88,245,.4); transform: translateY(-1px); }
.btn-goto:hover svg { transform: translateX(3px); }

/* ── Deadlines ── */
.deadline-list { list-style: none; display: flex; flex-direction: column; gap: .625rem; }
.deadline-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: .875rem 1rem;
  border-radius: 12px;
  background: #FAFAFA;
  border: 1px solid #F3F4F6;
  gap: .75rem;
  transition: background .15s;
}
.deadline-item:hover { background: #F5F6FB; }
.dl-left  { display: flex; align-items: center; gap: .75rem; flex: 1; min-width: 0; }
.dl-right { flex-shrink: 0; text-align: right; }
.dl-urgency-bar {
  width: 3px; height: 36px; border-radius: 9999px; flex-shrink: 0;
}
.urgency-critical .dl-urgency-bar { background: #EF4444; }
.urgency-warning  .dl-urgency-bar { background: #F59E0B; }
.urgency-normal   .dl-urgency-bar { background: #10B981; }
.dl-info { min-width: 0; }
.dl-name { display: block; font-size: .8125rem; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dl-project { display: block; font-size: .6875rem; color: #9CA3AF; margin-top: .1rem; }
.dl-date { display: block; font-size: .8125rem; font-weight: 600; color: #374151; }
.dl-remaining { display: block; font-size: .6875rem; font-weight: 700; margin-top: .1rem; }
.remaining-critical { color: #EF4444; }
.remaining-warning  { color: #F59E0B; }
.remaining-normal   { color: #10B981; }

/* ════════════════════ ROW 3 ════════════════════ */
.grid-row-3 {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.25rem;
}

/* ── Task progress ── */
.task-overview {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1rem 0 1.25rem;
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: 1rem;
}
.donut-wrap { position: relative; flex-shrink: 0; }
.donut-svg { width: 80px; height: 80px; transform: rotate(-90deg); }
.donut-track   { stroke: #F3F4F6; }
.donut-done    { stroke: #6458f5; stroke-linecap: round; transition: stroke-dasharray .8s cubic-bezier(.4,0,.2,1); }
.donut-inprog  { stroke: #F59E0B; stroke-linecap: round; transition: stroke-dasharray .8s cubic-bezier(.4,0,.2,1); }
.donut-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.donut-pct { font-size: 1rem; font-weight: 800; color: #111827; letter-spacing: -.03em; }
.donut-lbl { font-size: .5625rem; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: .05em; }
.task-legend { display: flex; flex-direction: column; gap: .5rem; }
.legend-item { display: flex; align-items: center; gap: .5rem; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-label { font-size: .75rem; color: #6B7280; flex: 1; }
.legend-count { font-size: .75rem; font-weight: 700; color: #111827; }

.task-list { display: flex; flex-direction: column; gap: .5rem; }
.task-row {
  display: flex; align-items: center; gap: .75rem;
  padding: .625rem .75rem;
  border-radius: 10px; transition: background .15s; cursor: default;
}
.task-row:hover { background: #F9FAFB; }
.task-check {
  width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.task-check :deep(svg) { width: 14px; height: 14px; }
.task-done   .task-check { background: rgba(100,88,245,.1); color: #6458f5; }
.task-inprog .task-check { background: rgba(245,158,11,.1); color: #F59E0B; }
.task-todo   .task-check { background: #F3F4F6; color: #9CA3AF; }
.task-info { flex: 1; min-width: 0; }
.task-name { display: block; font-size: .8125rem; font-weight: 500; color: #111827; }
.task-done .task-name { text-decoration: line-through; color: #9CA3AF; }
.task-cat { display: block; font-size: .6875rem; color: #9CA3AF; margin-top: .1rem; }
.task-status-pill {
  font-size: .6875rem; font-weight: 700;
  padding: .2rem .55rem; border-radius: 6px; flex-shrink: 0;
}
.pill-done   { background: rgba(100,88,245,.08); color: #6458f5; }
.pill-inprog { background: rgba(245,158,11,.08); color: #D97706; }
.pill-todo   { background: #F3F4F6; color: #9CA3AF; }

/* ── Mentor Feedback ── */
.feedback-item {
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #F3F4F6;
}
.feedback-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.fb-mentor { display: flex; align-items: center; gap: .75rem; margin-bottom: .75rem; }
.fb-avatar {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
.fb-meta { flex: 1; }
.fb-name { display: block; font-size: .875rem; font-weight: 700; color: #111827; }
.fb-time { display: block; font-size: .6875rem; color: #9CA3AF; }
.fb-rating { display: flex; gap: .1rem; }
.star { font-size: .875rem; color: #E5E7EB; transition: color .15s; }
.star.filled { color: #FBBF24; }
.fb-task-ref {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .75rem; font-weight: 500; color: #6B7280;
  background: #F9FAFB; border: 1px solid #E5E7EB;
  padding: .25rem .625rem; border-radius: 8px;
  margin-bottom: .625rem;
}
.fb-task-ref :deep(svg) { width: 12px; height: 12px; flex-shrink: 0; }
.fb-quote {
  font-size: .875rem; color: #374151; line-height: 1.7;
  font-style: italic; margin-bottom: .75rem;
  padding-left: .875rem;
  border-left: 3px solid #E5E7EB;
}
.fb-tags { display: flex; flex-wrap: wrap; gap: .375rem; }
.fb-tag {
  font-size: .6875rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; background: #F3F4F6; color: #4B5563;
  border: 1px solid #E5E7EB;
}

/* ════════════════════ NOTIFICATIONS CARD ════════════════════ */
.card-notifications { }
.notif-count-badge {
  font-size: .6875rem; font-weight: 700;
  padding: .25rem .625rem; border-radius: 9999px;
  background: rgba(239,68,68,.1); color: #DC2626;
}
.notif-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .875rem;
  margin-top: .25rem;
}
.notif-card {
  display: flex; gap: .875rem;
  border-radius: 14px; padding: 1rem 1.125rem;
  background: #FAFAFA;
  border: 1px solid #F0F1F6;
  transition: all .2s; cursor: pointer;
}
.notif-card:hover { border-color: #E0E2EF; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,.06); }
.notif-card.nc-unread {
  background: rgba(100,88,245,.025);
  border-color: rgba(100,88,245,.15);
}
.nc-icon-wrap {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.nc-icon-wrap :deep(svg) { width: 16px; height: 16px; }
.nctype-revision .nc-icon-wrap  { background: rgba(239,68,68,.1);  color: #EF4444; }
.nctype-deadline .nc-icon-wrap  { background: rgba(245,158,11,.1); color: #F59E0B; }
.nctype-brief    .nc-icon-wrap  { background: rgba(16,185,129,.1); color: #10B981; }
.nctype-mentorship .nc-icon-wrap{ background: rgba(100,88,245,.1); color: #6458f5; }
.nc-body { flex: 1; min-width: 0; }
.nc-header-row { display: flex; align-items: center; gap: .5rem; margin-bottom: .3rem; }
.nc-title { font-size: .875rem; font-weight: 700; color: #111827; }
.nc-new {
  font-size: .5625rem; font-weight: 800; letter-spacing: .04em;
  text-transform: uppercase; color: #6458f5;
  background: rgba(100,88,245,.1); padding: .15rem .45rem; border-radius: 5px;
}
.nc-desc { font-size: .8125rem; color: #6B7280; line-height: 1.6; margin-bottom: .375rem; }
.nc-time { font-size: .6875rem; color: #9CA3AF; }

/* ════════════════════ TRANSITIONS ════════════════════ */
.fade-down-enter-active,
.fade-down-leave-active { transition: all .2s cubic-bezier(.4,0,.2,1); }
.fade-down-enter-from   { opacity: 0; transform: translateY(-8px); }
.fade-down-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ════════════════════ RESPONSIVE ════════════════════ */
@media (max-width: 1280px) {
  .stats-row   { grid-template-columns: repeat(2, 1fr); }
  .grid-row-2  { grid-template-columns: 1fr; }
  .grid-row-3  { grid-template-columns: 1fr; }
  .notif-grid  { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.sidebar-open { transform: translateX(0); }
  .sidebar-overlay { display: block; }
  .main-wrap { margin-left: 0; }
  .topbar { padding: .875rem 1.25rem; }
  .topbar-toggle { display: flex; }
  .dash-content { padding: 1.25rem 1.25rem 2.5rem; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .notif-panel { right: .75rem; width: calc(100vw - 1.5rem); }
}

@media (max-width: 560px) {
  .stats-row { grid-template-columns: 1fr; }
  .greeting-title { font-size: .9375rem; }
}
</style>
