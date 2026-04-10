<template>
  <div class="hiw-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <!-- Grid overlay -->
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="hiw-main">

      <!-- ══════════════════════ HERO ══════════════════════ -->
      <section class="hero">
        <div class="hero-label">
          <span class="label-dot"></span>
          Cara Kerja
        </div>
        <h1 class="hero-title">
          Bukan Sekadar Nonton Video.<br />
          <em class="accent">Ini Cara Belajar yang Berbeda.</em>
        </h1>
        <p class="hero-desc">
          Carriera membalikkan cara belajar konvensional. Alih-alih ceramah lalu latihan soal,
          kamu langsung dikerjakan brief nyata, diberi feedback oleh mentor, dan menghasilkan
          output yang bisa masuk portofolio dari hari pertama.
        </p>

        <!-- High-level 4-step visual summary -->
        <div class="hero-flow">
          <div v-for="(step, i) in heroSteps" :key="step.label" class="hf-item">
            <div class="hf-circle" :style="{ '--clr': step.color }">
              <span>{{ step.icon }}</span>
            </div>
            <div class="hf-label">{{ step.label }}</div>
            <div class="hf-arrow" v-if="i < heroSteps.length - 1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ STEP-BY-STEP ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Alur Lengkap
        </div>
        <h2 class="section-title">
          Empat Langkah dari <em class="accent">Brief ke Output.</em>
        </h2>
        <p class="section-desc">
          Setiap sprint di Carriera mengikuti siklus yang sama — terstruktur, nyata, dan
          memberi kamu pengalaman seperti bekerja di tim profesional.
        </p>

        <div class="steps-container">
          <div v-for="(step, i) in detailSteps" :key="step.title" class="step-row" :class="{ 'step-row-rev': i % 2 !== 0 }">
            <!-- Number + connector -->
            <div class="step-num-col">
              <div class="step-num" :class="`step-num-${i}`">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="step-line" v-if="i < detailSteps.length - 1"></div>
            </div>

            <!-- Content -->
            <div class="step-body">
              <div class="step-tag">{{ step.tag }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
              <ul class="step-bullets">
                <li v-for="b in step.bullets" :key="b">{{ b }}</li>
              </ul>
            </div>

            <!-- Visual -->
            <div class="step-visual">
              <div class="step-card-visual" :class="`vis-${i}`">
                <div class="scv-header">
                  <div class="scv-dots"><span></span><span></span><span></span></div>
                  <span class="scv-badge">{{ step.cardLabel }}</span>
                </div>
                <div class="scv-body">
                  <component :is="'div'" v-html="step.cardContent" class="scv-content"></component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ REAL WORKFLOW DEMO ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Contoh Nyata
          </div>
          <h2 class="section-title section-title-light">
            Satu Minggu di Carriera — <em class="accent-light">Kelihatan Seperti Ini.</em>
          </h2>
          <p class="section-desc section-desc-light">
            Bukan jadwal kuliah. Ini jadwal tim startup sungguhan yang kamu jalani setiap minggu.
          </p>

          <div class="workflow-grid">
            <!-- Day-by-day timeline -->
            <div class="wf-timeline">
              <div
                v-for="(day, i) in weekDays"
                :key="day.day"
                class="wf-day"
                :class="{ 'wf-day-active': activeDay === i }"
                @click="activeDay = i"
              >
                <div class="wf-day-name">{{ day.day }}</div>
                <div class="wf-day-tag">{{ day.tag }}</div>
              </div>
            </div>

            <!-- Detail panel -->
            <div class="wf-detail">
              <div class="wf-detail-header">
                <div class="wf-detail-day">{{ weekDays[activeDay].day }}</div>
                <div class="wf-detail-theme">{{ weekDays[activeDay].theme }}</div>
              </div>
              <div class="wf-schedule">
                <div v-for="item in weekDays[activeDay].schedule" :key="item.time" class="wf-schedule-item">
                  <div class="wf-time">{{ item.time }}</div>
                  <div class="wf-schedule-body">
                    <div class="wf-act-title">{{ item.activity }}</div>
                    <div class="wf-act-desc">{{ item.desc }}</div>
                  </div>
                  <div class="wf-act-pill" :class="`pill-${item.type}`">{{ item.type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ BOOTCAMP COMPARISON ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Perbandingan
        </div>
        <h2 class="section-title">
          Carriera vs <em class="accent">Bootcamp Biasa.</em>
        </h2>
        <p class="section-desc">
          Banyak bootcamp mengklaim "berbasis proyek" — tapi ada perbedaan fundamental
          antara mengerjakan latihan soal dan menjalani simulasi kerja nyata.
        </p>

        <div class="compare-table">
          <div class="ct-header">
            <div class="ct-cell ct-cell-topic">Aspek</div>
            <div class="ct-cell ct-cell-bad">Bootcamp Biasa</div>
            <div class="ct-cell ct-cell-good">Carriera</div>
          </div>
          <div v-for="row in compareRows" :key="row.topic" class="ct-row">
            <div class="ct-cell ct-topic">{{ row.topic }}</div>
            <div class="ct-cell ct-bad">
              <span class="ct-icon-bad">✕</span>
              {{ row.bad }}
            </div>
            <div class="ct-cell ct-good">
              <span class="ct-icon-good">✓</span>
              {{ row.good }}
            </div>
          </div>
        </div>

        <!-- Testimonial strip -->
        <div class="testimonials">
          <div v-for="t in testimonials" :key="t.name" class="testi-card">
            <div class="testi-quote">"{{ t.quote }}"</div>
            <div class="testi-author">
              <div class="testi-avatar" :style="{ background: t.color }">{{ t.initials }}</div>
              <div>
                <div class="testi-name">{{ t.name }}</div>
                <div class="testi-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ FAQ MINI ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Pertanyaan Umum
        </div>
        <h2 class="section-title">
          Masih Ada <em class="accent">Pertanyaan?</em>
        </h2>

        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.q"
            class="faq-item"
            :class="{ 'faq-open': openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="faq-q">
              {{ faq.q }}
              <span class="faq-chevron">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
            <div class="faq-a" v-show="openFaq === i">{{ faq.a }}</div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CTA ══════════════════════ -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge">
            <span class="label-dot label-dot-light"></span>
            Mulai Sekarang
          </div>
          <h2 class="cta-title">
            Sudah Paham Caranya?<br />
            <em class="cta-accent">Saatnya Kamu Coba Sendiri.</em>
          </h2>
          <p class="cta-desc">
            Intake berikutnya dibuka terbatas <strong>30 kursi.</strong> Daftar hari ini,
            mulai sprint pertamamu minggu depan.
          </p>
          <div class="cta-actions">
            <button class="btn-primary btn-lg">
              Daftar Sekarang — Gratis
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost btn-lg">Lihat Program Lengkap</NuxtLink>
          </div>
          <p class="cta-note">Tanpa kartu kredit · Bisa dicicil · Garansi 7 hari</p>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'How It Works — Carriera | Sistem Belajar yang Berbeda',
  description: 'Pelajari bagaimana sistem kerja Carriera: dari brief nyata, pengerjaan, review mentor, hingga output portofolio.'
})

/* ── Hero flow ── */
const heroSteps = [
  { icon: '📋', label: 'Terima Brief', color: '#6458f5' },
  { icon: '⚡', label: 'Kerjakan', color: '#8b83ff' },
  { icon: '🔍', label: 'Review & Revisi', color: '#10B981' },
  { icon: '🚀', label: 'Final Output', color: '#F59E0B' },
]

/* ── Detail steps ── */
const detailSteps = [
  {
    tag: 'Langkah 01',
    title: 'Brief Diterima',
    desc: 'Setiap sprint dimulai dengan brief proyek yang dirancang layaknya klien sungguhan. Kamu membaca konteks bisnis, target pengguna, dan scope pekerjaan — persis seperti di dunia kerja nyata.',
    bullets: [
      'Brief mencakup konteks bisnis & user persona',
      'Scope & deliverable yang jelas dan terukur',
      'Deadline sprint ditetapkan di awal',
      'Diskusi kick-off bersama mentor & tim',
    ],
    cardLabel: 'Brief.md',
    cardContent: `
      <div class="mock-brief">
        <div class="mb-tag">🏢 Client: StartupABC</div>
        <div class="mb-title">Landing Page Produk SaaS</div>
        <div class="mb-row"><span class="mb-key">Deadline</span><span class="mb-val">Jumat, 18.00 WIB</span></div>
        <div class="mb-row"><span class="mb-key">Output</span><span class="mb-val">Deployed URL + README</span></div>
        <div class="mb-row"><span class="mb-key">Stack</span><span class="mb-val">Vue.js + Tailwind</span></div>
        <div class="mb-divider"></div>
        <div class="mb-note">Focus: conversion-optimized, mobile-first, hero + pricing section.</div>
      </div>
    `,
  },
  {
    tag: 'Langkah 02',
    title: 'Pengerjaan',
    desc: 'Kamu mengerjakan proyek dengan dukungan mentor yang bisa diakses setiap saat. Ada channel Discord tim, live coding session opsional, dan async review untuk setiap commit yang kamu push.',
    bullets: [
      'Workspace kolaboratif di GitHub/Figma',
      'Async Q&A di Discord — mentor respons < 4 jam',
      'Peer accountability dengan anggota tim',
      'Daily async standup: kemarin, hari ini, blocker',
    ],
    cardLabel: 'Terminal',
    cardContent: `
      <div class="mock-terminal">
        <div class="mt-line"><span class="mt-prompt">$</span> git checkout -b feat/hero-section</div>
        <div class="mt-line mt-dim">Switched to a new branch 'feat/hero-section'</div>
        <div class="mt-line mt-gap"><span class="mt-prompt">$</span> npm run dev</div>
        <div class="mt-line mt-green">✓ Vite ready at http://localhost:3000</div>
        <div class="mt-line mt-gap"><span class="mt-prompt">$</span> git commit -m "feat: add hero section with CTA"</div>
        <div class="mt-line mt-green">✓ 1 file changed, 47 insertions(+)</div>
        <div class="mt-line mt-gap"><span class="mt-prompt">$</span> git push origin feat/hero-section</div>
        <div class="mt-line mt-green">✓ PR created — mentor notified</div>
      </div>
    `,
  },
  {
    tag: 'Langkah 03',
    title: 'Review & Revisi',
    desc: 'Mentor membedah pekerjaanmu baris per baris lewat GitHub PR atau Figma comment. Feedback bukan sekadar "salah/benar" — melainkan penjelasan kenapa dan bagaimana membuatnya lebih baik.',
    bullets: [
      'Code review langsung di GitHub Pull Request',
      'Comentar inline pada setiap bagian yang perlu diperbaiki',
      'Sesi live review 1-on-1 jika dibutuhkan',
      'Revisi dibatasi 2 siklus agar kamu terbiasa dengan standar',
    ],
    cardLabel: 'Code Review',
    cardContent: `
      <div class="mock-review">
        <div class="mr-comment">
          <div class="mr-avatar">M</div>
          <div class="mr-body">
            <div class="mr-meta">mentor · baris 42–48</div>
            <div class="mr-text">Extract logika ini ke composable <code>useHero()</code> — komponen jadi lebih clean dan reusable.</div>
            <div class="mr-actions">
              <span class="mr-btn mr-resolve">Resolve</span>
              <span class="mr-btn mr-reply">Reply</span>
            </div>
          </div>
        </div>
        <div class="mr-comment mr-reply-comment">
          <div class="mr-avatar mr-avatar-you">K</div>
          <div class="mr-body">
            <div class="mr-meta">kamu · baru saja</div>
            <div class="mr-text">Siap kak! Sudah saya refactor ke <code>composables/useHero.ts</code>. ✅</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    tag: 'Langkah 04',
    title: 'Final Output',
    desc: 'Setelah revisi disetujui, kamu melakukan deployment dan presentasi singkat kepada mentor dan sesama siswa. Output ini langsung masuk ke portofoliomu — bukan file ZIP yang disimpan di folder.',
    bullets: [
      'Deploy ke production (Vercel / Netlify / Railway)',
      'Tulis case study singkat di portofolio website',
      'Demo 5 menit ke mentor & sesama siswa',
      'Entry otomatis ke GitHub & portofolio profil',
    ],
    cardLabel: 'Deployment',
    cardContent: `
      <div class="mock-deploy">
        <div class="md-header">
          <span class="md-icon">🚀</span>
          <span class="md-title">Deployment Sukses</span>
        </div>
        <div class="md-rows">
          <div class="md-row"><span class="md-key">URL</span><span class="md-url">startupABC.vercel.app</span></div>
          <div class="md-row"><span class="md-key">Status</span><span class="md-ok">● Production</span></div>
          <div class="md-row"><span class="md-key">Build</span><span class="md-val">14s · 98kB gzip</span></div>
          <div class="md-row"><span class="md-key">Lighthouse</span><span class="md-val">97 · 100 · 100 · 96</span></div>
        </div>
        <div class="md-footer">✓ Ditambahkan ke portofolio kamu</div>
      </div>
    `,
  },
]

/* ── Weekly workflow ── */
const activeDay = ref(1)

const weekDays = [
  {
    day: 'Senin',
    tag: 'Kickoff',
    theme: 'Sprint Kickoff & Brief',
    schedule: [
      { time: '09.00', activity: 'Daily Standup', desc: 'Sync singkat 15 menit — update progress & blocker', type: 'Sync' },
      { time: '09.30', activity: 'Brief Reading', desc: 'Membaca dan memahami brief proyek sprint baru', type: 'Mandiri' },
      { time: '11.00', activity: 'Kick-off Meeting', desc: 'Diskusi scope, tanya jawab, dan pembagian tugas tim', type: 'Live' },
      { time: '13.00', activity: 'Setup & Scaffolding', desc: 'Inisiasi repo, setup environment, mulai struktur proyek', type: 'Mandiri' },
    ],
  },
  {
    day: 'Selasa',
    tag: 'Build',
    theme: 'Hari Pengerjaan Utama',
    schedule: [
      { time: '09.00', activity: 'Daily Standup', desc: 'Update async di Discord — kemarin, hari ini, blocker', type: 'Async' },
      { time: '09.15', activity: 'Deep Work Session', desc: 'Pengerjaan fitur utama tanpa gangguan — 3 jam fokus', type: 'Mandiri' },
      { time: '12.30', activity: 'Peer Check-in', desc: 'Saling review progress dengan rekan tim', type: 'Sync' },
      { time: '14.00', activity: 'Push & PR Draft', desc: 'Commit progress, buat draft PR, minta feedback awal mentor', type: 'Mandiri' },
    ],
  },
  {
    day: "Rabu",
    tag: 'Review',
    theme: 'Code Review & Iterasi',
    schedule: [
      { time: '09.00', activity: 'Standup', desc: 'Update progress dan review feedback dari mentor', type: 'Async' },
      { time: '10.00', activity: 'Mentor Review', desc: 'Mentor memberi feedback detail di PR — inline comment', type: 'Async' },
      { time: '11.00', activity: 'Revisi', desc: 'Implementasi feedback mentor dari review kemarin', type: 'Mandiri' },
      { time: '15.00', activity: 'Live Q&A (Opsional)', desc: '30 menit sesi terbuka dengan mentor untuk tanya jawab', type: 'Live' },
    ],
  },
  {
    day: 'Kamis',
    tag: 'Polish',
    theme: 'Finishing & Testing',
    schedule: [
      { time: '09.00', activity: 'Standup', desc: 'Sinkronisasi akhir sebelum deadline besok', type: 'Async' },
      { time: '09.30', activity: 'Testing', desc: 'QA manual, responsive check, cross-browser, dan edge cases', type: 'Mandiri' },
      { time: '13.00', activity: 'Final Polish', desc: 'Perbaikan detail UI, performa, dan copy teks', type: 'Mandiri' },
      { time: '16.00', activity: 'Pre-deploy Review', desc: 'Final cek bersama mentor sebelum submission', type: 'Sync' },
    ],
  },
  {
    day: 'Jumat',
    tag: 'Demo',
    theme: 'Deployment & Demo Day',
    schedule: [
      { time: '09.00', activity: 'Deploy to Production', desc: 'Push ke Vercel / Railway — launch produksi resmi', type: 'Mandiri' },
      { time: '10.00', activity: 'Tulis Case Study', desc: 'Dokumentasi proses, keputusan desain, dan hasil akhir', type: 'Mandiri' },
      { time: '14.00', activity: 'Demo Day', desc: 'Presentasi 5 menit ke mentor dan seluruh angkatan', type: 'Live' },
      { time: '15.30', activity: 'Sprint Retro', desc: 'Refleksi apa yang berjalan baik dan apa yang perlu diperbaiki', type: 'Sync' },
    ],
  },
]

/* ── Comparison table ── */
const compareRows = [
  { topic: 'Format Belajar', bad: 'Video ceramah + MCQ', good: 'Simulasi kerja & brief nyata' },
  { topic: 'Feedback', bad: 'Nilai otomatis dari sistem', good: 'Code review manual oleh mentor aktif' },
  { topic: 'Output', bad: 'Sertifikat tanpa karya', good: 'Portfolio publik yang bisa diperlihatkan' },
  { topic: 'Kolaborasi', bad: 'Belajar sendirian', good: 'Tim kecil dengan dinamika kerja nyata' },
  { topic: 'Mentor', bad: 'Forum Q&A atau chatbot', good: 'Praktisi aktif, respons < 4 jam' },
  { topic: 'Kurikulum', bad: 'Statis, sama untuk semua', good: 'Disesuaikan dengan perkembangan siswa' },
  { topic: 'Deployment', bad: 'Proyek hanya ada di lokal', good: 'Setiap proyek di-deploy ke production' },
  { topic: 'Durasi Efektif', bad: '60% waktu nonton teori', good: '80% waktu hands-on project nyata' },
]

/* ── Testimonials ── */
const testimonials = [
  {
    quote: 'Pertama kali saya ngerasa "ini kerja beneran" bukan belajar. Brief, deadline, review — persis kayak magang.',
    name: 'Rizky A.',
    role: 'Lulusan Angkatan 2, Alumni Fast-Track',
    initials: 'RA',
    color: 'linear-gradient(135deg, #6458f5, #8b83ff)',
  },
  {
    quote: 'Portofolio saya punya 4 project production-ready. Bukan mockup, bukan CRUD sederhana. Kualitasnya sangat membedakan portofolio saya dari lulusan rata-rata.',
    name: 'Sinta M.',
    role: 'Lulusan Angkatan 3, Design Enthusiast',
    initials: 'SM',
    color: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    quote: 'Saya pernah ikut bootcamp lain — banyak teorinya, kurang praktek. Di Carriera dari hari pertama sudah coding proyek.',
    name: 'Dandi P.',
    role: 'Lulusan Angkatan 4',
    initials: 'DP',
    color: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
]

/* ── FAQs ── */
const faqs = [
  { q: 'Apakah saya harus punya pengalaman coding sebelumnya?', a: 'Tidak harus. Program kami dirancang untuk pemula absolut. Minggu 1–3 membangun fondasi dari nol, jadi tidak ada asumsi pengetahuan sebelumnya.' },
  { q: 'Berapa lama waktu belajar yang dibutuhkan per hari?', a: 'Sekitar 4–6 jam per hari untuk mengikuti ritme program secara penuh. Namun program kami fleksibel — kamu bisa menyesuaikan sprint dengan jadwal harianmu.' },
  { q: 'Apa yang terjadi jika saya melewati deadline?', a: 'Mentor akan menghubungimu dan menyesuaikan scope pekerjaan. Tujuannya bukan hukuman, melainkan belajar manajemen waktu — persis seperti di dunia kerja nyata.' },
  { q: 'Apakah mentor tersedia setiap hari?', a: 'Ya. Setiap mentor merespons pesan asinkron dalam < 4 jam di hari kerja. Sesi live 1-on-1 dijadwalkan 1× seminggu dan bisa ditambahkan jika blocker.' },
  { q: 'Apakah portofolio yang saya buat benar-benar masuk production?', a: 'Ya — setiap sprint menghasilkan URL production yang aktif, bisa diakses publik, dan otomatis tercatat di profil portofolio Carriera kamu.' },
]

const openFaq = ref<number | null>(null)
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.hiw-page {
  position: relative;
  min-height: 100vh;
  background-color: #FAFAFA;
  color: #111827;
  font-family: 'Instrument Sans', 'Inter', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── Ambients ── */
.bg-ambients {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.ambient {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.ambient-tl { top: -10%; left: -8%; width: 45%; height: 45%; background: radial-gradient(circle, rgba(99,88,245,.08), transparent 70%); }
.ambient-tr { top: 12%; right: -5%; width: 28%; height: 28%; background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%); }
.ambient-bl { bottom: 0; left: 50%; transform: translateX(-50%); width: 55%; height: 25%; background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%); }

/* ── Grid ── */
.bg-grid {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(to right, rgba(99,88,245,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99,88,245,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
}

/* ── Layout ── */
.z-header { position: relative; z-index: 20; }
.hiw-main {
  position: relative;
  z-index: 10;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

/* ════════════════ HERO ════════════════ */
.hero {
  padding: 4rem 0 5rem;
  max-width: 760px;
}

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -.035em;
  color: #111827;
  margin-bottom: 1.25rem;
}
.hero-desc {
  font-size: 1.0625rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 3rem;
  max-width: 640px;
}

/* ── Hero flow ── */
.hero-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  gap: 1rem;
}
.hf-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.hf-circle {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(99,88,245,.06);
  border: 1px solid rgba(99,88,245,.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  flex-shrink: 0;
  transition: all .25s;
}
.hf-circle:hover {
  background: rgba(99,88,245,.1);
  transform: translateY(-2px);
}
.hf-label {
  font-size: .8125rem;
  font-weight: 600;
  color: #374151;
}
.hf-arrow {
  color: #D1D5DB;
}
.hf-arrow svg {
  width: 18px;
  height: 18px;
}

/* ════════════════ SHARED SECTION TOKENS ════════════════ */
.section { margin-top: 7rem; }

.section-label {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: 1.125rem;
}
.section-label-light { color: #A5B4FC; }

.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; flex-shrink: 0; }
.label-dot-light { background: #A5B4FC; }

.section-title {
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -.025em;
  color: #111827;
  margin-bottom: .875rem;
}
.section-title-light { color: #F9FAFB; }

.section-desc {
  max-width: 600px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 3rem;
}
.section-desc-light { color: #6B7280; }

.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* ════════════════ STEP-BY-STEP ════════════════ */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.step-row {
  display: grid;
  grid-template-columns: 72px 1fr 1fr;
  gap: 3rem;
  align-items: start;
}
.step-row-rev .step-body { order: 2; }
.step-row-rev .step-visual { order: 1; }
@media (max-width: 860px) {
  .step-row { grid-template-columns: 48px 1fr; gap: 1.5rem; }
  .step-row .step-visual { display: none; }
}

/* ── Step number col ── */
.step-num-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-top: .5rem;
}
.step-num {
  width: 48px; height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -.02em;
  flex-shrink: 0;
}
.step-num-0 { background: #EEF2FF; color: #6458f5; }
.step-num-1 { background: #F0FDF4; color: #10B981; }
.step-num-2 { background: #FFF7ED; color: #F97316; }
.step-num-3 { background: #FFFBEB; color: #F59E0B; }

.step-line {
  flex: 1;
  width: 2px;
  min-height: 120px;
  background: linear-gradient(to bottom, #E5E7EB, transparent);
  margin-top: .75rem;
}

/* ── Step body ── */
.step-tag {
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: .5rem;
}
.step-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -.02em;
  margin-bottom: .75rem;
}
.step-desc {
  font-size: .9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #4B5563;
  margin-bottom: 1.25rem;
}
.step-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .625rem;
}
.step-bullets li {
  font-size: .875rem;
  font-weight: 400;
  color: #374151;
  padding-left: 1.25rem;
  position: relative;
}
.step-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6458f5;
}

/* ── Step visual card ── */
.step-card-visual {
  border-radius: 18px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  box-shadow: 0 24px 48px -12px rgba(0,0,0,.07);
  overflow: hidden;
}
.scv-header {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .875rem 1.25rem;
  border-bottom: 1px solid #F3F4F6;
  background: #FAFAFA;
}
.scv-dots { display: flex; gap: 5px; }
.scv-dots span { width: 8px; height: 8px; border-radius: 50%; background: #E5E7EB; }
.scv-dots span:first-child { background: #FCA5A5; }
.scv-dots span:nth-child(2) { background: #FDE68A; }
.scv-dots span:nth-child(3) { background: #6EE7B7; }
.scv-badge { font-size: .75rem; font-weight: 600; color: #9CA3AF; }
.scv-body { padding: 1.25rem; }

/* Mock Brief */
:deep(.mock-brief) { display: flex; flex-direction: column; gap: .5rem; }
:deep(.mb-tag) { font-size: .75rem; font-weight: 600; color: #9CA3AF; }
:deep(.mb-title) { font-size: 1rem; font-weight: 700; color: #111827; margin: .25rem 0 .75rem; }
:deep(.mb-row) { display: flex; justify-content: space-between; font-size: .8125rem; padding: .375rem 0; border-bottom: 1px solid #F9FAFB; }
:deep(.mb-key) { color: #9CA3AF; font-weight: 400; }
:deep(.mb-val) { color: #374151; font-weight: 500; }
:deep(.mb-divider) { height: 1px; background: #F3F4F6; margin: .5rem 0; }
:deep(.mb-note) { font-size: .8125rem; font-weight: 300; color: #6B7280; font-style: italic; }

/* Mock Terminal */
:deep(.mock-terminal) {
  background: #111827;
  border-radius: 10px;
  padding: 1rem 1.125rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
:deep(.mt-line) { font-size: .75rem; line-height: 1.8; color: #9CA3AF; }
:deep(.mt-prompt) { color: #6458f5; margin-right: .5rem; }
:deep(.mt-green) { color: #34D399; }
:deep(.mt-dim) { color: #4B5563; }
:deep(.mt-gap) { margin-top: .375rem; }

/* Mock Review */
:deep(.mock-review) { display: flex; flex-direction: column; gap: .875rem; }
:deep(.mr-comment) { display: flex; gap: .75rem; }
:deep(.mr-reply-comment) { padding-left: 1rem; }
:deep(.mr-avatar) {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6458f5, #8b83ff);
  color: white;
  font-size: .6875rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
:deep(.mr-avatar-you) { background: linear-gradient(135deg, #10B981, #34D399); }
:deep(.mr-body) { flex: 1; }
:deep(.mr-meta) { font-size: .6875rem; color: #9CA3AF; margin-bottom: .25rem; }
:deep(.mr-text) { font-size: .8125rem; color: #374151; line-height: 1.5; }
:deep(.mr-text code) { background: #EEF2FF; color: #6458f5; padding: .125rem .375rem; border-radius: 4px; font-size: .75rem; }
:deep(.mr-actions) { display: flex; gap: .5rem; margin-top: .5rem; }
:deep(.mr-btn) { font-size: .6875rem; font-weight: 600; padding: .2rem .625rem; border-radius: 9999px; cursor: pointer; }
:deep(.mr-resolve) { background: #EEF2FF; color: #6458f5; }
:deep(.mr-reply) { background: #F3F4F6; color: #6B7280; }

/* Mock Deploy */
:deep(.mock-deploy) { display: flex; flex-direction: column; gap: .75rem; }
:deep(.md-header) { display: flex; align-items: center; gap: .625rem; }
:deep(.md-icon) { font-size: 1.25rem; }
:deep(.md-title) { font-size: .9375rem; font-weight: 700; color: #111827; }
:deep(.md-rows) { display: flex; flex-direction: column; gap: 0; }
:deep(.md-row) { display: flex; justify-content: space-between; font-size: .8125rem; padding: .375rem 0; border-bottom: 1px solid #F9FAFB; }
:deep(.md-key) { color: #9CA3AF; font-weight: 400; }
:deep(.md-val) { color: #374151; font-weight: 500; }
:deep(.md-url) { color: #6458f5; font-weight: 600; }
:deep(.md-ok) { color: #10B981; font-weight: 600; }
:deep(.md-footer) { font-size: .8125rem; font-weight: 600; color: #10B981; }

/* ════════════════ DARK / WORKFLOW ════════════════ */
.dark-section {
  border-radius: 28px;
  background: #0F172A;
  overflow: hidden;
  position: relative;
}
.dark-section::before {
  content: '';
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 70%; height: 1px;
  background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent);
}
.dark-inner { padding: 4rem 3.5rem 4.5rem; }
@media (max-width: 640px) { .dark-inner { padding: 2.5rem 1.75rem 3rem; } }

.workflow-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 760px) {
  .workflow-grid { grid-template-columns: 1fr; }
}

/* ── Day list ── */
.wf-timeline { display: flex; flex-direction: column; gap: .5rem; }
@media (max-width: 760px) { .wf-timeline { flex-direction: row; flex-wrap: wrap; } }

.wf-day {
  padding: .875rem 1.125rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.05);
  background: rgba(255,255,255,.02);
  cursor: pointer;
  transition: all .2s;
}
.wf-day:hover {
  border-color: rgba(99,88,245,.25);
  background: rgba(99,88,245,.04);
}
.wf-day-active {
  border-color: rgba(99,88,245,.4) !important;
  background: rgba(99,88,245,.08) !important;
}
.wf-day-name { font-size: .875rem; font-weight: 600; color: #F3F4F6; }
.wf-day-tag { font-size: .6875rem; font-weight: 500; color: #6B7280; margin-top: .125rem; }
.wf-day-active .wf-day-name { color: #A5B4FC; }
.wf-day-active .wf-day-tag { color: #818CF8; }

/* ── Detail panel ── */
.wf-detail {
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.025);
  overflow: hidden;
}
.wf-detail-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.wf-detail-day { font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6458f5; margin-bottom: .25rem; }
.wf-detail-theme { font-size: 1rem; font-weight: 600; color: #F3F4F6; }

.wf-schedule { padding: .75rem; display: flex; flex-direction: column; gap: .5rem; }

.wf-schedule-item {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: .875rem 1rem;
  border-radius: 10px;
  background: rgba(255,255,255,.03);
  transition: background .2s;
}
.wf-schedule-item:hover { background: rgba(99,88,245,.06); }

.wf-time { font-size: .75rem; font-weight: 700; color: #6B7280; white-space: nowrap; }
.wf-act-title { font-size: .875rem; font-weight: 600; color: #F3F4F6; margin-bottom: .125rem; }
.wf-act-desc { font-size: .75rem; font-weight: 300; color: #6B7280; line-height: 1.45; }

.wf-act-pill {
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .04em;
  padding: .25rem .625rem;
  border-radius: 9999px;
  white-space: nowrap;
}
.pill-Live    { background: rgba(99,88,245,.2);  color: #A5B4FC; }
.pill-Async   { background: rgba(251,191,36,.1); color: #FBBF24; }
.pill-Mandiri { background: rgba(16,185,129,.1);  color: #34D399; }
.pill-Sync    { background: rgba(249,115,22,.1);  color: #FB923C; }

/* ════════════════ COMPARE TABLE ════════════════ */
.compare-table {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F3F4F6;
  margin-bottom: 3rem;
}
.ct-header {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  background: #F9FAFB;
  border-bottom: 1px solid #F3F4F6;
}
.ct-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr;
  border-bottom: 1px solid #F3F4F6;
  transition: background .2s;
}
.ct-row:last-child { border-bottom: none; }
.ct-row:hover { background: #FAFAFA; }

.ct-cell {
  padding: 1rem 1.25rem;
  font-size: .875rem;
  font-weight: 400;
  color: #374151;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.ct-cell-topic { font-weight: 700; font-size: .75rem; letter-spacing: .06em; text-transform: uppercase; color: #9CA3AF; }
.ct-cell-bad   { font-weight: 700; font-size: .75rem; letter-spacing: .06em; text-transform: uppercase; color: #EF4444; border-left: 1px solid #F3F4F6; }
.ct-cell-good  { font-weight: 700; font-size: .75rem; letter-spacing: .06em; text-transform: uppercase; color: #10B981; border-left: 1px solid #F3F4F6; }
.ct-topic { color: #374151; font-weight: 500; }
.ct-bad { border-left: 1px solid #F3F4F6; color: #6B7280; }
.ct-good { border-left: 1px solid #F3F4F6; color: #374151; font-weight: 500; }
.ct-icon-bad { color: #EF4444; font-size: .875rem; flex-shrink: 0; }
.ct-icon-good { color: #10B981; font-size: .875rem; flex-shrink: 0; }

/* ── Testimonials ── */
.testimonials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 768px) { .testimonials { grid-template-columns: 1fr; } }

.testi-card {
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all .25s;
}
.testi-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 12px 32px rgba(0,0,0,.05);
  transform: translateY(-2px);
}
.testi-quote {
  font-size: .9375rem;
  font-weight: 300;
  line-height: 1.7;
  color: #374151;
  font-style: italic;
  flex: 1;
}
.testi-author { display: flex; align-items: center; gap: .875rem; }
.testi-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white;
  font-size: .8125rem;
  font-weight: 700;
  flex-shrink: 0;
}
.testi-name { font-size: .875rem; font-weight: 600; color: #111827; }
.testi-role { font-size: .75rem; color: #9CA3AF; margin-top: .125rem; }

/* ════════════════ FAQ ════════════════ */
.faq-list { display: flex; flex-direction: column; gap: 0; border-radius: 18px; overflow: hidden; border: 1px solid #F3F4F6; }

.faq-item {
  border-bottom: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: background .2s;
  cursor: pointer;
}
.faq-item:last-child { border-bottom: none; }
.faq-item:hover { background: #FAFAFA; }
.faq-open { background: #FAFAFA; }

.faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  font-size: .9375rem;
  font-weight: 500;
  color: #111827;
  gap: 1rem;
  user-select: none;
}
.faq-chevron {
  flex-shrink: 0;
  color: #9CA3AF;
  transition: transform .25s;
}
.faq-chevron svg { width: 18px; height: 18px; }
.faq-open .faq-chevron { transform: rotate(180deg); color: #6458f5; }
.faq-open .faq-q { color: #6458f5; }

.faq-a {
  padding: 0 1.5rem 1.25rem;
  font-size: .9rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
}

/* ════════════════ CTA ════════════════ */
.cta-section {
  margin-top: 7rem;
  padding: 5.5rem 2rem;
  text-align: center;
  border-radius: 28px;
  background: #0F172A;
  overflow: hidden;
  position: relative;
}
.cta-glow {
  position: absolute;
  top: -40%; left: 50%;
  transform: translateX(-50%);
  width: 60%; height: 120%;
  background: radial-gradient(circle, rgba(99,88,245,.15) 0%, transparent 60%);
  pointer-events: none;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 60%; height: 1px;
  background: linear-gradient(to right, transparent, rgba(99,88,245,.4), transparent);
}
.cta-inner { position: relative; }

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .375rem .875rem;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.05);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #A5B4FC;
  margin-bottom: 1.25rem;
}
.cta-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -.03em;
  color: #F9FAFB;
  margin-bottom: 1rem;
}
.cta-accent {
  font-style: italic;
  font-weight: 800;
  background: linear-gradient(135deg, #818CF8, #A5B4FC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cta-desc {
  max-width: 480px;
  margin: 0 auto 2.5rem;
  font-size: .9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
}
.cta-desc strong { color: #F9FAFB; font-weight: 600; }
.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.cta-note { font-size: .8125rem; font-weight: 300; color: #4B5563; }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  height: 48px;
  padding: 0 1.75rem;
  border-radius: 9999px;
  background: #6458f5;
  color: white;
  font-size: .875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 10px 30px rgba(100,88,245,.25);
}
.btn-primary:hover {
  background: #5448e0;
  box-shadow: 0 16px 40px rgba(100,88,245,.35);
  transform: translateY(-1px);
}
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-size: .875rem;
  font-weight: 500;
  color: #9CA3AF;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: color .2s;
}
.btn-ghost:hover { color: #F9FAFB; }
</style>
