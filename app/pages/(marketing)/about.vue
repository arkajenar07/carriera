<template>
  <div class="about-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="about-main">

      <!-- ══════════════════════ HERO (VISION) ══════════════════════ -->
      <section class="hero text-center">
        <div class="badge mx-auto">
          <span class="badge-dot"></span>
          Tentang Kami
        </div>
        <h1 class="hero-title max-w-4xl mx-auto">
          Mengubah Cara Belajar<br />
          <em class="accent">Menjadi Cara Kerja.</em>
        </h1>
        <p class="hero-desc mx-auto mt-6">
          Kami menolak ekosistem edukasi yang hanya berfokus pada penyelesaian modul dan sertifikat. Carriera berdiri dengan satu keyakinan: cara terbaik untuk mempelajari industri adalah dengan mensimulasikan industrinya.
        </p>
      </section>

      <!-- ══════════════════════ PROBLEM ══════════════════════ -->
      <section class="section problem-section">
         <div class="problem-container">
            <div class="problem-content">
               <div class="section-label">
                 <span class="label-dot"></span>
                 The Problem
               </div>
               <h2 class="section-title">
                 Lulusan Banyak, <em class="accent">Siap Kerja Sedikit.</em>
               </h2>
               <p class="section-desc">
                 Industri digital tumbuh pesat, namun rekruter semakin kesulitan menemukan talenta berkualitas. Mengapa? Karena sebagian besar jalur edukasi terjebak pada pengajaran <i>syntax</i>, bukan pemecahan masalah (<i>problem solving</i>) dalam konteks bisnis nyata.
               </p>
            </div>
            
            <div class="problem-stats">
               <div class="stat-box">
                  <div class="sb-val">78%</div>
                  <div class="sb-lbl">Hiring Manager merasa portofolio pelamar terlalu "templated".</div>
               </div>
               <div class="stat-box">
                  <div class="sb-val">6 bln</div>
                  <div class="sb-lbl">Rata-rata waktu onboarding lulusan baru untuk siap di production.</div>
               </div>
               <div class="stat-box sb-highlight">
                  <div class="sb-val text-white">#1</div>
                  <div class="sb-lbl text-white/80">Skill gap: Kurangnya pengerjaan proses end-to-end yang realistis.</div>
               </div>
            </div>
         </div>
      </section>

      <!-- ══════════════════════ FILOSOFI (ANTI BOOTCAMP) DARK SECTION ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Filosofi Kami
          </div>
          <h2 class="section-title section-title-light">
            Bukan Bootcamp. <em class="accent-light">Ini Studio Simulasi.</em>
          </h2>
          <p class="section-desc section-desc-light">
            Kami mencabut elemen kelas tradisional dan menggantinya dengan alur kerja profesional.
          </p>

          <div class="philosophy-grid">
             <div class="phil-card">
                <div class="phil-icon">📝</div>
                <h3 class="phil-title">Bukan "Tugas", Tapi "Brief"</h3>
                <p class="phil-desc">Kamu tidak diberi soal dengan satu jawaban benar. Kamu diberi konteks bisnis, limitasi waktu, dan target pengguna. Sama seperti di agensi atau corporate.</p>
             </div>
             
             <div class="phil-card">
                <div class="phil-icon">🔍</div>
                <h3 class="phil-title">Bukan "Nilai", Tapi "Code Review"</h3>
                <p class="phil-desc">Tidak ada A, B, atau C. Karya dievaluasi lewat Pull Request Review dan Design Critique yang objektif—membedah keamanan, performa, dan skalabilitas.</p>
             </div>
             
             <div class="phil-card">
                <div class="phil-icon">🤝</div>
                <h3 class="phil-title">Bukan "Instruktur", Tapi "Senior"</h3>
                <p class="phil-desc">Mental mentor kami bukan mendikte, melainkan membimbing. Mereka menempatkan posisi sebagai Senior Engineer/Designer yang memoles rekan juniornya.</p>
             </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ TIM / MENTOR ══════════════════════ -->
      <section class="section text-center">
        <div class="section-label mx-auto">
          <span class="label-dot"></span>
          Orang di Balik Layar
        </div>
        <h2 class="section-title">
          Tim & <em class="accent">Mentor.</em>
        </h2>
        <p class="section-desc mx-auto">
          Para praktisi aktif dengan pengalaman dari startup unicorn hingga perusahaan global.
        </p>

        <div class="team-grid">
           <!-- Mentor 1 -->
           <div class="team-card text-left">
              <div class="mentor-avatar" style="background: linear-gradient(135deg, #6458f5, #8b83ff)">
                 RD
              </div>
              <h3 class="tc-name">Reza Darmawan</h3>
              <div class="tc-role">Founder & Principal Engineer</div>
              <p class="tc-bio">Eks Tech Lead GoTo. Berfokus pada arsitektur sistem skala besar dan performa Web Core Vitals.</p>
              <div class="tc-tags">
                 <span>Vue/Nuxt</span>
                 <span>Performance</span>
              </div>
           </div>
           
           <!-- Mentor 2 -->
           <div class="team-card text-left">
              <div class="mentor-avatar" style="background: linear-gradient(135deg, #10B981, #34D399)">
                 SA
              </div>
              <h3 class="tc-name">Sylvia Ananda</h3>
              <div class="tc-role">Head of Product Design</div>
              <p class="tc-bio">Menghabiskan 4 tahun merancang aplikasi Fintech. Terobsesi dengan aksesibilitas dan micro-interactions.</p>
              <div class="tc-tags">
                 <span>Figma</span>
                 <span>Design System</span>
              </div>
           </div>

           <!-- Mentor 3 -->
           <div class="team-card text-left">
              <div class="mentor-avatar" style="background: linear-gradient(135deg, #F59E0B, #FBBF24)">
                 DW
              </div>
              <h3 class="tc-name">Dimas Wicaksono</h3>
              <div class="tc-role">AI & Backend Mentor</div>
              <p class="tc-bio">Membangun pipeline data dan integrasi LLM. Misi utamanya adalah menjembatani software engineering klasik dengan AI AI.</p>
              <div class="tc-tags">
                 <span>Python</span>
                 <span>LLMOps</span>
              </div>
           </div>
        </div>
      </section>

      <!-- ══════════════════════ CTA ══════════════════════ -->
      <section class="cta-section text-center">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge mx-auto">
            <span class="label-dot label-dot-light"></span>
            Bergabung Sekarang
          </div>
          <h2 class="cta-title">
            Kami Membangun Talent.<br />
            <em class="cta-accent">Kamu Selanjutnya?</em>
          </h2>
          <p class="cta-desc mx-auto mt-4">
            Jika kamu mencari kursus santai, kami bukan tempatnya. Jika kamu mencari ekosistem untuk berlatih seperti profesional sesungguhnya, pintu selalu terbuka.
          </p>

          <div class="cta-actions justify-center mt-8">
            <button class="btn-primary btn-lg">
              Saya Siap Bergabung
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost btn-lg">Lihat Program Detail</NuxtLink>
          </div>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Tentang Carriera — Visi, Misi & Tim Mentor Praktisi',
  description: 'Mengenal lebih dekat filosofi Carriera: mengubah cara belajar pemrograman dan desain dari sekadar edukasi menjadi simulasi pengalaman kerja nyata.'
})
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.about-page {
  position: relative;
  min-height: 100vh;
  background-color: #FAFAFA;
  color: #111827;
  font-family: 'Instrument Sans', 'Inter', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── Ambients ── */
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(100px); }
.ambient-tl { top: -10%; left: -8%; width: 45%; height: 45%; background: radial-gradient(circle, rgba(99,88,245,.08), transparent 70%); }
.ambient-tr { top: 12%; right: -5%; width: 28%; height: 28%; background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%); }
.ambient-bl { bottom: 0; left: 50%; transform: translateX(-50%); width: 55%; height: 25%; background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%); }

/* ── Grid overlay ── */
.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image: linear-gradient(to right, rgba(99,88,245,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,88,245,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 80%, transparent);
}

/* ── Layout ── */
.z-header { position: relative; z-index: 20; }
.about-main { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 2rem 2rem 6rem; }

/* ════════════════ TOKENS ════════════════ */
.section { margin-top: 7rem; }
.section-label { display: inline-flex; align-items: center; gap: .5rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6458f5; margin-bottom: 1.125rem; }
.section-label-light { color: #A5B4FC; }
.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; flex-shrink: 0; }
.label-dot-light { background: #A5B4FC; }
.section-title { font-size: clamp(1.75rem, 3.2vw, 2.75rem); font-weight: 300; line-height: 1.2; letter-spacing: -.025em; color: #111827; margin-bottom: .875rem; }
.section-title-light { color: #F9FAFB; }
.section-desc { max-width: 650px; font-size: 1.0625rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 3rem; }
.section-desc-light { color: #818CF8; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* ── Buttons ── */
.btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; height: 48px; padding: 0 1.75rem; border-radius: 9999px; background: #6458f5; color: white; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 10px 30px rgba(100,88,245,.25); }
.btn-primary:hover { background: #5448e0; box-shadow: 0 16px 40px rgba(100,88,245,.35); transform: translateY(-1px); }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }
.btn-ghost { display: inline-flex; align-items: center; font-size: .875rem; font-weight: 500; color: #4B5563; background: none; border: none; cursor: pointer; text-decoration: none; transition: color .2s; }
.btn-ghost:hover { color: #6458f5; }

/* ════════════════ HERO ════════════════ */
.hero { padding: 5rem 0 3rem; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; line-height: 1.1; letter-spacing: -.035em; color: #111827; }
.badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(99,88,245,.2); background: rgba(99,88,245,.04); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #6458f5; margin-bottom: 2rem; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }

/* ════════════════ PROBLEM ════════════════ */
.problem-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;}
@media (max-width: 900px) { .problem-container { grid-template-columns: 1fr; gap: 2rem; } }

.problem-stats { display: flex; flex-direction: column; gap: 1rem; }
.stat-box { background: white; border: 1px solid #E5E7EB; border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; transition: transform 0.3s, box-shadow 0.3s; }
.stat-box:hover { transform: translateX(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.04); }
.stat-box.sb-highlight { background: linear-gradient(135deg, #6458f5, #8b83ff); border-color: transparent; }
.sb-val { font-size: 2.25rem; font-weight: 800; color: #111827; letter-spacing: -0.04em; line-height: 1; }
.sb-lbl { font-size: 0.875rem; color: #6B7280; font-weight: 400; line-height: 1.5; }


/* ════════════════ FILOSOFI (DARK) ════════════════ */
.dark-section { border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.dark-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent); }
.dark-inner { padding: 5rem 4rem; position: relative; }
@media (max-width: 640px) { .dark-inner { padding: 3rem 2rem; } }

.philosophy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem;}
@media (max-width: 900px) { .philosophy-grid { grid-template-columns: 1fr; } }

.phil-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 2rem; transition: background 0.3s, border-color 0.3s; }
.phil-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(99,88,245,0.3); }
.phil-icon { font-size: 2.25rem; margin-bottom: 1.5rem; }
.phil-title { font-size: 1.125rem; font-weight: 600; color: #F3F4F6; margin-bottom: 0.75rem; letter-spacing: -0.01em;}
.phil-desc { font-size: 0.9375rem; color: #9CA3AF; line-height: 1.6; font-weight: 300;}

/* ════════════════ TIM / MENTOR ════════════════ */
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem;}
@media (max-width: 900px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .team-grid { grid-template-columns: 1fr; } }

.team-card { background: #fff; border: 1px solid #F3F4F6; border-radius: 24px; padding: 2rem; display: flex; flex-direction: column; transition: transform 0.3s, box-shadow 0.3s;}
.team-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px -12px rgba(0,0,0,.08); }
.mentor-avatar { width: 64px; height: 64px; border-radius: 16px; margin-bottom: 1.5rem; display: flex; justify-content: center; align-items: center; color: white; font-weight: 700; font-size: 1.25rem; letter-spacing: 1px;}
.tc-name { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem;}
.tc-role { font-size: 0.8125rem; color: #6458f5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.25rem;}
.tc-bio { font-size: 0.875rem; color: #4B5563; line-height: 1.6; font-weight: 300; flex-grow: 1; margin-bottom: 1.5rem;}
.tc-tags { display: flex; gap: 0.5rem; flex-wrap: wrap;}
.tc-tags span { font-size: 0.7rem; background: #F3F4F6; color: #374151; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 600;}


/* ════════════════ CTA ════════════════ */
.cta-section { margin-top: 7rem; padding: 6rem 2rem; border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.cta-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 60%; height: 120%; background: radial-gradient(circle, rgba(99,88,245,.15) 0%, transparent 60%); pointer-events: none; }
.cta-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.4), transparent); }
.cta-inner { position: relative; }
.cta-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #A5B4FC; margin-bottom: 1.25rem; }
.cta-title { font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 300; line-height: 1.15; letter-spacing: -.03em; color: #F9FAFB; }
.cta-accent { font-style: italic; font-weight: 800; background: linear-gradient(135deg, #818CF8, #A5B4FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cta-desc { max-width: 500px; font-size: 1rem; font-weight: 300; line-height: 1.75; color: #818CF8; }
.cta-actions { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.cta-section .btn-ghost { color: #9CA3AF; }
.cta-section .btn-ghost:hover { color: #F9FAFB; }
</style>
