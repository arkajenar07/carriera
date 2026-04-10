<template>
  <div class="detail-page">
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="detail-main" v-if="project">

      <!-- ══════════════════════ BREADCRUMB ══════════════════════ -->
      <nav class="breadcrumb">
        <NuxtLink to="/portfolio" class="bc-link">Portfolio</NuxtLink>
        <span class="bc-sep">›</span>
        <span class="bc-current">{{ project.title }}</span>
      </nav>

      <!-- ══════════════════════ HEADER ══════════════════════ -->
      <header class="proj-header">
        <div class="proj-header-content">
          <div class="proj-header-tags">
            <span class="tag-cat">{{ project.category }}</span>
            <span class="tag-cohort">{{ project.cohort }}</span>
            <span v-if="project.award" class="tag-award">🏆 {{ project.award }}</span>
          </div>
          <h1 class="proj-header-title">{{ project.title }}</h1>
          <p class="proj-header-desc">{{ project.desc }}</p>

          <div class="proj-meta-row">
            <div class="proj-author-block">
              <div class="proj-avatar-lg" :style="{ background: project.avatarColor }">{{ project.initials }}</div>
              <div>
                <div class="proj-author-name">{{ project.author }}</div>
                <div class="proj-author-cohort">{{ project.cohort }} · Carriera</div>
              </div>
            </div>
            <div class="proj-meta-stats">
              <div v-for="s in project.metaStats" :key="s.label" class="proj-meta-stat">
                <span class="pms-val">{{ s.value }}</span>
                <span class="pms-lbl">{{ s.label }}</span>
              </div>
            </div>
          </div>

          <div class="proj-header-actions">
            <a :href="project.liveUrl" target="_blank" class="btn-primary">
              Live Demo
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a :href="project.githubUrl" target="_blank" class="btn-outline">
              <svg viewBox="0 0 24 24" fill="currentColor" class="gh-icon"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="proj-hero-visual" :style="{ background: project.gradient }">
          <div class="phv-browser">
            <div class="phv-bar"><span></span><span></span><span></span></div>
            <div class="phv-url">{{ project.liveUrl }}</div>
          </div>
          <div class="phv-content">
            <div class="phv-title">{{ project.previewTitle }}</div>
            <div class="phv-sub">{{ project.previewSub }}</div>
            <div class="phv-blocks">
              <div class="phv-block phv-block-hero"></div>
              <div class="phv-row">
                <div class="phv-block phv-block-card" v-for="i in 3" :key="i"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ══════════════════════ CONTENT BODY ══════════════════════ -->
      <div class="content-layout">

        <!-- Main content -->
        <article class="content-main">

          <!-- Overview -->
          <section class="content-section">
            <h2 class="cs-title">Overview</h2>
            <p class="cs-body">{{ project.overview }}</p>
          </section>

          <!-- The Brief -->
          <section class="content-section">
            <h2 class="cs-title">Brief yang Diterima</h2>
            <div class="brief-card">
              <div class="brief-header">
                <div class="brief-dots"><span></span><span></span><span></span></div>
                <span class="brief-filename">brief.md</span>
              </div>
              <div class="brief-body">
                <div class="brief-row" v-for="row in project.brief" :key="row.key">
                  <span class="brief-key">{{ row.key }}</span>
                  <span class="brief-val">{{ row.val }}</span>
                </div>
                <div class="brief-note">{{ project.briefNote }}</div>
              </div>
            </div>
          </section>

          <!-- Process steps -->
          <section class="content-section">
            <h2 class="cs-title">Proses Pengerjaan</h2>
            <div class="process-steps">
              <div v-for="(step, i) in project.process" :key="step.title" class="process-step">
                <div class="ps-num">{{ String(i + 1).padStart(2,'0') }}</div>
                <div class="ps-body">
                  <h3 class="ps-title">{{ step.title }}</h3>
                  <p class="ps-desc">{{ step.desc }}</p>
                  <div v-if="step.note" class="ps-note">
                    <span class="ps-note-icon">💬</span>
                    <em>Feedback mentor: "{{ step.note }}"</em>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Before / After -->
          <section class="content-section">
            <h2 class="cs-title">Before & After</h2>
            <p class="cs-body">{{ project.baDesc }}</p>
            <div class="ba-grid">
              <div class="ba-col">
                <div class="ba-col-label ba-col-label-bad">V1 — Iterasi Pertama</div>
                <div class="ba-screen-sm ba-screen-before">
                  <div class="ba-bar-sm"><span></span><span></span><span></span></div>
                  <div class="ba-before-content">
                    <div v-for="el in project.beforeElements" :key="el" class="ba-el ba-el-bad">{{ el }}</div>
                  </div>
                  <div class="ba-feedback-chip">❌ {{ project.beforeFeedback }}</div>
                </div>
              </div>
              <div class="ba-arrow-col">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="ba-col">
                <div class="ba-col-label ba-col-label-good">Final — Setelah Review</div>
                <div class="ba-screen-sm ba-screen-after">
                  <div class="ba-bar-sm"><span></span><span></span><span></span></div>
                  <div class="ba-after-content">
                    <div v-for="el in project.afterElements" :key="el" class="ba-el ba-el-good">{{ el }}</div>
                  </div>
                  <div class="ba-feedback-chip ba-feedback-good">✅ {{ project.afterFeedback }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Challenges & solutions -->
          <section class="content-section">
            <h2 class="cs-title">Tantangan & Solusi</h2>
            <div class="challenges">
              <div v-for="ch in project.challenges" :key="ch.challenge" class="challenge-item">
                <div class="ch-challenge">
                  <span class="ch-icon ch-icon-bad">⚠️</span>
                  <div>
                    <div class="ch-label">Tantangan</div>
                    <div class="ch-text">{{ ch.challenge }}</div>
                  </div>
                </div>
                <div class="ch-solution">
                  <span class="ch-icon ch-icon-good">✅</span>
                  <div>
                    <div class="ch-label">Solusi</div>
                    <div class="ch-text">{{ ch.solution }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Results -->
          <section class="content-section">
            <h2 class="cs-title">Hasil Akhir</h2>
            <div class="results-grid">
              <div v-for="r in project.results" :key="r.label" class="result-item">
                <span class="result-val">{{ r.value }}</span>
                <span class="result-label">{{ r.label }}</span>
              </div>
            </div>
            <p class="cs-body" style="margin-top:1.5rem">{{ project.resultDesc }}</p>
          </section>

          <!-- Reflection -->
          <section class="content-section">
            <h2 class="cs-title">Refleksi Siswa</h2>
            <blockquote class="cs-quote">
              "{{ project.reflection }}"
            </blockquote>
            <div class="cs-quote-author">
              <div class="proj-avatar-lg" :style="{ background: project.avatarColor }">{{ project.initials }}</div>
              <div>
                <div class="proj-author-name">{{ project.author }}</div>
                <div class="proj-author-cohort">{{ project.cohort }}</div>
              </div>
            </div>
          </section>

        </article>

        <!-- Sidebar -->
        <aside class="content-sidebar">
          <!-- Tech stack -->
          <div class="sidebar-card">
            <div class="sidebar-card-title">Tech Stack</div>
            <div class="tech-list">
              <div v-for="tech in project.techStack" :key="tech.name" class="tech-item">
                <span class="tech-icon">{{ tech.icon }}</span>
                <div>
                  <div class="tech-name">{{ tech.name }}</div>
                  <div class="tech-role">{{ tech.role }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="sidebar-card">
            <div class="sidebar-card-title">Timeline Sprint</div>
            <div class="sprint-timeline">
              <div v-for="(wk, i) in project.sprintWeeks" :key="wk.label" class="sprint-week" :class="{ 'sw-done': i < project.sprintDone, 'sw-active': i === project.sprintDone }">
                <div class="sw-dot"></div>
                <div>
                  <div class="sw-label">{{ wk.label }}</div>
                  <div class="sw-desc">{{ wk.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills gained -->
          <div class="sidebar-card">
            <div class="sidebar-card-title">Skills yang Dikuasai</div>
            <div class="skills-wrap">
              <span v-for="sk in project.skills" :key="sk" class="skill-chip">{{ sk }}</span>
            </div>
          </div>

          <!-- Mentor feedback -->
          <div class="sidebar-card sidebar-card-dark">
            <div class="sidebar-card-title sidebar-card-title-light">Feedback Mentor</div>
            <div class="mentor-score">
              <span class="ms-val">{{ project.mentorScore }}</span>
              <span class="ms-label">/ 100 Mentor Score</span>
            </div>
            <p class="mentor-feedback-text">"{{ project.mentorFeedback }}"</p>
          </div>
        </aside>

      </div>

      <!-- ══════════════════════ MORE PROJECTS ══════════════════════ -->
      <section class="more-section">
        <h2 class="more-title">Project Lainnya</h2>
        <div class="more-grid">
          <NuxtLink v-for="p in otherProjects" :key="p.slug" :to="`/portfolio/${p.slug}`" class="more-card">
            <div class="more-preview" :style="{ background: p.gradient }"></div>
            <div class="more-body">
              <span class="proj-category-tag">{{ p.category }}</span>
              <div class="more-card-title">{{ p.title }}</div>
              <div class="more-card-author">{{ p.author }}</div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge"><span class="label-dot label-dot-light"></span>Ikut Program</div>
          <h2 class="cta-title">Project Seperti Ini <em class="cta-accent">Bisa Jadi Milikmu.</em></h2>
          <p class="cta-desc">Semua project di halaman ini dibuat oleh siswa Carriera yang pernah ada di posisimu sekarang.</p>
          <div class="cta-actions">
            <NuxtLink to="/program" class="btn-primary btn-lg">
              Daftar Program
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="btn-ghost btn-lg">Lihat Portfolio Lain</NuxtLink>
          </div>
        </div>
      </section>

    </main>

    <!-- 404 state -->
    <main v-else class="not-found">
      <div class="nf-content">
        <span class="nf-icon">🔍</span>
        <h1 class="nf-title">Project Tidak Ditemukan</h1>
        <p class="nf-desc">Project dengan slug ini tidak ada dalam database.</p>
        <NuxtLink to="/portfolio" class="btn-primary">Kembali ke Portfolio</NuxtLink>
      </div>
    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

/* ── All projects data ── */
const allProjects = [
  {
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page — KeuanganKu',
    desc: 'Landing page conversion-optimized untuk produk SaaS keuangan pribadi. Hero section, pricing table, dan testimonial yang meningkatkan sign-up 68%.',
    category: 'Frontend',
    cohort: 'Angkatan 3',
    award: '',
    author: 'Rafi Darmawan',
    initials: 'RD',
    avatarColor: 'linear-gradient(135deg,#6458f5,#8b83ff)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewTitle: 'KeuanganKu',
    previewSub: 'Smart Financial Management',
    liveUrl: 'https://keuanganku.vercel.app',
    githubUrl: 'https://github.com/carriera/keuanganku',
    metaStats: [
      { value: '9 hari', label: 'Durasi Sprint' },
      { value: '68%', label: 'Conversion Lift' },
      { value: '97', label: 'Lighthouse Score' },
    ],
    overview: 'KeuanganKu adalah landing page untuk aplikasi SaaS manajemen keuangan pribadi. Brief datang dari mentor dengan simulasi klien startup — target utamanya adalah meningkatkan angka trial sign-up dari versi lama yang konversinya rendah. Project ini dikerjakan dalam satu sprint 9 hari dengan dua siklus review.',
    brief: [
      { key: 'Client', val: 'KeuanganKu (Simulasi)' },
      { key: 'Output', val: 'Landing Page + Deployed URL' },
      { key: 'Deadline', val: '9 hari · Sprint 3' },
      { key: 'Stack', val: 'Vue.js + Tailwind + Vercel' },
      { key: 'Goal', val: 'Conversion rate trial sign-up' },
    ],
    briefNote: 'Focus: mobile-first, hero yang kuat, pricing yang jelas, dan no friction di CTA utama.',
    process: [
      { title: 'Research & Competitive Analysis', desc: 'Menganalisis 5 company SaaS fintech: Mint, Money Manager, dan lokal. Mencatat pola hero, CTA placement, dan social proof.', note: '' },
      { title: 'Wireframe di Figma', desc: 'Lo-fi 4 section: Hero, Features, Pricing, Testimonial. Konsultasi mentor sebelum masuk high-fi.', note: 'Hierarchy teks-mu kurang kuat. Hero headline harus bisa dibaca dari 3 detik pertama.' },
      { title: 'Build dengan Vue.js', desc: 'Implementasi komponen per section, animasi scroll reveal, responsive breakpoints mobile/tablet/desktop.', note: '' },
      { title: 'Code Review Siklus 1', desc: 'Mentor request extract logika carousel testimonial ke composable, perbaikan semantik HTML, dan fix aria label.', note: 'Logika carousel-mu sudah bagus, tapi extract ke composable biar reusable.' },
      { title: 'Deploy & Lighthouse Audit', desc: 'Deploy ke Vercel, jalankan Lighthouse, optimasi image WebP, lazy loading, dan preconnect Google Fonts.', note: '' },
    ],
    baDesc: 'Perubahan terbesar ada di hierarchy visual hero section. V1 terlalu banyak elemen competing untuk perhatian yang sama — setelah review mentor, fokus dipersempit ke satu CTA utama.',
    beforeElements: ['4 tombol CTA bersaing', 'Text terlalu kecil', 'Background ramai'],
    afterElements: ['1 CTA utama yang kuat', 'Hierarchy yang jelas', 'Whitespace optimal'],
    beforeFeedback: 'Terlalu ramai, mata bingung',
    afterFeedback: 'Bersih, fokus, dan convert',
    challenges: [
      { challenge: 'Pricing section susah dibuat tidak terasa mahal', solution: 'Highlight plan populer, tambah "Paling Dipilih" badge, ubah wording ke value-first bukan feature-first' },
      { challenge: 'Mobile layout hero berantakan di layar kecil', solution: 'Redesign layout jadi single column di mobile, perbesar tap target CTA, dan hapus elemen dekoratif yang tidak perlu' },
    ],
    results: [
      { value: '68%', label: 'Peningkatan Conversion Rate' },
      { value: '97', label: 'Lighthouse Performance' },
      { value: '100', label: 'Lighthouse Accessibility' },
      { value: '2.1s', label: 'Time to Interactive' },
    ],
    resultDesc: 'Klien simulasi memberikan score 9.2/10. Project ini kemudian dipakai sebagai referensi template untuk siswa angkatan berikutnya.',
    reflection: 'Awalnya saya ngerasa brief-nya terlalu simpel. Tapi begitu mulai riset dan ngejar conversion rate yang bagus, saya sadar betapa kompleksnya desain yang "sederhana" itu. Feedback mentor di siklus pertama bikin saya revisi hampir seluruh hierarchy — pegel, tapi itu yang bikin saya ngerti kenapa whitespace dan fokus itu penting banget.',
    techStack: [
      { icon: '💚', name: 'Vue.js 3', role: 'Framework UI' },
      { icon: '🌊', name: 'Tailwind CSS', role: 'Styling' },
      { icon: '🎨', name: 'Figma', role: 'Wireframe & Prototype' },
      { icon: '▲', name: 'Vercel', role: 'Deployment' },
      { icon: '🔍', name: 'Lighthouse', role: 'Performance Audit' },
    ],
    sprintWeeks: [
      { label: 'Hari 1–2', desc: 'Research & wireframe lo-fi' },
      { label: 'Hari 3–4', desc: 'High-fi Figma + approval mentor' },
      { label: 'Hari 5–7', desc: 'Build Vue.js + Tailwind' },
      { label: 'Hari 8', desc: 'Code review + revisi' },
      { label: 'Hari 9', desc: 'Deploy + Lighthouse audit' },
    ],
    sprintDone: 5,
    skills: ['Vue.js Composition API', 'Tailwind CSS', 'Figma', 'Git PR Workflow', 'Lighthouse Optimization', 'Semantic HTML', 'CSS Animations', 'Vercel Deploy'],
    mentorScore: 91,
    mentorFeedback: 'Rafi menunjukkan growth yang luar biasa dari minggu pertama. Revisi dilakukan cepat dan dengan pemahaman, bukan hanya ikut saran buta. Project ini layak masuk portofolio karier.'
  },
  {
    slug: 'design-system-ui',
    title: 'Design System — Nusantara UI',
    desc: 'Design system lengkap dengan 40+ komponen siap pakai, token warna, dan dark mode.',
    category: 'UI/UX',
    cohort: 'Angkatan 2',
    award: 'Best Design Angkatan 2',
    author: 'Dinda Kusuma',
    initials: 'DK',
    avatarColor: 'linear-gradient(135deg,#EC4899,#F9A8D4)',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    previewTitle: 'Nusantara UI',
    previewSub: 'Design System · 40+ komponen',
    liveUrl: 'https://nusantara-ui.vercel.app',
    githubUrl: 'https://github.com/carriera/nusantara-ui',
    metaStats: [
      { value: '14 hari', label: 'Durasi Sprint' },
      { value: '40+', label: 'Komponen' },
      { value: '3', label: 'Startup Pakai' },
    ],
    overview: 'Nusantara UI adalah design system komprehensif yang dibangun dari scratch dengan tema lokal Indonesia. Mencakup token warna, tipografi, spacing, dan 40+ komponen UI yang konsisten antar platform.',
    brief: [
      { key: 'Output', val: 'Figma Library + Storybook' },
      { key: 'Deadline', val: '14 hari · Sprint 4' },
      { key: 'Stack', val: 'Figma + Storybook + Tokens' },
      { key: 'Goal', val: 'Design system siap pakai oleh tim lain' },
    ],
    briefNote: 'Harus bisa langsung dipakai siswa lain untuk project mereka. Konsistensi dan dokumentasi adalah kuncinya.',
    process: [
      { title: 'Riset Design System Populer', desc: 'Analisis Ant Design, MUI, dan Shadcn. Fokus pada sistem token, naming convention, dan pola komponen.', note: '' },
      { title: 'Bangun Token System', desc: 'Definisi color primitives, semantic tokens, spacing scale, dan typography scale di Figma.', note: 'Token naming-mu harus konsisten. Gunakan pola {category}-{variant}-{state}.' },
      { title: 'Build Komponen Dasar', desc: 'Button, Input, Card, Badge, Modal, Alert — masing-masing dengan dokumentasi dan varian lengkap.', note: '' },
      { title: 'Dark Mode Implementation', desc: 'Implementasi dark mode menggunakan CSS variables yang di-drive oleh token. Setiap komponen test manual.', note: '' },
      { title: 'Storybook & Dokumentasi', desc: 'Setup Storybook, tulis stories untuk setiap komponen, dan buat getting started guide.', note: '' },
    ],
    baDesc: 'Perubahan utama pada token system — dari naming yang tidak konsisten ke sistem yang scalable dan mudah dimengerti tim lain.',
    beforeElements: ['color-blue-1, color-blue-2', 'Spacing manual', 'Tidak ada dark mode'],
    afterElements: ['primary-500, primary-600', 'spacing-md, spacing-lg', 'Full dark mode support'],
    beforeFeedback: 'Naming tidak intuitif untuk developer',
    afterFeedback: 'Semantic, scalable, dan mudah di-adopt',
    challenges: [
      { challenge: 'Dark mode menyebabkan flicker saat load awal', solution: 'Inject dark mode preference via script di <head> sebelum CSS render' },
      { challenge: 'Komponen Modal tidak aksesibel (focus trap)', solution: 'Implementasi focus trap menggunakan Vue directive dan manage aria-modal' },
    ],
    results: [
      { value: '40+', label: 'Komponen Siap Pakai' },
      { value: '3', label: 'Startup Adopsi' },
      { value: 'WCAG AA', label: 'Aksesibilitas Standard' },
      { value: '100%', label: 'Dark Mode Coverage' },
    ],
    resultDesc: 'Nusantara UI kini digunakan oleh 3 startup yang berbeda di luar Carriera dan menjadi template resmi untuk siswa angkatan berikutnya.',
    reflection: 'Project ini mengajarkan saya bahwa design system bukan hanya soal "bikin komponen cantik" — tapi soal membuat sistem yang bisa dipakai orang lain tanpa penjelasan dari kamu. Feedback mentor tentang naming convention itu challenging tapi sekarang saya benar-benar paham kenapa itu krusial.',
    techStack: [
      { icon: '🎨', name: 'Figma', role: 'Design & Tokens' },
      { icon: '📖', name: 'Storybook', role: 'Component Docs' },
      { icon: '💚', name: 'Vue.js', role: 'Component Build' },
      { icon: '🌊', name: 'Tailwind CSS', role: 'Utility Classes' },
      { icon: '▲', name: 'Vercel', role: 'Storybook Deploy' },
    ],
    sprintWeeks: [
      { label: 'Hari 1–3', desc: 'Riset & definisi token system' },
      { label: 'Hari 4–7', desc: 'Komponen dasar di Figma' },
      { label: 'Hari 8–11', desc: 'Build + dark mode' },
      { label: 'Hari 12–13', desc: 'Storybook + docs' },
      { label: 'Hari 14', desc: 'Deploy & peer review' },
    ],
    sprintDone: 5,
    skills: ['Design Tokens', 'Component System', 'Dark Mode', 'Figma Variables', 'Storybook', 'Accessibility (WCAG)', 'Vue Components', 'CSS Variables'],
    mentorScore: 96,
    mentorFeedback: 'Salah satu design system terbaik yang pernah saya review dari siswa. Token system-nya matang, dokumentasinya lengkap, dan langsung bisa dipakai tanpa penjelasan tambahan. Ini standar industri.'
  },
]

/* ── Computed ── */
const project = computed(() => allProjects.find(p => p.slug === slug) ?? null)

const otherProjects = computed(() =>
  allProjects.filter(p => p.slug !== slug).slice(0, 3)
)

/* SEO */
watchEffect(() => {
  if (project.value) {
    useSeoMeta({
      title: `${project.value.title} — Portfolio Carriera`,
      description: project.value.desc,
    })
  }
})
</script>

<style scoped>
/* ════════ BASE ════════ */
.detail-page { position: relative; min-height: 100vh; background: #FAFAFA; color: #111827; font-family: 'Instrument Sans','Inter','Raleway',sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(100px); }
.ambient-tl { top: -10%; left: -8%; width: 40%; height: 40%; background: radial-gradient(circle,rgba(99,88,245,.07),transparent 70%); }
.ambient-tr { top: 10%; right: -5%; width: 25%; height: 25%; background: radial-gradient(circle,rgba(165,180,252,.05),transparent 70%); }
.bg-grid { pointer-events: none; position: fixed; inset: 0; z-index: 0; background-image: linear-gradient(to right,rgba(99,88,245,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(99,88,245,.05) 1px,transparent 1px); background-size: 72px 72px; mask-image: linear-gradient(to bottom,transparent,black 10%,black 80%,transparent); }
.z-header { position: relative; z-index: 20; }
.detail-main { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 1.5rem 2rem 6rem; }

/* ════════ BREADCRUMB ════════ */
.breadcrumb { display: flex; align-items: center; gap: .5rem; margin-bottom: 2.5rem; font-size: .875rem; }
.bc-link { color: #6458f5; text-decoration: none; font-weight: 500; }
.bc-link:hover { text-decoration: underline; }
.bc-sep { color: #D1D5DB; }
.bc-current { color: #6B7280; font-weight: 400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 400px; }

/* ════════ PROJECT HEADER ════════ */
.proj-header { display: grid; grid-template-columns: 1fr 480px; gap: 4rem; align-items: start; margin-bottom: 5rem; }
@media (max-width: 960px) { .proj-header { grid-template-columns: 1fr; } }

.proj-header-tags { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.tag-cat { font-size: .6875rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #6458f5; background: #EEF2FF; padding: .25rem .75rem; border-radius: 9999px; }
.tag-cohort { font-size: .6875rem; font-weight: 500; color: #9CA3AF; background: #F3F4F6; padding: .25rem .75rem; border-radius: 9999px; }
.tag-award { font-size: .6875rem; font-weight: 600; color: #F59E0B; background: #FFFBEB; padding: .25rem .75rem; border-radius: 9999px; }

.proj-header-title { font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 300; line-height: 1.15; letter-spacing: -.03em; color: #111827; margin-bottom: 1rem; }
.proj-header-desc { font-size: 1.0625rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 1.75rem; }

.proj-meta-row { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem; }
.proj-author-block { display: flex; align-items: center; gap: .875rem; }
.proj-avatar-lg { width: 44px; height: 44px; border-radius: 50%; color: white; font-size: .875rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.proj-author-name { font-size: .9375rem; font-weight: 600; color: #111827; }
.proj-author-cohort { font-size: .8125rem; color: #9CA3AF; margin-top: .125rem; }
.proj-meta-stats { display: flex; gap: 1.5rem; }
.proj-meta-stat { display: flex; flex-direction: column; align-items: flex-end; }
.pms-val { font-size: 1.25rem; font-weight: 700; color: #111827; letter-spacing: -.02em; }
.pms-lbl { font-size: .6875rem; font-weight: 500; color: #9CA3AF; text-transform: uppercase; letter-spacing: .06em; }

.proj-header-actions { display: flex; align-items: center; gap: .875rem; flex-wrap: wrap; }
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; height: 44px; padding: 0 1.5rem; border-radius: 9999px; background: #6458f5; color: white; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 8px 24px rgba(100,88,245,.25); text-decoration: none; font-family: inherit; }
.btn-primary:hover { background: #5448e0; transform: translateY(-1px); box-shadow: 0 12px 32px rgba(100,88,245,.35); }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }
.btn-outline { display: inline-flex; align-items: center; gap: .5rem; height: 44px; padding: 0 1.25rem; border-radius: 9999px; border: 1px solid #E5E7EB; background: white; color: #374151; font-size: .875rem; font-weight: 500; cursor: pointer; transition: all .2s; text-decoration: none; font-family: inherit; }
.btn-outline:hover { border-color: rgba(99,88,245,.3); color: #6458f5; }
.gh-icon { width: 16px; height: 16px; }
.btn-ghost { display: inline-flex; align-items: center; font-size: .875rem; font-weight: 500; color: #9CA3AF; background: none; border: none; cursor: pointer; text-decoration: none; transition: color .2s; font-family: inherit; }
.btn-ghost:hover { color: #F9FAFB; }

/* Project hero visual */
.proj-hero-visual { border-radius: 20px; overflow: hidden; padding: 0; box-shadow: 0 32px 64px -16px rgba(0,0,0,.15); }
.phv-browser { display: flex; align-items: center; gap: .625rem; padding: .75rem 1rem; background: rgba(0,0,0,.2); }
.phv-bar { display: flex; gap: 5px; }
.phv-bar span { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,.3); }
.phv-bar span:first-child { background: rgba(255,100,100,.6); }
.phv-bar span:nth-child(2) { background: rgba(255,200,0,.6); }
.phv-bar span:nth-child(3) { background: rgba(0,200,100,.6); }
.phv-url { font-size: .6875rem; font-weight: 500; color: rgba(255,255,255,.5); font-family: monospace; flex: 1; background: rgba(0,0,0,.2); padding: .25rem .625rem; border-radius: 4px; }
.phv-content { padding: 1.5rem; }
.phv-title { font-size: 1.125rem; font-weight: 700; color: rgba(255,255,255,.9); margin-bottom: .25rem; }
.phv-sub { font-size: .8125rem; color: rgba(255,255,255,.6); margin-bottom: 1.25rem; }
.phv-blocks { display: flex; flex-direction: column; gap: .75rem; }
.phv-block { border-radius: 8px; background: rgba(255,255,255,.12); }
.phv-block-hero { height: 60px; }
.phv-row { display: flex; gap: .5rem; }
.phv-block-card { height: 44px; flex: 1; border-radius: 8px; background: rgba(255,255,255,.08); }

/* ════════ CONTENT LAYOUT ════════ */
.content-layout { display: grid; grid-template-columns: 1fr 300px; gap: 3.5rem; align-items: start; margin-bottom: 4rem; }
@media (max-width: 900px) { .content-layout { grid-template-columns: 1fr; } }

/* ── Article ── */
.content-section { margin-bottom: 3.5rem; }
.content-section:last-child { margin-bottom: 0; }
.cs-title { font-size: 1.25rem; font-weight: 600; color: #111827; letter-spacing: -.015em; margin-bottom: 1rem; padding-bottom: .625rem; border-bottom: 1px solid #F3F4F6; }
.cs-body { font-size: .9375rem; font-weight: 300; line-height: 1.8; color: #4B5563; }

/* Brief card */
.brief-card { border-radius: 16px; border: 1px solid #E5E7EB; overflow: hidden; }
.brief-header { display: flex; align-items: center; gap: .75rem; padding: .75rem 1.25rem; background: #FAFAFA; border-bottom: 1px solid #F3F4F6; }
.brief-dots { display: flex; gap: 5px; }
.brief-dots span { width: 8px; height: 8px; border-radius: 50%; background: #E5E7EB; }
.brief-dots span:first-child { background: #FCA5A5; }
.brief-dots span:nth-child(2) { background: #FDE68A; }
.brief-dots span:nth-child(3) { background: #6EE7B7; }
.brief-filename { font-size: .8125rem; font-weight: 600; color: #9CA3AF; font-family: monospace; }
.brief-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0; }
.brief-row { display: flex; justify-content: space-between; font-size: .875rem; padding: .5rem 0; border-bottom: 1px solid #F9FAFB; }
.brief-row:last-of-type { border-bottom: none; }
.brief-key { color: #9CA3AF; font-weight: 400; }
.brief-val { color: #111827; font-weight: 500; }
.brief-note { margin-top: .875rem; font-size: .8125rem; font-weight: 300; color: #6B7280; font-style: italic; padding-top: .875rem; border-top: 1px solid #F3F4F6; }

/* Process steps */
.process-steps { display: flex; flex-direction: column; gap: 1.25rem; }
.process-step { display: flex; gap: 1.125rem; align-items: flex-start; }
.ps-num { font-size: .875rem; font-weight: 800; color: #6458f5; background: #EEF2FF; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; letter-spacing: -.02em; }
.ps-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .375rem; }
.ps-desc { font-size: .875rem; font-weight: 300; line-height: 1.65; color: #4B5563; }
.ps-note { margin-top: .75rem; display: flex; gap: .625rem; align-items: flex-start; padding: .75rem; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A; }
.ps-note-icon { font-size: .875rem; flex-shrink: 0; }
.ps-note em { font-size: .8125rem; color: #92400E; line-height: 1.55; }

/* Before/After */
.ba-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center; }
@media (max-width: 640px) { .ba-grid { grid-template-columns: 1fr; } .ba-arrow-col { display: none; } }
.ba-col-label { font-size: .6875rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; margin-bottom: .625rem; }
.ba-col-label-bad { color: #EF4444; }
.ba-col-label-good { color: #10B981; }
.ba-screen-sm { border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,.06); }
.ba-screen-before { background: #1E293B; }
.ba-screen-after { background: #0F172A; }
.ba-bar-sm { display: flex; gap: 4px; padding: .5rem .625rem; background: rgba(0,0,0,.15); }
.ba-bar-sm span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.2); }
.ba-before-content,.ba-after-content { padding: .75rem; display: flex; flex-direction: column; gap: .375rem; }
.ba-el { font-size: .75rem; font-weight: 400; padding: .375rem .625rem; border-radius: 6px; }
.ba-el-bad { background: rgba(239,68,68,.1); color: #F87171; border: 1px dashed rgba(239,68,68,.2); }
.ba-el-good { background: rgba(16,185,129,.1); color: #34D399; border: 1px solid rgba(16,185,129,.2); }
.ba-feedback-chip { margin: .5rem; font-size: .75rem; font-weight: 500; color: #F87171; background: rgba(239,68,68,.08); padding: .4rem .75rem; border-radius: 8px; text-align: center; }
.ba-feedback-good { color: #34D399; background: rgba(16,185,129,.08); }
.ba-arrow-col svg { width: 28px; height: 28px; color: #D1D5DB; }

/* Challenges */
.challenges { display: flex; flex-direction: column; gap: 1.25rem; }
.challenge-item { border-radius: 14px; border: 1px solid #F3F4F6; overflow: hidden; }
.ch-challenge,.ch-solution { display: flex; gap: .875rem; align-items: flex-start; padding: 1rem 1.25rem; }
.ch-challenge { background: #FFF7F7; border-bottom: 1px solid #F3F4F6; }
.ch-solution { background: #F0FDF4; }
.ch-icon { font-size: 1rem; flex-shrink: 0; }
.ch-label { font-size: .6875rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; margin-bottom: .25rem; }
.ch-challenge .ch-label { color: #EF4444; }
.ch-solution .ch-label { color: #10B981; }
.ch-text { font-size: .875rem; font-weight: 300; color: #374151; line-height: 1.55; }

/* Results */
.results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; border-radius: 16px; overflow: hidden; border: 1px solid #F3F4F6; }
@media (max-width: 640px) { .results-grid { grid-template-columns: repeat(2, 1fr); } }
.result-item { padding: 1.5rem 1.25rem; background: white; border-right: 1px solid #F3F4F6; display: flex; flex-direction: column; gap: .25rem; }
.result-item:last-child { border-right: none; }
.result-val { font-size: 1.625rem; font-weight: 800; background: linear-gradient(135deg,#6458f5,#8b83ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -.03em; }
.result-label { font-size: .75rem; font-weight: 300; color: #6B7280; line-height: 1.4; }

/* Quote */
.cs-quote { font-size: 1.0625rem; font-weight: 300; line-height: 1.8; color: #374151; font-style: italic; padding: 1.5rem 1.75rem; border-left: 3px solid #6458f5; background: #F5F3FF; border-radius: 0 12px 12px 0; margin: 0 0 1.25rem; }
.cs-quote-author { display: flex; align-items: center; gap: .875rem; }

/* ════════ SIDEBAR ════════ */
.content-sidebar { display: flex; flex-direction: column; gap: 1.25rem; position: sticky; top: 2rem; }
.sidebar-card { padding: 1.5rem; border-radius: 16px; border: 1px solid #F3F4F6; background: #FFFFFF; }
.sidebar-card-dark { background: #0F172A; border-color: rgba(255,255,255,.06); }
.sidebar-card-title { font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #9CA3AF; margin-bottom: 1.125rem; }
.sidebar-card-title-light { color: #6B7280; }

/* Tech list */
.tech-list { display: flex; flex-direction: column; gap: .75rem; }
.tech-item { display: flex; align-items: center; gap: .75rem; }
.tech-icon { font-size: 1.125rem; width: 34px; height: 34px; border-radius: 8px; background: #EEF2FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tech-name { font-size: .875rem; font-weight: 600; color: #111827; }
.tech-role { font-size: .75rem; color: #9CA3AF; margin-top: .1rem; }

/* Sprint timeline */
.sprint-timeline { display: flex; flex-direction: column; gap: 0; }
.sprint-week { display: flex; align-items: flex-start; gap: .75rem; padding: .625rem 0; position: relative; }
.sprint-week:not(:last-child)::after { content: ''; position: absolute; left: 7px; top: calc(50% + 8px); width: 2px; height: 100%; background: #F3F4F6; }
.sw-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #E5E7EB; background: white; flex-shrink: 0; z-index: 1; transition: all .2s; }
.sw-done .sw-dot { background: #6458f5; border-color: #6458f5; }
.sw-done::after { background: #EEF2FF !important; }
.sw-active .sw-dot { border-color: #6458f5; box-shadow: 0 0 0 3px rgba(99,88,245,.2); }
.sw-label { font-size: .8125rem; font-weight: 600; color: #374151; }
.sw-done .sw-label { color: #6458f5; }
.sw-desc { font-size: .75rem; color: #9CA3AF; margin-top: .1rem; }

/* Skills */
.skills-wrap { display: flex; flex-wrap: wrap; gap: .5rem; }
.skill-chip { font-size: .75rem; font-weight: 500; color: #6458f5; background: #EEF2FF; border: 1px solid rgba(99,88,245,.1); padding: .25rem .625rem; border-radius: 9999px; }

/* Mentor score */
.mentor-score { display: flex; align-items: baseline; gap: .375rem; margin-bottom: .875rem; }
.ms-val { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg,#818CF8,#A5B4FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -.04em; }
.ms-label { font-size: .75rem; color: #6B7280; }
.mentor-feedback-text { font-size: .8125rem; font-weight: 300; line-height: 1.7; color: #6B7280; font-style: italic; }

/* ════════ MORE PROJECTS ════════ */
.more-section { margin-bottom: 4rem; }
.more-title { font-size: 1.25rem; font-weight: 600; color: #111827; letter-spacing: -.015em; margin-bottom: 1.5rem; }
.more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 640px) { .more-grid { grid-template-columns: 1fr; } }
.more-card { border-radius: 16px; overflow: hidden; border: 1px solid #F3F4F6; background: #FFFFFF; text-decoration: none; transition: all .25s; display: block; }
.more-card:hover { border-color: rgba(99,88,245,.2); box-shadow: 0 12px 32px rgba(0,0,0,.06); transform: translateY(-2px); }
.more-preview { aspect-ratio: 16/9; }
.more-body { padding: 1rem 1.125rem; }
.proj-category-tag { font-size: .6875rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #6458f5; background: #EEF2FF; padding: .2rem .625rem; border-radius: 9999px; display: inline-block; margin-bottom: .5rem; }
.more-card-title { font-size: .875rem; font-weight: 600; color: #111827; line-height: 1.3; margin-bottom: .25rem; }
.more-card-author { font-size: .75rem; color: #9CA3AF; }

/* ════════ CTA ════════ */
.cta-section { padding: 5rem 2rem; text-align: center; border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.cta-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 60%; height: 120%; background: radial-gradient(circle,rgba(99,88,245,.15),transparent 60%); pointer-events: none; }
.cta-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(to right,transparent,rgba(99,88,245,.4),transparent); }
.cta-inner { position: relative; }
.cta-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #A5B4FC; margin-bottom: 1.25rem; }
.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; }
.label-dot-light { background: #A5B4FC; }
.cta-title { font-size: clamp(1.75rem, 4vw, 3rem); font-weight: 300; line-height: 1.2; letter-spacing: -.03em; color: #F9FAFB; margin-bottom: 1rem; }
.cta-accent { font-style: italic; font-weight: 800; background: linear-gradient(135deg,#818CF8,#A5B4FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cta-desc { max-width: 420px; margin: 0 auto 2.25rem; font-size: .9375rem; font-weight: 300; line-height: 1.75; color: #6B7280; }
.cta-actions { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }

/* ════════ NOT FOUND ════════ */
.not-found { position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; min-height: 60vh; }
.nf-content { text-align: center; }
.nf-icon { font-size: 3rem; display: block; margin-bottom: 1.25rem; }
.nf-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: .625rem; }
.nf-desc { font-size: .9375rem; color: #6B7280; margin-bottom: 2rem; }
</style>
