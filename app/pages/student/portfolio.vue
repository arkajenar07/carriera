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
    <Sidebar :open="sidebarOpen" @update:open="sidebarOpen = $event" />

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
          <h1 class="greeting-title">Portfolio Builder 💼</h1>
          <p class="greeting-sub">Ubah keringat dan baris kodemu menjadi rekam jejak yang tak terbantahkan oleh rekruter.</p>
        </div>
      </header>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">

        <!-- ═══ Publish / Export Section ═══ -->
        <section class="publish-section">
          <div class="card publish-card">
            <div class="pc-left">
              <div class="pc-status">
                <span class="status-dot animate-pulse"></span>
                <span>Portfolio Publikmu Siap Dibagikan</span>
              </div>
              <div class="pc-link-box">
                <span class="link-label">Link Portfolio Publik:</span>
                <a href="#" class="link-url">carriera.id/p/arka-jenar</a>
                <button class="btn-copy" title="Salin Link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
                </button>
              </div>
            </div>
            <div class="pc-right">
              <div class="stats-row">
                <div class="stat">
                  <span class="stat-val">{{ projects.filter(p => p.published).length }}</span>
                  <span class="stat-lbl">Proyek Publik</span>
                </div>
                <div class="stat">
                  <span class="stat-val">{{ projects.length }}</span>
                  <span class="stat-lbl">Proyek Approved</span>
                </div>
              </div>
              <div class="pc-actions">
                <button class="btn-outline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export ke PDF
                </button>
                <button class="btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Lihat Live
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ List Projects (Approved) ═══ -->
        <section class="projects-section">
          <div class="section-header">
            <h2 class="section-title">Katalog Proyek Terverifikasi</h2>
            <p class="section-desc">Pilih project yang sudah selesai di-review mentor untuk dijadikan Case Study portfoliomu.</p>
          </div>

          <div class="projects-list">
            <div v-for="(project, index) in projects" :key="project.id" class="card project-card" :class="{ 'is-expanded': activeProjectId === project.id }">
              
              <!-- Project Header (Collapsed View) -->
              <div class="project-header" @click="toggleProject(project.id)">
                <div class="ph-thumb" :style="`background: ${project.bg}`">{{ project.initial }}</div>
                <div class="ph-info">
                  <div class="top-row">
                    <h3 class="ph-title">{{ project.name }}</h3>
                    <span class="ph-badge" :class="project.published ? 'badge-green' : 'badge-gray'">
                      {{ project.published ? 'Live / Publish' : 'Draft' }}
                    </span>
                  </div>
                  <p class="ph-subtitle">{{ project.role }} • Selesai pada {{ project.date }}</p>
                  <div class="ph-tech">
                    <span v-for="tag in project.tech" :key="tag">{{ tag }}</span>
                  </div>
                </div>
                <!-- Expansion Arrow -->
                <div class="ph-action">
                  <button class="btn-expand">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'rotate': activeProjectId === project.id }">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Project Builder (Expanded View) -->
              <div class="project-builder" v-if="activeProjectId === project.id">
                
                <div class="pb-grid">
                  <!-- Left side: Setup & Desc -->
                  <div class="pb-col">
                    <div class="field-item">
                      <label>Judul Tampilan (Display Title)</label>
                      <input type="text" class="input-light" v-model="project.displayName" placeholder="E.g. ThreadMark E-Commerce">
                    </div>
                    <div class="field-item">
                      <label>Deskripsi Singkat (Elevator Pitch)</label>
                      <textarea class="input-light" rows="3" v-model="project.shortDesc" placeholder="Jelaskan dalam 1-2 kalimat apa yang proyek ini selesaikan..."></textarea>
                    </div>
                    
                    <div class="field-toggle">
                      <label class="toggle-label">
                        <input type="checkbox" v-model="project.published">
                        <span class="toggle-switch"></span>
                        Tampilkan proyek ini di portfolio publik
                      </label>
                    </div>
                  </div>

                  <!-- Right side: Case Study Builder -->
                  <div class="pb-col">
                    <h4 class="cs-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      Formula Case Study (STAR)
                    </h4>
                    
                    <div class="field-item">
                      <label class="text-orange">1. Situasi & Masalah (Problem)</label>
                      <textarea class="input-light" rows="3" v-model="project.problem" placeholder="Apa masalah awal klien? Mengapa proyek ini dibuat?"></textarea>
                    </div>

                    <div class="field-item">
                      <label class="text-indigo">2. Pendekatan & Solusi (Approach)</label>
                      <textarea class="input-light" rows="3" v-model="project.solution" placeholder="Sistem apa yang kamu buat? Tech stack apa yang kamu pilih dan mengapa?"></textarea>
                    </div>

                    <div class="field-item">
                      <label class="text-green">3. Dampak & Hasil (Result)</label>
                      <textarea class="input-light" rows="3" v-model="project.result" placeholder="Berapa % peningkatan efisiensi? Apa tanggapan klien? Gunakan metrik!"></textarea>
                    </div>
                  </div>
                </div>

                <div class="pb-footer border-t">
                  <div class="pb-footer-left">
                    <button class="btn-text">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      Kelola Gambar / Thumbnail
                    </button>
                  </div>
                  <div class="pb-footer-right">
                    <span class="save-status text-gray text-sm">Disimpan otomatis</span>
                    <button class="btn-primary" @click="activeProjectId = null">Selesai Edit</button>
                  </div>
                </div>

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
import { ref } from 'vue'
import Sidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Portfolio Builder — Carriera Course',
  description: 'Ubah projectmu menjadi aset portfolio yang tak terbantahkan.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)

/* ── Active Builder State ── */
const activeProjectId = ref<number | null>(1)

const toggleProject = (id: number) => {
  if (activeProjectId.value === id) {
    activeProjectId.value = null
  } else {
    activeProjectId.value = id
  }
}

/* ── MOCK DATA ── */
const projects = ref([
  {
    id: 1,
    name: 'ThreadMark E-Commerce App', displayName: 'ThreadMark.id — Streetwear E-Commerce',
    role: 'Fullstack Eng. & Architect', date: 'Bulan lalu',
    initial: 'TM', bg: 'linear-gradient(135deg, #111827, #374151)',
    tech: ['Nuxt 3', 'Supabase', 'Stripe'],
    published: true,
    shortDesc: 'Platform belanja streetwear dengan fitur checkout langsung dan CMS untuk manajemen stok.',
    problem: 'Klien kehilangan potensi 30% penjualan karena mengandalkan manual order via WhatsApp. Klien membutuhkan sistem auto-checkout.',
    solution: 'Membangun aplikasi PWA berbasis Nuxt 3 untuk load sangat cepat di mobile, dan mengintegrasikan Stripe untuk menerima pembayaran kartu otomatis.',
    result: 'Proses pemesanan menjadi 100% otomatis, menekan human-error hingga 0%, dan mempercepat rilis produk baru ke katalog klien dalam hitungan menit.'
  },
  {
    id: 2,
    name: 'Sistem Inventory Gudang "LogisFlow"', displayName: 'LogisFlow — SaaS Inventory Management',
    role: 'Backend Dev', date: '3 Bulan lalu',
    initial: 'LF', bg: 'linear-gradient(135deg, #6458f5, #818cf8)',
    tech: ['Laravel 10', 'PostgreSQL', 'Redis'],
    published: false,
    shortDesc: 'Dashboard monitoring stok logistik harian dengan real-time reporting.',
    problem: '',
    solution: '',
    result: ''
  },
  {
    id: 3,
    name: 'Landing Page Carriera (Clone)', displayName: 'Carriera Bootcamp Site',
    role: 'Frontend Dev', date: '4 Bulan lalu',
    initial: 'PX', bg: 'linear-gradient(135deg, #10B981, #34D399)',
    tech: ['HTML', 'Vanilla CSS', 'Vue'],
    published: true,
    shortDesc: 'Pekerjaan dasar mereplika design UI/UX platform secara pixel-perfect.',
    problem: 'Memahami prinsip typography, spacing, dan layout yang scalable untuk direplika sesuai file desain.',
    solution: 'Menggunakan metodologi Atomic Design menggunakan Vanilla CSS yang modular tanpa framework.',
    result: 'Mendapat nilai A+ atas kedisiplinan margin dan accessibility.'
  }
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
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(165,180,252,.05), transparent 70%); }
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
.border-t { border-top: 1px solid #F3F4F6; }
.text-sm { font-size: .8125rem; }
.text-gray { color: #9CA3AF; }
.text-orange { color: #F59E0B; }
.text-indigo { color: #6366F1; }
.text-green { color: #10B981; }

.section-header { margin-bottom: 1rem; }
.section-title { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: .25rem; }
.section-desc { font-size: .875rem; color: #6B7280; }

.btn-primary { background: #111827; color: #fff; border: none; padding: .6rem 1.2rem; border-radius: 10px; font-weight: 600; font-family: inherit; font-size: .875rem; cursor: pointer; transition: background .2s; display: inline-flex; align-items: center; gap: .5rem; }
.btn-primary:hover { background: #374151; }
.btn-primary svg { width: 16px; height: 16px; }

.btn-outline { background: #fff; color: #374151; border: 1px solid #D1D5DB; padding: .6rem 1.2rem; border-radius: 10px; font-weight: 600; font-family: inherit; font-size: .875rem; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: .5rem; }
.btn-outline:hover { background: #F9FAFB; border-color: #9CA3AF; }
.btn-outline svg { width: 16px; height: 16px; }

/* ════════════════════ PUBLISH / EXPORT ════════════════════ */
.publish-card {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 2rem; background: linear-gradient(145deg, #fff, #F9FAFB);
  border: 1px solid rgba(100,88,245,.2);
}

.pc-left { display: flex; flex-direction: column; gap: .75rem; }
.pc-status { display: flex; align-items: center; gap: .5rem; font-size: .875rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: .05em; }
.status-dot { width: 10px; height: 10px; background: #10B981; border-radius: 50%; box-shadow: 0 0 10px rgba(16,185,129,.5); }
.animate-pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }

.pc-link-box { display: flex; align-items: center; gap: .5rem; background: #fff; border: 1px solid #E5E7EB; border-radius: 8px; padding: .4rem .4rem .4rem 1rem; width: fit-content; }
.link-label { font-size: .75rem; color: #6B7280; font-weight: 600; }
.link-url { font-family: 'JetBrains Mono', monospace; font-size: .875rem; color: #6458f5; text-decoration: none; font-weight: 600; }
.btn-copy { background: #F3F4F6; border: none; padding: .4rem; border-radius: 6px; cursor: pointer; color: #4B5563; transition: all .2s; display: flex; align-items: center; }
.btn-copy:hover { background: #E5E7EB; color: #111827; }
.btn-copy svg { width: 16px; height: 16px; }

.pc-right { display: flex; align-items: center; gap: 2rem; }
.stats-row { display: flex; gap: 1.5rem; }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-val { font-size: 1.5rem; font-weight: 800; color: #111827; line-height: 1; }
.stat-lbl { font-size: .6875rem; font-weight: 600; color: #6B7280; text-transform: uppercase; margin-top: .2rem; }

.pc-actions { display: flex; gap: .75rem; }

@media (max-width: 900px) {
  .publish-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; }
  .pc-right { flex-direction: column; align-items: flex-start; gap: 1.25rem; width: 100%; }
}

/* ════════════════════ PROJECTS LIST ════════════════════ */
.projects-list { display: flex; flex-direction: column; gap: 1rem; }

.project-card { transition: box-shadow .2s, border-color .2s; }
.project-card:hover { border-color: #D1D5DB; box-shadow: 0 8px 20px rgba(0,0,0,.03); }
.project-card.is-expanded { border-color: rgba(100,88,245,.4); box-shadow: 0 10px 30px rgba(100,88,245,.06); }

/* Header / Collapsed */
.project-header {
  display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem;
  cursor: pointer; user-select: none;
}
.ph-thumb {
  width: 56px; height: 56px; border-radius: 12px; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.25rem; font-weight: 800; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,.1);
}
.ph-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: .25rem; }
.top-row { display: flex; align-items: center; gap: .75rem; }
.ph-title { font-size: 1rem; font-weight: 600; color: #111827; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.ph-badge { font-size: .6875rem; font-weight: 700; padding: .15rem .5rem; border-radius: 4px; text-transform: uppercase; }
.badge-green { background: rgba(16,185,129,.1); color: #10B981; }
.badge-gray  { background: #F3F4F6; color: #6B7280; }

.ph-subtitle { font-size: .8125rem; color: #6B7280; margin: 0; }
.ph-tech { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .4rem; }
.ph-tech span { font-size: .6875rem; font-weight: 600; font-family: 'JetBrains Mono', monospace; background: #FAFAFA; border: 1px solid #E5E7EB; color: #4B5563; padding: .15rem .4rem; border-radius: 4px; }

.ph-action { flex-shrink: 0; }
.btn-expand { background: #F3F4F6; border: none; width: 36px; height: 36px; border-radius: 50%; color: #4B5563; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.btn-expand svg { width: 18px; height: 18px; transition: transform .3s; }
.btn-expand svg.rotate { transform: rotate(180deg); }
.project-header:hover .btn-expand { background: #E5E7EB; color: #111827; }

/* ── Project Builder (Expanded) ── */
.project-builder {
  border-top: 1px solid #F3F4F6;
  background: #FAFAFA;
  border-radius: 0 0 16px 16px;
}
.pb-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 2rem; padding: 1.5rem; }
@media (max-width: 900px) { .pb-grid { grid-template-columns: 1fr; } }

.pb-col { display: flex; flex-direction: column; gap: 1.25rem; }

/* Fields */
.field-item { display: flex; flex-direction: column; gap: .5rem; }
.field-item label { font-size: .8125rem; font-weight: 600; color: #374151; }
.input-light {
  width: 100%; padding: .75rem 1rem; border-radius: 10px; border: 1px solid #D1D5DB;
  font-family: inherit; font-size: .875rem; color: #111827; background: #fff;
  transition: all .2s; resize: vertical; line-height: 1.5;
}
.input-light:focus { outline: none; border-color: #6458f5; box-shadow: 0 0 0 3px rgba(100,88,245,.1); }

.cs-title { display: flex; align-items: center; gap: .5rem; font-size: .9375rem; font-weight: 700; color: #111827; margin: 0 0 .5rem; }
.cs-title svg { width: 18px; height: 18px; color: #6458f5; }

/* Toggle */
.field-toggle { margin-top: .5rem; }
.toggle-label { display: flex; align-items: center; gap: .75rem; cursor: pointer; font-size: .875rem; font-weight: 500; color: #374151; user-select: none; }
.toggle-label input { display: none; }
.toggle-switch {
  position: relative; width: 44px; height: 24px; background: #D1D5DB; border-radius: 99px; transition: background .3s;
}
.toggle-switch::after {
  content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: #fff; border-radius: 50%; transition: left .3s, box-shadow .3s;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}
.toggle-label input:checked ~ .toggle-switch { background: #10B981; }
.toggle-label input:checked ~ .toggle-switch::after { left: 22px; }

/* Footer Actions */
.pb-footer { padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.pb-footer-left, .pb-footer-right { display: flex; align-items: center; gap: 1rem; }
.btn-text {
  background: none; border: none; color: #6B7280; font-size: .875rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: .5rem; transition: color .2s;
}
.btn-text:hover { color: #111827; }
.btn-text svg { width: 16px; height: 16px; }

/* Overlays */
.sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,.5); backdrop-filter: blur(2px); }
@media (max-width: 900px) { .sidebar-overlay { display: block; } }
</style>
