<template>
  <div class="task-page">

    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-br"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <StudentSidebar />

    <div class="main-wrap">

      <header class="topbar">
        <button class="topbar-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle sidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div class="topbar-greeting">
          <h1 class="greeting-title">Workload Kamu 🗂️</h1>
          <p class="greeting-sub">{{ todayStr }} · {{ totalTasks }} task aktif</p>
        </div>
        <div class="topbar-actions">
          <button class="action-btn" @click="showAddModal = true" aria-label="Tambah task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      <main class="task-content">

        <section class="stats-row">
          <div v-for="s in summaryStats" :key="s.label" class="stat-card">
            <div class="stat-icon-wrap" :style="{ background: s.bg }">
              <span v-html="s.icon"></span>
            </div>
            <div class="stat-data">
              <span class="stat-value">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
            <div class="stat-trend" :class="s.trendClass">{{ s.trend }}</div>
          </div>
        </section>

        <section class="layout-grid">

          <div class="col-main">

            <div class="card card-tasks">
              <div class="card-header">
                <div class="header-left">
                  <div class="section-badge badge-purple">
                    <span class="badge-dot"></span> Semua Task
                  </div>
                  <div class="filter-tabs">
                    <button
                      v-for="f in filterOptions"
                      :key="f.id"
                      class="filter-tab"
                      :class="{ active: activeFilter === f.id }"
                      @click="activeFilter = f.id"
                    >
                      {{ f.label }}
                      <span class="filter-count">{{ f.count }}</span>
                    </button>
                  </div>
                </div>
                <div class="header-right">
                  <div class="search-wrap">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75">
                      <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/>
                    </svg>
                    <input v-model="searchQuery" type="text" placeholder="Cari task..." class="search-input">
                  </div>
                  <select v-model="sortBy" class="sort-select">
                    <option value="priority">Prioritas</option>
                    <option value="deadline">Deadline</option>
                    <option value="project">Project</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              <div class="task-list">
                <TransitionGroup name="task-fade">
                  <div
                    v-for="task in filteredTasks"
                    :key="task.id"
                    class="task-item"
                    :class="[`status-${task.status}`, `priority-${task.priority}`, { expanded: expandedTask === task.id }]"
                    @click="toggleExpand(task.id)"
                  >
                    <div class="task-main">
                      <div class="task-left">
                        <button class="status-btn" :class="`btn-${task.status}`" @click.stop="cycleStatus(task.id)" :title="statusMeta[task.status].label">
                          <span v-html="statusMeta[task.status].icon"></span>
                        </button>
                        <div class="task-info">
                          <div class="task-title-row">
                            <span class="task-name" :class="{ 'line-through': task.status === 'done' }">{{ task.name }}</span>
                            <span class="priority-pip" :class="`pip-${task.priority}`" :title="priorityMeta[task.priority].label"></span>
                          </div>
                          <div class="task-meta-row">
                            <span class="task-project">{{ task.project }}</span>
                            <span class="task-category">{{ task.category }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="task-right">
                        <span class="status-pill" :class="`pill-${task.status}`">{{ statusMeta[task.status].label }}</span>
                        <span class="deadline-badge" :class="deadlineClass(task.deadline)">
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75">
                            <rect x="1" y="2" width="10" height="9" rx="1.5"/><line x1="8" y1="1" x2="8" y2="3"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="1" y1="5" x2="11" y2="5"/>
                          </svg>
                          {{ formatDate(task.deadline) }}
                        </span>
                        <button class="expand-btn" :class="{ rotated: expandedTask === task.id }" @click.stop="toggleExpand(task.id)" aria-label="Detail">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="4,6 8,10 12,6"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <Transition name="expand">
                      <div v-if="expandedTask === task.id" class="task-detail">
                        <p class="task-desc">{{ task.description }}</p>
                        <div class="task-detail-grid">
                          <div class="detail-item">
                            <span class="detail-label">Estimasi</span>
                            <span class="detail-value">{{ task.estimate }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Prioritas</span>
                            <span class="detail-value priority-val" :class="`pval-${task.priority}`">{{ priorityMeta[task.priority].label }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Assigned</span>
                            <span class="detail-value">{{ task.assignee }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Sprint</span>
                            <span class="detail-value">Sprint {{ task.sprint }}</span>
                          </div>
                        </div>
                        <div class="task-progress-wrap">
                          <div class="task-progress-labels">
                            <span>Progress</span>
                            <span class="task-progress-pct">{{ task.progress }}%</span>
                          </div>
                          <div class="task-progress-bar">
                            <div class="task-progress-fill" :style="{ width: task.progress + '%' }" :class="`fill-${task.status}`"></div>
                          </div>
                        </div>
                        <div class="task-tags">
                          <span v-for="tag in task.tags" :key="tag" class="task-tag">{{ tag }}</span>
                        </div>
                        <div class="task-actions">
                          <button class="btn-action btn-secondary" @click.stop="cycleStatus(task.id)">
                            Ubah Status → {{ statusMeta[nextStatus(task.status)].label }}
                          </button>
                          <button class="btn-action btn-danger" @click.stop="deleteTask(task.id)">
                            Hapus
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </TransitionGroup>

                <div v-if="filteredTasks.length === 0" class="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                  <p>Tidak ada task yang cocok</p>
                </div>
              </div>
            </div>

          </div>

          <div class="col-side">

            <div class="card card-progress">
              <div class="card-header">
                <div class="section-badge badge-green">
                  <span class="badge-dot"></span> Progress Per Project
                </div>
              </div>
              <div class="project-progress-list">
                <div v-for="proj in projectProgress" :key="proj.name" class="proj-progress-item">
                  <div class="proj-progress-header">
                    <span class="proj-progress-icon">{{ proj.icon }}</span>
                    <span class="proj-progress-name">{{ proj.name }}</span>
                    <span class="proj-progress-pct">{{ proj.pct }}%</span>
                  </div>
                  <div class="proj-bar-wrap">
                    <div class="proj-bar-fill" :style="{ width: proj.pct + '%', background: proj.color }"></div>
                  </div>
                  <div class="proj-progress-counts">
                    <span v-for="s in proj.statusCounts" :key="s.label" class="proj-count-item">
                      <span class="proj-count-dot" :style="{ background: s.color }"></span>
                      {{ s.count }} {{ s.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card card-deadline-list">
              <div class="card-header">
                <div class="section-badge badge-orange">
                  <span class="badge-dot"></span> Deadline Terdekat
                </div>
              </div>
              <ul class="deadline-list">
                <li v-for="dl in upcomingDeadlines" :key="dl.id" class="deadline-item" :class="`urgency-${dl.urgency}`">
                  <div class="dl-urgency-bar"></div>
                  <div class="dl-info">
                    <span class="dl-name">{{ dl.name }}</span>
                    <span class="dl-project">{{ dl.project }}</span>
                  </div>
                  <div class="dl-right">
                    <span class="dl-date">{{ dl.date }}</span>
                    <span class="dl-remaining" :class="`remaining-${dl.urgency}`">{{ dl.remaining }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="card card-priority-dist">
              <div class="card-header">
                <div class="section-badge badge-indigo">
                  <span class="badge-dot"></span> Distribusi Prioritas
                </div>
              </div>
              <div class="priority-dist-list">
                <div v-for="p in priorityDistribution" :key="p.level" class="priority-dist-item">
                  <div class="priority-dist-label">
                    <span class="priority-dist-dot" :style="{ background: p.color }"></span>
                    <span class="priority-dist-name">{{ p.label }}</span>
                  </div>
                  <div class="priority-dist-bar-wrap">
                    <div class="priority-dist-bar" :style="{ width: (p.count / totalTasks * 100) + '%', background: p.color }"></div>
                  </div>
                  <span class="priority-dist-count">{{ p.count }}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>

    <Transition name="modal-fade">
      <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Tambah Task Baru</h2>
            <button class="modal-close" @click="showAddModal = false" aria-label="Tutup">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nama Task</label>
              <input v-model="newTask.name" type="text" class="form-input" placeholder="Contoh: Buat halaman checkout">
            </div>
            <div class="form-group">
              <label class="form-label">Deskripsi</label>
              <textarea v-model="newTask.description" class="form-textarea" placeholder="Detail task..." rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Project</label>
                <select v-model="newTask.project" class="form-select">
                  <option v-for="p in projectOptions" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Kategori</label>
                <input v-model="newTask.category" type="text" class="form-input" placeholder="UI/UX, Frontend...">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Prioritas</label>
                <select v-model="newTask.priority" class="form-select">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Deadline</label>
                <input v-model="newTask.deadline" type="date" class="form-input">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Estimasi</label>
                <input v-model="newTask.estimate" type="text" class="form-input" placeholder="2 jam, 1 hari...">
              </div>
              <div class="form-group">
                <label class="form-label">Sprint</label>
                <input v-model.number="newTask.sprint" type="number" class="form-input" min="1" placeholder="4">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-modal-cancel" @click="showAddModal = false">Batal</button>
            <button class="btn-modal-submit" @click="addTask" :disabled="!newTask.name">Tambah Task</button>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import StudentSidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Tasks — Carriera Course',
  description: 'Kelola workload, prioritas, dan progress task kamu di Carriera Course.'
})

definePageMeta({ layout: 'dashboard' })

const sidebarOpen = ref(false)
const showAddModal = ref(false)
const searchQuery = ref('')
const activeFilter = ref('all')
const sortBy = ref('priority')
const expandedTask = ref<number | null>(null)
const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const statusMeta: Record<string, { label: string; icon: string }> = {
  todo:     { label: 'Belum', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="5.5"/></svg>' },
  doing:    { label: 'Proses', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1"/></svg>' },
  revision: { label: 'Revisi', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 2H9a1 1 0 00-1 1v1h4V3a1 1 0 00-1-1z"/><rect x="2" y="4" width="12" height="10" rx="1"/><line x1="5" y1="8" x2="11" y2="8"/><line x1="5" y1="11" x2="8" y2="11"/></svg>' },
  done:     { label: 'Selesai', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3,8 6,11 13,4"/></svg>' },
}

const priorityMeta: Record<string, { label: string }> = {
  critical: { label: 'Critical' },
  high:     { label: 'High' },
  medium:   { label: 'Medium' },
  low:      { label: 'Low' },
}

const statusOrder = ['todo', 'doing', 'revision', 'done']
const nextStatus = (current: string) => statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length]

const tasks = reactive([
  { id: 1,  name: 'Prototype UI — Checkout Flow',        project: 'ThreadMark', category: 'UI/UX',    status: 'doing',    priority: 'critical', deadline: '2026-04-11', progress: 65, estimate: '1 hari',  sprint: 4, assignee: 'Arka Jenar', description: 'Buat prototype high-fidelity untuk halaman checkout dari cart hingga konfirmasi pembayaran.', tags: ['Figma', 'Checkout', 'Mobile-first'] },
  { id: 2,  name: 'API Integration — Product List',      project: 'ThreadMark', category: 'Frontend', status: 'doing',    priority: 'high',     deadline: '2026-04-14', progress: 40, estimate: '3 hari',  sprint: 4, assignee: 'Arka Jenar', description: 'Integrasi endpoint product list dari Supabase, dengan filter, sort, dan pagination.', tags: ['Vue 3', 'Supabase', 'Pagination'] },
  { id: 3,  name: 'Sprint 4 Review Presentation',        project: 'ThreadMark', category: 'Lainnya', status: 'todo',     priority: 'high',     deadline: '2026-04-14', progress: 0,  estimate: '4 jam',   sprint: 4, assignee: 'Arka Jenar', description: 'Siapkan slide dan demo untuk sprint review bersama mentor dan stakeholder.', tags: ['Presentasi', 'Sprint Review'] },
  { id: 4,  name: 'Unit Test — Auth Module',             project: 'ThreadMark', category: 'Testing', status: 'todo',     priority: 'medium',   deadline: '2026-04-18', progress: 0,  estimate: '2 hari',  sprint: 4, assignee: 'Arka Jenar', description: 'Tulis unit test untuk seluruh fungsi di auth module menggunakan Vitest.', tags: ['Vitest', 'TDD', 'Auth'] },
  { id: 5,  name: 'Design System & Component Library',   project: 'ThreadMark', category: 'UI/UX',   status: 'done',     priority: 'high',     deadline: '2026-04-07', progress: 100, estimate: '3 hari', sprint: 3, assignee: 'Arka Jenar', description: 'Buat design system lengkap termasuk color palette, typography, dan komponen dasar.', tags: ['Design System', 'Figma', 'Components'] },
  { id: 6,  name: 'Auth Flow — Login & Register',        project: 'ThreadMark', category: 'Frontend', status: 'done',    priority: 'high',     deadline: '2026-04-05', progress: 100, estimate: '2 hari', sprint: 3, assignee: 'Arka Jenar', description: 'Implementasi login, register, forgot password dengan validasi form dan loading state.', tags: ['Auth', 'Supabase', 'Vue 3'] },
  { id: 7,  name: 'Refactor State Management',           project: 'ThreadMark', category: 'Frontend', status: 'revision', priority: 'medium',  deadline: '2026-04-16', progress: 70,  estimate: '1 hari', sprint: 4, assignee: 'Arka Jenar', description: 'Refactor prop drilling ke Pinia store sesuai feedback mentor Panji.', tags: ['Pinia', 'Refactor', 'Vue 3'] },
  { id: 8,  name: 'Tambah Aria Labels & Accessibility',  project: 'ThreadMark', category: 'Frontend', status: 'revision', priority: 'medium',  deadline: '2026-04-15', progress: 50,  estimate: '6 jam',  sprint: 4, assignee: 'Arka Jenar', description: 'Perbaiki seluruh elemen interaktif agar memenuhi WCAG 2.1 Level AA.', tags: ['Accessibility', 'WCAG', 'a11y'] },
  { id: 9,  name: 'Dashboard Admin — Analytics',         project: 'CMS',        category: 'Frontend', status: 'doing',    priority: 'high',     deadline: '2026-04-20', progress: 30,  estimate: '3 hari', sprint: 2, assignee: 'Arka Jenar', description: 'Buat halaman analytics untuk admin dengan chart kunjungan, artikel terpopuler, dan engagement.', tags: ['Chart.js', 'Dashboard', 'Admin'] },
  { id: 10, name: 'Caching Strategy & Pagination API',   project: 'CMS',        category: 'Backend',  status: 'todo',     priority: 'medium',   deadline: '2026-04-22', progress: 0,   estimate: '2 hari', sprint: 2, assignee: 'Arka Jenar', description: 'Implementasi Redis caching dan cursor-based pagination untuk endpoint artikel dan komentar.', tags: ['Redis', 'PostgreSQL', 'Performance'] },
  { id: 11, name: 'Portfolio Case Study — ThreadMark',   project: 'Portfolio',  category: 'Konten',   status: 'todo',     priority: 'low',      deadline: '2026-04-25', progress: 0,   estimate: '1 hari', sprint: 1, assignee: 'Arka Jenar', description: 'Tulis studi kasus proyek ThreadMark untuk portfolio, termasuk problem statement dan hasil.', tags: ['Writing', 'Case Study', 'Portfolio'] },
  { id: 12, name: 'Deploy ke Vercel — Portfolio',        project: 'Portfolio',  category: 'DevOps',   status: 'done',     priority: 'low',      deadline: '2026-04-03', progress: 100, estimate: '3 jam',  sprint: 1, assignee: 'Arka Jenar', description: 'Setup CI/CD dan deploy portfolio ke Vercel dengan custom domain.', tags: ['Vercel', 'CI/CD', 'Deployment'] },
])

const projectOptions = ['ThreadMark', 'CMS', 'Portfolio']

const newTask = reactive({
  name: '', description: '', project: 'ThreadMark', category: '',
  priority: 'medium', deadline: '', estimate: '', sprint: 4, assignee: 'Arka Jenar', tags: [] as string[]
})

const totalTasks = computed(() => tasks.length)

const filterOptions = computed(() => [
  { id: 'all',      label: 'Semua',   count: tasks.length },
  { id: 'todo',     label: 'Belum',   count: tasks.filter(t => t.status === 'todo').length },
  { id: 'doing',    label: 'Proses',  count: tasks.filter(t => t.status === 'doing').length },
  { id: 'revision', label: 'Revisi',  count: tasks.filter(t => t.status === 'revision').length },
  { id: 'done',     label: 'Selesai', count: tasks.filter(t => t.status === 'done').length },
])

const summaryStats = computed(() => [
  {
    label: 'Total Task', value: tasks.length,
    trend: `${tasks.filter(t=>t.status==='doing').length} aktif`,
    trendClass: 'neutral', bg: 'rgba(100,88,245,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6458f5" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>'
  },
  {
    label: 'Selesai', value: tasks.filter(t=>t.status==='done').length,
    trend: `${Math.round(tasks.filter(t=>t.status==='done').length / tasks.length * 100)}% selesai`,
    trendClass: 'up', bg: 'rgba(16,185,129,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>'
  },
  {
    label: 'Revisi', value: tasks.filter(t=>t.status==='revision').length,
    trend: 'Perlu diperhatikan',
    trendClass: 'warn', bg: 'rgba(239,68,68,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M11 4H13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h2"/><path d="M9 2H7a1 1 0 00-1 1v1h4V3a1 1 0 00-1-1z"/></svg>'
  },
  {
    label: 'Critical', value: tasks.filter(t=>t.priority==='critical').length,
    trend: 'Prioritas tertinggi',
    trendClass: 'neutral', bg: 'rgba(245,158,11,.1)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  },
])

const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
const statusOrderMap: Record<string, number> = { revision: 0, doing: 1, todo: 2, done: 3 }

const filteredTasks = computed(() => {
  let list = [...tasks]
  if (activeFilter.value !== 'all') list = list.filter(t => t.status === activeFilter.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.project.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
  }
  if (sortBy.value === 'priority') list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  else if (sortBy.value === 'deadline') list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  else if (sortBy.value === 'project') list.sort((a, b) => a.project.localeCompare(b.project))
  else if (sortBy.value === 'status') list.sort((a, b) => statusOrderMap[a.status] - statusOrderMap[b.status])
  return list
})

const projectProgress = computed(() => {
  const projects = [...new Set(tasks.map(t => t.project))]
  const icons: Record<string, string> = { ThreadMark: '🛍️', CMS: '📝', Portfolio: '💼' }
  const colors: Record<string, string> = { ThreadMark: '#6458f5', CMS: '#10B981', Portfolio: '#F59E0B' }
  return projects.map(name => {
    const pt = tasks.filter(t => t.project === name)
    const done = pt.filter(t => t.status === 'done').length
    return {
      name, icon: icons[name] || '📁',
      pct: Math.round(done / pt.length * 100),
      color: colors[name] || '#6458f5',
      statusCounts: [
        { label: 'selesai', count: pt.filter(t => t.status === 'done').length, color: '#10B981' },
        { label: 'proses',  count: pt.filter(t => t.status === 'doing').length, color: '#6458f5' },
        { label: 'belum',   count: pt.filter(t => t.status === 'todo').length, color: '#9CA3AF' },
        { label: 'revisi',  count: pt.filter(t => t.status === 'revision').length, color: '#EF4444' },
      ].filter(s => s.count > 0)
    }
  })
})

const upcomingDeadlines = computed(() => {
  const today = new Date()
  return tasks
    .filter(t => t.status !== 'done')
    .map(t => {
      const dl = new Date(t.deadline)
      const diff = Math.ceil((dl.getTime() - today.getTime()) / 86400000)
      const urgency = diff <= 1 ? 'critical' : diff <= 4 ? 'warning' : 'normal'
      const remaining = diff < 0 ? 'Terlambat' : diff === 0 ? 'Hari ini' : `${diff} hari`
      return { id: t.id, name: t.name, project: t.project, date: dl.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), remaining, urgency }
    })
    .sort((a, b) => new Date(tasks.find(t=>t.id===a.id)!.deadline).getTime() - new Date(tasks.find(t=>t.id===b.id)!.deadline).getTime())
    .slice(0, 5)
})

const priorityDistribution = computed(() => [
  { level: 'critical', label: 'Critical', color: '#EF4444', count: tasks.filter(t=>t.priority==='critical').length },
  { level: 'high',     label: 'High',     color: '#F59E0B', count: tasks.filter(t=>t.priority==='high').length },
  { level: 'medium',   label: 'Medium',   color: '#6458f5', count: tasks.filter(t=>t.priority==='medium').length },
  { level: 'low',      label: 'Low',      color: '#9CA3AF', count: tasks.filter(t=>t.priority==='low').length },
])

function toggleExpand(id: number) {
  expandedTask.value = expandedTask.value === id ? null : id
}

function cycleStatus(id: number) {
  const task = tasks.find(t => t.id === id)
  if (!task) return
  const idx = statusOrder.indexOf(task.status)
  task.status = statusOrder[(idx + 1) % statusOrder.length]
  if (task.status === 'done') task.progress = 100
  else if (task.status === 'todo') task.progress = 0
}

function deleteTask(id: number) {
  const idx = tasks.findIndex(t => t.id === id)
  if (idx !== -1) { tasks.splice(idx, 1); expandedTask.value = null }
}

function addTask() {
  if (!newTask.name) return
  tasks.push({
    id: Date.now(),
    name: newTask.name, description: newTask.description,
    project: newTask.project, category: newTask.category || 'Lainnya',
    status: 'todo', priority: newTask.priority as any,
    deadline: newTask.deadline || new Date().toISOString().slice(0, 10),
    progress: 0, estimate: newTask.estimate || '-',
    sprint: newTask.sprint, assignee: newTask.assignee, tags: []
  })
  Object.assign(newTask, { name: '', description: '', project: 'ThreadMark', category: '', priority: 'medium', deadline: '', estimate: '', sprint: 4 })
  showAddModal.value = false
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function deadlineClass(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000)
  if (diff < 0) return 'dl-overdue'
  if (diff <= 1) return 'dl-critical'
  if (diff <= 4) return 'dl-warning'
  return 'dl-normal'
}
</script>

<style scoped>
.task-page {
  display: flex;
  min-height: 100vh;
  background: #F8F9FD;
  font-family: 'Instrument Sans', 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow-x: hidden;
}

.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.ambient-tl { top: -5%;  left: -5%;  width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.ambient-tr { top: 0;    right: -5%; width: 25%; height: 25%; background: radial-gradient(circle, rgba(165,180,252,.05), transparent 70%); }
.ambient-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }
.bg-grid {
  pointer-events: none; position: fixed; inset: 0; z-index: 0;
  background-image: linear-gradient(to right, rgba(100,88,245,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,88,245,.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}

.main-wrap {
  margin-left: 260px; flex: 1; min-width: 0;
  position: relative; z-index: 10;
  display: flex; flex-direction: column;
}

.topbar {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(248,249,253,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.topbar-toggle { display: none; background: none; border: none; cursor: pointer; padding: .375rem; border-radius: 8px; color: #374151; transition: background .2s; }
.topbar-toggle:hover { background: rgba(0,0,0,.06); }
.topbar-toggle svg { width: 20px; height: 20px; }
.topbar-greeting { flex: 1; }
.greeting-title { font-size: 1.0625rem; font-weight: 600; color: #111827; letter-spacing: -.02em; margin: 0; }
.greeting-sub { font-size: .8125rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-actions { display: flex; gap: .5rem; }
.action-btn {
  width: 40px; height: 40px; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #6B7280; transition: all .2s;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.action-btn:hover { border-color: #6458f5; color: #6458f5; background: rgba(100,88,245,.04); }
.action-btn svg { width: 18px; height: 18px; }

.task-content { padding: 2rem 2rem 3rem; }

.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1rem; margin-bottom: 1.5rem;
}
.stat-card {
  background: #fff; border: 1px solid #E9EBF4; border-radius: 14px;
  padding: 1.125rem 1.25rem;
  display: flex; align-items: center; gap: 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,.04);
  transition: box-shadow .2s, transform .2s;
}
.stat-card:hover { box-shadow: 0 4px 16px rgba(100,88,245,.08); transform: translateY(-1px); }
.stat-icon-wrap { width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.stat-icon-wrap :deep(svg) { width: 20px; height: 20px; }
.stat-data { flex: 1; }
.stat-value { display: block; font-size: 1.375rem; font-weight: 800; color: #111827; letter-spacing: -.03em; line-height: 1; }
.stat-label { display: block; font-size: .75rem; color: #9CA3AF; margin-top: .25rem; font-weight: 500; }
.stat-trend { font-size: .6875rem; font-weight: 600; white-space: nowrap; }
.stat-trend.up      { color: #10B981; }
.stat-trend.warn    { color: #EF4444; }
.stat-trend.neutral { color: #9CA3AF; }

.layout-grid { display: grid; grid-template-columns: 1fr 320px; gap: 1.25rem; align-items: start; }

.card {
  background: #fff; border: 1px solid #E9EBF4; border-radius: 16px;
  padding: 1.5rem; box-shadow: 0 1px 8px rgba(0,0,0,.04);
}
.card-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap;
}
.header-left { display: flex; flex-direction: column; gap: .875rem; flex: 1; min-width: 0; }
.header-right { display: flex; gap: .625rem; align-items: center; flex-shrink: 0; }

.section-badge {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
  padding: .3rem .75rem; border-radius: 9999px;
}
.badge-purple { background: rgba(100,88,245,.08); color: #6458f5; }
.badge-green  { background: rgba(16,185,129,.08);  color: #059669; }
.badge-orange { background: rgba(245,158,11,.08);  color: #D97706; }
.badge-indigo { background: rgba(99,102,241,.08);  color: #4F46E5; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; flex-shrink: 0; }

.filter-tabs { display: flex; gap: .375rem; flex-wrap: wrap; }
.filter-tab {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .375rem .75rem; border-radius: 9px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .75rem; font-weight: 600; color: #6B7280;
  cursor: pointer; transition: all .15s;
}
.filter-tab:hover { border-color: #6458f5; color: #6458f5; }
.filter-tab.active { background: rgba(100,88,245,.08); border-color: rgba(100,88,245,.25); color: #6458f5; }
.filter-count {
  font-size: .625rem; font-weight: 800; min-width: 18px; height: 18px;
  border-radius: 9px; background: #F3F4F6; color: #6B7280;
  display: inline-flex; align-items: center; justify-content: center; padding: 0 .3rem;
}
.filter-tab.active .filter-count { background: rgba(100,88,245,.15); color: #6458f5; }

.search-wrap {
  position: relative; display: flex; align-items: center;
}
.search-wrap svg { position: absolute; left: .625rem; width: 14px; height: 14px; color: #9CA3AF; }
.search-input {
  padding: .5rem .75rem .5rem 2rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .8125rem; color: #111827; outline: none;
  transition: border-color .2s; width: 180px; font-family: inherit;
}
.search-input:focus { border-color: #6458f5; background: #fff; }
.search-input::placeholder { color: #9CA3AF; }

.sort-select {
  padding: .5rem .875rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .8125rem; color: #374151; outline: none;
  cursor: pointer; transition: border-color .2s; font-family: inherit;
}
.sort-select:focus { border-color: #6458f5; }

.task-list { display: flex; flex-direction: column; gap: .5rem; }

.task-item {
  border: 1px solid #E9EBF4; border-radius: 12px;
  border-left: 3px solid #E9EBF4;
  overflow: hidden; transition: all .2s; cursor: pointer;
  background: #FAFAFA;
}
.task-item:hover { border-color: #DDE0F0; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
.task-item.expanded { border-color: rgba(100,88,245,.2); box-shadow: 0 4px 16px rgba(100,88,245,.08); }
.task-item.status-done { background: #FAFAFA; opacity: .8; }
.task-item.priority-critical { border-left-color: #EF4444; }
.task-item.priority-high     { border-left-color: #F59E0B; }
.task-item.priority-medium   { border-left-color: #6458f5; }
.task-item.priority-low      { border-left-color: #9CA3AF; }

.task-main { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: .875rem 1rem; }
.task-left { display: flex; align-items: center; gap: .875rem; flex: 1; min-width: 0; }

.status-btn {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border: none; cursor: pointer; transition: all .15s;
}
.status-btn :deep(svg) { width: 14px; height: 14px; }
.btn-todo     { background: #F3F4F6; color: #9CA3AF; }
.btn-todo:hover { background: #E5E7EB; color: #6B7280; }
.btn-doing    { background: rgba(100,88,245,.1); color: #6458f5; }
.btn-doing:hover { background: rgba(100,88,245,.18); }
.btn-revision { background: rgba(239,68,68,.1); color: #DC2626; }
.btn-revision:hover { background: rgba(239,68,68,.18); }
.btn-done     { background: rgba(16,185,129,.1); color: #059669; }
.btn-done:hover { background: rgba(16,185,129,.18); }

.task-info { flex: 1; min-width: 0; }
.task-title-row { display: flex; align-items: center; gap: .5rem; margin-bottom: .2rem; }
.task-name { font-size: .875rem; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.task-name.line-through { text-decoration: line-through; color: #9CA3AF; }
.priority-pip {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
}
.pip-critical { background: #EF4444; }
.pip-high     { background: #F59E0B; }
.pip-medium   { background: #6458f5; }
.pip-low      { background: #9CA3AF; }

.task-meta-row { display: flex; align-items: center; gap: .5rem; }
.task-project { font-size: .6875rem; font-weight: 600; color: #6458f5; background: rgba(100,88,245,.07); padding: .1rem .45rem; border-radius: 5px; }
.task-category { font-size: .6875rem; color: #9CA3AF; font-weight: 500; }

.task-right { display: flex; align-items: center; gap: .625rem; flex-shrink: 0; }
.status-pill {
  font-size: .6875rem; font-weight: 700; padding: .25rem .6rem;
  border-radius: 9999px; white-space: nowrap;
}
.pill-todo     { background: #F3F4F6; color: #6B7280; }
.pill-doing    { background: rgba(100,88,245,.08); color: #6458f5; }
.pill-revision { background: rgba(239,68,68,.08); color: #DC2626; }
.pill-done     { background: rgba(16,185,129,.08); color: #059669; }

.deadline-badge {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .6875rem; font-weight: 600; padding: .25rem .55rem;
  border-radius: 7px; white-space: nowrap;
}
.deadline-badge svg { width: 10px; height: 10px; flex-shrink: 0; }
.dl-normal   { background: #F3F4F6; color: #6B7280; }
.dl-warning  { background: rgba(245,158,11,.08); color: #D97706; }
.dl-critical { background: rgba(239,68,68,.08); color: #DC2626; }
.dl-overdue  { background: rgba(239,68,68,.15); color: #B91C1C; }

.expand-btn {
  width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer; color: #9CA3AF;
  transition: all .2s;
}
.expand-btn svg { width: 14px; height: 14px; transition: transform .2s; }
.expand-btn.rotated svg { transform: rotate(180deg); }
.expand-btn:hover { background: #F3F4F6; color: #374151; }

.task-detail {
  padding: 1rem 1.25rem 1.25rem;
  border-top: 1px solid #F3F4F6;
  background: #fff;
}
.task-desc { font-size: .875rem; color: #374151; line-height: 1.65; margin: 0 0 1rem; }

.task-detail-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: .75rem; margin-bottom: 1rem;
}
.detail-item { background: #F9FAFB; border-radius: 9px; padding: .625rem .75rem; }
.detail-label { display: block; font-size: .625rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9CA3AF; margin-bottom: .25rem; }
.detail-value { display: block; font-size: .8125rem; font-weight: 600; color: #374151; }
.priority-val.pval-critical { color: #DC2626; }
.priority-val.pval-high     { color: #D97706; }
.priority-val.pval-medium   { color: #6458f5; }
.priority-val.pval-low      { color: #9CA3AF; }

.task-progress-wrap { margin-bottom: 1rem; }
.task-progress-labels { display: flex; justify-content: space-between; font-size: .75rem; font-weight: 600; color: #6B7280; margin-bottom: .375rem; }
.task-progress-pct { color: #111827; }
.task-progress-bar { height: 6px; background: #F3F4F6; border-radius: 9999px; overflow: hidden; }
.task-progress-fill { height: 100%; border-radius: 9999px; transition: width .6s cubic-bezier(.4,0,.2,1); }
.fill-doing    { background: linear-gradient(90deg, #6458f5, #818cf8); }
.fill-revision { background: linear-gradient(90deg, #EF4444, #f87171); }
.fill-done     { background: linear-gradient(90deg, #10B981, #34D399); }
.fill-todo     { background: #E5E7EB; }

.task-tags { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: 1rem; }
.task-tag {
  font-size: .6875rem; font-weight: 600; padding: .2rem .55rem;
  border-radius: 6px; background: #F3F4F6; color: #4B5563; border: 1px solid #E5E7EB;
}

.task-actions { display: flex; gap: .75rem; justify-content: flex-end; padding-top: .875rem; border-top: 1px solid #F3F4F6; }
.btn-action {
  display: inline-flex; align-items: center; gap: .375rem;
  font-size: .8125rem; font-weight: 600; padding: .5rem 1rem; border-radius: 9px;
  border: none; cursor: pointer; transition: all .15s; font-family: inherit;
}
.btn-secondary { background: rgba(100,88,245,.08); color: #6458f5; }
.btn-secondary:hover { background: rgba(100,88,245,.15); }
.btn-danger { background: rgba(239,68,68,.07); color: #DC2626; }
.btn-danger:hover { background: rgba(239,68,68,.14); }

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 3rem; color: #9CA3AF; gap: .75rem; text-align: center;
}
.empty-state svg { width: 48px; height: 48px; opacity: .35; }
.empty-state p { font-size: .9375rem; }

.col-side { display: flex; flex-direction: column; gap: 1.25rem; }

.project-progress-list { display: flex; flex-direction: column; gap: 1.25rem; }
.proj-progress-item { display: flex; flex-direction: column; gap: .5rem; }
.proj-progress-header { display: flex; align-items: center; gap: .5rem; }
.proj-progress-icon { font-size: 1rem; line-height: 1; }
.proj-progress-name { font-size: .875rem; font-weight: 700; color: #111827; flex: 1; }
.proj-progress-pct { font-size: .875rem; font-weight: 800; color: #111827; }
.proj-bar-wrap { height: 6px; background: #F3F4F6; border-radius: 9999px; overflow: hidden; }
.proj-bar-fill { height: 100%; border-radius: 9999px; transition: width .6s cubic-bezier(.4,0,.2,1); }
.proj-progress-counts { display: flex; flex-wrap: wrap; gap: .5rem; }
.proj-count-item { display: flex; align-items: center; gap: .3rem; font-size: .6875rem; color: #6B7280; font-weight: 500; }
.proj-count-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

.deadline-list { list-style: none; display: flex; flex-direction: column; gap: .625rem; }
.deadline-item { display: flex; align-items: center; gap: .75rem; padding: .75rem .875rem; border-radius: 11px; background: #FAFAFA; border: 1px solid #E9EBF4; }
.dl-urgency-bar { width: 3px; height: 32px; border-radius: 9999px; flex-shrink: 0; }
.urgency-critical .dl-urgency-bar { background: #EF4444; }
.urgency-warning  .dl-urgency-bar { background: #F59E0B; }
.urgency-normal   .dl-urgency-bar { background: #10B981; }
.dl-info { flex: 1; min-width: 0; }
.dl-name { display: block; font-size: .8125rem; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dl-project { display: block; font-size: .6875rem; color: #9CA3AF; margin-top: .1rem; }
.dl-right { text-align: right; flex-shrink: 0; }
.dl-date { display: block; font-size: .8125rem; font-weight: 600; color: #374151; }
.dl-remaining { display: block; font-size: .6875rem; font-weight: 700; margin-top: .1rem; }
.remaining-critical { color: #EF4444; }
.remaining-warning  { color: #F59E0B; }
.remaining-normal   { color: #10B981; }

.priority-dist-list { display: flex; flex-direction: column; gap: .75rem; }
.priority-dist-item { display: flex; align-items: center; gap: .75rem; }
.priority-dist-label { display: flex; align-items: center; gap: .4rem; width: 80px; flex-shrink: 0; }
.priority-dist-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.priority-dist-name { font-size: .75rem; font-weight: 600; color: #374151; }
.priority-dist-bar-wrap { flex: 1; height: 6px; background: #F3F4F6; border-radius: 9999px; overflow: hidden; }
.priority-dist-bar { height: 100%; border-radius: 9999px; transition: width .6s cubic-bezier(.4,0,.2,1); }
.priority-dist-count { font-size: .8125rem; font-weight: 800; color: #111827; width: 20px; text-align: right; flex-shrink: 0; }

.modal-overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,.35); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.modal {
  background: #fff; border-radius: 20px; width: 100%; max-width: 560px;
  box-shadow: 0 24px 64px rgba(0,0,0,.16); overflow: hidden;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 1.75rem 0;
}
.modal-title { font-size: 1.0625rem; font-weight: 700; color: #111827; margin: 0; }
.modal-close {
  width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
  background: #F3F4F6; border: none; cursor: pointer; color: #6B7280; transition: all .15s;
}
.modal-close:hover { background: #E5E7EB; color: #374151; }
.modal-close svg { width: 14px; height: 14px; }
.modal-body { padding: 1.25rem 1.75rem; display: flex; flex-direction: column; gap: 1rem; max-height: 65vh; overflow-y: auto; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: .75rem;
  padding: 1rem 1.75rem 1.5rem;
  border-top: 1px solid #F3F4F6;
}
.btn-modal-cancel {
  padding: .625rem 1.25rem; border-radius: 10px; border: 1.5px solid #E5E7EB;
  background: #fff; font-size: .875rem; font-weight: 600; color: #6B7280;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.btn-modal-cancel:hover { border-color: #9CA3AF; color: #374151; }
.btn-modal-submit {
  padding: .625rem 1.5rem; border-radius: 10px; border: none;
  background: #6458f5; color: #fff; font-size: .875rem; font-weight: 700;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.btn-modal-submit:hover { background: #5348e0; }
.btn-modal-submit:disabled { opacity: .45; cursor: not-allowed; }

.form-group { display: flex; flex-direction: column; gap: .4rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: .875rem; }
.form-label { font-size: .75rem; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .04em; }
.form-input,
.form-select,
.form-textarea {
  padding: .625rem .875rem; border-radius: 10px;
  border: 1.5px solid #E5E7EB; background: #FAFAFA;
  font-size: .875rem; color: #111827; outline: none;
  transition: border-color .2s; font-family: inherit;
}
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #6458f5; background: #fff; }
.form-input::placeholder, .form-textarea::placeholder { color: #9CA3AF; }
.form-textarea { resize: vertical; }

.sidebar-overlay { position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,.5); backdrop-filter: blur(2px); }

.task-fade-enter-active, .task-fade-leave-active { transition: all .2s; }
.task-fade-enter-from, .task-fade-leave-to { opacity: 0; transform: translateY(-4px); }

.expand-enter-active, .expand-leave-active { transition: all .2s cubic-bezier(.4,0,.2,1); }
.expand-enter-from, .expand-leave-to { opacity: 0; transform: translateY(-6px); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: all .25s cubic-bezier(.4,0,.2,1); }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal, .modal-fade-leave-to .modal { transform: scale(.96) translateY(8px); }

@media (max-width: 1280px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .layout-grid { grid-template-columns: 1fr; }
  .col-side { display: grid; grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar { padding: .875rem 1.25rem; }
  .topbar-toggle { display: flex; }
  .task-content { padding: 1.25rem 1.25rem 2.5rem; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .task-detail-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .stats-row { grid-template-columns: 1fr; }
  .col-side { grid-template-columns: 1fr; }
  .task-right { gap: .375rem; }
  .deadline-badge { display: none; }
  .form-row { grid-template-columns: 1fr; }
  .task-detail-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>