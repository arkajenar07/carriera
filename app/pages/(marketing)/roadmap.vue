<template>
  <div class="roadmap-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="roadmap-main">

      <!-- ══════════════════════ HERO (WHY ROADMAP IS IMPORTANT) ══════════════════════ -->
      <section class="hero">
        <div class="hero-text">
          <div class="badge">
            <span class="badge-dot"></span>
            Personalized Roadmap
          </div>
          <h1 class="hero-title">
            Kurikulum Bukan Rel Kereta.<br />
            <em class="accent">Kami Buatkan Navigasi Khusus Untukmu.</em>
          </h1>
          <p class="hero-desc">
            Di Carriera, kami tidak percaya pada kurikulum <i>one-size-fits-all</i>. Industri tidak mencari replika lulusan bootcamp, melainkan talent dengan kombinasi <i>skill</i> yang unik. Roadmap kamu disesuaikan dengan kekuatan dasar, minat spesifik, dan tujuan kariermu.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="scrollToPaths">
              Lihat Contoh Jalur
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost">Pelajari Sistemnya</NuxtLink>
          </div>
        </div>

        <!-- Hero Visual: Visualizing personalization -->
        <div class="hero-visual">
          <div class="roadmap-mockup">
            <div class="rm-header">
              <span class="rm-label">Your Adaptive Roadmap Engine</span>
              <div class="rm-dots"><span></span><span></span><span></span></div>
            </div>
            <div class="rm-body">
               <div class="rm-node rm-node-start">Foundation</div>
               <svg class="rm-line" viewBox="0 0 50 60"><path d="M25 0 L25 60" stroke="rgba(99,88,245,.3)" stroke-width="2" stroke-dasharray="4 4"/></svg>
               <div class="rm-split">
                  <div class="rm-branch">
                     <div class="rm-node rm-node-design">Design Tech</div>
                     <div class="rm-sub-node">Interaction</div>
                  </div>
                  <div class="rm-branch rm-branch-active">
                     <div class="rm-node rm-node-ai">AI-Ready Dev</div>
                     <div class="rm-sub-node rm-sub-active">Prompt Eng.</div>
                  </div>
               </div>
               <svg class="rm-line" viewBox="0 0 50 60"><path d="M25 0 L25 60" stroke="#6458f5" stroke-width="2" /></svg>
               <div class="rm-node rm-node-outcome">Specialized Output</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CONTOH JALUR ══════════════════════ -->
      <section class="section" id="paths">
        <div class="section-label">
          <span class="label-dot"></span>
          Jalur Spesialisasi
        </div>
        <h2 class="section-title">
          Contoh Arah <em class="accent">Perkembanganmu.</em>
        </h2>
        <p class="section-desc">
          Ini bukan pilihan wajib, melainkan architype yang sering dibentuk oleh siswa kami bersama mentor. Kamu bisa menggabungkan elemen dari berbagai jalur untuk menciptakan nilaimu sendiri.
        </p>

        <div class="paths-grid">
          <!-- Pathway: Design Technology -->
          <div class="path-card">
            <div class="path-header path-header-design">
               <div class="path-icon">✨</div>
               <h3 class="path-title">Design Technology</h3>
               <p class="path-subtitle">Jembatan Estetika & Kode</p>
            </div>
            <div class="path-body">
               <p class="path-description">Fokus pada menciptakan pengalaman pengguna yang mulus tidak hanya di Figma, tetapi hingga ke level implementasi kode. Sempurna bagi mereka yang punya mata desain tapi ingin logika sistem.</p>
               <div class="path-skills">
                  <span class="ps-label">Fokus:</span>
                  <div class="ps-chips">
                     <span>Design Systems</span>
                     <span>Advanced CSS</span>
                     <span>Micro-interactions</span>
                     <span>Accessibility</span>
                  </div>
               </div>
               <div class="path-modules">
                  <div class="pm-item"><span class="pm-dot"></span> Membangun Design System dengan Vue/React</div>
                  <div class="pm-item"><span class="pm-dot"></span> Animasi kompleks & transisi status</div>
                  <div class="pm-item"><span class="pm-dot"></span> Audit & implementasi standar WCAG</div>
               </div>
            </div>
          </div>

          <!-- Pathway: AI-Ready Developer -->
          <div class="path-card">
            <div class="path-header path-header-ai">
               <div class="path-icon">🤖</div>
               <h3 class="path-title">AI-Ready Developer</h3>
               <p class="path-subtitle">Mengintegrasikan Kecerdasan</p>
            </div>
            <div class="path-body">
               <p class="path-description">Bukan sekadar memakai ChatGPT, melainkan membangun aplikasi yang ditenagai model bahasa besar (LLM). Untuk mereka yang ingin membangun fitur masa depan hari ini.</p>
               <div class="path-skills">
                  <span class="ps-label">Fokus:</span>
                  <div class="ps-chips">
                     <span>API Integration</span>
                     <span>Prompt Engineering</span>
                     <span>RAG Architecture</span>
                     <span>Data Handling</span>
                  </div>
               </div>
               <div class="path-modules">
                  <div class="pm-item"><span class="pm-dot"></span> Integrasi OpenAI/Claude via API Server</div>
                  <div class="pm-item"><span class="pm-dot"></span> Membangun sistem Retreival-Augmented Gen.</div>
                  <div class="pm-item"><span class="pm-dot"></span> Optimasi prompt untuk output JSON terstruktur</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CARA ROADMAP DISESUAIKAN (DARK SECTION) ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Proses Adaptasi
          </div>
          <h2 class="section-title section-title-light">
            Bagaimana Kami <em class="accent-light">Merakit Ulang</em> Modulmu.
          </h2>
          <p class="section-desc section-desc-light">
            Sistem kami dirancang modular. Setelah fase pondasi, mentor akan melihat progresmu dan memotong atau menambah materi sesuai kapasitas serap dan tujuan akhirmu.
          </p>

          <div class="adapt-steps">
            <div class="adapt-step" v-for="(step, index) in adaptSteps" :key="index">
               <div class="as-num">0{{ index + 1 }}</div>
               <div class="as-content">
                  <h3 class="as-title">{{ step.title }}</h3>
                  <p class="as-desc">{{ step.desc }}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ OUTCOME TIAP JALUR ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Hasil Akhir
        </div>
        <h2 class="section-title">
          Apa yang Akan <em class="accent">Kamu Hasilkan?</em>
        </h2>
        <p class="section-desc">
          Roadmap yang berbeda menghasilkan tipe <i>capstone project</i> yang berbeda, membentuk portofolio spesifik yang akan memperlihatkan kekuatan utamamu ke para peninjau.
        </p>

        <div class="outcomes-grid">
           <div class="outcome-card">
              <div class="oc-tag oc-tag-design">Jalur: Design Tech</div>
              <h3 class="oc-title">Nusantara UI Toolkit</h3>
              <p class="oc-desc">Sebuah library komponen siap pakai dengan token warna dinamis, dukungan dark mode <i>out-of-the-box</i>, dan dokumentasi interaktif yang sudah diaudit aksesibilitasnya.</p>
              <div class="oc-role">Role Simulasi: <span class="ocr-val">UX Engineer / UI Developer</span></div>
           </div>
           
           <div class="outcome-card">
              <div class="oc-tag oc-tag-ai">Jalur: AI-Ready Dev</div>
              <h3 class="oc-title">DocuMind AI Assistant</h3>
              <p class="oc-desc">Web app yang memungkinkan user mengunggah PDF tebal, memprosesnya dengan RAG, dan menyediakan interface chat untuk bertanya seputar isi dokumen tersebut dengan sitasi yang akurat.</p>
              <div class="oc-role">Role Simulasi: <span class="ocr-val">AI Engineer / Backend Developer</span></div>
           </div>
           
           <div class="outcome-card">
              <div class="oc-tag oc-tag-general">Jalur: Product Focused</div>
              <h3 class="oc-title">SaaS Analytics Dashboard</h3>
              <p class="oc-desc">Aplikasi <i>full-stack</i> dengan manajemen <i>state</i> yang kompleks, memvisualisasikan ribuan baris data mock secara <i>real-time</i> tanpa jeda proses (lag), dioptimalkan untuk pengalaman desktop dan mobile.</p>
              <div class="oc-role">Role Simulasi: <span class="ocr-val">Frontend Engineer / Product Dev</span></div>
           </div>
        </div>
      </section>

      <!-- ══════════════════════ CTA ══════════════════════ -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge">
            <span class="label-dot label-dot-light"></span>
            Siap Berangkat?
          </div>
          <h2 class="cta-title">
            Mari Rancang<br />
            <em class="cta-accent">Peta Jalanmu Sendiri.</em>
          </h2>
          <p class="cta-desc">
            Berhenti mengikuti tutorial generik. Mulailah perjalanan yang dibentuk khusus untuk mengeluarkan potensi terbaikmu di industri digital.
          </p>

          <div class="cta-actions">
            <button class="btn-primary btn-lg">
              Konsultasi Roadmap Gratis
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost btn-lg">Lihat Program Kami</NuxtLink>
          </div>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Roadmap Personal Carriera — Kurikulum Fleksibel Sesuai Potensi',
  description: 'Jelajahi bagaimana kami menyesuaikan kurikulum pemrograman dan desain dengan kebutuhan, minat, dan target karier spesifik Anda melalui roadmap adaptif.'
})

const adaptSteps = [
  { title: "Foundation Assessment", desc: "Di 2 minggu pertama, mentor mengobservasi kecepatanmu menangkap logika dasar dan estetika visual melalui mini-task harian." },
  { title: "The Split Decision", desc: "Berdasarkan penilaian awal, mentor mengusulkan penekanan modul. Jika kamu kuat di logika, porsi backend/AI diperbesar; jika kuat visual, porsi interaksi diperdalam." },
  { title: "Dynamic Sprint Allocation", desc: "Tugas mingguan tidak lagi seragam. Kamu akan menerima brief proyek yang mensyaratkan penyelesaian spesifik sesuai spesialisasi jalurmu." },
  { title: "Capstone Sculpting", desc: "Di akhir program, proyek final benar-benar merepresentasikan 'posisi' yang akan kamu lamar, bukan sekadar cloning aplikasi toko online biasa." }
]

function scrollToPaths() {
  document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.roadmap-page {
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
.ambient { position: absolute; border-radius: 50%; filter: blur(100px); }
.ambient-tl { top: -10%; left: -8%; width: 45%; height: 45%; background: radial-gradient(circle, rgba(99,88,245,.08), transparent 70%); }
.ambient-tr { top: 12%; right: -5%; width: 28%; height: 28%; background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%); }
.ambient-bl { bottom: 0; left: 50%; transform: translateX(-50%); width: 55%; height: 25%; background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%); }

/* ── Grid overlay ── */
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
.roadmap-main {
  position: relative;
  z-index: 10;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

/* ════════════════ TOKENS ════════════════ */
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
.section-desc { max-width: 600px; font-size: 1rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 3rem; }
.section-desc-light { color: #818CF8; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

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
  transition: all .25s;
  box-shadow: 0 10px 30px rgba(100,88,245,.25);
}
.btn-primary:hover { background: #5448e0; box-shadow: 0 16px 40px rgba(100,88,245,.35); transform: translateY(-1px); }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }
.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-size: .875rem;
  font-weight: 500;
  color: #4B5563;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: color .2s;
}
.btn-ghost:hover { color: #6458f5; }

/* ════════════════ HERO ════════════════ */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4.5rem;
  padding: 4rem 0 5rem;
}
@media (max-width: 900px) { .hero { grid-template-columns: 1fr; gap: 3rem; padding-top: 2rem; } }

.badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .375rem .875rem;
  border-radius: 9999px;
  border: 1px solid rgba(99,88,245,.2);
  background: rgba(99,88,245,.04);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: 1.5rem;
}
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.5; transform:scale(.8); }
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
  max-width: 480px;
  font-size: 1.0625rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 2.25rem;
}
.hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }

.hero-visual { display: flex; justify-content: flex-end; width: 100%; }
.roadmap-mockup {
   width: 100%;
   max-width: 400px;
   background: #fff;
   border: 1px solid #E5E7EB;
   border-radius: 16px;
   box-shadow: 0 24px 48px -12px rgba(0,0,0,0.08);
   overflow: hidden;
}
.rm-header {
   padding: 1rem 1.25rem;
   background: #FAFAFA;
   border-bottom: 1px solid #F3F4F6;
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.rm-label { font-size: 0.75rem; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.05em;}
.rm-dots { display: flex; gap: 4px; }
.rm-dots span { width: 8px; height: 8px; border-radius: 50%; background: #D1D5DB; }
.rm-body {
   padding: 2rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   background: #fff;
}
.rm-node {
   padding: 0.5rem 1rem;
   border-radius: 9999px;
   font-size: 0.8125rem;
   font-weight: 600;
   text-align: center;
   z-index: 2;
}
.rm-node-start { background: #F3F4F6; color: #6B7280; border: 1px solid #E5E7EB; }
.rm-split {
   display: flex;
   justify-content: center;
   gap: 2rem;
   width: 100%;
   position: relative;
}
.rm-split::before {
   content: "";
   position: absolute;
   top: 15px;
   left: 20%;
   right: 20%;
   height: 2px;
   background: rgba(99,88,245,.2);
   z-index: 1;
}
.rm-branch { display: flex; flex-direction: column; align-items: center; gap: 1rem; z-index: 2;}
.rm-node-design { background: #FDF4FF; color: #D946EF; border: 1px solid #FBCFE8; }
.rm-node-ai { background: #EEF2FF; color: #6458f5; border: 1px solid #C7D2FE; box-shadow: 0 4px 12px rgba(99,88,245,0.2); transform: scale(1.05);}
.rm-sub-node {
   font-size: 0.7rem;
   color: #9CA3AF;
   padding: 0.25rem 0.5rem;
   border: 1px dashed #E5E7EB;
   border-radius: 4px;
}
.rm-sub-active { border-color: #A5B4FC; color: #6458f5; font-weight: 500; background: #EEF2FF; }
.rm-line { width: 50px; height: 40px; margin: -5px 0; z-index: 1;}
.rm-node-outcome { background: #111827; color: white; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }


/* ════════════════ PATHS GRID ════════════════ */
.paths-grid {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 2rem;
}
@media (max-width: 768px) { .paths-grid { grid-template-columns: 1fr; } }

.path-card {
   background: #fff;
   border: 1px solid #F3F4F6;
   border-radius: 24px;
   overflow: hidden;
   transition: transform 0.3s, box-shadow 0.3s;
}
.path-card:hover {
   transform: translateY(-5px);
   box-shadow: 0 20px 40px rgba(0,0,0,0.06);
}
.path-header {
   padding: 2rem;
   position: relative;
}
.path-header-design { background: linear-gradient(135deg, #FDF4FF 0%, #FAFAFA 100%); border-bottom: 1px solid #FCE7F3; }
.path-header-ai { background: linear-gradient(135deg, #EEF2FF 0%, #FAFAFA 100%); border-bottom: 1px solid #E0E7FF; }
.path-icon { font-size: 2rem; margin-bottom: 1rem; }
.path-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
.path-subtitle { font-size: 0.875rem; color: #6B7280; font-weight: 500; }

.path-body { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
.path-description { font-size: 0.9375rem; line-height: 1.6; color: #4B5563; font-weight: 300;}
.path-skills { display: flex; flex-direction: column; gap: 0.5rem; }
.ps-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #9CA3AF; letter-spacing: 0.05em; }
.ps-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.ps-chips span { 
   font-size: 0.75rem; 
   padding: 0.35rem 0.75rem; 
   background: #F3F4F6; 
   border-radius: 9999px; 
   color: #374151; 
   font-weight: 500;
}
.path-header-design ~ .path-body .ps-chips span { background: #FDF4FF; color: #D946EF; }
.path-header-ai ~ .path-body .ps-chips span { background: #EEF2FF; color: #6458f5; }

.path-modules { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; padding-top: 1.5rem; border-top: 1px solid #F3F4F6; }
.pm-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.875rem; color: #374151; line-height: 1.4; }
.pm-dot { width: 6px; height: 6px; border-radius: 50%; background: #D1D5DB; margin-top: 0.4rem; flex-shrink: 0;}
.path-header-design ~ .path-body .pm-dot { background: #F472B6; }
.path-header-ai ~ .path-body .pm-dot { background: #818CF8; }


/* ════════════════ DARK SECTION (PROSES ADAPTASI) ════════════════ */
.dark-section { border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.dark-section::before {
  content: '';
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 70%; height: 1px;
  background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent);
}
.dark-inner { padding: 4rem 3.5rem 4.5rem; position: relative; }
@media (max-width: 640px) { .dark-inner { padding: 2.5rem 1.75rem 3rem; } }

.adapt-steps {
   display: flex;
   flex-direction: column;
   gap: 2rem;
   position: relative;
}
.adapt-steps::before {
   content: "";
   position: absolute;
   top: 0; left: 24px; bottom: 0;
   width: 1px;
   background: rgba(255,255,255,0.1);
}
.adapt-step {
   display: flex;
   gap: 2rem;
   align-items: flex-start;
   position: relative;
}
.as-num {
   width: 48px; height: 48px;
   border-radius: 12px;
   background: rgba(99,88,245,0.2);
   border: 1px solid rgba(99,88,245,0.3);
   color: #A5B4FC;
   display: flex;
   justify-content: center;
   align-items: center;
   font-weight: 700;
   font-size: 1.1rem;
   flex-shrink: 0;
   z-index: 2;
}
.as-content { flex: 1; padding-top: 0.5rem; }
.as-title { font-size: 1.125rem; font-weight: 600; color: #F3F4F6; margin-bottom: 0.5rem;}
.as-desc { font-size: 0.9375rem; color: #9CA3AF; line-height: 1.6; font-weight: 300;}


/* ════════════════ OUTCOMES ════════════════ */
.outcomes-grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 1.5rem;
}
@media (max-width: 900px) { .outcomes-grid { grid-template-columns: 1fr; gap: 1rem; } }

.outcome-card {
   padding: 2rem;
   background: #fff;
   border: 1px solid #E5E7EB;
   border-radius: 20px;
   display: flex;
   flex-direction: column;
   transition: border-color 0.3s;
}
.outcome-card:hover { border-color: rgba(99,88,245,.4); }
.oc-tag { 
   align-self: flex-start;
   font-size: 0.6875rem;
   font-weight: 700;
   text-transform: uppercase;
   letter-spacing: 0.05em;
   padding: 0.25rem 0.6rem;
   border-radius: 6px;
   margin-bottom: 1.25rem;
}
.oc-tag-design { background: #FDF4FF; color: #D946EF; }
.oc-tag-ai { background: #EEF2FF; color: #6458f5; }
.oc-tag-general { background: #F3F4F6; color: #4B5563; }
.oc-title { font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
.oc-desc { font-size: 0.875rem; line-height: 1.6; color: #6B7280; font-weight: 300; flex-grow: 1; margin-bottom: 1.5rem;}
.oc-role { font-size: 0.8125rem; color: #9CA3AF; padding-top: 1rem; border-top: 1px dashed #E5E7EB;}
.ocr-val { font-weight: 600; color: #374151; }


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
  top: -40%; left: 50%; transform: translateX(-50%);
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
  margin: 0 auto 2rem;
  font-size: .9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #818CF8;
}
.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.cta-section .btn-ghost { color: #9CA3AF; }
.cta-section .btn-ghost:hover { color: #F9FAFB; }
</style>
