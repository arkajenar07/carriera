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
          <h1 class="greeting-title">Laporan Progress & Performa 📈</h1>
          <p class="greeting-sub">Angka tidak pernah bohong. Pantau performamu, perbaiki kelemahanmu, dan tingkatkan standarmu.</p>
        </div>
      </header>

      <!-- ── Dashboard content ── -->
      <main class="dash-content">

        <!-- ═══ ROW 1: Pressure & Overall Progress ═══ -->
        <section class="overview-section">
          <div class="pressure-card" :class="{ 'warning-state': overallScore < targetScore }">
            <div class="pc-left">
              <h2 class="pc-title">Progress Keseluruhan</h2>
              <div class="pc-score-wrap">
                <span class="pc-score">{{ overallScore }}%</span>
                <span class="pc-target">/ Target {{ targetScore }}%</span>
              </div>
              <p class="pc-msg">
                <strong v-if="overallScore < targetScore" class="text-red">Kamu tertinggal dari target.</strong> 
                <strong v-else class="text-green">Kamu berada di jalur (On-Track).</strong> 
                Rata-rata rekan setimmu di angka {{ targetScore + 2 }}%. Percepat pace kerjamu di sprint ini untuk mengejar ketertinggalan portofoliomu.
              </p>
            </div>
            
            <div class="pc-right">
              <div class="prog-circle-wrap">
                <svg class="prog-circle" viewBox="0 0 120 120">
                  <circle class="circle-bg" cx="60" cy="60" r="50"></circle>
                  <circle class="circle-val" cx="60" cy="60" r="50" 
                    :stroke-dasharray="`${overallScore * 3.14} ${314 - (overallScore * 3.14)}`"
                    :class="overallScore < targetScore ? 'stroke-red' : 'stroke-purple'">
                  </circle>
                  <circle class="circle-target" cx="60" cy="60" r="50"
                    :stroke-dasharray="`4 8`" :stroke-dashoffset="`${-targetScore * 3.14}`">
                  </circle>
                </svg>
                <div class="prog-circle-inner">{{ overallScore }}%</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 2: Core Metrics ═══ -->
        <section class="metrics-grid">
          
          <!-- Project Completion -->
          <div class="card metric-card">
            <div class="mc-head">
              <div class="section-badge badge-indigo">
                <span class="badge-dot"></span> Completion Rate
              </div>
            </div>
            <div class="mc-body">
              <div class="mc-value">{{ projectCompletion }}%</div>
              <p class="mc-desc">Proyek terealisasi dari total roadmap Sprint. Masih ada <strong>2 proyek utama</strong> yang harus divalidasi bulan ini.</p>
              
              <div class="mc-bar-track mt-auto">
                <div class="mc-bar-fill bg-indigo" :style="`width: ${projectCompletion}%`"></div>
              </div>
              <div class="mc-bar-labels">
                <span>0%</span>
                <span>Pencapaian: {{ completedProjects }}/{{ totalProjects }} Proyek</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <!-- Feedback Score -->
          <div class="card metric-card">
            <div class="mc-head">
              <div class="section-badge badge-orange">
                <span class="badge-dot"></span> Feedback Score
              </div>
            </div>
            <div class="mc-body">
              <div class="mc-value">{{ feedbackScore }} <span class="text-sm text-gray">/ 5.0</span></div>
              <p class="mc-desc">Nilai rata-rata dari reviewer, instruktur, & peer. Performamu berada di <strong>Top {{ topPercentile }}%</strong> cohort.</p>
              
              <div class="rating-visual mt-auto">
                <div class="star-row">
                  <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= Math.round(feedbackScore) ? 'star-filled' : 'star-empty'">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="rating-trend" :class="feedbackTrend > 0 ? 'text-green' : 'text-red'">
                  {{ feedbackTrend > 0 ? '▲' : '▼' }} {{ Math.abs(feedbackTrend) }} poin
                </div>
              </div>
            </div>
          </div>

          <!-- Deadline Performance -->
          <div class="card metric-card deadline-card">
            <div class="mc-head">
              <div class="section-badge badge-red">
                <span class="badge-dot" :class="{ 'bg-red': deadlineLate > 0 }"></span> Deadline Perform.
              </div>
            </div>
            <div class="mc-body">
              <div class="deadline-stats">
                <div class="ds-item">
                  <span class="ds-val text-green">{{ deadlineOnTime }}</span>
                  <span class="ds-lbl">Tepat Waktu</span>
                </div>
                <div class="ds-item">
                  <span class="ds-val text-orange">{{ deadlineLate }}</span>
                  <span class="ds-lbl">Terlambat</span>
                </div>
                <div class="ds-item">
                  <span class="ds-val text-red">{{ deadlineMissed }}</span>
                  <span class="ds-lbl">Terlewat</span>
                </div>
              </div>
              
              <div class="mc-bar-track mt-auto multi-bar">
                <div class="mc-bar-fill bg-green" :style="`width: ${(deadlineOnTime/totalTasks)*100}%`"></div>
                <div class="mc-bar-fill bg-orange" :style="`width: ${(deadlineLate/totalTasks)*100}%`"></div>
                <div class="mc-bar-fill bg-red" :style="`width: ${(deadlineMissed/totalTasks)*100}%`"></div>
              </div>
              <p class="deadline-msg mt-3" v-if="deadlineLate > 0 || deadlineMissed > 0">
                ⚠️ Kamu memiliki {{ deadlineLate + deadlineMissed }} submission yang melewati batas. Perbaiki time-management-mu. Kedisiplinan adalah syarat utama di industri.
              </p>
              <p class="deadline-msg mt-3" v-else>
                🔥 Excellent! Kamu selalu tepat waktu. Pertahankan reputasi ini.
              </p>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 3: Skill Growth Tracking ═══ -->
        <section class="card skill-card">
          <div class="card-header border-b">
            <div class="section-badge badge-gray">
              <span class="badge-dot" style="background:#9CA3AF"></span> Skill Growth Tracking
            </div>
            <div class="skill-meta">
              <span class="meta-label">Berdasarkan hasil asesmen portofolio terbaru.</span>
            </div>
          </div>
          
          <div class="skill-body">
            <div class="skill-bars">
              <div v-for="skill in skills" :key="skill.name" class="skill-row">
                <div class="sk-info">
                  <span class="sk-name">{{ skill.name }}</span>
                  <span class="sk-trend" :class="skill.growth >= 0 ? 'trend-up' : 'trend-down'">
                    {{ skill.growth >= 0 ? '+' : '' }}{{ skill.growth }}% (bulan ini)
                  </span>
                </div>
                <!-- Visual Bar -->
                <div class="sk-track">
                  <!-- Last month overlay to show growth -->
                  <div class="sk-past" :style="`width: ${skill.pastScore}%`"></div>
                  <!-- Current score -->
                  <div class="sk-current" :class="getSkillColor(skill.score)" :style="`width: ${skill.score}%`">
                    <span class="sk-val">{{ skill.score }}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="skill-insight">
              <div class="insight-box">
                <h4>🎯 Fokus Pengembangan</h4>
                <p>Melihat performa terendahmu pada <strong>{{ lowestSkill.name }}</strong>, kami menyarankan agar minggu ini kamu fokus mengambil ekstra task untuk implementasi {{ lowestSkill.name }} dan berdiskusi pada sesi 1-on-1 dengan mentor backend/arsitektur.</p>
                <NuxtLink to="/student/mentorship" class="insight-link">Jadwalkan Konsultasi 1:1 →</NuxtLink>
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
import { ref, computed } from 'vue'
import Sidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Laporan Progress — Carriera Course',
  description: 'Pantau laporan keseluruhan, metrik performa, dan pertumbuhan skillmu.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)

/* ── MOCK DATA ── */
const overallScore = ref(64)
const targetScore = ref(75)

const projectCompletion = ref(45)
const completedProjects = ref(4)
const totalProjects = ref(9)

const feedbackScore = ref(4.1)
const feedbackTrend = ref(0.2) // up 0.2 points
const topPercentile = ref(30)

const deadlineOnTime = ref(18)
const deadlineLate = ref(4)
const deadlineMissed = ref(1)
const totalTasks = computed(() => deadlineOnTime.value + deadlineLate.value + deadlineMissed.value)

const skills = ref([
  { name: 'UI/UX Design', score: 65, pastScore: 60, growth: 5 },
  { name: 'Frontend Eng. (Vue/Nuxt)', score: 82, pastScore: 70, growth: 12 },
  { name: 'Backend Integration', score: 45, pastScore: 35, growth: 10 },
  { name: 'Problem Solving', score: 70, pastScore: 72, growth: -2 },
  { name: 'Team Collaboration', score: 88, pastScore: 80, growth: 8 }
])

const lowestSkill = computed(() => {
  return [...skills.value].sort((a, b) => a.score - b.score)[0]
})

const getSkillColor = (score: number) => {
  if (score >= 80) return 'bg-skill-excellent'
  if (score >= 60) return 'bg-skill-good'
  return 'bg-skill-needs-work' // red/orange pressure
}
</script>

<style scoped>
/* ══════════════════════════════════════
   BASE & LAYOUT
══════════════════════════════════════ */
.dash-page {
  display: flex; min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  position: relative; overflow-x: hidden;
}

.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.ambient-tl { top: -5%;  left: -5%;  width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(239,68,68,.05), transparent 70%); }
.ambient-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(245,158,11,.04), transparent 60%); }

.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right,  rgba(0,0,0,.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,.02) 1px, transparent 1px);
  background-size: 80px 80px;
}

.main-wrap { margin-left: 260px; flex: 1; min-width: 0; position: relative; z-index: 10; display: flex; flex-direction: column; }

.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.85); backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.greeting-title { font-size: 1.0625rem; font-weight: 600; color: #111827; margin: 0; }
.greeting-sub { font-size: .8125rem; color: #6B7280; font-style: italic; margin-top: .1rem; }
.topbar-toggle { display: none; }

.dash-content { padding: 1.75rem 2rem 3rem; display: flex; flex-direction: column; gap: 1.5rem; }

@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; background: none; border: none; cursor: pointer; }
  .dash-content { padding: 1.25rem 1rem 3rem; }
}

/* ── Shared Utility ── */
.card { background: #fff; border: 1px solid #E9EBF0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.02); }
.border-b { border-bottom: 1px solid #F3F4F6; }
.mt-auto { margin-top: auto; }
.mt-3 { margin-top: .75rem; }
.text-sm { font-size: .8125rem; }
.text-gray { color: #9CA3AF; }
.text-red { color: #EF4444; }
.text-orange { color: #F59E0B; }
.text-green { color: #10B981; }
.text-purple { color: #6458f5; }
.bg-red { background: #EF4444; }
.bg-orange { background: #F59E0B; }
.bg-green { background: #10B981; }
.bg-indigo { background: #6366F1; }

.section-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .75rem; border-radius: 999px; font-size: .75rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; }
.badge-indigo { background: rgba(99,102,241,.1); color: #4F46E5; } .badge-indigo .badge-dot { background: #6366F1; }
.badge-orange { background: rgba(245,158,11,.1); color: #D97706; } .badge-orange .badge-dot { background: #F59E0B; }
.badge-red { background: rgba(239,68,68,.1); color: #DC2626; } .badge-red .badge-dot { background: #EF4444; }
.badge-gray { background: #F3F4F6; color: #4B5563; }

/* ════════════════════ OVERVIEW & PRESSURE ════════════════════ */
.pressure-card {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 20px;
  padding: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,.03);
  position: relative; overflow: hidden;
}
.pressure-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px;
  background: #10B981; border-radius: 20px 0 0 20px;
}
.pressure-card.warning-state { border-color: rgba(239,68,68,.2); }
.pressure-card.warning-state::before { background: #EF4444; }
.pressure-card.warning-state .pc-title { color: #DC2626; }

.pc-left { flex: 1; min-width: 0; max-width: 500px; }
.pc-title { font-size: 1.125rem; font-weight: 700; color: #111827; margin-bottom: .5rem; text-transform: uppercase; letter-spacing: .05em;}
.pc-score-wrap { display: flex; align-items: baseline; gap: .5rem; margin-bottom: 1rem; }
.pc-score { font-size: 3rem; font-weight: 800; color: #111827; line-height: 1; letter-spacing: -.03em; }
.pc-target { font-size: 1rem; font-weight: 600; color: #6B7280; }
.pc-msg { font-size: .9375rem; color: #4B5563; line-height: 1.6; }

.pc-right { flex-shrink: 0; }
.prog-circle-wrap { position: relative; width: 140px; height: 140px; }
.prog-circle { width: 100%; height: 100%; transform: rotate(-90deg); }
.circle-bg { fill: none; stroke: #F3F4F6; stroke-width: 10; }
.circle-val { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dasharray 1s ease; }
.circle-target { fill: none; stroke: #9CA3AF; stroke-width: 2; opacity: 0.6; }
.stroke-red { stroke: #EF4444; }
.stroke-purple { stroke: #6458f5; }
.prog-circle-inner {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; font-weight: 700; color: #111827;
}

@media (max-width: 900px) {
  .pressure-card { flex-direction: column-reverse; text-align: center; padding: 1.5rem; }
  .pc-left { max-width: 100%; }
}

/* ════════════════════ METRICS GRID ════════════════════ */
.metrics-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
}

.metric-card { display: flex; flex-direction: column; padding: 1.5rem; height: 100%; }
.mc-head { margin-bottom: 1rem; }
.mc-body { display: flex; flex-direction: column; flex: 1; }
.mc-value { font-size: 2rem; font-weight: 700; color: #111827; line-height: 1; margin-bottom: .5rem; }
.mc-desc { font-size: .8125rem; color: #6B7280; line-height: 1.5; margin-bottom: 1.5rem; }

.mc-bar-track { width: 100%; height: 8px; background: #E5E7EB; border-radius: 999px; overflow: hidden; margin-bottom: .4rem; }
.mc-bar-fill { height: 100%; border-radius: 999px; }
.multi-bar { display: flex; }
.multi-bar .mc-bar-fill { border-radius: 0; }
.multi-bar .mc-bar-fill:first-child { border-radius: 999px 0 0 999px; }
.multi-bar .mc-bar-fill:last-child { border-radius: 0 999px 999px 0; }

.mc-bar-labels { display: flex; justify-content: space-between; font-size: .6875rem; font-weight: 600; color: #9CA3AF; }

.rating-visual { display: flex; align-items: center; justify-content: space-between; }
.star-row { display: flex; gap: .25rem; }
.star-row svg { width: 22px; height: 22px; }
.star-filled { fill: #F59E0B; }
.star-empty { fill: #E5E7EB; }
.rating-trend { font-size: .875rem; font-weight: 700; }

.deadline-stats { display: flex; gap: 1rem; margin-bottom: 1rem; }
.ds-item { flex: 1; border: 1px solid #E5E7EB; background: #FAFAFA; border-radius: 10px; padding: .75rem; text-align: center; }
.ds-val { display: block; font-size: 1.5rem; font-weight: 700; line-height: 1; margin-bottom: .25rem; }
.ds-lbl { font-size: .6875rem; font-weight: 600; color: #6B7280; text-transform: uppercase; }
.deadline-msg { font-size: .75rem; font-weight: 500; color: #374151; background: rgba(245,158,11,.08); padding: .75rem; border-radius: 8px; line-height: 1.5; border-left: 2px solid #F59E0B;}

@media (max-width: 1100px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 800px) { .metrics-grid { grid-template-columns: 1fr; } }

/* ════════════════════ SKILL GROWTH ════════════════════ */
.skill-card {
  display: flex; flex-direction: column;
}
.card-header { padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
.skill-meta { font-size: .75rem; color: #9CA3AF; }

.skill-body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; padding: 1.5rem; }
.skill-bars { display: flex; flex-direction: column; gap: 1.25rem; }

.skill-row { display: flex; flex-direction: column; gap: .5rem; }
.sk-info { display: flex; justify-content: space-between; align-items: flex-end; }
.sk-name { font-size: .875rem; font-weight: 600; color: #111827; }
.sk-trend { font-size: .6875rem; font-weight: 700; padding: .1rem .4rem; border-radius: 4px; }
.trend-up { background: rgba(16,185,129,.1); color: #10B981; }
.trend-down { background: rgba(239,68,68,.1); color: #EF4444; }

.sk-track {
  position: relative; width: 100%; height: 20px;
  background: #F3F4F6; border-radius: 10px; overflow: hidden;
}
.sk-past { position: absolute; left: 0; top: 0; bottom: 0; background: #D1D5DB; border-radius: 10px; opacity: 0.5; }
.sk-current {
  position: absolute; left: 0; top: 0; bottom: 0; border-radius: 10px;
  display: flex; align-items: center; justify-content: flex-end; padding-right: .5rem;
  transition: width 1s ease;
}
.sk-val { color: #fff; font-size: .6875rem; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.2); }

.bg-skill-excellent { background: #6458f5; }
.bg-skill-good { background: #10B981; }
.bg-skill-needs-work { background: #F59E0B; }

.skill-insight {
  display: flex; flex-direction: column; justify-content: center;
}
.insight-box {
  background: #111827; color: #F9FAFB; padding: 1.5rem; border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,.15);
}
.insight-box h4 { font-size: .9375rem; margin-bottom: .5rem; font-weight: 600; }
.insight-box p { font-size: .8125rem; color: #D1D5DB; line-height: 1.6; margin-bottom: 1.25rem; }
.insight-box strong { color: #F59E0B; }
.insight-link {
  display: inline-block; background: #6458f5; color: #fff; text-decoration: none;
  font-size: .8125rem; font-weight: 600; padding: .6rem 1.2rem; border-radius: 8px; transition: background .2s;
}
.insight-link:hover { background: #5448e0; }

@media (max-width: 900px) {
  .skill-body { grid-template-columns: 1fr; }
}

/* ── Mobile Overlay ── */
.sidebar-overlay {
  display: none; position: fixed; inset: 0; z-index: 190;
  background: rgba(0,0,0,.5); backdrop-filter: blur(2px);
}
@media (max-width: 900px) { .sidebar-overlay { display: block; } }
</style>
