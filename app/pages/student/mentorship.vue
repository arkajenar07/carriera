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
          <h1 class="greeting-title">Mentorship & Check-in 🎯</h1>
          <p class="greeting-sub">Diskusi, dapatkan insight, dan pantau perkembanganmu langsung dengan ekspert.</p>
        </div>
      </header>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">

        <!-- ═══ ROW 1: Booking Session ═══ -->
        <section class="booking-section">
          <div class="section-header">
            <h2 class="section-title">Booking Sesi Baru</h2>
            <p class="section-desc">Pilih jenis mentoring yang sesuai dengan kebutuhan belajarmu saat ini.</p>
          </div>
          
          <div class="booking-cards">
            <!-- 1:1 Mentoring -->
            <div class="book-card">
              <div class="book-icon-wrap bg-purple-light">
                <svg viewBox="0 0 24 24" fill="none" class="text-purple" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div class="book-info">
                <h3>Mentoring 1-on-1</h3>
                <p>Private session 45 menit untuk review code, portfolio, atau kendala spesifik.</p>
              </div>
              <button class="btn-book">Jadwalkan 1:1</button>
            </div>

            <!-- Group Mentoring -->
            <div class="book-card">
              <div class="book-icon-wrap bg-green-light">
                <svg viewBox="0 0 24 24" fill="none" class="text-green" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div class="book-info">
                <h3>Group Mentoring</h3>
                <p>Diskusi kelompok untuk sprint review harian bersama teman-teman & mentor.</p>
              </div>
              <button class="btn-book">Gabung Group</button>
            </div>
          </div>
        </section>

        <div class="grid-layout">
          <!-- ═══ LEFT COLUMN ═══ -->
          <div class="left-col">
            
            <!-- Jadwal Session -->
            <section class="card schedule-card">
              <div class="card-header border-b">
                <div class="section-badge badge-orange">
                  <span class="badge-dot"></span> Jadwal Sesi Mendatang
                </div>
              </div>
              <div class="schedule-list">
                <div v-for="session in upcomingSessions" :key="session.id" class="session-item">
                  <div class="session-date-box">
                    <span class="sd-day">{{ session.day }}</span>
                    <span class="sd-month">{{ session.month }}</span>
                  </div>
                  <div class="session-details">
                    <h4 class="s-title">{{ session.title }}</h4>
                    <div class="s-meta">
                      <span class="s-time ms-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {{ session.time }}
                      </span>
                      <span class="s-type ms-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 21v-8a1 1 0 00-1-1h-4a1 1 0 00-1 1v8"/><path d="M3 10V4a1 1 0 011-1h16a1 1 0 011 1v6"/></svg>
                        {{ session.type }}
                      </span>
                    </div>
                    <div class="s-mentor">Mentor: <strong>{{ session.mentor }}</strong></div>
                  </div>
                  <div class="session-actions">
                    <button class="btn-meet">Gabung Meet</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Catatan Mentoring -->
            <section class="card notes-card">
              <div class="card-header border-b">
                <div class="section-badge badge-indigo">
                  <span class="badge-dot"></span> Catatan & Insight Mentor
                </div>
              </div>
              <div class="notes-list">
                <div v-for="note in mentorNotes" :key="note.id" class="note-box">
                  <div class="note-head">
                    <div class="n-mentor">
                      <div class="n-avatar">{{ note.init }}</div>
                      <div>
                        <div class="n-name">{{ note.mentor }}</div>
                        <div class="n-topic">{{ note.topic }}</div>
                      </div>
                    </div>
                    <span class="n-date">{{ note.date }}</span>
                  </div>
                  <p class="n-text">"{{ note.note }}"</p>
                  <div class="n-tags">
                    <span v-for="tag in note.tags" :key="tag" class="n-tag">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- ═══ RIGHT COLUMN ═══ -->
          <div class="right-col">
            
            <!-- Riwayat Mentoring -->
            <section class="card history-card">
              <div class="card-header border-b">
                <div class="section-badge badge-gray">
                  <span class="badge-dot" style="background:#9CA3AF"></span> Riwayat Sesimu
                </div>
              </div>
              <div class="history-list">
                <div v-for="h in historySessions" :key="h.id" class="history-item">
                  <div class="h-icon" :class="h.type === '1:1 Session' ? 'bg-purple-light text-purple' : 'bg-green-light text-green'">
                    <svg v-if="h.type === '1:1 Session'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </div>
                  <div class="h-details">
                    <h4 class="h-title">{{ h.topic }}</h4>
                    <p class="h-meta">{{ h.date }} • {{ h.mentor }}</p>
                  </div>
                  <span class="h-status" :class="'h-status-'+h.status.toLowerCase()">{{ h.status }}</span>
                </div>
              </div>
              <button class="btn-load-more">Lihat Lebih Banyak</button>
            </section>

          </div>
        </div>

      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Mentorship — Carriera Course',
  description: 'Jadwalkan sesi 1:1, group mentoring, dan lihat feedback langsung dari ekspert.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)

/* ── Dummy Data ── */
const upcomingSessions = ref([
  {
    id: 1,
    day: '14', month: 'Apr',
    title: 'Review System Architecture',
    time: '16:00 - 16:45 WIB', type: '1:1 Mentoring',
    mentor: 'Kak Yudha Pratama'
  },
  {
    id: 2,
    day: '16', month: 'Apr',
    title: 'Weekly Sprint Check-in (Group C)',
    time: '19:30 - 20:30 WIB', type: 'Group Session',
    mentor: 'Kak Sari Dewi'
  }
])

const mentorNotes = ref([
  {
    id: 1,
    init: 'YP', mentor: 'Kak Yudha Pratama',
    topic: '1:1 • Review Architecture', date: '08 Apr 2026',
    note: 'Struktur database sudah lumayan kuat. Tinggal perlu memperhatikan index di table transaksi untuk optimasi read query. Boleh baca-baca lagi soal B-Tree indexing.',
    tags: ['Database', 'Optimization', 'To-Do']
  },
  {
    id: 2,
    init: 'SD', mentor: 'Kak Sari Dewi',
    topic: 'Group • Sprint Planning', date: '04 Apr 2026',
    note: 'Arka proaktif banget menjelaskan kendala API. Next-nya coba break down task API integration jadi sub-task yang lebih kecil supaya gampang ditrack ya.',
    tags: ['Soft-skill', 'Planning']
  }
])

const historySessions = ref([
  {
    id: 1, topic: 'Review System Architecture', date: '08 Apr 2026', mentor: 'Kak Yudha P.', type: '1:1 Session', status: 'Selesai'
  },
  {
    id: 2, topic: 'Weekly Sprint Check-in', date: '04 Apr 2026', mentor: 'Kak Sari D.', type: 'Group Session', status: 'Selesai'
  },
  {
    id: 3, topic: 'Kickoff Sprint 4', date: '01 Apr 2026', mentor: 'Kak Yudha P.', type: 'Group Session', status: 'Selesai'
  },
  {
    id: 4, topic: 'Career Mapping & CV Review', date: '25 Mar 2026', mentor: 'Kak Budi S.', type: '1:1 Session', status: 'Selesai'
  },
  {
    id: 5, topic: 'Debugging React Hooks', date: '20 Mar 2026', mentor: 'Kak Sari D.', type: '1:1 Session', status: 'Missed'
  }
])
</script>

<style scoped>
/* ══════════════════════════════════════
   BASE & LAYOUT (Sama dengan Dashboard)
══════════════════════════════════════ */
.dash-page {
  display: flex;
  min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  position: relative;
  overflow-x: hidden;
}

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

.main-wrap {
  margin-left: 260px;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.greeting-title { font-size: 1.0625rem; font-weight: 600; color: #111827; margin: 0; }
.greeting-sub { font-size: .8125rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-toggle { display: none; }

.dash-content {
  padding: 1.75rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; background: none; border: none; cursor: pointer; }
  .dash-content { padding: 1.25rem 1rem 3rem; }
}

/* ══════════════════════════════════════
   BOOKING SECTION
══════════════════════════════════════ */
.booking-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: .5rem;
}
.section-header { margin-bottom: .25rem; }
.section-title { font-size: 1.25rem; font-weight: 600; color: #111827; }
.section-desc { font-size: .875rem; color: #6B7280; }

.booking-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.book-card {
  background: #fff;
  border: 1px solid #E9EBF0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.02);
  transition: all .2s;
}
.book-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.05); border-color: #D1D5DB; }

.book-icon-wrap {
  width: 56px; height: 56px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.bg-purple-light { background: rgba(100,88,245,.1); }
.text-purple { color: #6458f5; }
.bg-green-light { background: rgba(16,185,129,.1); }
.text-green { color: #10B981; }

.book-info { flex: 1; }
.book-info h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: .35rem; }
.book-info p { font-size: .8125rem; color: #6B7280; line-height: 1.5; }

.btn-book {
  background: #111827; color: #fff;
  border: none; padding: .6rem 1.2rem;
  border-radius: 10px; font-weight: 500; font-family: inherit; font-size: .875rem;
  cursor: pointer; transition: background .2s; flex-shrink: 0;
}
.btn-book:hover { background: #374151; }

@media (max-width: 900px) {
  .booking-cards { grid-template-columns: 1fr; }
  .book-card { flex-direction: column; text-align: center; }
}

/* ══════════════════════════════════════
   GRID LAYOUT
══════════════════════════════════════ */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1100px) {
  .grid-layout { grid-template-columns: 1fr; }
}

.left-col, .right-col { display: flex; flex-direction: column; gap: 1.5rem; }

/* ── Card Base ── */
.card {
  background: #fff;
  border: 1px solid #E9EBF0;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,.02);
}
.card-header { padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
.border-b { border-bottom: 1px solid #F3F4F6; }

/* Section Badges */
.section-badge {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .35rem .75rem; border-radius: 999px;
  font-size: .75rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
}
.badge-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-orange  { background: rgba(245,158,11,.1); color: #D97706; }
.badge-orange .badge-dot { background: #F59E0B; }
.badge-indigo { background: rgba(99,102,241,.1); color: #4F46E5; }
.badge-indigo .badge-dot { background: #6366F1; }
.badge-gray { background: #F3F4F6; color: #4B5563; }

/* ════════════════════ SCHEDULE ════════════════════ */
.schedule-list { padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.session-item {
  display: flex; gap: 1rem; align-items: center;
  padding: 1rem; border-radius: 12px; border: 1px solid #F3F4F6;
  background: #FAFAFA; transition: border .2s;
}
.session-item:hover { border-color: #E5E7EB; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.03); }

.session-date-box {
  width: 60px; height: 60px; background: #fff; border: 1px solid #E5E7EB; border-radius: 10px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;
}
.sd-day { font-size: 1.25rem; font-weight: 700; color: #111827; line-height: 1; }
.sd-month { font-size: .6875rem; font-weight: 600; color: #6458f5; text-transform: uppercase; margin-top: .2rem; }

.session-details { flex: 1; min-width: 0; }
.s-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .3rem; }
.s-meta { display: flex; gap: 1rem; color: #6B7280; font-size: .8125rem; }
.ms-icon { display: flex; align-items: center; gap: .35rem; }
.ms-icon svg { width: 14px; height: 14px; }
.s-mentor { margin-top: .35rem; font-size: .8125rem; color: #4B5563; }

.session-actions { flex-shrink: 0; }
.btn-meet {
  background: #6458f5; color: #fff; border: none; padding: .5rem 1rem; border-radius: 8px;
  font-weight: 500; font-family: inherit; font-size: .8125rem; cursor: pointer; transition: background .2s;
}
.btn-meet:hover { background: #5448e0; }

/* ════════════════════ NOTES ════════════════════ */
.notes-list { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.note-box {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 12px;
  padding: 1.25rem; box-shadow: 0 2px 6px rgba(0,0,0,.02);
}
.note-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: .875rem; }
.n-mentor { display: flex; align-items: center; gap: .75rem; }
.n-avatar {
  width: 36px; height: 36px; border-radius: 8px;
  background: linear-gradient(135deg, #6458f5, #818cf8); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 700;
}
.n-name { font-size: .875rem; font-weight: 600; color: #111827; }
.n-topic { font-size: .75rem; color: #6B7280; margin-top: .1rem; }
.n-date { font-size: .75rem; color: #9CA3AF; }

.n-text { font-size: .875rem; color: #374151; line-height: 1.6; margin-bottom: 1rem; font-style: italic; }
.n-tags { display: flex; flex-wrap: wrap; gap: .5rem; }
.n-tag {
  background: #F3F4F6; color: #4B5563; font-size: .7rem; font-weight: 600;
  padding: .2rem .5rem; border-radius: 4px;
}

/* ════════════════════ HISTORY ════════════════════ */
.history-list { padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: .75rem; }
.history-item {
  display: flex; align-items: center; gap: 1rem;
  padding: .75rem 0; border-bottom: 1px solid #F3F4F6;
}
.history-item:last-child { border-bottom: none; }
.h-icon {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.h-icon svg { width: 18px; height: 18px; }

.h-details { flex: 1; min-width: 0; }
.h-title { font-size: .875rem; font-weight: 600; color: #111827; margin-bottom: .2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.h-meta { font-size: .75rem; color: #6B7280; }

.h-status { font-size: .7rem; font-weight: 600; padding: .25rem .5rem; border-radius: 999px; flex-shrink: 0; }
.h-status-selesai { background: rgba(16,185,129,.1); color: #10B981; }
.h-status-missed { background: rgba(239,68,68,.1); color: #EF4444; }

.btn-load-more {
  display: block; width: calc(100% - 3rem); margin: 0 1.5rem 1.5rem;
  padding: .6rem; text-align: center; border-radius: 8px; font-weight: 600; font-size: .8125rem; font-family: inherit;
  background: #F9FAFB; color: #4B5563; border: 1px solid #E5E7EB; cursor: pointer; transition: all .2s;
}
.btn-load-more:hover { background: #F3F4F6; color: #111827; }

/* ── Overlays ── */
.sidebar-overlay {
  display: none;
  position: fixed; inset: 0; z-index: 190;
  background: rgba(0,0,0,.5); backdrop-filter: blur(2px);
}
@media (max-width: 900px) {
  .sidebar-overlay { display: block; }
}
</style>
