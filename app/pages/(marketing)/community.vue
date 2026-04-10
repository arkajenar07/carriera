<template>
  <div class="comm-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="comm-main">

      <!-- ══════════════════════ HERO ══════════════════════ -->
      <section class="hero">
        <div class="hero-text">
          <div class="badge">
            <span class="badge-dot"></span>
            Komunitas Carriera
          </div>
          <h1 class="hero-title">
            Bukan Cuma Belajar.<br />
            <em class="accent">Kamu Masuk ke Ekosistem.</em>
          </h1>
          <p class="hero-desc">
            Carriera bukan kursus yang selesai setelah sertifikat keluar. Kamu
            bergabung ke alumni network yang aktif berbagi peluang, berkolaborasi
            di project nyata, dan tumbuh bersama selamanya.
          </p>
          <div class="hero-actions">
            <button class="btn-primary">
              Gabung Komunitas — Gratis
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-ghost">Lihat Alumni</button>
          </div>
        </div>

        <!-- Live stats card -->
        <div class="hero-visual">
          <div class="stat-card">
            <div class="sc-header">
              <div class="sc-dots"><span></span><span></span><span></span></div>
              <span class="sc-label">Komunitas · Live</span>
              <span class="sc-online"><span class="online-pulse"></span>Aktif sekarang</span>
            </div>
            <div class="sc-stats">
              <div v-for="s in communityStats" :key="s.label" class="sc-stat">
                <span class="sc-val">{{ s.value }}</span>
                <span class="sc-lbl">{{ s.label }}</span>
              </div>
            </div>
            <div class="sc-activity">
              <div class="sc-act-label">Aktivitas terbaru</div>
              <div v-for="act in recentActivity" :key="act.text" class="sc-act-item">
                <div class="sc-act-avatar" :style="{ background: act.color }">{{ act.init }}</div>
                <div class="sc-act-body">
                  <span class="sc-act-name">{{ act.name }}</span>
                  <span class="sc-act-text">{{ act.text }}</span>
                </div>
                <span class="sc-act-time">{{ act.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CERITA ALUMNI ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Cerita Alumni
        </div>
        <h2 class="section-title">
          Mereka Mulai dari <em class="accent">Nol —</em><br />
          Sekarang Sudah di Industri.
        </h2>
        <p class="section-desc">
          Kisah nyata dari alumni yang pernah bingung mulai dari mana, lalu berhasil
          menemukan karier mereka melalui program dan komunitas Carriera.
        </p>

        <!-- Featured story -->
        <div class="story-featured">
          <div class="story-feat-content">
            <div class="story-feat-quote">
              "Saya masuk Carriera tanpa tahu apa itu Git. 16 minggu kemudian saya sudah
              deployed 4 project ke production dan langsung dapat tawaran kerja di startup
              Series B sebelum program selesai. Yang paling krusial? Komunitas alumni-nya
              yang terus support bahkan setelah lulus."
            </div>
            <div class="story-feat-author">
              <div class="story-avatar story-avatar-lg" style="background: linear-gradient(135deg, #6458f5, #8b83ff)">RD</div>
              <div>
                <div class="story-name">Rafi Darmawan</div>
                <div class="story-role">Frontend Engineer · Tokopedia</div>
                <div class="story-cohort">Angkatan 2 · 2025</div>
              </div>
              <div class="story-outcome-badge">
                <div class="sob-icon">🚀</div>
                <div>
                  <div class="sob-val">3 bulan</div>
                  <div class="sob-lbl">Dapat kerja setelah lulus</div>
                </div>
              </div>
            </div>
          </div>
          <div class="story-feat-visual">
            <div class="sfv-card">
              <div class="sfv-header">Before → After</div>
              <div class="sfv-rows">
                <div class="sfv-row" v-for="ba in storyBeforeAfter" :key="ba.label">
                  <span class="sfv-label">{{ ba.label }}</span>
                  <div class="sfv-values">
                    <span class="sfv-before">{{ ba.before }}</span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="#6458f5" stroke-width="1.5" class="sfv-arrow"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span class="sfv-after">{{ ba.after }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial grid -->
        <div class="alumni-grid">
          <article v-for="alumni in alumniStories" :key="alumni.name" class="alumni-card">
            <div class="alumni-quote">"{{ alumni.quote }}"</div>
            <div class="alumni-footer">
              <div class="alumni-author">
                <div class="story-avatar" :style="{ background: alumni.color }">{{ alumni.init }}</div>
                <div>
                  <div class="alumni-name">{{ alumni.name }}</div>
                  <div class="alumni-role">{{ alumni.role }}</div>
                </div>
              </div>
              <div class="alumni-tag">{{ alumni.tag }}</div>
            </div>
          </article>
        </div>
      </section>

      <!-- ══════════════════════ AKTIVITAS KOMUNITAS ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Aktivitas Komunitas
          </div>
          <h2 class="section-title section-title-light">
            Selalu Ada yang <em class="accent-light">Terjadi</em> di Sini.
          </h2>
          <p class="section-desc section-desc-light">
            Komunitas Carriera bukan grup WhatsApp yang sepi. Setiap minggu ada
            event, tantangan, dan diskusi aktif yang terus mendorongmu berkembang.
          </p>

          <div class="activity-grid">
            <div v-for="act in communityActivities" :key="act.title" class="act-card">
              <div class="act-top">
                <div class="act-icon-wrap">{{ act.icon }}</div>
                <div class="act-freq">{{ act.freq }}</div>
              </div>
              <h3 class="act-title">{{ act.title }}</h3>
              <p class="act-desc">{{ act.desc }}</p>
            </div>
          </div>

          <!-- Event calendar mini -->
          <div class="event-cal">
            <div class="ec-header">
              <span class="ec-title">Upcoming Events</span>
              <span class="ec-month">April 2026</span>
            </div>
            <div class="ec-events">
              <div v-for="ev in upcomingEvents" :key="ev.title" class="ec-event">
                <div class="ec-date-block">
                  <span class="ec-day">{{ ev.day }}</span>
                  <span class="ec-month-sm">{{ ev.month }}</span>
                </div>
                <div class="ec-body">
                  <div class="ec-ev-title">{{ ev.title }}</div>
                  <div class="ec-ev-meta">{{ ev.meta }}</div>
                </div>
                <div class="ec-pill" :class="`ec-pill-${ev.type}`">{{ ev.typeLabel }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ PELUANG PROJECT / KERJA ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Peluang Nyata
        </div>
        <h2 class="section-title">
          Komunitas yang Membuka<br />
          <em class="accent">Pintu Karier.</em>
        </h2>
        <p class="section-desc">
          Alumni Carriera tidak berjuang sendiri dalam mencari kerja atau klien.
          Network kami aktif berbagi lowongan, project kolaborasi, dan referral langsung.
        </p>

        <!-- Opportunity types -->
        <div class="opps-grid">
          <div v-for="opp in opportunities" :key="opp.title" class="opp-card">
            <div class="opp-header">
              <span class="opp-icon">{{ opp.icon }}</span>
              <span class="opp-badge" :class="`opp-badge-${opp.type}`">{{ opp.badgeText }}</span>
            </div>
            <h3 class="opp-title">{{ opp.title }}</h3>
            <p class="opp-desc">{{ opp.desc }}</p>
            <ul class="opp-list">
              <li v-for="item in opp.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Job board mockup -->
        <div class="board-wrap">
          <div class="board-header">
            <div class="board-title">
              <span>📌</span> Board Lowongan & Project — Alumni Access
            </div>
            <span class="board-count">{{ jobBoard.length }} terbuka hari ini</span>
          </div>
          <div class="board-list">
            <div v-for="job in jobBoard" :key="job.title" class="board-item">
              <div class="bi-left">
                <div class="bi-company-logo" :style="{ background: job.color }">{{ job.init }}</div>
                <div>
                  <div class="bi-title">{{ job.title }}</div>
                  <div class="bi-meta">{{ job.company }} · {{ job.location }}</div>
                </div>
              </div>
              <div class="bi-right">
                <div class="bi-tags">
                  <span v-for="tag in job.tags" :key="tag" class="bi-tag">{{ tag }}</span>
                </div>
                <span class="bi-type" :class="`bi-type-${job.jobType}`">{{ job.jobType }}</span>
              </div>
            </div>
          </div>
          <div class="board-footer">
            🔒 Login untuk melihat semua 48 peluang — tersedia khusus alumni & siswa aktif
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CHANNELS ══════════════════════ -->
      <section class="section channels-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Platform Komunitas
        </div>
        <h2 class="section-title">
          Satu Ekosistem,<em class="accent"> Banyak Ruang.</em>
        </h2>
        <p class="section-desc">
          Semua interaksi terpusat di Discord Carriera — dari diskusi teknis,
          sharing portofolio, hingga cari tim buat project freelance.
        </p>

        <div class="channels-grid">
          <div v-for="ch in channels" :key="ch.name" class="channel-card">
            <div class="ch-icon">{{ ch.icon }}</div>
            <div class="ch-name"># {{ ch.name }}</div>
            <div class="ch-desc">{{ ch.desc }}</div>
            <div class="ch-members">{{ ch.members }} anggota</div>
          </div>
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
            Ribuan Anggota Sudah Ada.<br />
            <em class="cta-accent">Kamu Kapan?</em>
          </h2>
          <p class="cta-desc">
            Komunitas terbuka untuk semua siswa aktif dan alumni Carriera.
            Daftar program sekarang dan langsung masuk ke ekosistem hari pertama.
          </p>

          <!-- Social proof avatars -->
          <div class="cta-avatars">
            <div v-for="av in ctaAvatars" :key="av.init" class="cta-av" :style="{ background: av.color }">{{ av.init }}</div>
            <div class="cta-av cta-av-count">+2.1k</div>
          </div>

          <div class="cta-actions">
            <button class="btn-primary btn-lg">
              Daftar & Masuk Komunitas
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <NuxtLink to="/program" class="btn-ghost btn-lg">Lihat Program Dulu</NuxtLink>
          </div>
          <p class="cta-note">Komunitas gratis · Aktif seumur hidup · Tidak ada biaya tersembunyi</p>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Komunitas Carriera — Alumni Network & Peluang Karier Digital',
  description: 'Bergabung dengan 2.000+ alumni dan siswa aktif Carriera. Sharing project, cari peluang kerja, dan tumbuh bersama ekosistem digital Indonesia.'
})

/* ── community stats ── */
const communityStats = [
  { value: '2.4k+', label: 'Anggota Aktif' },
  { value: '340+', label: 'Alumni Aktif di Industri' },
  { value: '50+', label: 'Praktisi Jaringan' },
  { value: '120+', label: 'Project Kolaborasi' },
]

const recentActivity = [
  { init: 'SA', name: 'Sinta A.', text: 'share portfolio baru ke #showcase', time: '2m', color: 'linear-gradient(135deg,#6458f5,#8b83ff)' },
  { init: 'RD', name: 'Rafi D.', text: 'post lowongan di #job-board', time: '15m', color: 'linear-gradient(135deg,#10B981,#34D399)' },
  { init: 'MP', name: 'Maya P.', text: 'cari rekan tim project freelance', time: '1j', color: 'linear-gradient(135deg,#F59E0B,#FBBF24)' },
]

/* ── featured story ── */
const storyBeforeAfter = [
  { label: 'Status', before: 'Tanpa pengalaman', after: 'Frontend Engineer' },
  { label: 'Stack', before: 'Tidak tahu Git', after: '5+ tech stack' },
  { label: 'Portfolio', before: '0 project', after: '4 project live' },
  { label: 'Gaji', before: 'Fresh graduate', after: '2× rata-rata (Estimasi valuasi role)' },
]

/* ── alumni testimonials ── */
const alumniStories = [
  {
    quote: 'Yang saya suka, alumni senior aktif bantu junior. Bukan cuma belajar dari mentor, tapi dari sesama yang baru 3 bulan lebih dulu.',
    name: 'Dinda K.', role: 'UI Designer · Bukalapak', init: 'DK',
    color: 'linear-gradient(135deg,#EC4899,#F9A8D4)', tag: 'Angkatan 3'
  },
  {
    quote: 'Dapat klien freelance pertama dari #open-collab channel. Dibayar Rp 4jt untuk landing page — dari teman alumni sendiri.',
    name: 'Andi W.', role: 'Freelance Dev · Remote', init: 'AW',
    color: 'linear-gradient(135deg,#6458f5,#A5B4FC)', tag: 'Angkatan 1'
  },
  {
    quote: 'Komunitas ini yang bikin saya nggak nyerah waktu bootcamp lain nolak. Alumni Carriera yang kasih referral ke tempat kerja saya sekarang.',
    name: 'Bima S.', role: 'Backend Dev · Gojek', init: 'BS',
    color: 'linear-gradient(135deg,#10B981,#6EE7B7)', tag: 'Angkatan 2'
  },
  {
    quote: 'Weekly challenge itu underrated banget. Saya dapet dua proyek freelance dari orang yang lihat submission challenge saya di Discord.',
    name: 'Lena T.', role: 'Product Designer', init: 'LT',
    color: 'linear-gradient(135deg,#F59E0B,#FCD34D)', tag: 'Angkatan 4'
  },
  {
    quote: 'Demo Day komunitas lebih tegang dari interview kerja. Tapi itu yang bikin kamu siap menghadapi dunia nyata.',
    name: 'Galih R.', role: 'Fullstack Dev · Startup', init: 'GR',
    color: 'linear-gradient(135deg,#EF4444,#FCA5A5)', tag: 'Angkatan 2'
  },
  {
    quote: 'Saya masih aktif di komunitas 2 tahun setelah lulus. Bukan kewajiban, tapi memang mau karena terus dapat value dari sini.',
    name: 'Citra N.', role: 'Tech Lead · SaaS Company', init: 'CN',
    color: 'linear-gradient(135deg,#8B5CF6,#C4B5FD)', tag: 'Angkatan 1'
  },
]

/* ── community activities ── */
const communityActivities = [
  { icon: '⚡', freq: 'Setiap minggu', title: 'Weekly Challenge', desc: 'Tantangan mini dengan tema berbeda — desain, coding, atau problem solving. Submission terbaik ditampilkan di newsletter.' },
  { icon: '🎙️', freq: 'Setiap 2 minggu', title: 'Alumni Talks', desc: 'Alumni yang sudah berkarier berbagi pengalaman langsung: proses interview, project nyata, dan tips navigasi industri.' },
  { icon: '🤝', freq: 'Setiap bulan', title: 'Open Collab Day', desc: 'Matching session antara siswa dan alumni untuk proyek kolaborasi — dari freelance hingga proyek open source bersama.' },
  { icon: '🔍', freq: 'Setiap jumat', title: 'Portfolio Review', desc: 'Alumni senior mereview portofolio anggota secara live. Feedback langsung dari orang yang sudah hire atau pernah di-hire.' },
  { icon: '📚', freq: 'Sesuai jadwal', title: 'Resource Drops', desc: 'Setiap minggu ada resource baru: template, design system, cheat sheet, atau artikel teknikal eksklusif dari mentor.' },
  { icon: '🏆', freq: 'Setiap kuartal', title: 'Hackathon Internal', desc: '48 jam bersama tim lintas angkatan untuk membangun produk dari nol. Hadiah masuk ke portofolio dan network mitra.' },
]

const upcomingEvents = [
  { day: '14', month: 'Apr', title: 'Alumni Talk: Karier di Luar Negeri', meta: 'Online · 19.00 WIB · Citra N. (NY)', type: 'talk', typeLabel: 'Talk' },
  { day: '18', month: 'Apr', title: 'Weekly Challenge: Redesign App Populer', meta: 'Async · Deadline Minggu 23.59', type: 'challenge', typeLabel: 'Challenge' },
  { day: '25', month: 'Apr', title: 'Open Collab Day — Q2 2026', meta: 'Online · 14.00 WIB · Max 40 orang', type: 'collab', typeLabel: 'Collab' },
  { day: '28', month: 'Apr', title: 'Portfolio Review Session #12', meta: 'Live Discord · Maks 10 portofolio', type: 'review', typeLabel: 'Review' },
]

/* ── opportunities ── */
const opportunities = [
  {
    icon: '💼',
    type: 'job',
    badgeText: 'Karier',
    title: 'Job Board Eksklusif',
    desc: 'Lowongan dari 50+ mitra perusahaan yang secara aktif mencari lulusan Carriera — dipost langsung ke komunitas sebelum publik.',
    items: ['Frontend, Backend, Fullstack', 'UI/UX & Product Design', 'Remote-friendly & startup'],
  },
  {
    icon: '🚀',
    type: 'project',
    badgeText: 'Freelance',
    title: 'Open Collab & Freelance',
    desc: 'Channel #open-collab menghubungkan anggota yang punya brief klien dengan yang butuh project portofolio.',
    items: ['Landing page & web app', 'Mobile app MVP', 'Design system & branding'],
  },
  {
    icon: '🌐',
    type: 'referral',
    badgeText: 'Referral',
    title: 'Referral Network Alumni',
    desc: 'Alumni yang sudah di perusahaan top aktif jadi jembatan referral untuk anggota komunitas yang sedang cari kerja.',
    items: ['Referral langsung dari insider', 'Prep interview bareng alumni', 'Review CV & portfolio sebelum apply'],
  },
]

/* ── job board ── */
const jobBoard = [
  { init: 'TB', title: 'Frontend Engineer', company: 'TechBuild ID', location: 'Remote', tags: ['Vue.js', 'TypeScript'], jobType: 'Fulltime', color: 'linear-gradient(135deg,#6458f5,#8b83ff)' },
  { init: 'KR', title: 'UI/UX Designer', company: 'Kreasi Studio', location: 'Jakarta', tags: ['Figma', 'Design System'], jobType: 'Kontrak', color: 'linear-gradient(135deg,#EC4899,#F9A8D4)' },
  { init: 'DA', title: 'Backend Developer', company: 'DataAja', location: 'Remote', tags: ['Node.js', 'PostgreSQL'], jobType: 'Fulltime', color: 'linear-gradient(135deg,#10B981,#34D399)' },
  { init: 'PX', title: 'Freelance: Landing Page', company: 'Carriera Alumni', location: 'Remote', tags: ['Vue', 'Tailwind'], jobType: 'Freelance', color: 'linear-gradient(135deg,#F59E0B,#FCD34D)' },
]

/* ── channels ── */
const channels = [
  { icon: '📢', name: 'announcements', desc: 'Update resmi program, event, dan resource dari tim Carriera.', members: '2.4k' },
  { icon: '💬', name: 'general', desc: 'Obrolan umum — cerita hari ini, minta pendapat, atau sekadar say hi.', members: '2.1k' },
  { icon: '🙋', name: 'ask-anything', desc: 'Tanya apa saja tanpa takut dianggap noob. Semua pertanyaan dijawab.', members: '1.8k' },
  { icon: '🗂️', name: 'showcase', desc: 'Share project, portofolio, dan app yang kamu buat. Dapat feedback nyata.', members: '1.5k' },
  { icon: '💼', name: 'job-board', desc: 'Lowongan dan peluang freelance dari mitra dan sesama alumni.', members: '1.9k' },
  { icon: '🤝', name: 'open-collab', desc: 'Cari tim untuk project, hackathon, atau kolaborasi konten.', members: '980' },
  { icon: '📚', name: 'resources', desc: 'Link artikel, tools, template, dan learning material terkurasi setiap minggu.', members: '2.0k' },
  { icon: '🏆', name: 'weekly-challenge', desc: 'Submit challenge mingguan dan lihat submission terbaik dari seluruh komunitas.', members: '1.2k' },
]

/* ── CTA avatars ── */
const ctaAvatars = [
  { init: 'RA', color: 'linear-gradient(135deg,#6458f5,#8b83ff)' },
  { init: 'DK', color: 'linear-gradient(135deg,#EC4899,#F9A8D4)' },
  { init: 'BS', color: 'linear-gradient(135deg,#10B981,#34D399)' },
  { init: 'LT', color: 'linear-gradient(135deg,#F59E0B,#FCD34D)' },
  { init: 'CN', color: 'linear-gradient(135deg,#8B5CF6,#C4B5FD)' },
]
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.comm-page {
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
.comm-main {
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
.section-desc-light { color: #6B7280; }
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
  max-width: 460px;
  font-size: 1.0625rem;
  font-weight: 300;
  line-height: 1.75;
  color: #6B7280;
  margin-bottom: 2.25rem;
}
.hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }

/* ── Stat card ── */
.hero-visual { display: flex; justify-content: flex-end; }
.stat-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  box-shadow: 0 32px 64px -16px rgba(0,0,0,.07);
  overflow: hidden;
}
.sc-header {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .875rem 1.25rem;
  border-bottom: 1px solid #F3F4F6;
  background: #FAFAFA;
}
.sc-dots { display: flex; gap: 5px; }
.sc-dots span { width: 8px; height: 8px; border-radius: 50%; background: #E5E7EB; }
.sc-dots span:first-child { background: #FCA5A5; }
.sc-dots span:nth-child(2) { background: #FDE68A; }
.sc-dots span:nth-child(3) { background: #6EE7B7; }
.sc-label { font-size: .8125rem; font-weight: 600; color: #9CA3AF; flex: 1; }
.sc-online { display: flex; align-items: center; gap: .375rem; font-size: .75rem; font-weight: 500; color: #10B981; }
.online-pulse {
  width: 6px; height: 6px; border-radius: 50%; background: #10B981;
  animation: pulse-online 1.5s infinite;
}
@keyframes pulse-online { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.4);opacity:.6;} }

.sc-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: #F3F4F6;
  border-bottom: 1px solid #F3F4F6;
}
.sc-stat {
  background: #FAFAFA;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.sc-val { font-size: 1.375rem; font-weight: 800; color: #111827; letter-spacing: -.02em; }
.sc-lbl { font-size: .6875rem; font-weight: 500; color: #9CA3AF; text-transform: uppercase; letter-spacing: .06em; }

.sc-activity { padding: .875rem 1.25rem; display: flex; flex-direction: column; gap: .625rem; }
.sc-act-label { font-size: .6875rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #9CA3AF; margin-bottom: .125rem; }
.sc-act-item { display: flex; align-items: center; gap: .625rem; }
.sc-act-avatar {
  width: 26px; height: 26px;
  border-radius: 50%;
  color: white;
  font-size: .625rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sc-act-body { flex: 1; font-size: .75rem; color: #6B7280; }
.sc-act-name { font-weight: 600; color: #374151; margin-right: .25rem; }
.sc-act-time { font-size: .6875rem; color: #D1D5DB; white-space: nowrap; }

/* ════════════════ ALUMNI STORIES ════════════════ */
/* Featured */
.story-featured {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
  align-items: center;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  box-shadow: 0 20px 48px -12px rgba(0,0,0,.05);
  margin-bottom: 2.5rem;
}
@media (max-width: 860px) { .story-featured { grid-template-columns: 1fr; } }

.story-feat-quote {
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.75;
  color: #374151;
  font-style: italic;
  margin-bottom: 2rem;
}
.story-feat-author {
  display: flex;
  align-items: center;
  gap: 1.125rem;
  flex-wrap: wrap;
}
.story-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  color: white;
  font-size: .875rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.story-avatar-lg { width: 52px; height: 52px; font-size: 1rem; }
.story-name { font-size: .9375rem; font-weight: 600; color: #111827; }
.story-role { font-size: .8125rem; color: #6B7280; margin-top: .1rem; }
.story-cohort { font-size: .75rem; color: #9CA3AF; margin-top: .1rem; }

.story-outcome-badge {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .75rem 1rem;
  border-radius: 12px;
  background: #EEF2FF;
  border: 1px solid rgba(99,88,245,.15);
  margin-left: auto;
}
.sob-icon { font-size: 1.25rem; }
.sob-val { font-size: .9375rem; font-weight: 700; color: #6458f5; }
.sob-lbl { font-size: .6875rem; color: #6B7280; margin-top: .1rem; }

/* Before/After card */
.sfv-card {
  border-radius: 16px;
  border: 1px solid #F3F4F6;
  background: #FAFAFA;
  overflow: hidden;
}
.sfv-header {
  padding: .875rem 1.25rem;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #9CA3AF;
  border-bottom: 1px solid #F3F4F6;
  background: #FFFFFF;
}
.sfv-rows { padding: .75rem 1.25rem; display: flex; flex-direction: column; gap: 0; }
.sfv-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .75rem 0;
  border-bottom: 1px solid #F3F4F6;
  gap: .75rem;
}
.sfv-row:last-child { border-bottom: none; }
.sfv-label { font-size: .75rem; font-weight: 600; color: #9CA3AF; width: 60px; flex-shrink: 0; }
.sfv-values { display: flex; align-items: center; gap: .5rem; }
.sfv-before { font-size: .75rem; color: #9CA3AF; text-decoration: line-through; }
.sfv-arrow { width: 12px; height: 12px; flex-shrink: 0; }
.sfv-after { font-size: .8125rem; font-weight: 600; color: #6458f5; }

/* Grid */
.alumni-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 768px) { .alumni-grid { grid-template-columns: 1fr; } }

.alumni-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.alumni-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 12px 32px rgba(0,0,0,.05);
  transform: translateY(-2px);
}
.alumni-quote { font-size: .9rem; font-weight: 300; line-height: 1.7; color: #374151; font-style: italic; flex: 1; }
.alumni-footer { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
.alumni-author { display: flex; align-items: center; gap: .75rem; }
.alumni-name { font-size: .875rem; font-weight: 600; color: #111827; }
.alumni-role { font-size: .75rem; color: #9CA3AF; }
.alumni-tag {
  font-size: .6875rem;
  font-weight: 700;
  color: #6458f5;
  background: #EEF2FF;
  padding: .25rem .625rem;
  border-radius: 9999px;
  white-space: nowrap;
}

/* ════════════════ DARK / COMMUNITY ACTIVITIES ════════════════ */
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

.activity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 768px) { .activity-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .activity-grid { grid-template-columns: 1fr; } }

.act-card {
  padding: 1.75rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.05);
  background: rgba(255,255,255,.025);
  transition: all .25s;
}
.act-card:hover { border-color: rgba(99,88,245,.25); background: rgba(99,88,245,.04); }
.act-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.act-icon-wrap {
  font-size: 1.375rem;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(99,88,245,.12);
  display: flex; align-items: center; justify-content: center;
}
.act-freq {
  font-size: .6875rem;
  font-weight: 600;
  color: #6B7280;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.06);
  padding: .2rem .625rem;
  border-radius: 9999px;
}
.act-title { font-size: 1rem; font-weight: 600; color: #F3F4F6; margin-bottom: .5rem; }
.act-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #6B7280; }

/* ── Event cal ── */
.event-cal {
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.02);
  overflow: hidden;
}
.ec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.ec-title { font-size: .875rem; font-weight: 600; color: #F3F4F6; }
.ec-month { font-size: .75rem; font-weight: 500; color: #6B7280; }
.ec-events { padding: .75rem; display: flex; flex-direction: column; gap: .5rem; }

.ec-event {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: .875rem 1rem;
  border-radius: 12px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.04);
  transition: all .2s;
}
.ec-event:hover { background: rgba(99,88,245,.05); border-color: rgba(99,88,245,.15); }
.ec-date-block { text-align: center; }
.ec-day { display: block; font-size: 1.25rem; font-weight: 800; color: #6458f5; line-height: 1; }
.ec-month-sm { display: block; font-size: .625rem; font-weight: 600; color: #6B7280; text-transform: uppercase; letter-spacing: .06em; margin-top: .125rem; }
.ec-ev-title { font-size: .875rem; font-weight: 600; color: #F3F4F6; margin-bottom: .2rem; }
.ec-ev-meta { font-size: .75rem; color: #6B7280; }
.ec-pill {
  font-size: .6875rem;
  font-weight: 700;
  padding: .25rem .625rem;
  border-radius: 9999px;
  white-space: nowrap;
}
.ec-pill-talk     { background: rgba(99,88,245,.2);  color: #A5B4FC; }
.ec-pill-challenge{ background: rgba(251,191,36,.1); color: #FBBF24; }
.ec-pill-collab   { background: rgba(16,185,129,.1);  color: #34D399; }
.ec-pill-review   { background: rgba(249,115,22,.1);  color: #FB923C; }

/* ════════════════ OPPORTUNITIES ════════════════ */
.opps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 768px) { .opps-grid { grid-template-columns: 1fr; } }

.opp-card {
  padding: 1.75rem;
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.opp-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 16px 40px rgba(0,0,0,.05);
  transform: translateY(-2px);
}
.opp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.125rem; }
.opp-icon { font-size: 1.75rem; }
.opp-badge {
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  padding: .25rem .75rem;
  border-radius: 9999px;
}
.opp-badge-job     { background: #EEF2FF; color: #6458f5; }
.opp-badge-project { background: #F0FDF4; color: #10B981; }
.opp-badge-referral{ background: #FFFBEB; color: #F59E0B; }
.opp-title { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: .5rem; }
.opp-desc { font-size: .875rem; font-weight: 300; line-height: 1.65; color: #6B7280; margin-bottom: 1.125rem; }
.opp-list { list-style: none; display: flex; flex-direction: column; gap: .5rem; }
.opp-list li {
  font-size: .8125rem;
  font-weight: 500;
  color: #374151;
  padding-left: 1.125rem;
  position: relative;
}
.opp-list li::before {
  content: '';
  position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #6458f5;
}

/* ── Job board ── */
.board-wrap {
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  overflow: hidden;
}
.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #F3F4F6;
  background: #FAFAFA;
}
.board-title { font-size: .875rem; font-weight: 600; color: #374151; display: flex; align-items: center; gap: .5rem; }
.board-count { font-size: .8125rem; font-weight: 500; color: #6458f5; }
.board-list { padding: .75rem; display: flex; flex-direction: column; gap: .5rem; }

.board-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.125rem;
  border-radius: 12px;
  border: 1px solid #F3F4F6;
  background: #FAFAFA;
  gap: 1rem;
  transition: all .2s;
}
.board-item:hover { border-color: rgba(99,88,245,.15); background: #FFFFFF; }

.bi-left { display: flex; align-items: center; gap: .875rem; }
.bi-company-logo {
  width: 38px; height: 38px;
  border-radius: 10px;
  color: white;
  font-size: .75rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.bi-title { font-size: .9rem; font-weight: 600; color: #111827; }
.bi-meta { font-size: .75rem; color: #9CA3AF; margin-top: .125rem; }

.bi-right { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; justify-content: flex-end; }
.bi-tags { display: flex; gap: .375rem; }
.bi-tag {
  font-size: .6875rem;
  font-weight: 500;
  color: #6B7280;
  background: #F3F4F6;
  padding: .2rem .5rem;
  border-radius: 6px;
}
.bi-type {
  font-size: .6875rem;
  font-weight: 700;
  padding: .25rem .625rem;
  border-radius: 9999px;
}
.bi-type-Fulltime  { background: #EEF2FF; color: #6458f5; }
.bi-type-Kontrak   { background: #FFF7ED; color: #F97316; }
.bi-type-Freelance { background: #F0FDF4; color: #10B981; }

.board-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #F3F4F6;
  font-size: .8125rem;
  font-weight: 400;
  color: #9CA3AF;
  text-align: center;
  background: #FAFAFA;
}

/* ════════════════ CHANNELS ════════════════ */
.channels-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 900px) { .channels-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .channels-grid { grid-template-columns: 1fr; } }

.channel-card {
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.channel-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 10px 24px rgba(0,0,0,.04);
  transform: translateY(-1px);
}
.ch-icon { font-size: 1.375rem; margin-bottom: .75rem; }
.ch-name { font-size: .875rem; font-weight: 700; color: #111827; margin-bottom: .375rem; }
.ch-desc { font-size: .8125rem; font-weight: 300; line-height: 1.6; color: #9CA3AF; margin-bottom: .875rem; }
.ch-members { font-size: .75rem; font-weight: 600; color: #6458f5; }

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
  color: #6B7280;
}

/* Avatar stack */
.cta-avatars {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.cta-av {
  width: 40px; height: 40px;
  border-radius: 50%;
  color: white;
  font-size: .75rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #0F172A;
  margin-left: -10px;
  flex-shrink: 0;
}
.cta-av:first-child { margin-left: 0; }
.cta-av-count {
  background: rgba(255,255,255,.08);
  color: #A5B4FC;
  font-size: .6875rem;
  border-color: rgba(255,255,255,.1);
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
.cta-note { font-size: .8125rem; font-weight: 300; color: #4B5563; }
</style>
