<template>
  <div class="feedback-page">

    <!-- ── Ambient background (same as dashboard) ── -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-br"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <!-- ── Sidebar ── -->
    <StudentSidebar :open="sidebarOpen" @update:open="sidebarOpen = $event" />

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
          <h1 class="greeting-title">Kelola Revisi Kamu 📝</h1>
          <p class="greeting-sub">{{ todayStr }} · {{ totalFeedback }} feedback diterima</p>
        </div>
        <div class="topbar-actions">
          <button class="action-btn filter-btn" @click="showFilters = !showFilters" aria-label="Filters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- ── Feedback content ── -->
      <main class="feedback-content">

        <!-- ═══ ROW 1: Stats Summary ═══ -->
        <section class="stats-row">
          <div class="stat-card">
            <div class="stat-icon-wrap" style="background: rgba(99,102,241,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" width="20" height="20">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ totalFeedback }}</span>
              <span class="stat-label">Total Feedback</span>
            </div>
            <div class="stat-trend neutral">Semua project</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrap" style="background: rgba(16,185,129,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" width="20" height="20">
                <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ resolvedFeedback }}</span>
              <span class="stat-label">Revisi Selesai</span>
            </div>
            <div class="stat-trend up">Sudah diselesaikan</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrap" style="background: rgba(245,158,11,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" width="20" height="20">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ pendingFeedback }}</span>
              <span class="stat-label">Sedang Direvisi</span>
            </div>
            <div class="stat-trend neutral">Perlu perhatian</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrap" style="background: rgba(239,68,68,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" width="20" height="20">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ repeatErrors.length }}</span>
              <span class="stat-label">Kesalahan Berulang</span>
            </div>
            <div class="stat-trend neutral">Perlu diperbaiki</div>
          </div>
        </section>

        <!-- ═══ ROW 2: High Priority Section ═══ -->
        <section class="highlight-section">
          <div class="card card-errors">
            <div class="card-header">
              <div class="section-badge badge-red">
                <span class="badge-dot"></span> Kesalahan Berulang — Core Diferensiasi
              </div>
            </div>
            <p class="section-desc">Pola kesalahan yang sering muncul di berbagai project kamu—fokus pada improvement di area ini.</p>

            <div v-if="repeatErrors.length > 0" class="errors-grid">
              <div v-for="(error, idx) in repeatErrors" :key="idx" class="error-card" :class="`severity-${error.severity}`">
                <div class="error-header">
                  <div class="error-type-badge">{{ error.type }}</div>
                  <span class="error-count">{{ error.count }}x</span>
                </div>
                <p class="error-desc">{{ error.description }}</p>
                <div class="error-projects">
                  <span v-for="proj in error.projects" :key="proj" class="error-proj-tag">{{ proj }}</span>
                </div>
                <div class="error-suggestion">
                  <strong>💡 Saran:</strong> {{ error.suggestion }}
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <p>Tidak ada kesalahan berulang yang terdeteksi—bagus! 🎉</p>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 3: Revision Status ═══ -->
        <section class="revision-status-section">
          <div class="card card-revision-tabs">
            <div class="tabs-header">
              <button
                v-for="tab in revisionTabs"
                :key="tab.id"
                class="tab-btn"
                :class="{ active: activeRevisionTab === tab.id }"
                @click="activeRevisionTab = tab.id"
              >
                <span class="tab-label">{{ tab.label }}</span>
                <span class="tab-badge">{{ tab.count }}</span>
              </button>
            </div>

            <!-- Pending Revisions -->
            <div v-if="activeRevisionTab === 'pending'" class="revision-list">
              <div v-for="rev in pendingRevisions" :key="rev.id" class="revision-item" :class="`priority-${rev.priority}`">
                <div class="revision-left">
                  <div class="revision-check">
                    <input type="checkbox" :id="`rev-${rev.id}`" @change="toggleRevision(rev.id)">
                    <label :for="`rev-${rev.id}`"></label>
                  </div>
                  <div class="revision-info">
                    <h4 class="revision-title">{{ rev.title }}</h4>
                    <p class="revision-from">dari <strong>{{ rev.mentorName }}</strong> · {{ rev.date }}</p>
                    <p class="revision-detail">{{ rev.message }}</p>
                  </div>
                </div>
                <div class="revision-right">
                  <span class="priority-badge" :class="`badge-${rev.priority}`">{{ rev.priorityLabel }}</span>
                  <span class="project-ref">{{ rev.project }}</span>
                </div>
              </div>
              <div v-if="pendingRevisions.length === 0" class="empty-state-sm">
                <p>Tidak ada revisi yang tertunda—hebat! ✨</p>
              </div>
            </div>

            <!-- Completed Revisions -->
            <div v-if="activeRevisionTab === 'done'" class="revision-list">
              <div v-for="rev in completedRevisions" :key="rev.id" class="revision-item completed">
                <div class="revision-left">
                  <div class="revision-check checked">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="3,8 6,11 13,4"/>
                    </svg>
                  </div>
                  <div class="revision-info">
                    <h4 class="revision-title">{{ rev.title }}</h4>
                    <p class="revision-from">dari <strong>{{ rev.mentorName }}</strong> · Selesai {{ rev.completedDate }}</p>
                    <p class="revision-detail">{{ rev.message }}</p>
                  </div>
                </div>
                <div class="revision-right">
                  <span class="status-badge">Selesai</span>
                  <span class="project-ref">{{ rev.project }}</span>
                </div>
              </div>
              <div v-if="completedRevisions.length === 0" class="empty-state-sm">
                <p>Belum ada revisi yang diselesaikan</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 4: Feedback by Project ═══ -->
        <section class="project-feedback-section">
          <div class="card card-projects">
            <div class="card-header">
              <div class="section-badge badge-purple">
                <span class="badge-dot"></span> Catatan Revisi Per Project
              </div>
            </div>

            <div class="projects-grid">
              <div v-for="proj in projectFeedbacks" :key="proj.id" class="project-card">
                <div class="project-card-header">
                  <div class="project-name-wrap">
                    <span class="project-icon">{{ proj.icon }}</span>
                    <h3 class="project-name">{{ proj.name }}</h3>
                  </div>
                  <span class="feedback-count-badge">{{ proj.feedbackCount }}</span>
                </div>

                <p class="project-tech">{{ proj.tech }}</p>

                <div class="project-stats">
                  <div class="stat-item">
                    <span class="stat-item-label">Feedback</span>
                    <span class="stat-num">{{ proj.feedbackCount }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-item-label">Pending</span>
                    <span class="stat-num" :class="proj.pendingCount > 0 ? 'num-warning' : 'num-ok'">{{ proj.pendingCount }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-item-label">Selesai</span>
                    <span class="stat-num num-ok">{{ proj.completedCount }}</span>
                  </div>
                </div>

                <div class="project-mentors">
                  <span class="mentor-label">Mentor:</span>
                  <div class="mentor-avatars">
                    <div v-for="m in proj.mentors" :key="m" class="mentor-av" :title="m">{{ m.charAt(0) }}</div>
                  </div>
                </div>

                <div class="project-card-actions">
                  <NuxtLink :to="`/student/feedback?project=${proj.id}`" class="btn-view">
                    Lihat Detail
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══ ROW 5: All Feedback ═══ -->
        <section class="all-feedback-section">
          <div class="card card-all-feedback">
            <div class="card-header">
              <div class="section-badge badge-indigo">
                <span class="badge-dot"></span> Semua Feedback dari Mentor
              </div>
              <div class="feedback-controls">
                <input
                  v-model="feedbackSearch"
                  type="text"
                  class="search-input"
                  placeholder="Cari feedback..."
                >
                <select v-model="feedbackSort" class="sort-select">
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="by-mentor">Per Mentor</option>
                </select>
              </div>
            </div>

            <div class="feedback-list">
              <div v-for="fb in filteredFeedbacks" :key="fb.id" class="feedback-card" :class="`status-${fb.status}`">
                <div class="feedback-header">
                  <div class="mentor-info">
                    <div class="mentor-avatar" :style="{ background: fb.avatarBg }">{{ fb.mentorInit }}</div>
                    <div class="mentor-details">
                      <span class="mentor-name">{{ fb.mentorName }}</span>
                      <span class="feedback-date">{{ fb.date }}</span>
                    </div>
                  </div>
                  <div class="feedback-badges">
                    <span class="rating-stars">
                      <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= fb.rating }">★</span>
                    </span>
                    <span class="status-tag" :class="`tag-${fb.status}`">{{ fb.statusLabel }}</span>
                  </div>
                </div>

                <div class="feedback-project-ref">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75">
                    <rect x="2" y="2" width="12" height="12" rx="2"/><line x1="5" y1="6" x2="11" y2="6"/><line x1="5" y1="9" x2="9" y2="9"/>
                  </svg>
                  <span class="feedback-project-name">{{ fb.project }}</span>
                  <span class="category-tag">{{ fb.category }}</span>
                </div>

                <blockquote class="feedback-quote">"{{ fb.comment }}"</blockquote>

                <div class="feedback-tags">
                  <span v-for="tag in fb.tags" :key="tag" class="feedback-tag">{{ tag }}</span>
                </div>

                <div class="feedback-actions">
                  <button class="action-link" @click="markAsResolved(fb.id)">
                    <svg v-if="fb.status === 'completed'" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3,8 6,11 13,4"/>
                    </svg>
                    <svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="8" cy="8" r="5"/>
                    </svg>
                    {{ fb.status === 'completed' ? 'Sudah direvisi' : 'Tandai selesai' }}
                  </button>
                </div>
              </div>

              <div v-if="filteredFeedbacks.length === 0" class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                <p>Tidak ada feedback yang cocok</p>
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
import { ref, reactive, computed } from 'vue'
import StudentSidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Kelola Revisi — Carriera Course',
  description: 'Kelola feedback dari mentor, revisi project, dan track kesalahan berulang untuk improvement berkelanjutan.'
})

definePageMeta({ layout: 'dashboard' })

/* ─── Sidebar state ─── */
const sidebarOpen = ref(false)
const showFilters = ref(false)

/* ─── Date ─── */
const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

/* ─── Search & Sort ─── */
const feedbackSearch = ref('')
const feedbackSort = ref('newest')
const activeRevisionTab = ref('pending')

/* ─── All Feedback Data ─── */
const allFeedbacks = reactive([
  {
    id: 1,
    mentorName: 'Panji Wijaya',
    mentorInit: 'PW',
    avatarBg: 'linear-gradient(135deg,#6458f5,#818cf8)',
    date: '2 hari lalu',
    rating: 4,
    project: 'ThreadMark E-Commerce',
    category: 'Code Quality',
    comment: 'Struktur komponent sudah bagus, tapi perlu refactor di bagian state management. Pertimbangkan untuk gunakan composable pattern yang lebih clean.',
    tags: ['Refactoring', 'Vue.js', 'Composables'],
    status: 'pending',
    statusLabel: 'Sedang Direvisi'
  },
  {
    id: 2,
    mentorName: 'Siti Nurhaliza',
    mentorInit: 'SN',
    avatarBg: 'linear-gradient(135deg,#ec4899,#f472b6)',
    date: '5 hari lalu',
    rating: 5,
    project: 'ThreadMark E-Commerce',
    category: 'UI/UX Implementation',
    comment: 'Design implementation sangat sempurna! Padding, spacing, dan color palette sesuai dengan design system. Keep this consistency!',
    tags: ['UI Implementation', 'Design System'],
    status: 'completed',
    statusLabel: 'Selesai Direvisi'
  },
  {
    id: 3,
    mentorName: 'Bambang Setiawan',
    mentorInit: 'BS',
    avatarBg: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
    date: '1 minggu lalu',
    rating: 3,
    project: 'Content Management System',
    category: 'Performance',
    comment: 'API call masih banyak yang tidak dioptimasi. Tambahkan caching strategy dan pagination untuk handle large dataset.',
    tags: ['Performance', 'API', 'Caching'],
    status: 'pending',
    statusLabel: 'Sedang Direvisi'
  },
  {
    id: 4,
    mentorName: 'Panji Wijaya',
    mentorInit: 'PW',
    avatarBg: 'linear-gradient(135deg,#6458f5,#818cf8)',
    date: '1 minggu lalu',
    rating: 4,
    project: 'Portfolio Web App',
    category: 'Documentation',
    comment: 'Kode sudah berfungsi baik, tetapi kurangi comment yang tidak perlu dan tambahkan JSDoc untuk public functions.',
    tags: ['Documentation', 'Best Practices'],
    status: 'completed',
    statusLabel: 'Selesai Direvisi'
  },
  {
    id: 5,
    mentorName: 'Siti Nurhaliza',
    mentorInit: 'SN',
    avatarBg: 'linear-gradient(135deg,#ec4899,#f472b6)',
    date: '10 hari lalu',
    rating: 3,
    project: 'ThreadMark E-Commerce',
    category: 'Accessibility',
    comment: 'Beberapa element button tidak punya aria-label. Pastikan semua interactive elements accessible untuk screen reader users.',
    tags: ['Accessibility', 'WCAG'],
    status: 'pending',
    statusLabel: 'Sedang Direvisi'
  },
  {
    id: 6,
    mentorName: 'Bambang Setiawan',
    mentorInit: 'BS',
    avatarBg: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
    date: '2 minggu lalu',
    rating: 4,
    project: 'Content Management System',
    category: 'Security',
    comment: 'SQL injection risk pada search feature. Gunakan prepared statements dan input validation yang lebih strict.',
    tags: ['Security', 'Backend', 'SQL'],
    status: 'completed',
    statusLabel: 'Selesai Direvisi'
  }
])

/* ─── Computed: Total & Pending Count ─── */
const totalFeedback = computed(() => allFeedbacks.length)
const resolvedFeedback = computed(() => allFeedbacks.filter(f => f.status === 'completed').length)
const pendingFeedback = computed(() => allFeedbacks.filter(f => f.status === 'pending').length)

/* ─── Revision Tabs ─── */
const revisionTabs = computed(() => [
  { id: 'pending', label: 'Sedang Direvisi', count: pendingFeedback.value },
  { id: 'done', label: 'Selesai', count: resolvedFeedback.value }
])

/* ─── Pending & Completed Revisions ─── */
const pendingRevisions = computed(() => allFeedbacks.filter(f => f.status === 'pending').map((f, idx) => ({
  id: f.id,
  title: f.category,
  mentorName: f.mentorName,
  date: f.date,
  message: f.comment,
  project: f.project,
  priority: idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low',
  priorityLabel: idx === 0 ? 'Prioritas Tinggi' : idx === 1 ? 'Prioritas Sedang' : 'Prioritas Rendah'
})))

const completedRevisions = computed(() => allFeedbacks.filter(f => f.status === 'completed').map(f => ({
  id: f.id,
  title: f.category,
  mentorName: f.mentorName,
  completedDate: f.date,
  message: f.comment,
  project: f.project
})))

/* ─── Repeat Errors ─── */
const repeatErrors = reactive([
  {
    type: 'State Management',
    count: 3,
    severity: 'high',
    description: 'Struktur state yang kurang optimal, sering menggunakan prop drilling.',
    projects: ['ThreadMark', 'Portfolio'],
    suggestion: 'Mulai menggunakan Pinia store atau composable untuk shared state. Pelajari pattern provide/inject di Vue 3.'
  },
  {
    type: 'Accessibility (a11y)',
    count: 3,
    severity: 'high',
    description: 'Missing aria-labels dan semantic HTML pada interactive elements.',
    projects: ['ThreadMark', 'CMS'],
    suggestion: 'Review WCAG 2.1 guidelines. Selalu tambahkan aria-label pada button, input, dan interactive elements.'
  },
  {
    type: 'Performance Optimization',
    count: 2,
    severity: 'medium',
    description: 'API calls tanpa pagination atau lazy loading untuk large datasets.',
    projects: ['CMS', 'Portfolio'],
    suggestion: 'Implementasi pagination, virtual scrolling, dan code splitting. Monitor bundle size dengan build analytics.'
  },
  {
    type: 'Error Handling',
    count: 2,
    severity: 'medium',
    description: 'API errors tidak dihandle dengan baik, user experience terganggu.',
    projects: ['ThreadMark', 'CMS'],
    suggestion: 'Buat error boundary component dan konsisten error handling strategy di semua API calls.'
  }
])

/* ─── Project Feedbacks ─── */
const projectFeedbacks = reactive([
  {
    id: 'threadmark',
    name: 'ThreadMark E-Commerce',
    icon: '🛍️',
    tech: 'Nuxt 3, Tailwind, Supabase',
    feedbackCount: 3,
    pendingCount: 2,
    completedCount: 1,
    mentors: ['Panji Wijaya', 'Siti Nurhaliza']
  },
  {
    id: 'cms',
    name: 'Content Management System',
    icon: '📝',
    tech: 'Vue 3, Express, PostgreSQL',
    feedbackCount: 2,
    pendingCount: 1,
    completedCount: 1,
    mentors: ['Bambang Setiawan']
  },
  {
    id: 'portfolio',
    name: 'Portfolio Web App',
    icon: '💼',
    tech: 'Nuxt 3, Markdown, Vercel',
    feedbackCount: 1,
    pendingCount: 0,
    completedCount: 1,
    mentors: ['Panji Wijaya']
  }
])

/* ─── Search & Filter Feedbacks ─── */
const filteredFeedbacks = computed(() => {
  let results = [...allFeedbacks]

  if (feedbackSearch.value) {
    const query = feedbackSearch.value.toLowerCase()
    results = results.filter(f =>
      f.mentorName.toLowerCase().includes(query) ||
      f.project.toLowerCase().includes(query) ||
      f.comment.toLowerCase().includes(query) ||
      f.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (feedbackSort.value === 'newest') {
    results.sort((a, b) => b.id - a.id)
  } else if (feedbackSort.value === 'oldest') {
    results.sort((a, b) => a.id - b.id)
  } else if (feedbackSort.value === 'by-mentor') {
    results.sort((a, b) => a.mentorName.localeCompare(b.mentorName))
  }

  return results
})

/* ─── Actions ─── */
const markAsResolved = (feedbackId: number) => {
  const feedback = allFeedbacks.find(f => f.id === feedbackId)
  if (feedback) {
    feedback.status = feedback.status === 'pending' ? 'completed' : 'pending'
    feedback.statusLabel = feedback.status === 'pending' ? 'Sedang Direvisi' : 'Selesai Direvisi'
  }
}

const toggleRevision = (revisionId: number) => {
  const feedback = allFeedbacks.find(f => f.id === revisionId)
  if (feedback) {
    feedback.status = 'completed'
    feedback.statusLabel = 'Selesai Direvisi'
  }
}
</script>

<style scoped>
/* ══════════════════════════════════════
   BASE — matches dashboard exactly
══════════════════════════════════════ */
.feedback-page {
  display: flex;
  min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: hidden;
}

/* ── Ambients ── */
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.ambient-tl { top: -5%;  left: -5%;  width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(165,180,252,.05), transparent 70%); }
.ambient-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }

.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(to right,  rgba(100,88,245,.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100,88,245,.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
.main-wrap {
  margin-left: 260px;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

/* ── Topbar ── */
.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.topbar-toggle {
  display: none;
  background: none; border: none; cursor: pointer;
  padding: .375rem; border-radius: 8px; color: #374151;
  transition: background .2s;
}
.topbar-toggle:hover { background: rgba(0,0,0,.06); }
.topbar-toggle svg { width: 20px; height: 20px; }
.topbar-greeting { flex: 1; }
.greeting-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -.02em;
  margin: 0;
}
.greeting-sub { font-size: .8125rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-actions { display: flex; gap: .5rem; }
.action-btn {
  width: 40px; height: 40px;
  border-radius: 10px;
  border: 1.5px solid #E5E7EB;
  background: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #6B7280;
  transition: all .2s;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.action-btn:hover { border-color: #6458f5; color: #6458f5; }
.action-btn svg { width: 18px; height: 18px; }

/* ── Content ── */
.feedback-content {
  padding: 2rem 2rem 3rem;
  max-width: 1400px;
}

/* ══════════════════════════════════════
   STATS ROW — identical to dashboard
══════════════════════════════════════ */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: #fff;
  border: 1px solid #E9EBF4;
  border-radius: 14px;
  padding: 1.125rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,.04);
  transition: box-shadow .2s, transform .2s;
}
.stat-card:hover { box-shadow: 0 4px 16px rgba(100,88,245,.08); transform: translateY(-1px); }
.stat-icon-wrap {
  width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.stat-data { flex: 1; }
.stat-value { display: block; font-size: 1.375rem; font-weight: 800; color: #111827; letter-spacing: -.03em; line-height: 1; }
.stat-label { display: block; font-size: .75rem; color: #9CA3AF; margin-top: .25rem; font-weight: 500; }
.stat-trend { font-size: .6875rem; font-weight: 600; white-space: nowrap; }
.stat-trend.up      { color: #10B981; }
.stat-trend.neutral { color: #9CA3AF; }

/* ══════════════════════════════════════
   CARD BASE — matches dashboard
══════════════════════════════════════ */
.card {
  background: #fff;
  border: 1px solid #E9EBF4;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 8px rgba(0,0,0,.04);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
}
.card-link {
  font-size: .8125rem; font-weight: 500; color: #6458f5; text-decoration: none;
  transition: color .15s;
}
.card-link:hover { color: #4f46e5; }

/* ── Badges ── */
.section-badge {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
  padding: .3rem .75rem; border-radius: 9999px;
}
.badge-red     { background: rgba(239,68,68,.08);  color: #DC2626; }
.badge-purple  { background: rgba(100,88,245,.08); color: #6458f5; }
.badge-orange  { background: rgba(245,158,11,.08); color: #D97706; }
.badge-green   { background: rgba(16,185,129,.08); color: #059669; }
.badge-indigo  { background: rgba(99,102,241,.08); color: #4F46E5; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; flex-shrink: 0; }

.section-desc {
  font-size: .875rem; color: #6B7280; line-height: 1.65; margin-bottom: 1.25rem;
}

/* ══════════════════════════════════════
   ROW 2 — Errors grid
══════════════════════════════════════ */
.highlight-section { margin-bottom: 1.25rem; }

.errors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.error-card {
  background: #FAFAFA;
  border: 1px solid #E9EBF4;
  border-left: 4px solid #E9EBF4;
  border-radius: 12px;
  padding: 1.25rem;
  transition: box-shadow .2s;
}
.error-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.06); }
.error-card.severity-high   { border-left-color: #EF4444; background: rgba(239,68,68,.02); }
.error-card.severity-medium { border-left-color: #F59E0B; background: rgba(245,158,11,.02); }

.error-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .875rem; }
.error-type-badge {
  font-size: .75rem; font-weight: 700; padding: .25rem .625rem;
  border-radius: 7px; background: rgba(100,88,245,.08); color: #6458f5;
}
.error-count {
  font-size: .75rem; font-weight: 800; padding: .2rem .55rem;
  border-radius: 9999px; background: rgba(239,68,68,.08); color: #DC2626;
}
.error-desc { font-size: .8125rem; color: #374151; line-height: 1.6; margin-bottom: .875rem; }
.error-projects { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: .875rem; }
.error-proj-tag {
  font-size: .6875rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; background: #F3F4F6; color: #4B5563; border: 1px solid #E5E7EB;
}
.error-suggestion {
  font-size: .8125rem; line-height: 1.6; color: #374151;
  background: rgba(16,185,129,.06); border: 1px solid rgba(16,185,129,.15);
  border-radius: 9px; padding: .75rem 1rem;
}
.error-suggestion strong { color: #059669; }

/* ── Empty states ── */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 3rem 2rem; color: #9CA3AF; text-align: center; gap: .75rem;
}
.empty-state svg { width: 48px; height: 48px; opacity: .4; }
.empty-state p { font-size: .9375rem; }
.empty-state-sm { padding: 1.5rem; text-align: center; color: #9CA3AF; font-size: .875rem; }

/* ══════════════════════════════════════
   ROW 3 — Revision tabs
══════════════════════════════════════ */
.revision-status-section { margin-bottom: 1.25rem; }
.card-revision-tabs { position: relative; }

.tabs-header {
  display: flex; gap: .25rem;
  border-bottom: 1px solid #F3F4F6;
  margin: -1.5rem -1.5rem 0 -1.5rem;
  padding: 0 1.5rem;
}
.tab-btn {
  background: none; border: none; cursor: pointer;
  display: flex; align-items: center; gap: .5rem;
  padding: 1rem .25rem;
  font-size: .875rem; font-weight: 500; color: #9CA3AF;
  position: relative; transition: color .15s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.tab-btn:hover { color: #374151; }
.tab-btn.active { color: #111827; border-bottom-color: #6458f5; }
.tab-badge {
  font-size: .6875rem; font-weight: 700; padding: .15rem .45rem;
  border-radius: 6px; background: rgba(100,88,245,.08); color: #6458f5;
}

.revision-list { display: flex; flex-direction: column; gap: .75rem; margin-top: 1.25rem; }
.revision-item {
  display: flex; justify-content: space-between; gap: 1.25rem;
  padding: 1.125rem 1.25rem;
  background: #FAFAFA; border: 1px solid #E9EBF4;
  border-left: 3px solid #E9EBF4;
  border-radius: 12px; transition: all .2s; cursor: default;
}
.revision-item:hover { background: #F9FAFB; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
.revision-item.priority-high   { border-left-color: #EF4444; }
.revision-item.priority-medium { border-left-color: #F59E0B; }
.revision-item.priority-low    { border-left-color: #3B82F6; }
.revision-item.completed       { border-left-color: #10B981; opacity: .85; }

.revision-left { display: flex; gap: 1rem; flex: 1; }

.revision-check {
  margin-top: .2rem; flex-shrink: 0;
}
.revision-check input[type="checkbox"] { display: none; }
.revision-check label {
  display: flex; align-items: center; justify-content: center;
  width: 22px; height: 22px;
  border: 2px solid #D1D5DB; border-radius: 6px;
  cursor: pointer; transition: all .2s;
}
.revision-check label:hover { border-color: #6458f5; background: rgba(100,88,245,.05); }
.revision-check.checked {
  width: 22px; height: 22px; border-radius: 6px;
  background: rgba(16,185,129,.1); border: 2px solid rgba(16,185,129,.3);
  display: flex; align-items: center; justify-content: center; color: #10B981;
}
.revision-check.checked svg { width: 12px; height: 12px; }

.revision-info { flex: 1; min-width: 0; }
.revision-title { font-size: .875rem; font-weight: 700; color: #111827; margin: 0 0 .25rem; }
.revision-from { font-size: .75rem; color: #9CA3AF; margin: 0 0 .375rem; }
.revision-from strong { color: #374151; }
.revision-detail { font-size: .8125rem; color: #6B7280; line-height: 1.55; margin: 0; }

.revision-right {
  display: flex; flex-direction: column; align-items: flex-end; gap: .5rem; flex-shrink: 0;
}
.priority-badge {
  font-size: .6875rem; font-weight: 700; padding: .25rem .625rem; border-radius: 9999px;
}
.badge-high   { background: rgba(239,68,68,.08);  color: #DC2626; }
.badge-medium { background: rgba(245,158,11,.08); color: #D97706; }
.badge-low    { background: rgba(59,130,246,.08); color: #2563EB; }

.status-badge {
  font-size: .6875rem; font-weight: 700; padding: .25rem .625rem; border-radius: 9999px;
  background: rgba(16,185,129,.08); color: #059669;
}
.project-ref { font-size: .6875rem; color: #9CA3AF; font-weight: 500; }

/* ══════════════════════════════════════
   ROW 4 — Projects grid
══════════════════════════════════════ */
.project-feedback-section { margin-bottom: 1.25rem; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.project-card {
  background: #FAFAFA; border: 1px solid #E9EBF4; border-radius: 14px; padding: 1.25rem;
  display: flex; flex-direction: column; gap: .875rem;
  transition: all .2s;
}
.project-card:hover { border-color: rgba(100,88,245,.2); box-shadow: 0 4px 16px rgba(100,88,245,.08); }

.project-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
.project-name-wrap { display: flex; align-items: center; gap: .625rem; }
.project-icon { font-size: 1.25rem; line-height: 1; }
.project-name { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0; }
.feedback-count-badge {
  font-size: .6875rem; font-weight: 700; padding: .25rem .55rem; border-radius: 9999px;
  background: rgba(100,88,245,.08); color: #6458f5; flex-shrink: 0;
}

.project-tech { font-size: .75rem; color: #9CA3AF; margin: 0; }

.project-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: .5rem; }
.stat-item {
  background: #F3F4F6; border-radius: 9px; padding: .625rem .5rem;
  display: flex; flex-direction: column; align-items: center; gap: .2rem;
}
.stat-item-label { font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #9CA3AF; }
.stat-num { font-size: 1rem; font-weight: 800; color: #111827; }
.num-warning { color: #D97706; }
.num-ok      { color: #059669; }

.project-mentors { display: flex; align-items: center; gap: .625rem; }
.mentor-label { font-size: .75rem; color: #9CA3AF; font-weight: 500; }
.mentor-avatars { display: flex; gap: -.25rem; }
.mentor-av {
  width: 26px; height: 26px; border-radius: 8px;
  background: linear-gradient(135deg, #6458f5, #818CF8);
  display: flex; align-items: center; justify-content: center;
  font-size: .625rem; font-weight: 700; color: #fff;
  border: 2px solid #fff; margin-left: -6px;
}
.mentor-av:first-child { margin-left: 0; }

.project-card-actions { margin-top: auto; padding-top: .25rem; }
.btn-view {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .8125rem; font-weight: 600; color: #6458f5; text-decoration: none;
  padding: .5rem .875rem; border-radius: 9px;
  background: rgba(100,88,245,.08); border: 1px solid rgba(100,88,245,.15);
  transition: all .2s;
}
.btn-view svg { width: 14px; height: 14px; }
.btn-view:hover { background: rgba(100,88,245,.15); border-color: rgba(100,88,245,.25); }

/* ══════════════════════════════════════
   ROW 5 — All Feedback
══════════════════════════════════════ */
.all-feedback-section { margin-bottom: 1.25rem; }

.feedback-controls {
  display: flex; gap: .75rem; align-items: center;
}
.search-input {
  padding: .5rem .875rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .8125rem; color: #111827; outline: none;
  transition: border-color .2s; min-width: 200px;
  font-family: inherit;
}
.search-input:focus { border-color: #6458f5; background: #fff; }
.search-input::placeholder { color: #9CA3AF; }
.sort-select {
  padding: .5rem .875rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .8125rem; color: #374151; outline: none;
  cursor: pointer; transition: border-color .2s;
  font-family: inherit;
}
.sort-select:focus { border-color: #6458f5; }

.feedback-list { display: flex; flex-direction: column; gap: 1rem; }
.feedback-card {
  background: #FAFAFA; border: 1px solid #E9EBF4; border-radius: 14px; padding: 1.375rem;
  border-left: 3px solid #E9EBF4; transition: all .2s;
}
.feedback-card:hover { border-color: #DDE0F0; box-shadow: 0 2px 12px rgba(0,0,0,.05); }
.feedback-card.status-pending   { border-left-color: #F59E0B; }
.feedback-card.status-completed { border-left-color: #10B981; }

.feedback-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap;
}
.mentor-info { display: flex; align-items: center; gap: .875rem; flex: 1; }
.mentor-avatar {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: .8125rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
.mentor-details { display: flex; flex-direction: column; gap: .15rem; }
.mentor-name { font-size: .9375rem; font-weight: 700; color: #111827; }
.feedback-date { font-size: .75rem; color: #9CA3AF; }

.feedback-badges { display: flex; align-items: center; gap: .875rem; }
.rating-stars { display: flex; gap: .15rem; }
.star { font-size: .875rem; color: #E5E7EB; }
.star.filled { color: #FBBF24; }

.status-tag {
  font-size: .6875rem; font-weight: 700; padding: .3rem .75rem;
  border-radius: 9999px;
}
.tag-pending   { background: rgba(245,158,11,.08); color: #D97706; }
.tag-completed { background: rgba(16,185,129,.08); color: #059669; }

.feedback-project-ref {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .75rem; font-weight: 500; color: #6B7280;
  background: #F3F4F6; border: 1px solid #E5E7EB;
  padding: .3rem .75rem; border-radius: 8px; margin-bottom: .875rem;
}
.feedback-project-ref svg { width: 12px; height: 12px; flex-shrink: 0; }
.feedback-project-name { color: #374151; font-weight: 600; }

.category-tag {
  background: rgba(100,88,245,.08); color: #6458f5;
  padding: .15rem .5rem; border-radius: 5px; font-size: .6875rem; font-weight: 600;
}

.feedback-quote {
  font-size: .875rem; color: #374151; line-height: 1.7;
  font-style: italic; margin: 0 0 .875rem;
  padding-left: .875rem;
  border-left: 3px solid rgba(100,88,245,.25);
}

.feedback-tags { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: .875rem; }
.feedback-tag {
  font-size: .6875rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; background: #F3F4F6; color: #4B5563; border: 1px solid #E5E7EB;
}

.feedback-actions {
  display: flex; justify-content: flex-end; gap: 1rem;
  padding-top: .875rem; border-top: 1px solid #F3F4F6;
}
.action-link {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .8125rem; font-weight: 600; color: #6458f5;
  background: none; border: none; cursor: pointer; padding: 0;
  transition: color .15s; font-family: inherit;
}
.action-link svg { width: 14px; height: 14px; }
.action-link:hover { color: #4f46e5; }

/* ══════════════════════════════════════
   MOBILE OVERLAY
══════════════════════════════════════ */
.sidebar-overlay {
  position: fixed; inset: 0; z-index: 190;
  background: rgba(0,0,0,.5); backdrop-filter: blur(2px);
}

/* ══════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════ */
@media (max-width: 1280px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .projects-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar { padding: .875rem 1.25rem; }
  .topbar-toggle { display: flex; }
  .feedback-content { padding: 1.25rem 1.25rem 2.5rem; }
  .stats-row { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .stats-row { grid-template-columns: 1fr; }
  .errors-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .feedback-header { flex-direction: column; gap: .75rem; }
  .feedback-controls { flex-direction: column; }
  .search-input { min-width: auto; width: 100%; }
  .sort-select { width: 100%; }
  .revision-item { flex-direction: column; }
  .revision-right { flex-direction: row; align-items: center; }
  .greeting-title { font-size: .9375rem; }
}
</style>