<template>
  <div class="port-page">
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="port-main">

      <!-- ══════════════════════ HERO ══════════════════════ -->
      <section class="hero">
        <div class="hero-text">
          <div class="badge">
            <span class="badge-dot"></span>
            Portfolio Siswa
          </div>
          <h1 class="hero-title">
            Bukan Contoh Soal.<br />
            <em class="accent">Ini Project yang Sudah Live.</em>
          </h1>
          <p class="hero-desc">
            Setiap project di sini dibuat oleh siswa Carriera dalam kondisi nyata —
            simulasi brief industri, deadline sprint, review mentor, dan akhirnya di-deploy ke
            production. Bukan mockup, bukan tutorial clone.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="scrollToShowcase">
              Lihat Semua Project
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost">Ikut Program</NuxtLink>
          </div>
        </div>

        <!-- Hero live stat strip -->
        <div class="hero-stats-col">
          <div v-for="s in heroStats" :key="s.label" class="hstat">
            <span class="hstat-val">{{ s.value }}</span>
            <span class="hstat-lbl">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ SHOWCASE GRID ══════════════════════ -->
      <section class="section" id="showcase">
        <div class="section-label">
          <span class="label-dot"></span>
          Project Showcase
        </div>
        <h2 class="section-title">
          Karya Siswa yang <em class="accent">Sudah di Production.</em>
        </h2>
        <p class="section-desc">
          Filter berdasarkan kategori atau angkatan. Klik project untuk melihat
          full case study, proses pengerjaan, dan link live demo.
        </p>

        <!-- Filter bar -->
        <div class="filter-bar">
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab"
              :class="['filter-tab', { 'filter-tab-active': activeFilter === tab }]"
              @click="activeFilter = tab"
            >{{ tab }}</button>
          </div>
          <div class="filter-cohort">
            <select v-model="activeCohort" class="cohort-select">
              <option value="Semua">Semua Angkatan</option>
              <option v-for="c in cohorts" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <!-- Project grid -->
        <div class="projects-grid">
          <NuxtLink
            v-for="proj in filteredProjects"
            :key="proj.slug"
            :to="`/portfolio/${proj.slug}`"
            class="proj-card"
          >
            <!-- Visual preview -->
            <div class="proj-preview" :style="{ background: proj.gradient }">
              <div class="proj-preview-ui">
                <div class="pui-bar"><span></span><span></span><span></span></div>
                <div class="pui-content">
                  <div class="pui-title">{{ proj.previewTitle }}</div>
                  <div class="pui-blocks">
                    <div class="pui-block pui-block-wide"></div>
                    <div class="pui-block"></div>
                  </div>
                </div>
              </div>
              <div class="proj-preview-overlay">
                <span class="proj-preview-cta">Lihat Case Study →</span>
              </div>
            </div>

            <!-- Card body -->
            <div class="proj-body">
              <div class="proj-top-row">
                <span class="proj-category-tag">{{ proj.category }}</span>
                <span class="proj-cohort-tag">{{ proj.cohort }}</span>
              </div>
              <h3 class="proj-title">{{ proj.title }}</h3>
              <p class="proj-desc">{{ proj.desc }}</p>
              <div class="proj-footer">
                <div class="proj-author">
                  <div class="proj-avatar" :style="{ background: proj.avatarColor }">{{ proj.initials }}</div>
                  <span class="proj-author-name">{{ proj.author }}</span>
                </div>
                <div class="proj-techs">
                  <span v-for="t in proj.techs.slice(0,2)" :key="t" class="proj-tech">{{ t }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-if="filteredProjects.length === 0" class="empty-state">
          <span class="empty-icon">🔍</span>
          <p>Tidak ada project dengan filter ini. Coba kategori lain.</p>
        </div>
      </section>

      <!-- ══════════════════════ CASE STUDY HIGHLIGHT ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Case Study
          </div>
          <h2 class="section-title section-title-light">
            Behind the Build — <em class="accent-light">Proses yang Bikin Kamu Tumbuh.</em>
          </h2>
          <p class="section-desc section-desc-light">
            Portfolio bagus bukan cuma soal hasil akhir. Di sini kita buka semuanya
            — dari brief yang datang, keputusan desain, trial-error, hingga versi final.
          </p>

          <!-- Featured case study -->
          <div class="cs-featured">
            <div class="cs-feat-content">
              <div class="cs-step-label">Case Study Terpilih</div>
              <h3 class="cs-feat-title">{{ featuredCase.title }}</h3>
              <p class="cs-feat-desc">{{ featuredCase.desc }}</p>

              <div class="cs-phases">
                <div v-for="phase in featuredCase.phases" :key="phase.title" class="cs-phase">
                  <div class="cs-phase-icon">{{ phase.icon }}</div>
                  <div>
                    <div class="cs-phase-title">{{ phase.title }}</div>
                    <div class="cs-phase-desc">{{ phase.desc }}</div>
                  </div>
                </div>
              </div>

              <NuxtLink :to="`/portfolio/${featuredCase.slug}`" class="btn-primary btn-sm">
                Baca Full Case Study
                <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>

            <div class="cs-feat-visual">
              <!-- Before / After toggle -->
              <div class="ba-toggle-wrap">
                <div class="ba-tabs">
                  <button :class="['ba-tab', { 'ba-tab-active': baView === 'before' }]" @click="baView = 'before'">Before</button>
                  <button :class="['ba-tab', { 'ba-tab-active': baView === 'after' }]" @click="baView = 'after'">After</button>
                </div>
                <div class="ba-screen" :class="`ba-screen-${baView}`">
                  <div class="ba-bar"><span></span><span></span><span></span></div>
                  <template v-if="baView === 'before'">
                    <div class="ba-before-ui">
                      <div class="bbu-nav bbu-messy"></div>
                      <div class="bbu-hero bbu-dull"></div>
                      <div class="bbu-cards bbu-cramped">
                        <div v-for="i in 3" :key="i" class="bbu-card bbu-card-old"></div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="ba-after-ui">
                      <div class="bau-hero"></div>
                      <div class="bau-badge"></div>
                      <div class="bau-cards">
                        <div v-for="i in 3" :key="i" class="bau-card"></div>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="ba-label" :class="baView === 'before' ? 'ba-label-red' : 'ba-label-green'">
                  {{ baView === 'before' ? '❌ Desain Lama — V1 awal sprint' : '✅ Final — Setelah 2 siklus review' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ HIGHLIGHT TERBAIK ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Highlight Terbaik
        </div>
        <h2 class="section-title">
          Project yang <em class="accent">Paling Banyak Disorot.</em>
        </h2>
        <p class="section-desc">
          Dipilih oleh tim mentor berdasarkan kualitas kode, desain, dan proses kerja —
          bukan hanya tampilan akhirnya.
        </p>

        <div class="highlights-list">
          <div v-for="(hl, i) in highlights" :key="hl.title" class="hl-item">
            <div class="hl-rank">#{{ i + 1 }}</div>
            <div class="hl-preview" :style="{ background: hl.gradient }">
              <div class="hl-preview-browser">
                <div class="hl-browser-bar"><span></span><span></span><span></span></div>
                <div class="hl-browser-body"></div>
              </div>
            </div>
            <div class="hl-body">
              <div class="hl-tags">
                <span class="hl-cat">{{ hl.category }}</span>
                <span class="hl-award">🏆 {{ hl.award }}</span>
              </div>
              <h3 class="hl-title">{{ hl.title }}</h3>
              <p class="hl-desc">{{ hl.desc }}</p>
              <div class="hl-meta">
                <div class="hl-author-row">
                  <div class="proj-avatar proj-avatar-sm" :style="{ background: hl.avatarColor }">{{ hl.initials }}</div>
                  <span class="hl-author">{{ hl.author }}</span>
                  <span class="hl-dot">·</span>
                  <span class="hl-cohort">{{ hl.cohort }}</span>
                </div>
                <div class="hl-techs">
                  <span v-for="t in hl.techs" :key="t" class="proj-tech">{{ t }}</span>
                </div>
              </div>
            </div>
            <NuxtLink :to="`/portfolio/${hl.slug}`" class="hl-link">
              Lihat Detail
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ METRICS STRIP ══════════════════════ -->
      <section class="metrics-strip">
        <div v-for="m in metrics" :key="m.label" class="metric-item">
          <span class="metric-val">{{ m.value }}</span>
          <span class="metric-lbl">{{ m.label }}</span>
        </div>
      </section>

      <!-- ══════════════════════ CTA ══════════════════════ -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge">
            <span class="label-dot label-dot-light"></span>
            Bergabung Sekarang
          </div>
          <h2 class="cta-title">
            Portfolio Seperti Ini<br />
            <em class="cta-accent">Bisa Jadi Milikmu.</em>
          </h2>
          <p class="cta-desc">
            Semua project di halaman ini dibuat oleh siswa yang pernah bingung
            mulai dari mana — persis seperti kamu sekarang. Satu langkah
            pertama adalah mendaftar program Carriera.
          </p>
          <div class="cta-actions">
            <NuxtLink to="/program" class="btn-primary btn-lg">
              Ikut Program Carriera
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/how-it-works" class="btn-ghost btn-lg">Bagaimana Caranya?</NuxtLink>
          </div>
          <p class="cta-note">Intake berikutnya · 30 kursi terbatas · Mulai minggu depan</p>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Portfolio Siswa Carriera — Project Live & Case Study Nyata',
  description: 'Lihat 50+ project production-ready yang dibuat oleh siswa Carriera. Bukan mockup — semuanya sudah live dan masuk portofolio karier.'
})

/* ── Hero stats ── */
const heroStats = [
  { value: '50+', label: 'Project Live' },
  { value: '4', label: 'Angkatan' },
  { value: '100%', label: 'Deployed ke Production' },
  { value: '4.9★', label: 'Rata-rata Mentor Score' },
]

/* ── Filter ── */
const filterTabs = ['Semua', 'Frontend', 'Backend', 'UI/UX', 'Fullstack', 'AI']
const activeFilter = ref('Semua')
const cohorts = ['Angkatan 1', 'Angkatan 2', 'Angkatan 3', 'Angkatan 4']
const activeCohort = ref('Semua')

/* ── Projects data ── */
const projects = [
  {
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page — KeuanganKu',
    desc: 'Landing page conversion-optimized untuk produk SaaS keuangan pribadi. Hero, pricing, dan testimonial.',
    category: 'Frontend',
    cohort: 'Angkatan 3',
    techs: ['Vue.js', 'Tailwind', 'Vercel'],
    author: 'Rafi D.',
    initials: 'RD',
    avatarColor: 'linear-gradient(135deg,#6458f5,#8b83ff)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewTitle: 'KeuanganKu · SaaS',
  },
  {
    slug: 'design-system-ui',
    title: 'Design System — Nusantara UI',
    desc: 'Design system lengkap dengan 40+ komponen siap pakai, token warna, dan dark mode. Dokumentasi via Storybook.',
    category: 'UI/UX',
    cohort: 'Angkatan 2',
    techs: ['Figma', 'Tokens', 'Storybook'],
    author: 'Dinda K.',
    initials: 'DK',
    avatarColor: 'linear-gradient(135deg,#EC4899,#F9A8D4)',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    previewTitle: 'Nusantara UI · Design System',
  },
  {
    slug: 'rest-api-service',
    title: 'REST API — Manajemen Inventaris',
    desc: 'Backend service lengkap: CRUD, JWT auth, rate limiting, dokumentasi Swagger. Deploy ke Railway.',
    category: 'Backend',
    cohort: 'Angkatan 4',
    techs: ['Node.js', 'PostgreSQL', 'Railway'],
    author: 'Bima S.',
    initials: 'BS',
    avatarColor: 'linear-gradient(135deg,#10B981,#34D399)',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    previewTitle: 'InventAPI · Backend',
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generator — WordForge',
    desc: 'Web app yang mengintegrasikan OpenAI API untuk generate konten marketing berdasarkan brief singkat.',
    category: 'AI',
    cohort: 'Angkatan 4',
    techs: ['Python', 'FastAPI', 'OpenAI'],
    author: 'Maya P.',
    initials: 'MP',
    avatarColor: 'linear-gradient(135deg,#8B5CF6,#C4B5FD)',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    previewTitle: 'WordForge · AI',
  },
  {
    slug: 'ecommerce-fullstack',
    title: 'E-Commerce Fullstack — TokoBaju',
    desc: 'Platform e-commerce full-stack dengan cart, checkout, payment gateway Midtrans, dan admin dashboard.',
    category: 'Fullstack',
    cohort: 'Angkatan 2',
    techs: ['Nuxt', 'Golang', 'Midtrans'],
    author: 'Andi W.',
    initials: 'AW',
    avatarColor: 'linear-gradient(135deg,#F59E0B,#FCD34D)',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    previewTitle: 'TokoBaju · E-Commerce',
  },
  {
    slug: 'dashboard-analitik',
    title: 'Analytics Dashboard — MetrikPro',
    desc: 'Dashboard analitik real-time dengan chart interaktif, filter dinamis, dan export ke CSV/PDF.',
    category: 'Frontend',
    cohort: 'Angkatan 1',
    techs: ['React', 'Chart.js', 'Netlify'],
    author: 'Lena T.',
    initials: 'LT',
    avatarColor: 'linear-gradient(135deg,#EF4444,#FCA5A5)',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    previewTitle: 'MetrikPro · Analytics',
  },
]

const filteredProjects = computed(() => {
  return projects.filter(p => {
    const catOk = activeFilter.value === 'Semua' || p.category === activeFilter.value
    const cohortOk = activeCohort.value === 'Semua' || p.cohort === activeCohort.value
    return catOk && cohortOk
  })
})

/* ── Featured case study ── */
const baView = ref<'before' | 'after'>('after')
const featuredCase = {
  slug: 'saas-landing-page',
  title: 'Dari Simulasi Brief ke Landing Page yang Convert — KeuanganKu',
  desc: 'Bagaimana Rafi membangun landing page dari nol: membaca brief, riset kompetitor, wireframe Figma, coding, review dua kali, hingga deploy dan mendapat 68% improvement conversion rate.',
  phases: [
    { icon: '📋', title: 'Terima Brief', desc: 'Simulasi kasus: klien bayangan meminta LP yang fokus konversi — target: sign-up gratis' },
    { icon: '🎨', title: 'Wireframe & Figma', desc: 'Lo-fi dulu, review mentor, revisi hierarchy, high-fi final' },
    { icon: '⚡', title: 'Build Sprint', desc: 'Vue.js + Tailwind, animasi scroll, Lighthouse 97 score' },
    { icon: '🔍', title: 'Code Review', desc: '2 siklus review — extract composable, semantic HTML, a11y fix' },
    { icon: '🚀', title: 'Deploy & Result', desc: 'Live di Vercel, evaluasi A/B test konversi naik 68%' },
  ],
}

/* ── Highlights ── */
const highlights = [
  {
    slug: 'ecommerce-fullstack',
    title: 'E-Commerce Fullstack — TokoBaju',
    desc: 'Project paling kompleks dari angkatan 2. Full payment gateway, admin panel, dan sistem notifikasi real-time.',
    category: 'Fullstack',
    award: 'Best Capstone Angkatan 2',
    cohort: 'Angkatan 2',
    techs: ['Nuxt', 'Golang', 'PostgreSQL'],
    author: 'Andi W.',
    initials: 'AW',
    avatarColor: 'linear-gradient(135deg,#F59E0B,#FCD34D)',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    slug: 'design-system-ui',
    title: 'Nusantara UI Design System',
    desc: '40+ komponen, dark mode, aksesibel WCAG AA. Sudah dipakai oleh 3 startup di luar Carriera.',
    category: 'UI/UX',
    award: 'Best Design Angkatan 2',
    cohort: 'Angkatan 2',
    techs: ['Figma', 'Tokens', 'Storybook'],
    author: 'Dinda K.',
    initials: 'DK',
    avatarColor: 'linear-gradient(135deg,#EC4899,#F9A8D4)',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    slug: 'ai-content-generator',
    title: 'WordForge — AI Content Generator',
    desc: 'Integrasi OpenAI pertama dari siswa Carriera. Dipakai oleh 200+ pengguna organik dalam 2 minggu setelah launch.',
    category: 'AI',
    award: 'Most Innovative Angkatan 4',
    cohort: 'Angkatan 4',
    techs: ['Python', 'FastAPI', 'OpenAI'],
    author: 'Maya P.',
    initials: 'MP',
    avatarColor: 'linear-gradient(135deg,#8B5CF6,#C4B5FD)',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
]

/* ── Metrics ── */
const metrics = [
  { value: '50+', label: 'Project Deployed' },
  { value: '12', label: 'Studi Kasus Diadopsi Industri' },
  { value: '3', label: 'Project Open Source' },
  { value: '200+', label: 'Pengguna Aktif dari Project Siswa' },
]

/* ── Scroll helper ── */
function scrollToShowcase() {
  document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ════════ BASE ════════ */
.port-page {
  position: relative;
  min-height: 100vh;
  background-color: #FAFAFA;
  color: #111827;
  font-family: 'Instrument Sans', 'Inter', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Ambients */
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(100px); }
.ambient-tl { top: -10%; left: -8%; width: 45%; height: 45%; background: radial-gradient(circle, rgba(99,88,245,.08), transparent 70%); }
.ambient-tr { top: 12%; right: -5%; width: 28%; height: 28%; background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%); }
.ambient-bl { bottom: 0; left: 50%; transform: translateX(-50%); width: 55%; height: 25%; background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%); }

/* Grid */
.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image: linear-gradient(to right, rgba(99,88,245,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,88,245,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
}

/* Layout */
.z-header { position: relative; z-index: 20; }
.port-main { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 2rem 2rem 6rem; }

/* ════════ TOKENS ════════ */
.section { margin-top: 7rem; }
.section-label { display: inline-flex; align-items: center; gap: .5rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6458f5; margin-bottom: 1.125rem; }
.section-label-light { color: #A5B4FC; }
.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; flex-shrink: 0; }
.label-dot-light { background: #A5B4FC; }
.section-title { font-size: clamp(1.75rem, 3.2vw, 2.5rem); font-weight: 300; line-height: 1.2; letter-spacing: -.025em; color: #111827; margin-bottom: .875rem; }
.section-title-light { color: #F9FAFB; }
.section-desc { max-width: 600px; font-size: 1rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 3rem; }
.section-desc-light { color: #6B7280; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* Buttons */
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; height: 48px; padding: 0 1.75rem; border-radius: 9999px; background: #6458f5; color: white; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 10px 30px rgba(100,88,245,.25); text-decoration: none; }
.btn-primary:hover { background: #5448e0; box-shadow: 0 16px 40px rgba(100,88,245,.35); transform: translateY(-1px); }
.btn-sm { height: 42px; padding: 0 1.375rem; font-size: .875rem; }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }
.btn-ghost { display: inline-flex; align-items: center; font-size: .875rem; font-weight: 500; color: #4B5563; background: none; border: none; cursor: pointer; text-decoration: none; transition: color .2s; }
.btn-ghost:hover { color: #6458f5; }

/* ════════ HERO ════════ */
.hero { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4rem; padding: 4rem 0 5rem; }
@media (max-width: 760px) { .hero { grid-template-columns: 1fr; } }

.badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(99,88,245,.2); background: rgba(99,88,245,.04); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #6458f5; margin-bottom: 1.5rem; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }
.hero-title { font-size: clamp(2.25rem, 4.5vw, 3.5rem); font-weight: 300; line-height: 1.1; letter-spacing: -.035em; color: #111827; margin-bottom: 1.25rem; }
.hero-desc { max-width: 520px; font-size: 1.0625rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 2.25rem; }
.hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }

/* Hero stats column */
.hero-stats-col { display: flex; flex-direction: column; gap: 1rem; }
.hstat { display: flex; flex-direction: column; padding: 1.25rem 1.5rem; border-radius: 16px; border: 1px solid #F3F4F6; background: #FFFFFF; min-width: 140px; }
.hstat-val { font-size: 1.75rem; font-weight: 800; color: #111827; letter-spacing: -.03em; }
.hstat-lbl { font-size: .75rem; font-weight: 500; color: #9CA3AF; text-transform: uppercase; letter-spacing: .06em; margin-top: .25rem; }

/* ════════ FILTER ════════ */
.filter-bar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.filter-tabs { display: flex; gap: .5rem; flex-wrap: wrap; }
.filter-tab { padding: .5rem 1.125rem; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FAFAFA; font-size: .8125rem; font-weight: 500; color: #6B7280; cursor: pointer; transition: all .2s; font-family: inherit; }
.filter-tab:hover { border-color: rgba(99,88,245,.3); color: #6458f5; }
.filter-tab-active { background: #6458f5; border-color: #6458f5; color: #FFFFFF; box-shadow: 0 4px 12px rgba(100,88,245,.25); }
.cohort-select { padding: .5rem 1rem; border-radius: 9999px; border: 1px solid #E5E7EB; background: #FAFAFA; font-size: .8125rem; font-weight: 500; color: #374151; cursor: pointer; outline: none; font-family: inherit; }
.cohort-select:focus { border-color: rgba(99,88,245,.4); }

/* ════════ PROJECT GRID ════════ */
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
@media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px) { .projects-grid { grid-template-columns: 1fr; } }

.proj-card { border-radius: 20px; border: 1px solid #F3F4F6; background: #FFFFFF; overflow: hidden; text-decoration: none; color: inherit; transition: all .3s; display: block; }
.proj-card:hover { border-color: rgba(99,88,245,.2); box-shadow: 0 20px 48px -12px rgba(0,0,0,.08); transform: translateY(-3px); }

/* Preview area */
.proj-preview { aspect-ratio: 16/10; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.proj-preview-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.55); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .25s; }
.proj-card:hover .proj-preview-overlay { opacity: 1; }
.proj-preview-cta { color: white; font-size: .875rem; font-weight: 600; border: 1px solid rgba(255,255,255,.4); padding: .5rem 1.125rem; border-radius: 9999px; backdrop-filter: blur(8px); }

/* Mini browser mockup in preview */
.proj-preview-ui { width: 85%; background: rgba(255,255,255,.12); border-radius: 8px; border: 1px solid rgba(255,255,255,.15); backdrop-filter: blur(4px); overflow: hidden; }
.pui-bar { display: flex; gap: 4px; padding: .5rem .625rem; background: rgba(0,0,0,.15); }
.pui-bar span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.3); }
.pui-content { padding: .625rem .75rem; }
.pui-title { font-size: .6875rem; font-weight: 700; color: rgba(255,255,255,.8); margin-bottom: .375rem; }
.pui-blocks { display: flex; flex-direction: column; gap: .25rem; }
.pui-block { height: 6px; border-radius: 3px; background: rgba(255,255,255,.2); width: 60%; }
.pui-block-wide { width: 90%; }

/* Card body */
.proj-body { padding: 1.375rem 1.5rem; }
.proj-top-row { display: flex; align-items: center; gap: .5rem; margin-bottom: .75rem; }
.proj-category-tag { font-size: .6875rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #6458f5; background: #EEF2FF; padding: .2rem .625rem; border-radius: 9999px; }
.proj-cohort-tag { font-size: .6875rem; font-weight: 500; color: #9CA3AF; background: #F3F4F6; padding: .2rem .625rem; border-radius: 9999px; }
.proj-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .5rem; line-height: 1.35; }
.proj-desc { font-size: .8125rem; font-weight: 300; line-height: 1.6; color: #6B7280; margin-bottom: 1.125rem; }
.proj-footer { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
.proj-author { display: flex; align-items: center; gap: .5rem; }
.proj-avatar { width: 28px; height: 28px; border-radius: 50%; color: white; font-size: .625rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.proj-avatar-sm { width: 24px; height: 24px; }
.proj-author-name { font-size: .8125rem; font-weight: 500; color: #374151; }
.proj-techs { display: flex; gap: .375rem; flex-wrap: wrap; justify-content: flex-end; }
.proj-tech { font-size: .6875rem; font-weight: 500; color: #6B7280; background: #F3F4F6; border: 1px solid #E5E7EB; padding: .175rem .5rem; border-radius: 6px; }

/* Empty state */
.empty-state { text-align: center; padding: 4rem 2rem; color: #9CA3AF; }
.empty-icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
.empty-state p { font-size: .9375rem; font-weight: 300; }

/* ════════ DARK / CASE STUDY ════════ */
.dark-section { border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.dark-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent); }
.dark-inner { padding: 4rem 3.5rem 4.5rem; position: relative; }
@media (max-width: 640px) { .dark-inner { padding: 2.5rem 1.75rem 3rem; } }

.cs-featured { display: grid; grid-template-columns: 1fr 420px; gap: 3.5rem; align-items: center; }
@media (max-width: 900px) { .cs-featured { grid-template-columns: 1fr; } }

.cs-step-label { font-size: .6875rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6B7280; margin-bottom: .75rem; }
.cs-feat-title { font-size: 1.375rem; font-weight: 600; color: #F3F4F6; line-height: 1.3; margin-bottom: .75rem; letter-spacing: -.015em; }
.cs-feat-desc { font-size: .9rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 1.75rem; }

.cs-phases { display: flex; flex-direction: column; gap: .875rem; margin-bottom: 2rem; }
.cs-phase { display: flex; align-items: flex-start; gap: .875rem; }
.cs-phase-icon { font-size: 1rem; width: 32px; height: 32px; border-radius: 10px; background: rgba(99,88,245,.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cs-phase-title { font-size: .875rem; font-weight: 600; color: #F3F4F6; }
.cs-phase-desc { font-size: .8125rem; font-weight: 300; color: #6B7280; margin-top: .125rem; }

/* Before/After toggle */
.ba-toggle-wrap { }
.ba-tabs { display: flex; gap: .375rem; margin-bottom: 1rem; }
.ba-tab { padding: .4rem 1rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); font-size: .8125rem; font-weight: 500; color: #6B7280; cursor: pointer; transition: all .2s; font-family: inherit; }
.ba-tab-active { background: #6458f5; border-color: #6458f5; color: white; }

.ba-screen { border-radius: 14px; border: 1px solid rgba(255,255,255,.08); background: #1E293B; padding: 1.125rem; overflow: hidden; min-height: 200px; }
.ba-bar { display: flex; gap: 5px; margin-bottom: 1rem; }
.ba-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.15); }

/* Before UI */
.ba-before-ui { display: flex; flex-direction: column; gap: .5rem; }
.bbu-nav { height: 24px; border-radius: 4px; background: rgba(255,255,255,.06); border: 1px dashed rgba(255,0,0,.2); }
.bbu-messy { width: 70%; }
.bbu-hero { height: 48px; border-radius: 4px; background: rgba(255,255,255,.04); border: 1px dashed rgba(255,0,0,.15); }
.bbu-dull { opacity: .5; }
.bbu-cards { display: flex; gap: .375rem; }
.bbu-card { height: 36px; flex: 1; border-radius: 4px; }
.bbu-card-old { background: rgba(255,255,255,.04); border: 1px dashed rgba(255,0,0,.12); }
.bbu-cramped { gap: .125rem; }

/* After UI */
.ba-after-ui { display: flex; flex-direction: column; gap: .625rem; }
.bau-hero { height: 52px; border-radius: 6px; background: linear-gradient(135deg, rgba(99,88,245,.4), rgba(139,131,255,.2)); }
.bau-badge { height: 12px; width: 100px; border-radius: 9999px; background: rgba(99,88,245,.3); margin-top: -.25rem; }
.bau-cards { display: flex; gap: .5rem; }
.bau-card { height: 40px; flex: 1; border-radius: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(99,88,245,.15); }

.ba-label { margin-top: .75rem; font-size: .8125rem; font-weight: 500; }
.ba-label-red { color: #F87171; }
.ba-label-green { color: #34D399; }

/* ════════ HIGHLIGHTS ════════ */
.highlights-list { display: flex; flex-direction: column; gap: 1rem; }

.hl-item {
  display: grid;
  grid-template-columns: 40px 200px 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 1.75rem;
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.hl-item:hover { border-color: rgba(99,88,245,.15); box-shadow: 0 12px 32px rgba(0,0,0,.05); }
@media (max-width: 900px) { .hl-item { grid-template-columns: 40px 1fr; } .hl-preview,.hl-link { display: none; } }

.hl-rank { font-size: 2rem; font-weight: 800; color: #E5E7EB; letter-spacing: -.04em; }

.hl-preview { border-radius: 12px; overflow: hidden; aspect-ratio: 16/10; position: relative; }
.hl-preview-browser { width: 100%; height: 100%; display: flex; flex-direction: column; }
.hl-browser-bar { display: flex; gap: 3px; padding: .375rem .5rem; background: rgba(0,0,0,.2); }
.hl-browser-bar span { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.3); }
.hl-browser-body { flex: 1; opacity: .6; }

.hl-tags { display: flex; align-items: center; gap: .5rem; margin-bottom: .5rem; }
.hl-cat { font-size: .6875rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #6458f5; background: #EEF2FF; padding: .2rem .625rem; border-radius: 9999px; }
.hl-award { font-size: .6875rem; font-weight: 600; color: #F59E0B; }
.hl-title { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: .375rem; }
.hl-desc { font-size: .8125rem; font-weight: 300; line-height: 1.6; color: #6B7280; margin-bottom: 1rem; }
.hl-meta { display: flex; flex-direction: column; gap: .5rem; }
.hl-author-row { display: flex; align-items: center; gap: .5rem; font-size: .8125rem; }
.hl-author { font-weight: 600; color: #374151; }
.hl-dot { color: #D1D5DB; }
.hl-cohort { color: #9CA3AF; }
.hl-techs { display: flex; gap: .375rem; flex-wrap: wrap; }

.hl-link { display: inline-flex; align-items: center; gap: .375rem; font-size: .875rem; font-weight: 600; color: #6458f5; background: #EEF2FF; padding: .625rem 1.125rem; border-radius: 9999px; text-decoration: none; white-space: nowrap; transition: all .2s; }
.hl-link svg { width: 14px; height: 14px; transition: transform .2s; }
.hl-link:hover { background: #6458f5; color: white; }
.hl-link:hover svg { transform: translateX(3px); }

/* ════════ METRICS STRIP ════════ */
.metrics-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F3F4F6;
  margin-top: 4rem;
}
@media (max-width: 640px) { .metrics-strip { grid-template-columns: repeat(2, 1fr); } }
.metric-item { padding: 2rem 1.75rem; background: #FFFFFF; border-right: 1px solid #F3F4F6; display: flex; flex-direction: column; gap: .375rem; }
.metric-item:last-child { border-right: none; }
.metric-val { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #6458f5, #8b83ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -.03em; }
.metric-lbl { font-size: .8125rem; font-weight: 300; line-height: 1.5; color: #6B7280; }

/* ════════ CTA ════════ */
.cta-section { margin-top: 7rem; padding: 5.5rem 2rem; text-align: center; border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.cta-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 60%; height: 120%; background: radial-gradient(circle, rgba(99,88,245,.15) 0%, transparent 60%); pointer-events: none; }
.cta-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.4), transparent); }
.cta-inner { position: relative; }
.cta-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #A5B4FC; margin-bottom: 1.25rem; }
.cta-title { font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 300; line-height: 1.15; letter-spacing: -.03em; color: #F9FAFB; margin-bottom: 1rem; }
.cta-accent { font-style: italic; font-weight: 800; background: linear-gradient(135deg, #818CF8, #A5B4FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cta-desc { max-width: 480px; margin: 0 auto 2.5rem; font-size: .9375rem; font-weight: 300; line-height: 1.75; color: #6B7280; }
.cta-actions { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.cta-section .btn-ghost { color: #9CA3AF; }
.cta-section .btn-ghost:hover { color: #F9FAFB; }
.cta-note { font-size: .8125rem; font-weight: 300; color: #4B5563; }
</style>
