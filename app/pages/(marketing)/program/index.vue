<template>
  <div class="prog-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <!-- Grid overlay -->
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="prog-main">

      <!-- ══════════════════════════ HERO / OVERVIEW ══════════════════════════ -->
      <section class="hero">
        <div class="hero-text">
          <div class="badge">
            <span class="badge-dot"></span>
            Program Carriera
          </div>
          <h1 class="hero-title">
            Bukan Sekadar Kursus.<br />
            <em class="accent">Ini Sekolah Karier Digital.</em>
          </h1>
          <p class="hero-desc">
            Program Carriera dirancang untuk mengubah pemula menjadi profesional
            melalui simulasi kerja nyata, mentorship aktif, dan portfolio yang
            berbicara sendiri di dunia industri.
          </p>
          <div class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
          <div class="hero-actions">
            <button class="btn-primary">
              Daftar Program
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-ghost">Lihat Kurikulum</button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="overview-card">
            <div class="ov-header">
              <div class="ov-dots"><span></span><span></span><span></span></div>
              <span class="ov-label">Program Overview</span>
            </div>
            <div class="ov-body">
              <div v-for="item in overviewItems" :key="item.key" class="ov-row">
                <span class="ov-key">{{ item.key }}</span>
                <span class="ov-val">{{ item.val }}</span>
              </div>
            </div>
            <div class="ov-footer">
              <div class="ov-progress">
                <div class="ov-progress-bar"></div>
              </div>
              <span class="ov-footer-text">Intake berikutnya: Mei 2026</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ LEARNING MODEL ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Model Belajar
        </div>
        <h2 class="section-title">
          Simulasi Kerja, <em class="accent">Bukan Kelas Biasa.</em>
        </h2>
        <p class="section-desc">
          Setiap hari kamu akan masuk ke lingkungan kerja tiruan yang mensimulasikan
          tim startup sungguhan — ada sprint, code review, dan deadline.
        </p>

        <div class="model-grid">
          <div v-for="model in learningModels" :key="model.title" class="model-card">
            <div class="model-icon-wrap">
              <span class="model-icon">{{ model.icon }}</span>
            </div>
            <div>
              <h3 class="model-title">{{ model.title }}</h3>
              <p class="model-desc">{{ model.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Comparison strip -->
        <div class="compare-strip">
          <div class="compare-col compare-bad">
            <div class="compare-head">
              <span class="compare-icon">✕</span>
              Kursus Biasa
            </div>
            <ul class="compare-list">
              <li v-for="item in compareTraditional" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="compare-divider"><span>vs</span></div>
          <div class="compare-col compare-good">
            <div class="compare-head">
              <span class="compare-icon">✓</span>
              Carriera Program
            </div>
            <ul class="compare-list">
              <li v-for="item in compareCarriera" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ PROGRAM STRUCTURE ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light">
            <span class="label-dot label-dot-light"></span>
            Struktur Program
          </div>
          <h2 class="section-title section-title-light">
            Timeline <em class="accent-light">16 Minggu</em> Menuju Profesional
          </h2>
          <p class="section-desc section-desc-light">
            Program terstruktur dengan milestone mingguan yang terus menanjak dari
            fondasi hingga deployment project produksi.
          </p>

          <div class="timeline">
            <div v-for="(phase, i) in phases" :key="phase.label" class="timeline-phase">
              <div class="phase-dot" :class="{ 'phase-dot-active': i === 1 }"></div>
              <div class="phase-card">
                <div class="phase-week">{{ phase.weeks }}</div>
                <div class="phase-badge">{{ phase.label }}</div>
                <h3 class="phase-title">{{ phase.title }}</h3>
                <p class="phase-desc">{{ phase.desc }}</p>
                <ul class="phase-topics">
                  <li v-for="topic in phase.topics" :key="topic">{{ topic }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ TYPES OF PROJECTS ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Tipe Project
        </div>
        <h2 class="section-title">
          Project yang <em class="accent">Membangun Karier,</em><br />
          Bukan Sekedar Tugas.
        </h2>
        <p class="section-desc">
          Setiap project dirancang dengan standar industri — ada brief, deadline,
          code review, dan presentasi akhir layaknya di perusahaan sungguhan.
        </p>

        <div class="projects-grid">
          <article v-for="proj in projectTypes" :key="proj.title" class="proj-card">
            <div class="proj-top">
              <span class="proj-icon">{{ proj.icon }}</span>
              <span class="proj-tag">{{ proj.tag }}</span>
            </div>
            <h3 class="proj-title">{{ proj.title }}</h3>
            <p class="proj-desc">{{ proj.desc }}</p>
            <div class="proj-footer">
              <span v-for="t in proj.techs" :key="t" class="proj-tech">{{ t }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- ══════════════════════ TOOLS & SKILLS ══════════════════════ -->
      <section class="section tools-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Tools & Skills
        </div>
        <h2 class="section-title">
          Stack Industri yang Kamu <em class="accent">Kuasai</em>
        </h2>
        <p class="section-desc">
          Dari desain hingga deployment — kamu akan terbiasa dengan tools yang
          digunakan tim profesional setiap harinya.
        </p>

        <div class="tools-tabs">
          <button
            v-for="tab in toolsTabs"
            :key="tab"
            :class="['tool-tab', { 'tool-tab-active': activeTab === tab }]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="tools-grid">
          <div
            v-for="tool in filteredTools"
            :key="tool.name"
            class="tool-chip"
          >
            <span class="tool-chip-icon">{{ tool.icon }}</span>
            <div>
              <div class="tool-name">{{ tool.name }}</div>
              <div class="tool-category">{{ tool.category }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ MENTORSHIP ══════════════════════ -->
      <section class="section">
        <div class="section-label">
          <span class="label-dot"></span>
          Sistem Mentorship
        </div>
        <h2 class="section-title">
          Didampingi, Bukan <em class="accent">Ditinggal Sendiri.</em>
        </h2>
        <p class="section-desc">
          Setiap siswa mendapatkan mentor aktif yang bukan hanya mengajar, tapi
          juga mengoreksi, mengarahkan, dan mendorong perkembanganmu secara personal.
        </p>

        <div class="mentor-layout">
          <div class="mentor-cards-col">
            <div v-for="m in mentorshipItems" :key="m.title" class="mentor-card">
              <div class="mentor-icon-wrap">{{ m.icon }}</div>
              <div>
                <h3 class="mentor-title">{{ m.title }}</h3>
                <p class="mentor-desc">{{ m.desc }}</p>
              </div>
            </div>
          </div>
          <div class="mentor-visual-col">
            <div class="mentor-chat-frame">
              <div class="chat-header">
                <div class="chat-avatar">M</div>
                <div>
                  <div class="chat-name">Mentor Kamu</div>
                  <div class="chat-status"><span class="online-dot"></span> Online</div>
                </div>
              </div>
              <div class="chat-messages">
                <div v-for="msg in chatMessages" :key="msg.text" :class="['chat-msg', msg.side === 'mentor' ? 'chat-msg-left' : 'chat-msg-right']">
                  {{ msg.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ ROADMAP ══════════════════════ -->
      <section class="section roadmap-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Personalized Roadmap
        </div>
        <h2 class="section-title">
          Setiap Siswa Punya <em class="accent">Jalur Sendiri.</em>
        </h2>
        <p class="section-desc">
          AI kami membaca progressmu dan menyesuaikan jalur belajar secara otomatis —
          tidak ada yang tertinggal, tidak ada yang bosan karena terlalu lambat.
        </p>

        <div class="roadmap-tracks">
          <div v-for="track in roadmapTracks" :key="track.name" class="roadmap-track">
            <div class="track-header">
              <span class="track-icon">{{ track.icon }}</span>
              <div>
                <div class="track-name">{{ track.name }}</div>
                <div class="track-level">{{ track.level }}</div>
              </div>
            </div>
            <div class="track-steps">
              <div
                v-for="(step, idx) in track.steps"
                :key="step"
                :class="['track-step', { 'track-step-done': idx < track.done, 'track-step-active': idx === track.done }]"
              >
                <div class="track-step-dot"></div>
                <span class="track-step-label">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ OUTPUT / PORTFOLIO ══════════════════════ -->
      <section class="section output-section">
        <div class="section-label">
          <span class="label-dot"></span>
          Output Program
        </div>
        <h2 class="section-title">
          Lulus dengan <em class="accent">Portfolio,</em><br />
          Bukan Selembar Sertifikat.
        </h2>
        <p class="section-desc">
          Di akhir program kamu tidak hanya punya ijazah — kamu punya karya nyata
          yang bisa dibanggakan untuk diekspos sebagai studi kasus ke industri.
        </p>

        <div class="output-grid">
          <div v-for="out in outputs" :key="out.title" class="output-card">
            <div class="output-icon">{{ out.icon }}</div>
            <h3 class="output-title">{{ out.title }}</h3>
            <p class="output-desc">{{ out.desc }}</p>
          </div>
        </div>

        <div class="outcome-strip">
          <div v-for="oc in outcomes" :key="oc.label" class="outcome-item">
            <span class="outcome-value">{{ oc.value }}</span>
            <span class="outcome-label">{{ oc.label }}</span>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ CTA / ENROLL ══════════════════════ -->
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="badge badge-light">
            <span class="badge-dot badge-dot-white"></span>
            Buka Pendaftaran
          </div>
          <h2 class="cta-title">
            Mulai Perjalananmu<br />
            <em class="cta-accent">Bersama Carriera.</em>
          </h2>
          <p class="cta-desc">
            Intake berikutnya membuka hanya <strong>30 kursi.</strong> Daftar sekarang
            sebelum penuh dan mulai bangun karier digitalmu dari hari pertama.
          </p>
          <div class="cta-actions">
            <button class="btn-primary btn-lg">
              Daftar Sekarang — Gratis
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-ghost btn-lg">Konsultasi Dulu</button>
          </div>
          <p class="cta-note">Tanpa kartu kredit · Bisa dicicil · Garansi uang kembali 7 hari</p>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Program Carriera — Sekolah Karier Digital untuk Generasi Masa Depan',
  description: 'Program intensif 16 minggu dengan simulasi kerja nyata, mentorship aktif, dan portfolio siap industri.'
})

/* ── stats ── */
const stats = [
  { value: '16', label: 'Minggu Program' },
  { value: '4+', label: 'Project Nyata' },
  { value: '1:8', label: 'Rasio Mentor' },
  { value: '93%', label: 'Siswa Siap Industri' },
]

/* ── overview card ── */
const overviewItems = [
  { key: 'Durasi', val: '16 Minggu · Full-time' },
  { key: 'Format', val: 'Online + Live Session' },
  { key: 'Bahasa', val: 'Indonesia' },
  { key: 'Level', val: 'Pemula hingga Menengah' },
  { key: 'Sertifikat', val: 'Ya, diakui industri' },
  { key: 'Biaya', val: 'Rp 2.400.000 / bulan' },
]

/* ── learning model ── */
const learningModels = [
  { icon: '🏢', title: 'Work Environment Simulation', desc: 'Masuk ke workspace virtual tim kami setiap hari. Ada daily standup, sprint planning, dan code review seperti di perusahaan sungguhan.' },
  { icon: '⚡', title: 'Sprint-Based Learning', desc: 'Belajar dalam sprint 2 minggu. Setiap sprint ada deliverable nyata yang harus diselesaikan sesuai deadline.' },
  { icon: '🔄', title: 'Iterative Feedback Loop', desc: 'Setiap pekerjaan mendapat feedback langsung dari mentor dan rekan tim. Revisi adalah bagian dari proses, bukan hukuman.' },
  { icon: '🤝', title: 'Peer Collaboration', desc: 'Kerjasama dalam tim kecil 3–4 orang seperti squad startup. Belajar komunikasi, pembagian tugas, dan kolaborasi kode.' },
]

const compareTraditional = [
  'Dengarkan ceramah 2 jam',
  'Latihan soal buatan',
  'Sertifikat tanpa portofolio',
  'Belajar sendirian',
  'Feedback seminggu sekali',
]
const compareCarriera = [
  'Simulasi kerja tim nyata',
  'Project dengan brief industri',
  'Portfolio bisa dipamerkan',
  'Squad dan mentor aktif',
  'Feedback harian',
]

/* ── phases / timeline ── */
const phases = [
  {
    weeks: 'Minggu 1–3',
    label: 'Fondasi',
    title: 'Digital Foundations',
    desc: 'Membangun landasan berpikir komputasional, logika pemrograman, dan alur kerja tim.',
    topics: ['Logical Thinking', 'Git & Version Control', 'Terminal & CLI', 'Team Workflow'],
  },
  {
    weeks: 'Minggu 4–8',
    label: 'Core Skills',
    title: 'Skill Track Intensif',
    desc: 'Mendalami keahlian inti sesuai jalur pilihan (Dev, Design, atau AI) dengan project mingguan.',
    topics: ['Frontend / Backend / UI', 'API Integration', 'Sprint Project #1', 'Code Review'],
  },
  {
    weeks: 'Minggu 9–13',
    label: 'Simulation',
    title: 'Work Simulation',
    desc: 'Masuk penuh ke simulasi lingkungan kerja dengan brief klien, deadline, dan presentasi.',
    topics: ['Client Brief Simulation', 'Sprint Project #2', 'Design System', 'Deployment'],
  },
  {
    weeks: 'Minggu 14–16',
    label: 'Capstone',
    title: 'Capstone & Portfolio',
    desc: 'Menyelesaikan proyek akhir individual, memoles portofolio, dan presentasi akhir.',
    topics: ['Final Project', 'Portfolio Polish', 'Demo Day', 'Career Coaching'],
  },
]

/* ── project types ── */
const projectTypes = [
  {
    icon: '🌐',
    tag: 'Frontend',
    title: 'Landing Page Produk',
    desc: 'Membangun landing page produk startup dengan desain pixel-perfect dari Figma ke kode.',
    techs: ['HTML/CSS', 'Vue.js', 'Figma'],
  },
  {
    icon: '⚙️',
    tag: 'Backend',
    title: 'REST API Service',
    desc: 'Merancang dan membangun API service lengkap dengan auth, database, dan dokumentasi.',
    techs: ['Node.js', 'PostgreSQL', 'Swagger'],
  },
  {
    icon: '🎨',
    tag: 'Design',
    title: 'Design System UI',
    desc: 'Membuat design system yang konsisten untuk aplikasi multi-platform dari nol.',
    techs: ['Figma', 'Tokens', 'Storybook'],
  },
  {
    icon: '🤖',
    tag: 'AI Integration',
    title: 'AI-Powered Feature',
    desc: 'Mengintegrasikan model AI ke dalam aplikasi web untuk fitur analitik atau chatbot.',
    techs: ['Python', 'OpenAI API', 'Streamlit'],
  },
  {
    icon: '📱',
    tag: 'Mobile',
    title: 'Mobile App MVP',
    desc: 'Membangun MVP aplikasi mobile cross-platform yang siap dipresentasikan ke klien.',
    techs: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    icon: '🚀',
    tag: 'Capstone',
    title: 'Produk Akhir (Capstone)',
    desc: 'Project mandiri bertema bebas — dari ideasi, desain, development, hingga deployment produksi.',
    techs: ['Full Stack', 'DevOps', 'Product Thinking'],
  },
]

/* ── tools ── */
const toolsTabs = ['Semua', 'Design', 'Development', 'AI & Data']
const activeTab = ref('Semua')

const allTools = [
  { icon: '🎨', name: 'Figma', category: 'Design' },
  { icon: '✏️', name: 'Adobe XD', category: 'Design' },
  { icon: '🖼️', name: 'Framer', category: 'Design' },
  { icon: '📐', name: 'Spline', category: 'Design' },
  { icon: '⚛️', name: 'React', category: 'Development' },
  { icon: '💚', name: 'Vue.js', category: 'Development' },
  { icon: '🟩', name: 'Node.js', category: 'Development' },
  { icon: '🐍', name: 'Python', category: 'Development' },
  { icon: '🐘', name: 'PostgreSQL', category: 'Development' },
  { icon: '🐳', name: 'Docker', category: 'Development' },
  { icon: '🔥', name: 'Firebase', category: 'Development' },
  { icon: '🌊', name: 'Tailwind CSS', category: 'Development' },
  { icon: '🤖', name: 'OpenAI API', category: 'AI & Data' },
  { icon: '🧠', name: 'LangChain', category: 'AI & Data' },
  { icon: '📊', name: 'Pandas', category: 'AI & Data' },
  { icon: '🔬', name: 'Jupyter', category: 'AI & Data' },
]

const filteredTools = computed(() =>
  activeTab.value === 'Semua'
    ? allTools
    : allTools.filter(t => t.category === activeTab.value)
)

/* ── mentorship ── */
const mentorshipItems = [
  { icon: '🎯', title: '1-on-1 Weekly Session', desc: 'Sesi privat 45 menit setiap minggu. Fokus pada hambatan spesifik kamu, bukan materi generik.' },
  { icon: '💬', title: 'Daily Async Feedback', desc: 'Kirim pertanyaan kapan saja di channel Discord privat. Mentor merespons dalam 4 jam.' },
  { icon: '🔍', title: 'Live Code Review', desc: 'Mentor membedah kodemu baris per baris setiap sprint selesai — build kualitas dari dalam.' },
  { icon: '🗺️', title: 'Career Mapping', desc: 'Di bulan terakhir, mentor membantumu mapping karier: CV, LinkedIn, portofolio, dan strategi networking.' },
]

const chatMessages = [
  { side: 'mentor', text: 'Hei, sudah push project-nya? Saya mau review sebelum meeting siang.' },
  { side: 'siswa', text: 'Sudah kak! Link PR-nya sudah saya share di thread.' },
  { side: 'mentor', text: 'Oke, satu catatan di komponen Card — coba extract logic-nya ke composable ya.' },
  { side: 'siswa', text: 'Siap kak, akan saya refactor sekarang. Terima kasih feedbacknya!' },
]

/* ── roadmap ── */
const roadmapTracks = [
  {
    icon: '💻',
    name: 'Frontend Developer',
    level: 'Pemula → Junior Dev',
    done: 2,
    steps: ['HTML & CSS Dasar', 'JavaScript ES6+', 'Framework (Vue/React)', 'API Integration', 'Deploy & CI/CD'],
  },
  {
    icon: '🎨',
    name: 'UI/UX Designer',
    level: 'Pemula → Junior Designer',
    done: 1,
    steps: ['Design Thinking', 'Figma Mastery', 'Design System', 'Prototyping', 'User Testing'],
  },
  {
    icon: '🤖',
    name: 'AI Engineer',
    level: 'Pemula → AI Practitioner',
    done: 0,
    steps: ['Python Dasar', 'Data Wrangling', 'ML Fundamentals', 'API AI Integration', 'Build AI Product'],
  },
]

/* ── outputs ── */
const outputs = [
  { icon: '🗂️', title: 'Portfolio Website', desc: 'Website portofolio personal yang menampilkan 4+ project nyata dengan studi kasus.' },
  { icon: '💼', title: 'GitHub Profile', desc: 'Profil GitHub aktif dengan commit history, project nyata, dan README profesional.' },
  { icon: '📄', title: 'Professional Profile', desc: 'Review profil profesionalmu agar lebih mencerminkan kualitas portofoliomu.' },
  { icon: '🏆', title: 'Sertifikat Penyelesaian', desc: 'Bukti kamu telah melewati ketatnya standar evaluasi mentor kami.' },
  { icon: '🤝', title: 'Network Alumni', desc: 'Akses ke komunitas alumni Carriera, diskusi teknis, dan event eksklusif selamanya.' },
  { icon: '🚀', title: 'Business Mindset', desc: 'Tidak hanya jago teknis, tapi memahami bagaimana kerjamu berdampak pada simulasi bisnis riil.' },
]

const outcomes = [
  { value: '93%', label: 'Siswa merasa portofolionya setara industri' },
  { value: '4.8★', label: 'Rating program dari alumni' },
  { value: '50+', label: 'Studi kasus riil yang dikerjakan' },
  { value: '2×', label: 'Lebih cepat paham dibanding tutorial' },
]
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.prog-page {
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
.ambient-tl {
  top: -10%; left: -8%;
  width: 45%; height: 45%;
  background: radial-gradient(circle, rgba(99,88,245,.08), transparent 70%);
}
.ambient-tr {
  top: 12%; right: -5%;
  width: 28%; height: 28%;
  background: radial-gradient(circle, rgba(165,180,252,.06), transparent 70%);
}
.ambient-bl {
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 55%; height: 25%;
  background: radial-gradient(circle, rgba(99,88,245,.04), transparent 60%);
}

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
.prog-main {
  position: relative;
  z-index: 10;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

/* ════════════════ HERO ════════════════ */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4.5rem;
  padding: 4rem 0 6rem;
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; gap: 3rem; padding-top: 2rem; }
}

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
.badge-light {
  border-color: rgba(255,255,255,.15);
  background: rgba(255,255,255,.08);
  color: #A5B4FC;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6458f5;
  animation: pulse-dot 2s infinite;
}
.badge-dot-white { background: #A5B4FC; }
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
  margin-bottom: 2rem;
}

/* Stats strip */
.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.25rem;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.stat-value {
  font-size: 1.625rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -.02em;
}
.stat-label {
  font-size: .75rem;
  font-weight: 500;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

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
  color: #4B5563;
  background: none;
  border: none;
  cursor: pointer;
  transition: color .2s;
}
.btn-ghost:hover { color: #6458f5; }

/* ── Overview card ── */
.hero-visual { display: flex; justify-content: flex-end; }
.overview-card {
  width: 100%;
  max-width: 440px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  box-shadow: 0 32px 64px -16px rgba(0,0,0,.07);
  overflow: hidden;
}
.ov-header {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #F3F4F6;
  background: #FAFAFA;
}
.ov-dots { display: flex; gap: 5px; }
.ov-dots span {
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #E5E7EB;
}
.ov-dots span:first-child { background: #FCA5A5; }
.ov-dots span:nth-child(2) { background: #FDE68A; }
.ov-dots span:nth-child(3) { background: #6EE7B7; }
.ov-label { font-size: .8125rem; font-weight: 600; color: #9CA3AF; }
.ov-body { padding: 1.25rem 1.5rem; }
.ov-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .625rem 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: .875rem;
}
.ov-row:last-child { border-bottom: none; }
.ov-key { color: #9CA3AF; font-weight: 400; }
.ov-val { color: #111827; font-weight: 500; }
.ov-footer {
  padding: 1rem 1.5rem 1.25rem;
  border-top: 1px solid #F3F4F6;
}
.ov-progress {
  height: 4px;
  border-radius: 9999px;
  background: #EEF2FF;
  margin-bottom: .625rem;
  overflow: hidden;
}
.ov-progress-bar {
  height: 100%;
  width: 30%;
  border-radius: 9999px;
  background: linear-gradient(to right, #6458f5, #8b83ff);
}
.ov-footer-text { font-size: .75rem; color: #9CA3AF; }

/* ════════════════ SECTIONS ════════════════ */
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
.section-desc-light { color: #6B7280; max-width: 580px; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* ════════════════ LEARNING MODEL ════════════════ */
.model-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 640px) { .model-grid { grid-template-columns: 1fr; } }

.model-card {
  display: flex;
  gap: 1.125rem;
  align-items: flex-start;
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.model-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 12px 32px rgba(0,0,0,.05);
  transform: translateY(-1px);
}
.model-icon-wrap {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.model-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .375rem; }
.model-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #9CA3AF; }

/* ── Compare ── */
.compare-strip {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F3F4F6;
}
@media (max-width: 640px) {
  .compare-strip { grid-template-columns: 1fr; }
  .compare-divider { display: none; }
}
.compare-col { padding: 2rem; }
.compare-bad { background: #FFF7F7; }
.compare-good { background: #F0FDF4; }
.compare-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
  padding: 0 1.25rem;
  border-left: 1px solid #F3F4F6;
  border-right: 1px solid #F3F4F6;
}
.compare-divider span {
  font-size: .875rem;
  font-weight: 700;
  color: #D1D5DB;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.compare-head {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .875rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.compare-bad .compare-head { color: #EF4444; }
.compare-good .compare-head { color: #10B981; }
.compare-icon { font-size: 1rem; }
.compare-list { list-style: none; display: flex; flex-direction: column; gap: .625rem; }
.compare-list li {
  font-size: .875rem;
  font-weight: 300;
  line-height: 1.5;
  color: #4B5563;
  padding-left: 1rem;
  position: relative;
}
.compare-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #D1D5DB;
  font-size: .75rem;
}

/* ════════════════ DARK / TIMELINE ════════════════ */
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
.dark-inner { padding: 4rem 3.5rem 4.5rem; position: relative; }
@media (max-width: 640px) { .dark-inner { padding: 2.5rem 1.75rem 3rem; } }

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  position: relative;
}
@media (max-width: 900px) { .timeline { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px) { .timeline { grid-template-columns: 1fr; } }

.timeline-phase { position: relative; }
.phase-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(99,88,245,.3);
  border: 2px solid rgba(99,88,245,.2);
  margin: 0 auto 1.25rem;
  transition: all .3s;
}
.phase-dot-active {
  background: #6458f5;
  border-color: #6458f5;
  box-shadow: 0 0 0 4px rgba(99,88,245,.2);
}

.phase-card {
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.05);
  background: rgba(255,255,255,.025);
  transition: all .3s;
  height: calc(100% - 2.5rem);
}
.phase-card:hover {
  border-color: rgba(99,88,245,.25);
  background: rgba(99,88,245,.04);
}
.phase-week {
  font-size: .6875rem;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: .5rem;
}
.phase-badge {
  display: inline-block;
  padding: .2rem .625rem;
  border-radius: 9999px;
  background: rgba(99,88,245,.15);
  color: #818CF8;
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  margin-bottom: .875rem;
}
.phase-title { font-size: 1rem; font-weight: 600; color: #F3F4F6; margin-bottom: .5rem; }
.phase-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #6B7280; margin-bottom: 1rem; }
.phase-topics { list-style: none; display: flex; flex-direction: column; gap: .4rem; }
.phase-topics li {
  font-size: .75rem;
  font-weight: 500;
  color: #A5B4FC;
  padding-left: 1rem;
  position: relative;
}
.phase-topics li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: #6458f5;
}

/* ════════════════ PROJECTS ════════════════ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px) { .projects-grid { grid-template-columns: 1fr; } }

.proj-card {
  padding: 1.75rem;
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
  display: flex;
  flex-direction: column;
  gap: .75rem;
}
.proj-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 16px 40px rgba(0,0,0,.05);
  transform: translateY(-2px);
}
.proj-top { display: flex; align-items: center; justify-content: space-between; }
.proj-icon { font-size: 1.5rem; }
.proj-tag {
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: #6458f5;
  background: #EEF2FF;
  padding: .25rem .625rem;
  border-radius: 9999px;
}
.proj-title { font-size: .9375rem; font-weight: 600; color: #111827; }
.proj-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #6B7280; flex: 1; }
.proj-footer { display: flex; flex-wrap: wrap; gap: .375rem; margin-top: auto; }
.proj-tech {
  font-size: .6875rem;
  font-weight: 500;
  color: #6B7280;
  background: #F9FAFB;
  border: 1px solid #F3F4F6;
  padding: .2rem .625rem;
  border-radius: 9999px;
}

/* ════════════════ TOOLS ════════════════ */
.tools-tabs {
  display: flex;
  gap: .5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.tool-tab {
  padding: .5rem 1.125rem;
  border-radius: 9999px;
  border: 1px solid #E5E7EB;
  background: #FAFAFA;
  font-size: .8125rem;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all .2s;
}
.tool-tab:hover { border-color: rgba(99,88,245,.3); color: #6458f5; }
.tool-tab-active {
  background: #6458f5;
  border-color: #6458f5;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(100,88,245,.25);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .875rem;
}
@media (max-width: 900px) { .tools-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 540px) { .tools-grid { grid-template-columns: repeat(2, 1fr); } }

.tool-chip {
  display: flex;
  align-items: center;
  gap: .875rem;
  padding: 1rem 1.125rem;
  border-radius: 14px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .2s;
  cursor: default;
}
.tool-chip:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 8px 20px rgba(0,0,0,.04);
}
.tool-chip-icon {
  font-size: 1.375rem;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tool-name { font-size: .875rem; font-weight: 600; color: #111827; }
.tool-category { font-size: .75rem; color: #9CA3AF; margin-top: .125rem; }

/* ════════════════ MENTORSHIP ════════════════ */
.mentor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}
@media (max-width: 768px) { .mentor-layout { grid-template-columns: 1fr; } }

.mentor-cards-col { display: flex; flex-direction: column; gap: 1.125rem; }

.mentor-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.mentor-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 8px 24px rgba(0,0,0,.04);
}
.mentor-icon-wrap {
  font-size: 1.25rem;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: #EEF2FF;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.mentor-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .375rem; }
.mentor-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #9CA3AF; }

/* ── Chat frame ── */
.mentor-chat-frame {
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  box-shadow: 0 24px 48px -12px rgba(0,0,0,.08);
  overflow: hidden;
}
.chat-header {
  display: flex;
  align-items: center;
  gap: .875rem;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid #F3F4F6;
  background: #FAFAFA;
}
.chat-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6458f5, #8b83ff);
  display: flex; align-items: center; justify-content: center;
  color: white;
  font-size: .875rem;
  font-weight: 700;
}
.chat-name { font-size: .875rem; font-weight: 600; color: #111827; }
.chat-status { display: flex; align-items: center; gap: .375rem; font-size: .75rem; color: #10B981; margin-top: .125rem; }
.online-dot { width: 6px; height: 6px; border-radius: 50%; background: #10B981; }

.chat-messages { padding: 1.5rem; display: flex; flex-direction: column; gap: .875rem; }
.chat-msg {
  max-width: 80%;
  padding: .75rem 1rem;
  border-radius: 14px;
  font-size: .8125rem;
  font-weight: 300;
  line-height: 1.55;
}
.chat-msg-left {
  align-self: flex-start;
  background: #F3F4F6;
  color: #374151;
  border-bottom-left-radius: 4px;
}
.chat-msg-right {
  align-self: flex-end;
  background: #6458f5;
  color: #FFFFFF;
  border-bottom-right-radius: 4px;
}

/* ════════════════ ROADMAP ════════════════ */
.roadmap-tracks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 768px) { .roadmap-tracks { grid-template-columns: 1fr; } }

.roadmap-track {
  padding: 1.75rem;
  border-radius: 20px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.roadmap-track:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 16px 40px rgba(0,0,0,.05);
}
.track-header {
  display: flex;
  align-items: center;
  gap: .875rem;
  margin-bottom: 1.5rem;
}
.track-icon {
  font-size: 1.375rem;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: #EEF2FF;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.track-name { font-size: .9375rem; font-weight: 600; color: #111827; }
.track-level { font-size: .75rem; color: #9CA3AF; margin-top: .125rem; }

.track-steps { display: flex; flex-direction: column; gap: 0; }
.track-step {
  display: flex;
  align-items: center;
  gap: .875rem;
  padding: .625rem 0;
  position: relative;
}
.track-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 7px;
  top: calc(50% + 8px);
  width: 2px;
  height: calc(100% - 8px);
  background: #F3F4F6;
}
.track-step-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  border: 2px solid #E5E7EB;
  background: #FFFFFF;
  flex-shrink: 0;
  z-index: 1;
  transition: all .2s;
}
.track-step-done .track-step-dot {
  background: #6458f5;
  border-color: #6458f5;
}
.track-step-done::after { background: #EEF2FF !important; }
.track-step-active .track-step-dot {
  background: white;
  border-color: #6458f5;
  box-shadow: 0 0 0 3px rgba(99,88,245,.2);
}
.track-step-label {
  font-size: .8125rem;
  font-weight: 400;
  color: #9CA3AF;
  transition: color .2s;
}
.track-step-done .track-step-label { color: #6458f5; font-weight: 500; }
.track-step-active .track-step-label { color: #111827; font-weight: 600; }

/* ════════════════ OUTPUT ════════════════ */
.output-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 768px) { .output-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .output-grid { grid-template-columns: 1fr; } }

.output-card {
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px solid #F3F4F6;
  background: #FFFFFF;
  transition: all .25s;
}
.output-card:hover {
  border-color: rgba(99,88,245,.15);
  box-shadow: 0 12px 32px rgba(0,0,0,.05);
  transform: translateY(-2px);
}
.output-icon { font-size: 1.625rem; margin-bottom: 1rem; }
.output-title { font-size: .9375rem; font-weight: 600; color: #111827; margin-bottom: .5rem; }
.output-desc { font-size: .8125rem; font-weight: 300; line-height: 1.65; color: #9CA3AF; }

/* Outcome strip */
.outcome-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F3F4F6;
}
@media (max-width: 640px) { .outcome-strip { grid-template-columns: repeat(2, 1fr); } }

.outcome-item {
  padding: 2rem 1.75rem;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: .375rem;
  border-right: 1px solid #F3F4F6;
}
.outcome-item:last-child { border-right: none; }
.outcome-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6458f5, #8b83ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -.03em;
}
.outcome-label { font-size: .8125rem; font-weight: 300; line-height: 1.5; color: #6B7280; }

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
.cta-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -.03em;
  color: #F9FAFB;
  margin: 1rem 0;
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
  margin-bottom: 1.5rem;
}
.cta-section .btn-ghost { color: #9CA3AF; }
.cta-section .btn-ghost:hover { color: #F9FAFB; }
.cta-note { font-size: .8125rem; font-weight: 300; color: #6B7280; }
</style>
