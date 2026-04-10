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
          <h1 class="greeting-title">Library & Toolkit 🛠️</h1>
          <p class="greeting-sub">Referensi cepat dan dokumentasi. Gunakan seperlunya untuk membuka blokade proyekmu.</p>
        </div>
      </header>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">
        
        <!-- Reminder Banner -->
        <div class="disclaimer-banner">
          <div class="db-icon">💡</div>
          <div class="db-text">
            <strong>Platform ini bukan Course Center.</strong>
            Waktu terpentingmu adalah saat menulis kode dan menyelesaikan tiket proyek, bukan sekadar menonton tutorial. Gunakan library ini dengan pendekatan *Just-in-Time Learning* (pelajari hanya saat kamu mengalami kendala teknis).
          </div>
        </div>

        <div class="resources-layout">
          
          <!-- LEFT COL: Best Practices & JIT Learning -->
          <div class="res-col-main">
            
            <!-- Section: Just in Time Learning -->
            <section class="r-section">
              <div class="section-badge badge-indigo mb-sm">
                <span class="badge-dot"></span> Just-In-Time Learning
              </div>
              <h2 class="r-title">Referensi & Snippet Cepat</h2>
              <div class="r-grid">
                <a href="#" class="res-card inline-card" v-for="ref in quickRefs" :key="ref.id">
                  <div class="rc-icon bg-indigo-light text-indigo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div class="rc-body">
                    <h4 class="rc-title">{{ ref.title }}</h4>
                    <span class="rc-meta">{{ ref.time }} baca • {{ ref.tag }}</span>
                  </div>
                </a>
              </div>
            </section>

            <!-- Section: Best Practices -->
            <section class="r-section mt-lg">
              <div class="section-badge badge-green mb-sm">
                <span class="badge-dot" style="background:#10B981"></span> Standard Industri
              </div>
              <h2 class="r-title">Best Practices & Guidelines</h2>
              <div class="bp-list">
                <div class="bp-card" v-for="bp in bestPractices" :key="bp.id">
                  <div class="bp-head">
                    <div class="bp-icon">✓</div>
                    <h4 class="bp-title">{{ bp.title }}</h4>
                  </div>
                  <p class="bp-desc">{{ bp.desc }}</p>
                  <a href="#" class="bp-link">Baca Guideline Lengkap →</a>
                </div>
              </div>
            </section>

          </div>

          <!-- RIGHT COL: Tools & Recordings -->
          <div class="res-col-side">
            
            <!-- Section: Tools & Boilerplates -->
            <section class="r-section card p-md">
              <div class="section-badge badge-orange mb-sm">
                <span class="badge-dot"></span> Ekosistem Proyek
              </div>
              <h2 class="r-title">Tools & Ekstensi</h2>
              <p class="r-desc">Aset pendukung standar untuk setiap sprint.</p>
              
              <div class="tools-list">
                <a href="#" class="tool-item" v-for="tool in toolsList" :key="tool.id">
                  <img :src="tool.iconUrl" alt="" class="tool-logo" v-if="tool.iconUrl"/>
                  <div class="tool-logo-placeholder" v-else>{{ tool.initial }}</div>
                  <div class="tool-info">
                    <span class="tool-name">{{ tool.name }}</span>
                    <span class="tool-type">{{ tool.type }}</span>
                  </div>
                  <svg class="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </section>

            <!-- Section: Mentoring Recordings -->
            <section class="r-section card p-md mt-md">
              <div class="section-badge badge-purple mb-sm">
                <span class="badge-dot" style="background:#8B5CF6"></span> Arsip Sinkronus
              </div>
              <h2 class="r-title">Recording Mentoring</h2>
              <p class="r-desc">Rekaman sesi 1-on-1 dan Sprint Review</p>
              
              <div class="record-list">
                <div class="record-item" v-for="rec in recordings" :key="rec.id">
                  <div class="rec-thumb">
                    <div class="rec-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                    <span class="rec-dur">{{ rec.duration }}</span>
                  </div>
                  <div class="rec-info">
                    <h5 class="rec-title">{{ rec.title }}</h5>
                    <span class="rec-date">{{ rec.date }}</span>
                  </div>
                </div>
              </div>
              <button class="btn-block mt-3">Lihat Semua Arsip</button>
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
  title: 'Library & Toolkit — Carriera Course',
  description: 'Referensi cepat, guidelines, tools, dan arsip rekaman kelas untuk membantumu menyelesaikan tiket proyek.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)

/* ── MOCK DATA ── */
const quickRefs = ref([
  { id: 1, title: 'Menangani State Auth di sisi SSR (Nuxt 3)', time: '4 min', tag: 'Vue/Nuxt' },
  { id: 2, title: 'Setup RLS (Row Level Security) Supabase', time: '6 min', tag: 'Database' },
  { id: 3, title: 'Meresolve Merge Conflict Git seperti Pro', time: '3 min', tag: 'Workflow' },
  { id: 4, title: 'Panduan Ekspor Asset dari Figma ke SVG', time: '2 min', tag: 'UI/UX' }
])

const bestPractices = ref([
  { id: 1, title: 'Struktur Folder Nuxt 3 Skala Produksi', desc: 'Cara kami menyusun /components, /composables, dan /utils di internal Carriera agar terhindar dari spaghetti code.' },
  { id: 2, title: 'Clean Component & Props Typing', desc: 'Aturan wajib saat membungkus UI Component. Wajib menggunakan TypeScript strict mode untuk mendefinisikan prop.' },
  { id: 3, title: 'Atomic CSS & Penamaan Class', desc: 'Standarisasi BEM (Block Element Modifier) tanpa framework untuk UI modular tinggi sesuai metodologi kami.' }
])

const toolsList = ref([
  { id: 1, name: 'Carriera Design System v2', type: 'Figma Library', initial: 'FIG', iconUrl: '' },
  { id: 2, name: 'Nuxt 3 Pixel Boilerplate', type: 'GitHub Repo', initial: 'GH', iconUrl: '' },
  { id: 3, name: 'REST Client Config (Insomnia)', type: 'API Workspace', initial: 'INS', iconUrl: '' },
  { id: 4, name: 'VSCode ESLint Prettier Auto-format', type: 'Extension', initial: 'VS', iconUrl: '' }
])

const recordings = ref([
  { id: 1, title: 'SPRINT 3: Backend Kick-off', date: '04 Apr 2026', duration: '45:12' },
  { id: 2, title: '1-on-1 Arka & Kak Yudha (Review DB)', date: '01 Apr 2026', duration: '28:40' },
  { id: 3, title: 'Tech Sharing: Redis Caching Basics', date: '28 Mar 2026', duration: '55:00' }
])
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
.dash-content { padding: 1.75rem 2rem 3rem; display: flex; flex-direction: column; gap: 1.5rem; }

@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; background: none; border: none; cursor: pointer; }
  .dash-content { padding: 1.25rem 1rem 3rem; }
}

/* ── Utility ── */
.card { background: #fff; border: 1px solid #E9EBF0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.02); }
.p-md { padding: 1.5rem; }
.mt-md { margin-top: 1.5rem; }
.mt-lg { margin-top: 2.5rem; }
.mb-sm { margin-bottom: .75rem; }
.mt-3 { margin-top: 1rem; }

.section-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .75rem; border-radius: 999px; font-size: .75rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-indigo { background: rgba(99,102,241,.1); color: #4F46E5; } .badge-indigo .badge-dot { background: #6366F1; }
.badge-orange { background: rgba(245,158,11,.1); color: #D97706; } .badge-orange .badge-dot { background: #F59E0B; }
.badge-green { background: rgba(16,185,129,.1); color: #059669; }
.badge-purple { background: rgba(139,92,246,.1); color: #7C3AED; }

/* ════════════════════ DISCLAIMER BANNER ════════════════════ */
.disclaimer-banner {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1.25rem 1.5rem; background: rgba(245,158,11,.1); border-left: 4px solid #F59E0B;
  border-radius: 12px; margin-bottom: 1rem;
}
.db-icon { font-size: 1.5rem; line-height: 1; margin-top: 2px; }
.db-text { font-size: .875rem; color: #92400E; line-height: 1.6; }
.db-text strong { display: block; color: #B45309; font-size: .9375rem; margin-bottom: .25rem; }

/* ════════════════════ STRUCTURE ════════════════════ */
.resources-layout {
  display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start;
}
@media (max-width: 900px) {
  .resources-layout { grid-template-columns: 1fr; }
}

.res-col-main { display: flex; flex-direction: column; }
.res-col-side { display: flex; flex-direction: column; position: sticky; top: 90px; }

.r-title { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 0 0 .5rem; }
.r-desc { font-size: .875rem; color: #6B7280; margin: 0 0 1.25rem; }

/* ════════════════════ JUST IN TIME (Cards) ════════════════════ */
.r-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
@media (max-width: 640px) { .r-grid { grid-template-columns: 1fr; } }

.inline-card {
  display: flex; align-items: center; gap: 1rem; padding: 1.25rem;
  background: #fff; border: 1px solid #E5E7EB; border-radius: 14px; text-decoration: none;
  transition: all .2s; box-shadow: 0 2px 6px rgba(0,0,0,.02);
}
.inline-card:hover { border-color: #A5B4FC; box-shadow: 0 4px 12px rgba(99,102,241,.06); transform: translateY(-2px); }

.rc-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bg-indigo-light { background: rgba(99,102,241,.1); } .text-indigo { color: #6366F1; }
.rc-icon svg { width: 22px; height: 22px; }

.rc-body { display: flex; flex-direction: column; gap: .25rem; flex: 1; }
.rc-title { font-size: .875rem; font-weight: 600; color: #111827; margin: 0; line-height: 1.4; }
.rc-meta { font-size: .75rem; color: #9CA3AF; }

/* ════════════════════ BEST PRACTICES ════════════════════ */
.bp-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
.bp-card {
  padding: 1.25rem 1.5rem; background: #fff; border-left: 3px solid #10B981; border-radius: 0 12px 12px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,.02); border-top: 1px solid #F3F4F6; border-right: 1px solid #F3F4F6; border-bottom: 1px solid #F3F4F6;
}
.bp-head { display: flex; align-items: center; gap: .75rem; margin-bottom: .5rem; }
.bp-icon { width: 20px; height: 20px; background: #10B981; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .65rem; font-weight: 800; }
.bp-title { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0; }
.bp-desc { font-size: .8125rem; color: #4B5563; line-height: 1.6; margin: 0 0 .75rem; }
.bp-link { display: inline-block; font-size: .8125rem; font-weight: 600; color: #10B981; text-decoration: none; transition: color .2s; }
.bp-link:hover { color: #047857; text-decoration: underline; }

/* ════════════════════ TOOLS ════════════════════ */
.tools-list { display: flex; flex-direction: column; gap: .5rem; }
.tool-item {
  display: flex; align-items: center; gap: 1rem; padding: .875rem;
  background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 10px;
  text-decoration: none; transition: all .2s;
}
.tool-item:hover { background: #fff; border-color: #D1D5DB; }
.tool-logo-placeholder { width: 36px; height: 36px; border-radius: 8px; background: #E5E7EB; color: #4B5563; display: flex; align-items: center; justify-content: center; font-size: .6875rem; font-weight: 700; flex-shrink: 0; }
.tool-info { flex: 1; display: flex; flex-direction: column; }
.tool-name { font-size: .8125rem; font-weight: 600; color: #111827; }
.tool-type { font-size: .6875rem; color: #6B7280; margin-top: .1rem; }
.tool-arrow { width: 16px; height: 16px; color: #9CA3AF; transition: transform .2s; }
.tool-item:hover .tool-arrow { transform: translateX(3px); color: #111827; }

/* ════════════════════ RECORDINGS ════════════════════ */
.record-list { display: flex; flex-direction: column; gap: 1rem; }
.record-item { display: flex; gap: 1rem; align-items: center; cursor: pointer; padding-bottom: 1rem; border-bottom: 1px solid #F3F4F6; }
.record-item:last-child { border-bottom: none; padding-bottom: 0; }
.rec-thumb {
  position: relative; width: 80px; height: 48px; background: #1F2937; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.rec-play { width: 24px; height: 24px; background: rgba(255,255,255,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; }
.rec-play svg { width: 14px; height: 14px; margin-left: 2px; }
.rec-dur { position: absolute; bottom: 4px; right: 4px; background: rgba(0,0,0,.7); color: #fff; font-size: .6rem; padding: .1rem .3rem; border-radius: 4px; font-weight: 600; }
.record-item:hover .rec-play { background: rgba(100,88,245,.8); }

.rec-info { flex: 1; }
.rec-title { font-size: .8125rem; font-weight: 600; color: #111827; margin: 0 0 .25rem; line-height: 1.4; }
.rec-date { font-size: .6875rem; color: #6B7280; }

.btn-block { display: block; width: 100%; border: 1px solid #E5E7EB; background: #FAFAFA; padding: .6rem; border-radius: 8px; font-family: inherit; font-size: .8125rem; font-weight: 600; color: #4B5563; cursor: pointer; transition: all .2s; }
.btn-block:hover { background: #F3F4F6; color: #111827; }

/* Overlays */
.sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,.5); backdrop-filter: blur(2px); }
@media (max-width: 900px) { .sidebar-overlay { display: block; } }
</style>
