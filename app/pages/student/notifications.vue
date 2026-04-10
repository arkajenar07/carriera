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
          <h1 class="greeting-title">Notification Center 🔔</h1>
          <p class="greeting-sub">Jaga ritme kerjamu. Pastikan tidak ada aksi krusial yang tertunda.</p>
        </div>
      </header>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">
        
        <div class="notif-layout">
          
          <!-- ── Left Sidebar (Filters) ── -->
          <aside class="notif-filters">
            <h3 class="filter-header">Filter Transaksi</h3>
            <div class="filter-list">
              <button class="filter-btn" :class="{ active: currentFilter === 'all' }" @click="currentFilter = 'all'">
                <div class="f-icon bg-gray"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
                <span>Semua Aktivitas</span>
                <span class="f-count">{{ notifications.length }}</span>
              </button>
              
              <button class="filter-btn" :class="{ active: currentFilter === 'deadline' }" @click="currentFilter = 'deadline'">
                <div class="f-icon bg-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <span>Deadline Reminder</span>
                <span class="f-count" v-if="counts.deadline">{{ counts.deadline }}</span>
              </button>

              <button class="filter-btn" :class="{ active: currentFilter === 'feedback' }" @click="currentFilter = 'feedback'">
                <div class="f-icon bg-indigo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
                <span>Feedback Masuk</span>
                <span class="f-count" v-if="counts.feedback">{{ counts.feedback }}</span>
              </button>

              <button class="filter-btn" :class="{ active: currentFilter === 'revision' }" @click="currentFilter = 'revision'">
                <div class="f-icon bg-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></div>
                <span>Revisi Request</span>
                <span class="f-count" v-if="counts.revision">{{ counts.revision }}</span>
              </button>

              <button class="filter-btn" :class="{ active: currentFilter === 'project' }" @click="currentFilter = 'project'">
                <div class="f-icon bg-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></div>
                <span>Update Project</span>
                <span class="f-count" v-if="counts.project">{{ counts.project }}</span>
              </button>
            </div>
          </aside>

          <!-- ── Right Content (List) ── -->
          <div class="notif-feed">
            <div class="feed-header border-b">
              <h2 class="fh-title">
                {{ filterLabels[currentFilter] }} 
                <span v-if="unreadCount > 0" class="badge-unread">{{ unreadCount }} Belum dibaca</span>
              </h2>
              <button class="btn-text" @click="markAllAsRead">Tandai semua dibaca</button>
            </div>

            <!-- Empty State -->
            <div class="empty-state" v-if="filteredNotifications.length === 0">
              <div class="es-icon">🎉</div>
              <h3>Belum ada Notifikasi</h3>
              <p>Inbox-zero tercapai. Tetap fokus pada sprintmu!</p>
            </div>

            <!-- List -->
            <div class="feed-list" v-else>
              <template v-for="(group, dateLabel) in groupedNotifications" :key="dateLabel">
                <div class="date-sep"><span>{{ dateLabel }}</span></div>
                
                <div 
                  v-for="item in group" 
                  :key="item.id" 
                  class="card notif-card" 
                  :class="[`type-${item.type}`, { 'is-unread': !item.read }]"
                  @click="item.read = true"
                >
                  <div class="nc-side-bar"></div>
                  <div class="nc-icon-wrap" v-html="typeConfig[item.type].icon"></div>
                  
                  <div class="nc-core">
                    <div class="nc-head">
                      <h4 class="nc-title">{{ item.title }}</h4>
                      <span class="nc-time">{{ item.time }}</span>
                    </div>
                    <p class="nc-desc">{{ item.desc }}</p>
                    
                    <!-- Smart Actions rendering based on Type -->
                    <div class="nc-actions" v-if="item.actionUrl">
                      <NuxtLink :to="item.actionUrl" class="btn-action" :class="`btn-${item.type}`">
                        {{ typeConfig[item.type].btnLabel }}
                      </NuxtLink>
                      <button class="btn-outline" v-if="item.secondaryLabel">{{ item.secondaryLabel }}</button>
                    </div>
                  </div>
                  
                  <div class="nc-unread-dot" v-if="!item.read"></div>
                </div>
              </template>
            </div>
          </div>
          
        </div>

      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Notification Center — Carriera Course',
  description: 'Pusat notifikasi untuk deadline, feedback mentor, dan pembaruan sistem.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)
const currentFilter = ref('all')

const filterLabels: Record<string, string> = {
  all: 'Semua Aktivitas',
  deadline: 'Deadline Reminder',
  feedback: 'Feedback Masuk',
  revision: 'Revisi Request',
  project: 'Update Project'
}

/* ── UI Config by Type ── */
const typeConfig: Record<string, any> = {
  deadline: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    btnLabel: 'Kerjakan Task',
  },
  feedback: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    btnLabel: 'Lihat Review',
  },
  revision: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
    btnLabel: 'Buka Revisi',
  },
  project: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
    btnLabel: 'Lihat Detail Update',
  }
}

/* ── MOCK DATA ── */
interface Notif {
  id: number;
  type: 'deadline'|'feedback'|'revision'|'project';
  title: string;
  desc: string;
  time: string;
  dateStr: string; // Used for grouping 
  read: boolean;
  actionUrl: string;
  secondaryLabel?: string;
}

const notifications = ref<Notif[]>([
  {
    id: 1, type: 'revision', read: false, dateStr: 'Hari Ini', time: '10:30 WIB',
    title: 'Kak Yudha Meminta Revisi: Checkout Flow',
    desc: 'Terdapat kendala state management pada cart saat checkout. Tolong perbaiki logic re-rendering-nya sebelum besok agar dapat merge ke main branch.',
    actionUrl: '/student/tasks', secondaryLabel: 'Lihat Pull Request'
  },
  {
    id: 2, type: 'deadline', read: false, dateStr: 'Hari Ini', time: '08:00 WIB',
    title: 'Peringatan: Deadline Tersisa 24 Jam',
    desc: 'Task "Integrasi Payment Gateway Stripe" harus di-submit sebelum 11 April 2026. Prioritaskan task ini hari ini.',
    actionUrl: '/student/tasks/23'
  },
  {
    id: 3, type: 'feedback', read: true, dateStr: 'Kemarin', time: '14:20 WIB',
    title: 'Feedback Baru dari Kak Sari',
    desc: '"Visual hierarchy sudah on-point. Untuk komponen Button, perhatikan accessibility contrast-nya ya..."',
    actionUrl: '/student/feedback'
  },
  {
    id: 4, type: 'project', read: true, dateStr: 'Kemarin', time: '09:00 WIB',
    title: 'Assets Project ThreadMark Diperbarui',
    desc: 'Project Manager (Sandi) menambahkan 12 file design asset baru ke Folder UI/UX. Sinkronisasikan file Figma terbarumu.',
    actionUrl: '/student/workspace', secondaryLabel: 'Buka Workspace'
  },
  {
    id: 5, type: 'deadline', read: true, dateStr: 'Minggu Ini', time: 'Senin, 10:00 WIB',
    title: 'Deadline Terlewat: Unit Testing',
    desc: 'Kamu belum submit repo unit testing untuk module Auth. Mohon segera diselesaikan agar portfolio tracker mu dapat dinilai.',
    actionUrl: '/student/tasks'
  }
])

/* ── Computed & Logic ── */
const counts = computed(() => {
  return {
    deadline: notifications.value.filter(n => n.type === 'deadline').length,
    feedback: notifications.value.filter(n => n.type === 'feedback').length,
    revision: notifications.value.filter(n => n.type === 'revision').length,
    project: notifications.value.filter(n => n.type === 'project').length,
  }
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const filteredNotifications = computed(() => {
  if (currentFilter.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === currentFilter.value)
})

// Group by Date string (Hari Ini, Kemarin, dst)
const groupedNotifications = computed(() => {
  const groups: Record<string, Notif[]> = {}
  for (const n of filteredNotifications.value) {
    if (!groups[n.dateStr]) groups[n.dateStr] = []
    groups[n.dateStr].push(n)
  }
  return groups
})

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>

<style scoped>
/* ══════════════════════════════════════
   BASE & LAYOUT
══════════════════════════════════════ */
.dash-page { display: flex; min-height: 100vh; background: #F8F9FD; font-family: 'Instrument Sans', 'Raleway', sans-serif; position: relative; overflow-x: hidden; }
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.ambient-tl { top: -5%;  left: -5%;  width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(239,68,68,.04), transparent 70%); }
.ambient-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }
.bg-grid { pointer-events: none; position: fixed; inset: 0; z-index: 0; background-image: linear-gradient(to right, rgba(0,0,0,.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.02) 1px, transparent 1px); background-size: 80px 80px; }

.main-wrap { margin-left: 260px; flex: 1; min-width: 0; position: relative; z-index: 10; display: flex; flex-direction: column; }
.topbar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; gap: 1rem; padding: 1rem 2rem; background: rgba(248,249,253,.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,.06); }
.greeting-title { font-size: 1.0625rem; font-weight: 600; color: #111827; margin: 0; }
.greeting-sub { font-size: .8125rem; color: #6B7280; font-style: italic; margin-top: .1rem; }
.topbar-toggle { display: none; }
.dash-content { padding: 1.75rem 2rem 3rem; }

@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; background: none; border: none; cursor: pointer; }
  .dash-content { padding: 1.25rem 1rem 3rem; }
}

/* ── Utility ── */
.card { background: #fff; border: 1px solid #E9EBF0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.02); }
.border-b { border-bottom: 1px solid #F3F4F6; }

/* ════════════════════ NOTIF LAYOUT ════════════════════ */
.notif-layout {
  display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;
}
@media (max-width: 900px) {
  .notif-layout { grid-template-columns: 1fr; }
}

/* ── LEFT: Filters ── */
.notif-filters {
  position: sticky; top: 90px;
}
.filter-header { font-size: .8125rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 1rem; padding-left: .5rem; }
.filter-list { display: flex; flex-direction: column; gap: .35rem; }
.filter-btn {
  display: flex; align-items: center; gap: .75rem; width: 100%; padding: .6rem .75rem;
  background: transparent; border: none; border-radius: 10px; cursor: pointer; text-align: left;
  font-family: inherit; font-size: .875rem; font-weight: 600; color: #4B5563; transition: all .2s;
}
.filter-btn:hover { background: rgba(255,255,255,.6); color: #111827; }
.filter-btn.active { background: #fff; color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,.03); border: 1px solid #E5E7EB; }

.f-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.f-icon svg { width: 14px; height: 14px; }
.bg-gray   { background: #F3F4F6; color: #4B5563; }
.bg-orange { background: rgba(245,158,11,.15); color: #D97706; }
.bg-indigo { background: rgba(99,102,241,.15); color: #4F46E5; }
.bg-purple { background: rgba(139,92,246,.15); color: #7C3AED; }
.bg-green  { background: rgba(16,185,129,.15); color: #059669; }

.f-count { margin-left: auto; font-size: .75rem; background: #F3F4F6; padding: .1rem .4rem; border-radius: 99px; }
.filter-btn.active .f-count { background: #E5E7EB; }

/* ── RIGHT: Feed ── */
.notif-feed {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,.02);
  min-height: 500px;
}
.feed-header {
  display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.75rem; background: #FAFAFA; border-radius: 16px 16px 0 0;
}
.fh-title { font-size: 1.125rem; font-weight: 700; color: #111827; margin: 0; display: flex; align-items: center; gap: .75rem; }
.badge-unread { font-size: .6875rem; background: #EF4444; color: #fff; padding: .2rem .5rem; border-radius: 6px; font-weight: 600; }
.btn-text { background: none; border: none; font-size: .8125rem; font-weight: 600; color: #6458f5; cursor: pointer; font-family: inherit; }
.btn-text:hover { text-decoration: underline; }

.feed-list { padding: 1rem 1.75rem 2rem; display: flex; flex-direction: column; gap: .75rem; }

/* Date Separator */
.date-sep { position: relative; text-align: center; margin: 1rem 0 .25rem; }
.date-sep::before { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: #F3F4F6; z-index: 1; }
.date-sep span { position: relative; z-index: 2; background: #fff; padding: 0 1rem; font-size: .75rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: .05em; }

/* Card */
.notif-card {
  position: relative; display: flex; gap: 1rem; padding: 1.25rem; border-radius: 14px; overflow: hidden;
  box-shadow: none; border: 1px solid #FAFAFA; cursor: pointer; transition: all .2s; background: #fff;
}
.notif-card:hover { border-color: #E5E7EB; box-shadow: 0 4px 12px rgba(0,0,0,.02); }
.notif-card.is-unread { background: #FAFAFB; border-color: #E5E7EB; }

.nc-side-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #E5E7EB; }
.type-deadline .nc-side-bar { background: #F59E0B; }
.type-feedback .nc-side-bar { background: #6366F1; }
.type-revision .nc-side-bar { background: #8B5CF6; }
.type-project  .nc-side-bar { background: #10B981; }

.nc-icon-wrap { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #F3F4F6; color: #6B7280; }
.nc-icon-wrap svg { width: 20px; height: 20px; }
.type-deadline .nc-icon-wrap { background: rgba(245,158,11,.1); color: #F59E0B; }
.type-feedback .nc-icon-wrap { background: rgba(99,102,241,.1); color: #6366F1; }
.type-revision .nc-icon-wrap { background: rgba(139,92,246,.1); color: #8B5CF6; }
.type-project  .nc-icon-wrap { background: rgba(16,185,129,.1); color: #10B981; }

.nc-core { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: .35rem; }
.nc-head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.nc-title { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0; }
.nc-time { font-size: .75rem; color: #9CA3AF; white-space: nowrap; }
.nc-desc { font-size: .8125rem; color: #4B5563; line-height: 1.5; margin: 0; }

.nc-actions { display: flex; gap: .5rem; margin-top: .75rem; }
.btn-action { display: inline-block; text-decoration: none; font-size: .75rem; font-weight: 600; padding: .4rem .8rem; border-radius: 8px; transition: background .2s; }
.btn-deadline { background: #FEF3C7; color: #B45309; } .btn-deadline:hover { background: #FDE68A; }
.btn-feedback { background: #E0E7FF; color: #4338CA; } .btn-feedback:hover { background: #C7D2FE; }
.btn-revision { background: #EDE9FE; color: #6D28D9; } .btn-revision:hover { background: #DDD6FE; }
.btn-project  { background: #D1FAE5; color: #047857; } .btn-project:hover { background: #A7F3D0; }

.btn-outline { background: #fff; border: 1px solid #D1D5DB; padding: .4rem .8rem; border-radius: 8px; font-size: .75rem; font-weight: 600; color: #374151; font-family: inherit; cursor: pointer; transition: all .2s; }
.btn-outline:hover { background: #F9FAFB; border-color: #9CA3AF; }

.nc-unread-dot { width: 10px; height: 10px; background: #EF4444; border-radius: 50%; box-shadow: 0 0 0 3px #fff; position: absolute; right: 1rem; top: 1.5rem; }

/* Empty State */
.empty-state { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 4rem 2rem; color: #6B7280; }
.es-icon { font-size: 3rem; margin-bottom: 1rem; }
.empty-state h3 { font-size: 1.125rem; color: #111827; margin-bottom: .25rem; }

/* Overlays */
.sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,.5); backdrop-filter: blur(2px); }
@media (max-width: 900px) { .sidebar-overlay { display: block; } }
</style>
