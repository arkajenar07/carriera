<template>
  <div class="marketing-page">
    <!-- Ambient background glow effects -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-top-left"></div>
      <div class="ambient ambient-top-right"></div>
      <div class="ambient ambient-bottom"></div>
    </div>

    <!-- Subtle dot/grid pattern overlay -->
    <div class="bg-grid-pattern" aria-hidden="true"></div>

    <MarketingHeader class="marketing-header-wrapper" />

    <main class="page-main">

      <!-- ───────────────────────────── HERO ───────────────────────────── -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            Platform Belajar Masa Depan
          </div>

          <h1 class="hero-title">
            From Curiosity to<br />
            <em class="hero-title-accent">Digital Skill Mastery</em>
          </h1>

          <p class="hero-description">
            Carriera menghadirkan pengalaman belajar coding yang manusiawi —
            fokus pada logika, project nyata, dan pertumbuhan karier untuk siswa
            SMP–SMK.
          </p>

          <div class="hero-actions">
            <button class="btn-primary">
              Belajar Sekarang
              <svg class="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-ghost">
              Explore Kelas
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-image-frame">
            <div class="hero-screen">
              <div class="screen-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="screen-code">
                <div class="code-line"><span class="code-keyword">const</span> <span class="code-var">skill</span> = <span class="code-string">'mastery'</span></div>
                <div class="code-line"><span class="code-keyword">async function</span> <span class="code-fn">learnWithCarriera</span>() {</div>
                <div class="code-line code-indent"><span class="code-keyword">await</span> <span class="code-fn">buildProject</span>()</div>
                <div class="code-line code-indent"><span class="code-keyword">return</span> <span class="code-string">'real experience'</span></div>
                <div class="code-line">}</div>
              </div>
            </div>

            <!-- Floating badges -->
            <div class="hero-badge-card badge-left">
              <div class="badge-icon badge-green">✓</div>
              <div>
                <div class="badge-title">Project Verified</div>
                <div class="badge-sub">Industry Standard</div>
              </div>
            </div>
            <div class="hero-badge-card badge-right">
              <div class="badge-icon badge-indigo">🚀</div>
              <div>
                <div class="badge-title">1.2k+ Siswa</div>
                <div class="badge-sub">Bergabung Bulan Ini</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ───────────────────────── PROBLEM SECTION ─────────────────────── -->
      <section class="section problems-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Masalah Utama
        </div>
        <h2 class="section-title">
          Belajar Coding Terasa Sulit, Bukan Karena Kamu Nggak Bisa.<br />
          Tapi Karena <em class="title-accent">Cara Belajarnya Belum Tepat.</em>
        </h2>
        <p class="section-description">
          Banyak pemula merasa coding itu sulit — namun masalah sesungguhnya bukan bakat,
          melainkan metode yang tidak step by step.
        </p>

        <div class="problems-grid">
          <article v-for="card in problemCards" :key="card.title" class="problem-card">
            <div class="problem-icon">{{ card.icon }}</div>
            <h3 class="problem-title">{{ card.title }}</h3>
            <p class="problem-desc">{{ card.desc }}</p>
          </article>
        </div>
      </section>

      <!-- ─────────────────────── FEATURES (DARK) ─────────────────────── -->
      <section class="section features-section">
        <div class="features-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-indigo"></span>
            Kenapa Kami
          </div>

          <h2 class="features-title">
            Carriera Tidak Hanya Hadir Sebagai<br />
            <em class="features-title-accent">Kursus Coding,</em> Tapi Juga Teman<br />
            Pembelajaran.
          </h2>

          <p class="features-description">
            Lisensi merupakan sebuah teknologi AI canggih di belakang institusi mentari untuk 
            membuat siswa sistem belajar yang personal, adaptif, dan manusiawi.
          </p>

          <div class="features-grid">
            <div v-for="feature in features" :key="feature.title" class="feature-card">
              <div class="feature-card-icon">{{ feature.icon }}</div>
              <h3 class="feature-card-title">{{ feature.title }}</h3>
              <p class="feature-card-desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ─────────────────────── HOW IT WORKS ──────────────────────────── -->
      <section class="section steps-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Cara Kerja
        </div>
        <h2 class="section-title">
          Belajar Jadi <em class="title-accent">Lebih Jelas</em> juga Terarah
        </h2>
        <p class="section-description">
          Carriera memiliki metode belajar coding yang hemat dan mudah dipahami.
        </p>

        <div class="steps-grid">
          <div v-for="(step, index) in steps" :key="step.title" class="step-card">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-connector" v-if="index < steps.length - 1"></div>
          </div>
        </div>
      </section>

      <!-- ──────────────────────── COURSES ──────────────────────────────── -->
      <section class="section courses-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Pilihan Kelas
        </div>
        <h2 class="section-title">
          Pilihan Kelas di <em class="title-accent">Carriera Course</em>
        </h2>
        <p class="section-description">
          Lisensi merupakan sebuah teknologi AI canggih di belakang institusi mentari untuk 
          membuat siswa sistem belajar yang personal, adaptif, dan manusiawi.
        </p>

        <div class="courses-grid">
          <article v-for="course in courses" :key="course.title" class="course-card">
            <div class="course-card-left">
              <div class="course-icon">{{ course.icon }}</div>
              <div>
                <h3 class="course-title">{{ course.title }}</h3>
                <p class="course-track">{{ course.track }}</p>
              </div>
            </div>
            <button class="course-link">
              Explore Roadmap
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </article>
        </div>
      </section>

      <!-- ──────────────────────── CTA SECTION ──────────────────────────── -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-content">
          <p class="cta-pretext">Jadi Tunggu Apa Lagi ?</p>
          <h2 class="cta-title">
            Daftar <em class="cta-title-accent">Carriera</em> Sekarang Juga !
          </h2>
          <p class="cta-description">
            Lisensi merupakan sebuah teknologi AI canggih di belakang institusi mentari untuk
            membuat siswa sistem belajar yang personal, adaptif, dan manusiawi.
          </p>
          <div class="cta-actions">
            <button class="btn-primary btn-primary-large">
              Belajar Sekarang
              <svg class="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-ghost btn-ghost-large">
              Explore Kelas
            </button>
          </div>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Carriera Course — From Curiosity to Digital Skill Mastery',
  description: 'Platform belajar coding terbaik untuk siswa SMP–SMK. Mulai perjalanan digitalmu bersama Carriera.'
})

const problemCards = [
  {
    icon: '🗺️',
    title: 'Bingung Mulai dari Mana',
    desc: 'Kebanyakan pemula nggak tau harus mulai dari mana dan akhirnya bingung sendiri.'
  },
  {
    icon: '😰',
    title: 'Terbebas Menghafal',
    desc: 'Belajar tanpa tujuan yang jelas, belajar tanpa memahami apa yang dipelajari.'
  },
  {
    icon: '🔨',
    title: 'Kurang Praktik',
    desc: 'Sering perasan content tapi langsung itu membuatnya sendiri.'
  },
  {
    icon: '📘',
    title: 'Terlalu Banyak Teori',
    desc: 'Terlalu banyak full-teori tapi kurang implementasinya jadi tidak bisa.'
  }
]

const features = [
  {
    icon: '⚙️',
    title: 'Work Simulation Engine',
    desc: 'Belajar dengan Standar Industri — ini menghadirkan sistem lingkungan kerja yang nyata secara menyeluruh.'
  },
  {
    icon: '🧭',
    title: 'Personalized Skill Roadmap',
    desc: 'Roadmap Sesuai Tujuan kamu — kami mengatur roadmap personal sesuai potensi, sebaliknya lebih efisyen.'
  },
  {
    icon: '🗂️',
    title: 'Real Portfolio Builder',
    desc: 'Portfolio yang Bisa Dilihat — Tujuan project adalah menghasilkan karya yg bisa digunakan untuk melamar freelance atau magang, bukan sekadar bahan latihan.'
  }
]

const steps = [
  {
    title: 'Skill Mapping',
    desc: 'Setiap kompetensi dalam kurikulum dibagi dalam modul terstruktur dan teratur.'
  },
  {
    title: 'Guided Skill Building',
    desc: 'Setiap kompetensi dibangun baik secara metodis melalui latihan-latihan praktis.'
  },
  {
    title: 'Real Project Simulation',
    desc: 'Menyelesaikan project nyata setiap modul, memiliki deadline dan standar industri.'
  },
  {
    title: 'Portfolio Ready',
    desc: 'Setiap project nyata, portofolio terbangun secara otomatis, siap untuk menunjukkan ke orang-orang.'
  }
]

const courses = [
  { icon: '🐍', title: 'Python Coding Class', track: 'Temukan Batasmu' },
  { icon: '🌐', title: 'Web Development Class', track: 'Lihat Batasmu' },
  { icon: '🎨', title: 'UI/UX Design Class', track: 'Explore Roadmap' },
  { icon: '📱', title: 'Digital Marketing Class', track: 'Explore Roadmap' }
]
</script>

<style scoped>
/* ─────────────────── BASE ─────────────────── */
.marketing-page {
  position: relative;
  min-height: 100vh;
  background-color: #FAFAFA;
  color: #111827;
  font-family: 'Instrument Sans', 'Inter', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ─────────────────── AMBIENT ─────────────────── */
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
  opacity: 0.55;
}
.ambient-top-left {
  top: -10%;
  left: -8%;
  width: 45%;
  height: 45%;
  background: radial-gradient(circle, rgba(99, 88, 245, 0.08), transparent 70%);
}
.ambient-top-right {
  top: 10%;
  right: -5%;
  width: 30%;
  height: 30%;
  background: radial-gradient(circle, rgba(165, 180, 252, 0.06), transparent 70%);
}
.ambient-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 30%;
  background: radial-gradient(circle, rgba(99, 88, 245, 0.04), transparent 60%);
}

/* ────────────── GRID PATTERN ────────────── */
.bg-grid-pattern {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(to right, rgba(99, 88, 245, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 88, 245, 0.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
}

/* ────────────── LAYOUT ────────────── */
.marketing-header-wrapper {
  position: relative;
  z-index: 20;
}
.page-main {
  position: relative;
  z-index: 10;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

/* ───────────────────────── HERO ───────────────────────────── */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5rem;
  padding-top: 4rem;
  padding-bottom: 6rem;
}
@media (max-width: 900px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-top: 2rem;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid rgba(99, 88, 245, 0.2);
  background: rgba(99, 88, 245, 0.04);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: 1.5rem;
}
.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6458f5;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}

.hero-title {
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: #111827;
  margin-bottom: 1.5rem;
}
.hero-title-accent {
  font-style: italic;
  font-weight: 700;
  background: linear-gradient(135deg, #6458f5 0%, #8b83ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  max-width: 440px;
  font-size: 1.0625rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* ────────── BUTTONS ────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 48px;
  padding: 0 1.75rem;
  border-radius: 9999px;
  background: #6458f5;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 30px rgba(100, 88, 245, 0.25);
}
.btn-primary:hover {
  background: #5448e0;
  box-shadow: 0 16px 40px rgba(100, 88, 245, 0.35);
  transform: translateY(-1px);
}
.btn-primary-large {
  height: 52px;
  padding: 0 2rem;
  font-size: 0.9375rem;
}
.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}
.btn-primary:hover .btn-arrow {
  transform: translateX(3px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
.btn-ghost:hover { color: #6458f5; }
.btn-ghost-large { font-size: 0.9375rem; }

/* ─── HERO VISUAL ─── */
.hero-visual {
  display: flex;
  justify-content: flex-end;
}
.hero-image-frame {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.hero-screen {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 20px;
  background: #111827;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow:
    0 40px 80px -15px rgba(0,0,0,0.2),
    0 0 0 1px rgba(99,88,245,0.1);
  padding: 1.5rem;
  overflow: hidden;
}
.screen-dots {
  display: flex;
  gap: 6px;
  margin-bottom: 1.5rem;
}
.screen-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #374151;
}
.screen-dots span:first-child { background: #EF4444; }
.screen-dots span:nth-child(2) { background: #F59E0B; }
.screen-dots span:nth-child(3) { background: #10B981; }

.screen-code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.9;
}
.code-line { color: #9CA3AF; }
.code-indent { padding-left: 1.5rem; }
.code-keyword { color: #C084FC; }
.code-var { color: #60A5FA; }
.code-fn { color: #34D399; }
.code-string { color: #FBBF24; }

/* Floating Badge Cards */
.hero-badge-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.125rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(229, 231, 235, 0.8);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09);
  animation: float 4s ease-in-out infinite;
}
.badge-left {
  bottom: -1.5rem;
  left: -1.5rem;
  animation-delay: 0s;
}
.badge-right {
  top: -1rem;
  right: -1rem;
  animation-delay: 2s;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
.badge-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.badge-green { background: #D1FAE5; }
.badge-indigo { background: #EDE9FE; }
.badge-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #111827;
}
.badge-sub {
  font-size: 0.6875rem;
  color: #9CA3AF;
  margin-top: 1px;
}

/* ─────────────────── SECTIONS ─────────────────── */
.section {
  margin-top: 7rem;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6458f5;
  margin-bottom: 1.25rem;
}
.section-label-light { color: #A5B4FC; }

.label-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6458f5;
  flex-shrink: 0;
}
.label-dot-indigo { background: #A5B4FC; }

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #111827;
  margin-bottom: 1rem;
}
.title-accent {
  font-style: italic;
  font-weight: 700;
  color: #6458f5;
}
.section-description {
  max-width: 620px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 3.5rem;
}

/* ─────────────────── PROBLEM CARDS ─────────────────── */
.problems-section .section-title { max-width: 720px; }

.problems-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .problems-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .problems-grid { grid-template-columns: 1fr; }
}

.problem-card {
  padding: 2rem 1.75rem;
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all 0.3s ease;
  cursor: default;
}
.problem-card:hover {
  border-color: rgba(99, 88, 245, 0.15);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
.problem-icon {
  font-size: 1.625rem;
  margin-bottom: 1.25rem;
}
.problem-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.625rem;
}
.problem-desc {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.65;
  color: #9CA3AF;
}

/* ─────────────────── FEATURES (DARK) ─────────────────── */
.features-section {
  border-radius: 28px;
  background: #0F172A;
  overflow: hidden;
  position: relative;
}
.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(99, 88, 245, 0.5), transparent);
}

.features-inner {
  padding: 4rem 3.5rem 4.5rem;
  position: relative;
}
@media (max-width: 640px) {
  .features-inner { padding: 2.5rem 1.75rem 3rem; }
}

.features-title {
  font-size: clamp(1.75rem, 3.2vw, 2.625rem);
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: #F9FAFB;
  margin-bottom: 1rem;
}
.features-title-accent {
  font-style: italic;
  font-weight: 700;
  color: #818CF8;
}
.features-description {
  max-width: 560px;
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 3.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; }
}

.feature-card {
  padding: 1.75rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.025);
  transition: all 0.3s ease;
}
.feature-card:hover {
  border-color: rgba(99, 88, 245, 0.25);
  background: rgba(99, 88, 245, 0.04);
}
.feature-card-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.feature-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #F3F4F6;
  margin-bottom: 0.625rem;
}
.feature-card-desc {
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.7;
  color: #6B7280;
}

/* ─────────────────── STEPS ─────────────────── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #F3F4F6;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F3F4F6;
}
@media (max-width: 900px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .steps-grid { grid-template-columns: 1fr; }
}

.step-card {
  position: relative;
  padding: 2.25rem 2rem;
  background: #FFFFFF;
  transition: background 0.25s ease;
}
.step-card:hover { background: #FAFAFA; }

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #EEF2FF;
  color: #6458f5;
  font-size: 1.125rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
}
.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.625rem;
}
.step-desc {
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.65;
  color: #9CA3AF;
}

/* ─────────────────── COURSES ─────────────────── */
.courses-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
}
@media (max-width: 640px) {
  .courses-grid { grid-template-columns: 1fr; }
}

.course-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.375rem 1.75rem;
  border-radius: 16px;
  border: 1px solid #F3F4F6;
  background: rgba(255,255,255,0.6);
  transition: all 0.25s ease;
  cursor: pointer;
}
.course-card:hover {
  background: #FFFFFF;
  border-color: rgba(99, 88, 245, 0.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}
.course-card-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.course-icon {
  font-size: 1.375rem;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.course-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
}
.course-track {
  font-size: 0.8125rem;
  font-weight: 400;
  color: #9CA3AF;
  margin-top: 0.125rem;
}
.course-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6458f5;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: gap 0.2s ease;
}
.course-link svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}
.course-link:hover svg { transform: translateX(3px); }

/* ─────────────────── CTA ─────────────────── */
.cta-section {
  margin-top: 7rem;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  border-radius: 28px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  overflow: hidden;
}
.cta-glow {
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 100%;
  background: radial-gradient(circle, rgba(99, 88, 245, 0.07) 0%, transparent 65%);
  pointer-events: none;
}
.cta-content { position: relative; }
.cta-pretext {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9CA3AF;
  margin-bottom: 1rem;
}
.cta-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #111827;
  margin-bottom: 1rem;
}
.cta-title-accent {
  font-style: italic;
  font-weight: 800;
  background: linear-gradient(135deg, #6458f5 0%, #8b83ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cta-description {
  max-width: 500px;
  margin: 0 auto 2.5rem;
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
}
.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
</style>