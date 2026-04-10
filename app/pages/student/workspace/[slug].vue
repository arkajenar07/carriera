<template>
  <div class="ws-page">

    <!-- ── Ambient ── -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient a-tl"></div>
      <div class="ambient a-tr"></div>
      <div class="ambient a-br"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <StudentSidebar />

    <div class="main-wrap">

      <!-- ─── TOPBAR ─── -->
      <header class="topbar">
        <button class="topbar-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="topbar-left">
          <nav class="breadcrumb">
            <NuxtLink to="/student/workspace" class="bc-link">Projects</NuxtLink>
            <span class="bc-sep">/</span>
            <span class="bc-current">{{ project.name }}</span>
          </nav>
          <div class="title-row">
            <div class="proj-logo" :style="{ background: project.color }">{{ project.initials }}</div>
            <div>
              <h1 class="page-title">{{ project.name }}</h1>
              <p class="page-sub">{{ project.client }} · Sprint {{ project.sprint }}/{{ project.totalSprints }}</p>
            </div>
          </div>
        </div>
        <div class="topbar-right">
          <span class="status-pill" :class="`sp-${project.status}`">
            <span class="sp-dot"></span>
            {{ statusLabels[project.status] }}
          </span>
        </div>
      </header>

      <!-- ─── TABS ─── -->
      <nav class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon" v-html="tab.icon"></span>
          {{ tab.label }}
          <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
        </button>
      </nav>

      <!-- ─── TAB CONTENT ─── -->
      <main class="ws-content">

        <!-- ════════════════════════════════════════
             TAB: BOARD (Kanban)
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'board'" class="tab-panel">
          <div class="board-header">
            <div class="bh-left">
              <h2 class="section-title">Kanban Board</h2>
              <span class="bh-sub">Sprint {{ project.sprint }} — drag & manage tiket kamu</span>
            </div>
            <div class="bh-right">
              <div class="bh-search">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>
                <input type="text" v-model="boardSearch" placeholder="Cari tiket..." />
              </div>
              <button class="btn-add" @click="showAddTicket = true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>
                Tiket Baru
              </button>
            </div>
          </div>

          <div class="kanban">
            <div
              v-for="col in kanbanColumns"
              :key="col.id"
              class="kb-col"
              @dragover.prevent
              @drop="onDrop($event, col.id)"
            >
              <div class="kb-col-head" :style="{ '--col-color': col.color }">
                <span class="kb-col-dot" :style="{ background: col.color }"></span>
                <span class="kb-col-title">{{ col.label }}</span>
                <span class="kb-col-count">{{ ticketsByCol(col.id).length }}</span>
              </div>

              <div class="kb-col-body">
                <TransitionGroup name="ticket-move">
                  <div
                    v-for="ticket in searchedTickets(col.id)"
                    :key="ticket.id"
                    class="kb-ticket"
                    :class="[`pri-${ticket.priority}`, { 'tk-expanded': expandedTicket === ticket.id }]"
                    draggable="true"
                    @dragstart="onDragStart($event, ticket)"
                    @click="toggleTicket(ticket.id)"
                  >
                    <!-- Priority bar -->
                    <div class="tk-pri-bar" :class="`tkpb-${ticket.priority}`"></div>

                    <div class="tk-header">
                      <span class="tk-id">{{ ticket.code }}</span>
                      <span class="tk-pri-chip" :class="`tkpc-${ticket.priority}`">{{ ticket.priority }}</span>
                    </div>

                    <h4 class="tk-name">{{ ticket.name }}</h4>
                    <p class="tk-desc" v-if="ticket.desc">{{ ticket.desc }}</p>

                    <!-- Tags -->
                    <div class="tk-tags">
                      <span v-for="t in ticket.tags" :key="t" class="tk-tag">{{ t }}</span>
                    </div>

                    <!-- Footer -->
                    <div class="tk-footer">
                      <div class="tk-assignee" :title="ticket.assignee">
                        <div class="tk-av" :style="{ background: ticket.avColor }">{{ ticket.avInit }}</div>
                        <span>{{ ticket.assignee.split(' ')[0] }}</span>
                      </div>
                      <div class="tk-info-row">
                        <span v-if="ticket.comments" class="tk-comments">
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 8a1 1 0 01-1 1H4l-2 2V2a1 1 0 011-1h7a1 1 0 011 1z"/></svg>
                          {{ ticket.comments }}
                        </span>
                        <span v-if="ticket.attachments" class="tk-attachments">
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 7a2.5 2.5 0 01-5 0V3.5a1.5 1.5 0 013 0V7a.5.5 0 01-1 0V4"/></svg>
                          {{ ticket.attachments }}
                        </span>
                      </div>
                    </div>

                    <!-- Expanded detail -->
                    <Transition name="expand">
                      <div v-if="expandedTicket === ticket.id" class="tk-expand" @click.stop>
                        <div class="tk-detail-grid">
                          <div class="tk-detail-item">
                            <span class="tdi-label">Estimasi</span>
                            <span class="tdi-value">{{ ticket.estimate }}</span>
                          </div>
                          <div class="tk-detail-item">
                            <span class="tdi-label">Deadline</span>
                            <span class="tdi-value">{{ ticket.deadline }}</span>
                          </div>
                          <div class="tk-detail-item">
                            <span class="tdi-label">Sprint</span>
                            <span class="tdi-value">Sprint {{ ticket.sprint }}</span>
                          </div>
                          <div class="tk-detail-item">
                            <span class="tdi-label">Progress</span>
                            <span class="tdi-value">{{ ticket.progress }}%</span>
                          </div>
                        </div>
                        <div class="tk-progress-bar">
                          <div class="tk-prog-fill" :style="{ width: ticket.progress + '%' }"></div>
                        </div>
                        <div class="tk-actions">
                          <button class="tk-act-btn" @click.stop="moveTicket(ticket, 'left')">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6H3M5 3L3 6l2 3"/></svg>
                          </button>
                          <button class="tk-act-btn" @click.stop="moveTicket(ticket, 'right')">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h6M7 3l2 3-2 3"/></svg>
                          </button>
                          <button class="tk-act-btn tk-act-delete" @click.stop="deleteTicket(ticket.id)">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </TransitionGroup>

                <!-- Empty column -->
                <div v-if="searchedTickets(col.id).length === 0" class="kb-empty">
                  Tidak ada tiket
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             TAB: OVERVIEW (Brief)
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'overview'" class="tab-panel">
          <div class="overview-grid">
            <!-- Left: Brief -->
            <div class="ov-main">
              <section class="card">
                <div class="card-hd">
                  <div class="card-hd-left">
                    <div class="section-badge badge-slate">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h6M5 8h6M5 11h3"/></svg>
                      Client Brief
                    </div>
                    <h2 class="card-title">Sprint {{ project.sprint }}: {{ project.sprintTitle }}</h2>
                  </div>
                  <button class="btn-outline btn-sm">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 10v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3"/><polyline points="5 7 8 10 11 7"/><line x1="8" y1="10" x2="8" y2="2"/></svg>
                    Download PRD
                  </button>
                </div>
                <div class="brief-body">
                  <div v-for="b in briefBlocks" :key="b.id" class="brief-block">
                    <div class="bb-head"><span class="bb-num">{{ b.id }}</span><h4>{{ b.title }}</h4></div>
                    <div class="bb-text" v-html="b.html"></div>
                  </div>
                </div>
                <div class="tech-row">
                  <span class="tech-label">Stack:</span>
                  <span v-for="t in project.techStack" :key="t" class="tech-tag">{{ t }}</span>
                </div>
              </section>

              <!-- Deliverables -->
              <section class="card mt-md">
                <div class="card-hd">
                  <div class="card-hd-left">
                    <div class="section-badge badge-indigo">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5,8 7,10 11,5"/><rect x="1" y="2" width="14" height="12" rx="2"/></svg>
                      Deliverables
                    </div>
                    <h2 class="card-title">Sprint Requirements</h2>
                  </div>
                  <div class="completion-chip">{{ completedDeliverables }}/{{ deliverables.length }} selesai</div>
                </div>
                <div class="del-list">
                  <label v-for="d in deliverables" :key="d.id" class="del-item" :class="{ 'del-done': d.done }">
                    <div class="del-cb-wrap">
                      <input type="checkbox" v-model="d.done" />
                      <div class="del-cb"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    </div>
                    <div class="del-info">
                      <span class="del-name">{{ d.name }}</span>
                      <span class="del-desc" v-if="d.desc">{{ d.desc }}</span>
                    </div>
                    <span class="del-type" :class="`dt-${d.type.toLowerCase()}`">{{ d.type }}</span>
                  </label>
                </div>
              </section>
            </div>

            <!-- Right: Status + Team -->
            <div class="ov-side">
              <!-- Status / Progress -->
              <div class="card side-card">
                <div class="card-hd"><div class="section-badge badge-purple">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1"/></svg>
                  Status Proyek
                </div></div>
                <div class="ps-body">
                  <div class="ps-ring-wrap">
                    <svg class="ps-ring" viewBox="0 0 80 80">
                      <circle class="ps-ring-track" cx="40" cy="40" r="30" fill="none" stroke-width="8"/>
                      <circle class="ps-ring-fill" cx="40" cy="40" r="30" fill="none" stroke-width="8"
                        :stroke-dasharray="`${project.progress * 1.885} ${188.5}`" stroke-dashoffset="47"/>
                    </svg>
                    <div class="ps-ring-center">
                      <span class="ps-ring-pct">{{ project.progress }}%</span>
                      <span class="ps-ring-lbl">Progress</span>
                    </div>
                  </div>
                  <div class="ps-stat-row">
                    <div class="ps-stat"><span class="ps-sv text-green">{{ completedDeliverables }}</span><span class="ps-sl">Selesai</span></div>
                    <div class="ps-stat"><span class="ps-sv text-yellow">{{ deliverables.filter(d => !d.done).length }}</span><span class="ps-sl">Pending</span></div>
                    <div class="ps-stat"><span class="ps-sv text-red">{{ project.revisionCount }}</span><span class="ps-sl">Revisi</span></div>
                  </div>
                </div>
              </div>

              <!-- Team -->
              <div class="card side-card">
                <div class="card-hd"><div class="section-badge badge-indigo">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="5" r="3"/><path d="M2 14v-1a4 4 0 014-4h0"/><circle cx="12" cy="6" r="2"/><path d="M16 14v-1a3 3 0 00-3-3"/></svg>
                  Tim Proyek
                </div></div>
                <div class="team-list">
                  <div v-for="m in project.team" :key="m.init" class="team-member">
                    <div class="tm-av" :style="{ background: m.bg }">{{ m.init }}</div>
                    <div class="tm-info">
                      <span class="tm-name">{{ m.name }}</span>
                      <span class="tm-role">{{ m.role }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             TAB: TIMELINE (Milestones)
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'timeline'" class="tab-panel">
          <div class="section-header">
            <h2 class="section-title">Sprint {{ project.sprint }} Timeline</h2>
            <span class="sh-sub">Deadline: <strong class="text-red">{{ project.deadline }}</strong></span>
          </div>

          <div class="ms-timeline">
            <div v-for="(ms, idx) in milestones" :key="ms.id" class="ms-item" :class="[`ms-${ms.status}`, { 'ms-last': idx === milestones.length - 1 }]">
              <div class="ms-track">
                <div class="ms-dot" :class="`msd-${ms.status}`">
                  <svg v-if="ms.status === 'done'" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                  <svg v-else-if="ms.status === 'active'" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/></svg>
                </div>
                <div class="ms-line" v-if="idx < milestones.length - 1"></div>
              </div>
              <div class="ms-body">
                <div class="ms-head"><span class="ms-title">{{ ms.title }}</span><span class="ms-date">{{ ms.date }}</span></div>
                <p class="ms-desc">{{ ms.desc }}</p>
                <div class="ms-tags"><span v-for="t in ms.tags" :key="t" class="ms-tag">{{ t }}</span></div>
                <span class="ms-chip" :class="`msc-${ms.status}`">{{ msLabels[ms.status] }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             TAB: FILES (Submission & History)
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'files'" class="tab-panel">
          <div class="files-grid">
            <!-- Submission Form -->
            <div class="f-main">
              <section class="card" :class="{ 'card-revision': project.status === 'revision' }">
                <div class="card-hd">
                  <div class="card-hd-left">
                    <div class="section-badge" :class="project.status === 'revision' ? 'badge-red' : 'badge-green'">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l4-4 4 4M7 5v8"/><rect x="1" y="1" width="14" height="3" rx="1"/></svg>
                      {{ project.status === 'revision' ? '⚠️ Submit Revisi' : 'Kirim Hasil' }}
                    </div>
                    <h2 class="card-title">File Submission</h2>
                  </div>
                  <div class="deadline-chip" :class="{ 'dlc-urgent': urgentDeadline }">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3l2 1"/></svg>
                    {{ project.deadline }}
                  </div>
                </div>

                <div v-if="project.status === 'revision'" class="rev-notice">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="8"/><line x1="10" y1="7" x2="10" y2="10"/><line x1="10" y1="13" x2="10.01" y2="13"/></svg>
                  <div><strong>Revisi diperlukan</strong><p>Perbaiki poin feedback di thread sebelum submit ulang.</p></div>
                </div>

                <div class="sub-form">
                  <div class="form-2col">
                    <div class="field"><label class="field-lbl">Live URL / Preview</label><input type="url" class="f-input" v-model="submission.liveUrl" placeholder="https://project.vercel.app" /></div>
                    <div class="field"><label class="field-lbl">Repository URL</label><input type="url" class="f-input" v-model="submission.repoUrl" placeholder="https://github.com/..." /></div>
                  </div>
                  <div class="field mt-sm"><label class="field-lbl">Changelog / Catatan</label><textarea class="f-input f-textarea" rows="3" v-model="submission.note" placeholder="Apa yang sudah kamu kerjakan?"></textarea></div>
                  <div class="field mt-sm">
                    <label class="field-lbl">Attachment</label>
                    <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop" :class="{ 'dz-active': dragging }" @dragenter="dragging=true" @dragleave="dragging=false">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span>Drag & drop atau <label class="dz-pick">pilih file<input type="file" multiple @change="handleFiles" hidden /></label></span>
                    </div>
                    <div class="att-list" v-if="attachments.length">
                      <div v-for="(f, i) in attachments" :key="i" class="att-item">
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M8 1H4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V4z"/><polyline points="8,1 8,4 11,4"/></svg>
                        <span>{{ f.name }}</span>
                        <button @click="attachments.splice(i, 1)" class="att-del">×</button>
                      </div>
                    </div>
                  </div>
                  <div class="sub-actions">
                    <button class="btn-submit" :class="{ 'btn-rev': project.status === 'revision' }" @click="handleSubmit">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,5 8,13 4,9"/></svg>
                      {{ project.status === 'revision' ? 'Submit Revision' : 'Submit Deliverables' }}
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <!-- Revision History -->
            <div class="f-side">
              <div class="card side-card">
                <div class="card-hd">
                  <div class="section-badge badge-amber">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 8A6 6 0 112 8"/><polyline points="2,4 2,8 6,8"/></svg>
                    Revision History
                  </div>
                  <span class="rh-count">{{ revisionHistory.length }} revisi</span>
                </div>
                <div class="rh-list">
                  <div v-for="rev in revisionHistory" :key="rev.id" class="rh-item" :class="`rh-${rev.outcome}`">
                    <div class="rh-head">
                      <div class="rh-badge" :class="`rhb-${rev.outcome}`">
                        <svg v-if="rev.outcome === 'approved'" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                        <svg v-else viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="4"/><line x1="6" y1="4" x2="6" y2="6"/><line x1="6" y1="8" x2="6.01" y2="8"/></svg>
                      </div>
                      <div class="rh-info"><span class="rh-label">Submission #{{ rev.id }}</span><span class="rh-date">{{ rev.date }}</span></div>
                      <span class="rh-chip" :class="`rhc-${rev.outcome}`">{{ rev.outcomeLabel }}</span>
                    </div>
                    <p class="rh-note" v-if="rev.note">{{ rev.note }}</p>
                    <div class="rh-tags" v-if="rev.items">
                      <span v-for="item in rev.items" :key="item" class="rh-tag">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             TAB: THREAD (Feedback & Comments)
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'thread'" class="tab-panel">
          <div class="thread-layout">
            <div class="card thread-card">
              <div class="tc-hd">
                <div class="section-badge badge-indigo">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 10a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1h10a1 1 0 011 1z"/></svg>
                  Feedback Thread
                </div>
                <span class="tc-count">{{ thread.length }} pesan</span>
              </div>

              <div class="tc-body" ref="threadBody">
                <div class="timeline">
                  <div v-for="item in thread" :key="item.id" class="tl-item" :class="[`tl-${item.type}`, { 'tl-event': item.isEvent, 'tl-mine': item.isMine }]">
                    <div class="tl-line"></div>
                    <div v-if="!item.isEvent" class="tl-av" :style="{ background: item.avBg }">{{ item.avInit }}</div>
                    <div v-else class="tl-ev-icon" v-html="item.icon"></div>
                    <div class="tl-body">
                      <div class="tl-meta"><span class="tl-author" :class="{ 'tl-me': item.isMine }">{{ item.author }}</span><span class="tl-time">{{ item.time }}</span></div>
                      <div v-if="item.isEvent" class="tl-ev-text">{{ item.text }}</div>
                      <div v-else class="tl-msg" :class="{ 'tl-msg-rev': item.type === 'revision', 'tl-msg-ok': item.type === 'approved', 'tl-msg-mine': item.isMine }">
                        <div class="tl-text" v-html="item.text"></div>
                        <div v-if="item.type === 'revision'" class="tl-tag tlt-rev">⚠️ Revisi Diminta</div>
                        <div v-if="item.type === 'approved'" class="tl-tag tlt-ok">✓ Approved</div>
                        <div class="tl-reactions" v-if="item.reactions && item.reactions.length">
                          <span v-for="r in item.reactions" :key="r.emoji" class="tl-react" @click="r.count++">{{ r.emoji }} {{ r.count }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tc-input">
                <div class="chat-row">
                  <div class="chat-av">AJ</div>
                  <div class="chat-wrap">
                    <textarea class="chat-input" rows="2" v-model="newMsg" placeholder="Tanya ke reviewer / Lead Eng. / PM..." @keydown.enter.exact.prevent="sendMsg"></textarea>
                    <div class="chat-footer">
                      <span class="chat-hint">Enter = kirim</span>
                      <button class="btn-send" @click="sendMsg" :disabled="!newMsg.trim()">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="2" x2="9" y2="11"/><polygon points="18 2 12 18 9 11 2 8 18 2"/></svg>
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             TAB: MEETINGS
        ════════════════════════════════════════ -->
        <div v-if="activeTab === 'meeting'" class="tab-panel">

          <!-- Header -->
          <div class="meet-header">
            <div class="mh-left">
              <h2 class="section-title">Online Meetings 📹</h2>
              <span class="mh-sub">Semua sesi meeting wajib join selama sprint — dari Daily Standup hingga UAT.</span>
            </div>
            <div class="mh-right">
              <div class="meet-filter-tabs">
                <button v-for="f in meetFilters" :key="f.id" class="mftab" :class="{ active: meetFilter === f.id }" @click="meetFilter = f.id">{{ f.label }}</button>
              </div>
            </div>
          </div>

          <!-- Stats strip -->
          <div class="meet-stats">
            <div class="ms-card" v-for="s in meetStats" :key="s.label" :style="{ '--c': s.color }">
              <span class="msc-val">{{ s.value }}</span>
              <span class="msc-label">{{ s.label }}</span>
            </div>
          </div>

          <!-- Main grid: upcoming + past -->
          <div class="meet-grid">

            <!-- Left: Meeting List -->
            <div class="meet-main">
              <TransitionGroup name="card-pop" tag="div" class="meet-list">
                <div
                  v-for="mtg in filteredMeetings"
                  :key="mtg.id"
                  class="meet-card"
                  :class="[`mc-${mtg.type}`, `mc-status-${mtg.status}`, { 'mc-selected': selectedMeeting?.id === mtg.id }]"
                  @click="selectedMeeting = mtg"
                >
                  <!-- Left accent stripe -->
                  <div class="mc-stripe" :style="{ background: meetTypeColor[mtg.type] }"></div>

                  <div class="mc-body">
                    <div class="mc-top">
                      <div class="mc-icon-wrap" :style="{ background: meetTypeColor[mtg.type] + '18' }">
                        <span v-html="meetTypeIcon[mtg.type]"></span>
                      </div>
                      <div class="mc-info">
                        <div class="mc-title-row">
                          <h3 class="mc-title">{{ mtg.title }}</h3>
                          <span class="mc-type-chip" :style="{ background: meetTypeColor[mtg.type] + '18', color: meetTypeColor[mtg.type] }">{{ meetTypeLabel[mtg.type] }}</span>
                        </div>
                        <div class="mc-meta">
                          <span class="mc-datetime">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="1" y="2" width="10" height="9" rx="1"/><line x1="1" y1="5" x2="11" y2="5"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="8" y1="1" x2="8" y2="3"/></svg>
                            {{ mtg.date }} · {{ mtg.time }}
                          </span>
                          <span class="mc-duration">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1"/></svg>
                            {{ mtg.duration }}
                          </span>
                          <span class="mc-platform">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="1" y="2" width="10" height="8" rx="1"/><path d="M8 6l2-1.5v3L8 6z"/></svg>
                            {{ mtg.platform }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Participants -->
                    <div class="mc-participants">
                      <div class="mc-av-stack">
                        <div v-for="p in mtg.participants.slice(0, 4)" :key="p.init" class="mc-av" :style="{ background: p.bg }" :title="p.name">{{ p.init }}</div>
                        <div v-if="mtg.participants.length > 4" class="mc-av mc-av-more">+{{ mtg.participants.length - 4 }}</div>
                      </div>
                      <span class="mc-pcount">{{ mtg.participants.length }} peserta</span>
                    </div>

                    <!-- Status / Action -->
                    <div class="mc-footer">
                      <span class="mc-status-badge" :class="`msb-${mtg.status}`">
                        <span class="msb-dot"></span>
                        {{ meetStatusLabel[mtg.status] }}
                      </span>
                      <div class="mc-actions">
                        <button v-if="mtg.status === 'upcoming'" class="btn-join" :style="{ background: meetTypeColor[mtg.type] }" @click.stop="joinMeeting(mtg)">
                          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="9" height="8" rx="1"/><path d="M10 5.5l3-2v7l-3-2"/></svg>
                          Join Meeting
                        </button>
                        <button v-else-if="mtg.status === 'live'" class="btn-join btn-live" @click.stop="joinMeeting(mtg)">
                          <span class="live-dot"></span>
                          Live — Masuk Sekarang!
                        </button>
                        <button v-else class="btn-past" @click.stop="selectedMeeting = mtg">
                          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6A6 6 0 112 6"/><polyline points="2,2 2,6 6,6"/></svg>
                          Lihat Rekaman
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>

              <div v-if="filteredMeetings.length === 0" class="meet-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M15 7l4-2.5v9L15 11"/></svg>
                <p>Tidak ada meeting yang cocok</p>
              </div>
            </div>

            <!-- Right: Detail Panel -->
            <div class="meet-detail" v-if="selectedMeeting">
              <div class="card md-card">
                <!-- Header -->
                <div class="md-hd" :style="{ borderTopColor: meetTypeColor[selectedMeeting.type] }">
                  <div class="md-hd-icon" :style="{ background: meetTypeColor[selectedMeeting.type] + '15', color: meetTypeColor[selectedMeeting.type] }" v-html="meetTypeIcon[selectedMeeting.type]"></div>
                  <div class="md-hd-info">
                    <h3 class="md-title">{{ selectedMeeting.title }}</h3>
                    <span class="md-sub">{{ meetTypeLabel[selectedMeeting.type] }}</span>
                  </div>
                  <button class="md-close" @click="selectedMeeting = null">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg>
                  </button>
                </div>

                <!-- Info grid -->
                <div class="md-info-grid">
                  <div class="md-info-item">
                    <span class="md-info-label">Tanggal & Waktu</span>
                    <span class="md-info-val">{{ selectedMeeting.date }}, {{ selectedMeeting.time }}</span>
                  </div>
                  <div class="md-info-item">
                    <span class="md-info-label">Durasi</span>
                    <span class="md-info-val">{{ selectedMeeting.duration }}</span>
                  </div>
                  <div class="md-info-item">
                    <span class="md-info-label">Platform</span>
                    <span class="md-info-val">{{ selectedMeeting.platform }}</span>
                  </div>
                  <div class="md-info-item">
                    <span class="md-info-label">Fasilitator</span>
                    <span class="md-info-val">{{ selectedMeeting.facilitator }}</span>
                  </div>
                </div>

                <!-- Join link -->
                <div class="md-link-section" v-if="selectedMeeting.status !== 'past'">
                  <span class="md-link-label">Meeting Link</span>
                  <div class="md-link-box">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 6a4 4 0 00-4 4v2"/><path d="M6 6a4 4 0 014 4v2"/><circle cx="6" cy="4" r="2"/><circle cx="10" cy="4" r="2"/></svg>
                    <span class="md-link-url">{{ selectedMeeting.link }}</span>
                    <button class="md-copy" @click="copyLink(selectedMeeting.link)" title="Salin link">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="4" width="9" height="9" rx="1"/><path d="M2 10V3a1 1 0 011-1h7"/></svg>
                    </button>
                  </div>
                  <button class="btn-join-lg" :style="{ background: meetTypeColor[selectedMeeting.type] }" @click="joinMeeting(selectedMeeting)">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="10" height="10" rx="1"/><path d="M11 6.5l4-2.5v7l-4-2.5"/></svg>
                    {{ selectedMeeting.status === 'live' ? '🟢 Join Sekarang!' : 'Buka Meeting Room' }}
                  </button>
                </div>

                <!-- Agenda -->
                <div class="md-section">
                  <h4 class="md-section-title">📋 Agenda</h4>
                  <ol class="md-agenda">
                    <li v-for="(ag, i) in selectedMeeting.agenda" :key="i" class="md-agenda-item">
                      <span class="ag-num">{{ i + 1 }}</span>
                      <div class="ag-content">
                        <span class="ag-title">{{ ag.title }}</span>
                        <span class="ag-dur">{{ ag.dur }}</span>
                      </div>
                    </li>
                  </ol>
                </div>

                <!-- Participants -->
                <div class="md-section">
                  <h4 class="md-section-title">👥 Peserta ({{ selectedMeeting.participants.length }})</h4>
                  <div class="md-participants">
                    <div v-for="p in selectedMeeting.participants" :key="p.init" class="md-participant">
                      <div class="mdp-av" :style="{ background: p.bg }">{{ p.init }}</div>
                      <div class="mdp-info">
                        <span class="mdp-name">{{ p.name }}</span>
                        <span class="mdp-role">{{ p.role }}</span>
                      </div>
                      <span class="mdp-status" :class="{ 'mdps-confirmed': p.confirmed, 'mdps-pending': !p.confirmed }">
                        {{ p.confirmed ? '✓ Konfirmasi' : '? Pending' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Notes (for past meetings) -->
                <div class="md-section" v-if="selectedMeeting.status === 'past' && selectedMeeting.notes">
                  <h4 class="md-section-title">📝 Meeting Notes</h4>
                  <div class="md-notes" v-html="selectedMeeting.notes"></div>
                </div>

                <!-- Recording (for past meetings) -->
                <div class="md-section" v-if="selectedMeeting.status === 'past'">
                  <h4 class="md-section-title">🎬 Recording</h4>
                  <div class="md-recording">
                    <div class="mdr-thumb">
                      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="8" width="44" height="32" rx="3"/><polygon points="19,17 19,31 33,24" fill="currentColor" opacity=".3"/></svg>
                    </div>
                    <div class="mdr-info">
                      <span class="mdr-title">{{ selectedMeeting.title }} — Recording</span>
                      <span class="mdr-dur">{{ selectedMeeting.duration }}</span>
                      <a href="#" class="btn-outline btn-sm mdr-btn" @click.prevent>▶ Tonton Rekaman</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Empty detail state -->
            <div class="meet-detail meet-detail-empty" v-else>
              <div class="mde-placeholder">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="8" width="40" height="32" rx="3"/><path d="M32 18l6-4v20l-6-4"/><circle cx="17" cy="24" r="5"/><path d="M8 36s1-6 9-6 9 6 9 6"/></svg>
                <p>Pilih meeting<br>untuk lihat detail</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <!-- ADD TICKET MODAL -->
    <Transition name="modal-fade">
      <div v-if="showAddTicket" class="modal-overlay" @click.self="showAddTicket = false">
        <div class="modal">
          <div class="modal-hd">
            <h3>Buat Tiket Baru</h3>
            <button class="modal-close" @click="showAddTicket = false"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
          </div>
          <div class="modal-body">
            <div class="field"><label class="field-lbl">Nama Tiket</label><input type="text" class="f-input" v-model="newTicket.name" placeholder="[Feat] Checkout form..." /></div>
            <div class="field mt-sm"><label class="field-lbl">Deskripsi</label><textarea class="f-input f-textarea" rows="2" v-model="newTicket.desc" placeholder="Detail pekerjaan..."></textarea></div>
            <div class="form-2col mt-sm">
              <div class="field"><label class="field-lbl">Priority</label>
                <select class="f-input" v-model="newTicket.priority"><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
              </div>
              <div class="field"><label class="field-lbl">Estimasi</label><input type="text" class="f-input" v-model="newTicket.estimate" placeholder="2 jam" /></div>
            </div>
          </div>
          <div class="modal-ft">
            <button class="btn-cancel" @click="showAddTicket = false">Batal</button>
            <button class="btn-submit" @click="addTicket" :disabled="!newTicket.name">Tambah Tiket</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import StudentSidebar from '~/components/student/StudentSidebar.vue'

useSeoMeta({
  title: 'Workspace — Carriera Course',
  description: 'Simulasi ruang kerja project industri riil dengan kanban board.'
})
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const slug = route.params.slug as string

const sidebarOpen = ref(false)
const activeTab = ref('board')
const expandedTicket = ref<number | null>(null)
const showAddTicket = ref(false)
const boardSearch = ref('')
const threadBody = ref<HTMLElement | null>(null)
const newMsg = ref('')
const dragging = ref(false)

type ProjStatus = 'active' | 'revision' | 'review' | 'completed'
const statusLabels: Record<ProjStatus, string> = { active: 'In Progress', revision: 'Revisi', review: 'Under Review', completed: 'Selesai' }

/* ─── TABS ─── */
const tabs = [
  { id: 'board', label: 'Board',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="1" y="1" width="4" height="14" rx="1"/><rect x="6" y="1" width="4" height="10" rx="1"/><rect x="11" y="1" width="4" height="7" rx="1"/></svg>',
    badge: null },
  { id: 'overview', label: 'Overview',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h6M5 8h6M5 11h3"/></svg>',
    badge: null },
  { id: 'timeline', label: 'Timeline',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="4" cy="4" r="2"/><circle cx="4" cy="12" r="2"/><line x1="4" y1="6" x2="4" y2="10"/><path d="M6 4h6M6 12h6"/></svg>',
    badge: null },
  { id: 'files', label: 'Files',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 9l4-4 4 4M7 5v8"/><rect x="1" y="1" width="14" height="3" rx="1"/></svg>',
    badge: null },
  { id: 'thread', label: 'Thread',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 10a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1h10a1 1 0 011 1z"/></svg>',
    badge: '3' },
  { id: 'meeting', label: 'Meetings',
    icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="1" y="3" width="14" height="11" rx="2"/><path d="M11 7l3-2v6l-3-2"/><circle cx="5.5" cy="8.5" r="2.5"/><path d="M1 14s.5-3 4.5-3 4.5 3 4.5 3"/></svg>',
    badge: '2' },
]

/* ═══════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════ */
const allProjects: Record<string, any> = {
  threadmark: {
    name: 'ThreadMark E-Commerce',
    client: 'ThreadMark Streetwear',
    initials: 'TM',
    color: '#6458f5',
    status: 'revision' as ProjStatus,
    sprint: 4, totalSprints: 6,
    sprintTitle: 'Checkout Flow & Payment Integration',
    progress: 68,
    deadline: '14 Apr 2026',
    revisionCount: 1,
    techStack: ['Nuxt 3', 'Pinia', 'Supabase', 'Stripe API', 'Figma'],
    team: [
      { init: 'AJ', name: 'Arka Jenar',    role: 'Fullstack Dev', bg: 'linear-gradient(135deg,#1e293b,#475569)' },
      { init: 'RS', name: 'Rizky Satria',   role: 'Frontend Dev',  bg: 'linear-gradient(135deg,#6458f5,#818cf8)' },
      { init: 'DP', name: 'Dinda Putri',    role: 'UI/UX Designer', bg: 'linear-gradient(135deg,#EC4899,#F472B6)' },
      { init: 'MW', name: 'Maulana W.',     role: 'Backend Dev',   bg: 'linear-gradient(135deg,#059669,#34D399)' },
    ]
  },
  'kopikita-cms': {
    name: 'KopiKita CMS & Blog',
    client: 'KopiKita Coffee Co.',
    initials: 'KK', color: '#D97706',
    status: 'active' as ProjStatus,
    sprint: 2, totalSprints: 4,
    sprintTitle: 'Article Editor & Media Library',
    progress: 45, deadline: '28 Apr 2026', revisionCount: 0,
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TipTap'],
    team: [
      { init: 'AJ', name: 'Arka Jenar', role: 'Lead Dev', bg: 'linear-gradient(135deg,#1e293b,#475569)' },
      { init: 'FN', name: 'Farel Nugraha', role: 'Frontend', bg: 'linear-gradient(135deg,#D97706,#FBBF24)' },
    ]
  },
}

const fallbackProject = {
  name: 'Project', client: 'Client', initials: '??', color: '#9CA3AF',
  status: 'active' as ProjStatus, sprint: 1, totalSprints: 1, sprintTitle: '-',
  progress: 0, deadline: '-', revisionCount: 0, techStack: [], team: []
}

const project = reactive(allProjects[slug] || fallbackProject)

/* ═══════════════════════════════════════════
   KANBAN BOARD
═══════════════════════════════════════════ */
const kanbanColumns = [
  { id: 'backlog',  label: 'Backlog',     color: '#9CA3AF' },
  { id: 'todo',     label: 'To Do',       color: '#6458f5' },
  { id: 'doing',    label: 'In Progress', color: '#F59E0B' },
  { id: 'review',   label: 'Review',      color: '#8B5CF6' },
  { id: 'done',     label: 'Done',        color: '#10B981' },
]

interface Ticket {
  id: number; code: string; name: string; desc: string
  column: string; priority: string; tags: string[]
  assignee: string; avInit: string; avColor: string
  comments: number; attachments: number
  estimate: string; deadline: string; sprint: number; progress: number
}

const tickets = reactive<Ticket[]>([
  { id: 1, code: 'TM-001', name: 'Design System & Component Library', desc: 'Token warna, typography scale, komponen button/input/card untuk seluruh app.', column: 'done', priority: 'high', tags: ['UI/UX', 'Figma'], assignee: 'Dinda Putri', avInit: 'DP', avColor: 'linear-gradient(135deg,#EC4899,#F472B6)', comments: 4, attachments: 2, estimate: '3 hari', deadline: '7 Apr', sprint: 3, progress: 100 },
  { id: 2, code: 'TM-002', name: 'Auth Flow — Login & Register', desc: 'Implementasi login, register, password recovery dengan Supabase Auth. Validasi form lengkap.', column: 'done', priority: 'high', tags: ['Frontend', 'Supabase'], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)', comments: 6, attachments: 1, estimate: '2 hari', deadline: '5 Apr', sprint: 3, progress: 100 },
  { id: 3, code: 'TM-003', name: 'Product Listing & Filter API', desc: 'Endpoint GET /products dengan filter kategori, size, sort by price.', column: 'done', priority: 'high', tags: ['Backend', 'API'], assignee: 'Maulana W.', avInit: 'MW', avColor: 'linear-gradient(135deg,#059669,#34D399)', comments: 3, attachments: 0, estimate: '2 hari', deadline: '9 Apr', sprint: 3, progress: 100 },
  { id: 4, code: 'TM-004', name: 'Pinia Cart Store', desc: 'Add to cart, remove, quantity update, total calculation, localStorage persist.', column: 'done', priority: 'high', tags: ['Frontend', 'Pinia'], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)', comments: 2, attachments: 0, estimate: '1 hari', deadline: '10 Apr', sprint: 4, progress: 100 },
  { id: 5, code: 'TM-005', name: 'Stripe Elements Integration', desc: 'Embed Stripe CC form components. Gunakan Elements API untuk secure input.', column: 'done', priority: 'high', tags: ['Frontend', 'Stripe'], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)', comments: 3, attachments: 1, estimate: '2 hari', deadline: '11 Apr', sprint: 4, progress: 100 },
  { id: 6, code: 'TM-006', name: 'Orders & Webhook DB Table', desc: 'Migration untuk tabel orders, payment_events. Setup indexes & foreign keys.', column: 'done', priority: 'high', tags: ['Backend', 'DB'], assignee: 'Maulana W.', avInit: 'MW', avColor: 'linear-gradient(135deg,#059669,#34D399)', comments: 1, attachments: 0, estimate: '4 jam', deadline: '11 Apr', sprint: 4, progress: 100 },
  { id: 7, code: 'TM-007', name: 'Verify Payment Webhook API', desc: 'POST /api/webhook — verifikasi signature Stripe, update order status di DB.', column: 'doing', priority: 'critical', tags: ['Backend', 'Stripe', 'API'], assignee: 'Maulana W.', avInit: 'MW', avColor: 'linear-gradient(135deg,#059669,#34D399)', comments: 5, attachments: 0, estimate: '1 hari', deadline: '13 Apr', sprint: 4, progress: 60 },
  { id: 8, code: 'TM-008', name: 'Loading State on Payment', desc: 'Spinner & disable button selama proses payment untuk mencegah double charge.', column: 'todo', priority: 'critical', tags: ['Frontend', 'UX'], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)', comments: 2, attachments: 0, estimate: '3 jam', deadline: '13 Apr', sprint: 4, progress: 0 },
  { id: 9, code: 'TM-009', name: 'Clear Cart After Payment Success', desc: 'Hapus localStorage cart setelah redirect ke success page.', column: 'todo', priority: 'critical', tags: ['Frontend', 'Bug Fix'], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)', comments: 1, attachments: 0, estimate: '1 jam', deadline: '13 Apr', sprint: 4, progress: 0 },
  { id: 10, code: 'TM-010', name: 'Order Confirmation Email', desc: 'Template email receipt otomatis setelah pembayaran berhasil.', column: 'backlog', priority: 'medium', tags: ['Backend', 'Email'], assignee: 'Maulana W.', avInit: 'MW', avColor: 'linear-gradient(135deg,#059669,#34D399)', comments: 0, attachments: 0, estimate: '4 jam', deadline: '14 Apr', sprint: 4, progress: 0 },
  { id: 11, code: 'TM-011', name: 'Checkout Flow Prototype', desc: 'Hi-fi prototype di Figma: cart → address → payment → confirmation.', column: 'review', priority: 'high', tags: ['UI/UX', 'Figma'], assignee: 'Dinda Putri', avInit: 'DP', avColor: 'linear-gradient(135deg,#EC4899,#F472B6)', comments: 7, attachments: 3, estimate: '1 hari', deadline: '11 Apr', sprint: 4, progress: 90 },
  { id: 12, code: 'TM-012', name: 'Lighthouse Score ≥ 90', desc: 'Optimasi image, lazy load, chunk splitting. Target all green scores.', column: 'backlog', priority: 'medium', tags: ['QA', 'Performance'], assignee: 'Rizky Satria', avInit: 'RS', avColor: 'linear-gradient(135deg,#6458f5,#818cf8)', comments: 0, attachments: 0, estimate: '4 jam', deadline: '14 Apr', sprint: 4, progress: 0 },
  { id: 13, code: 'TM-013', name: 'Refactor Cart to Composable', desc: 'Pindahkan logic cart ke useCart() composable agar reusable.', column: 'doing', priority: 'medium', tags: ['Frontend', 'Refactor'], assignee: 'Rizky Satria', avInit: 'RS', avColor: 'linear-gradient(135deg,#6458f5,#818cf8)', comments: 2, attachments: 0, estimate: '3 jam', deadline: '13 Apr', sprint: 4, progress: 40 },
])

function ticketsByCol(colId: string) { return tickets.filter(t => t.column === colId) }
function searchedTickets(colId: string) {
  let list = ticketsByCol(colId)
  if (boardSearch.value) {
    const q = boardSearch.value.toLowerCase()
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q) || t.tags.some(tg => tg.toLowerCase().includes(q)))
  }
  return list
}

function toggleTicket(id: number) { expandedTicket.value = expandedTicket.value === id ? null : id }

let draggedTicket: Ticket | null = null
function onDragStart(e: DragEvent, ticket: Ticket) {
  draggedTicket = ticket
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(ticket.id))
  }
}
function onDrop(e: DragEvent, colId: string) {
  if (draggedTicket) {
    draggedTicket.column = colId
    if (colId === 'done') draggedTicket.progress = 100
    draggedTicket = null
  }
}

const colOrder = kanbanColumns.map(c => c.id)
function moveTicket(ticket: Ticket, dir: 'left' | 'right') {
  const idx = colOrder.indexOf(ticket.column)
  if (dir === 'left' && idx > 0) ticket.column = colOrder[idx - 1]
  if (dir === 'right' && idx < colOrder.length - 1) {
    ticket.column = colOrder[idx + 1]
    if (ticket.column === 'done') ticket.progress = 100
  }
}

function deleteTicket(id: number) {
  const idx = tickets.findIndex(t => t.id === id)
  if (idx !== -1) { tickets.splice(idx, 1); expandedTicket.value = null }
}

const newTicket = reactive({ name: '', desc: '', priority: 'medium', estimate: '' })
function addTicket() {
  if (!newTicket.name) return
  tickets.push({
    id: Date.now(), code: `TM-${String(tickets.length + 1).padStart(3, '0')}`,
    name: newTicket.name, desc: newTicket.desc,
    column: 'todo', priority: newTicket.priority,
    tags: [], assignee: 'Arka Jenar', avInit: 'AJ', avColor: 'linear-gradient(135deg,#1e293b,#475569)',
    comments: 0, attachments: 0, estimate: newTicket.estimate || '-',
    deadline: project.deadline, sprint: project.sprint, progress: 0,
  })
  Object.assign(newTicket, { name: '', desc: '', priority: 'medium', estimate: '' })
  showAddTicket.value = false
}

/* ═══ BRIEF ═══ */
const briefBlocks = [
  { id: 1, title: 'Latar Belakang', html: 'Klien <strong>ThreadMark</strong> mengalami <em>cart abandonment</em> tinggi karena checkout manual via WhatsApp. Target: checkout 100% otomatis melalui website.' },
  { id: 2, title: 'Business Goals', html: '<ul><li>Konversi checkout dari 15 menit → di bawah <strong>2 menit</strong>.</li><li>Pembayaran otomatis via <strong>Credit Card & Virtual Account</strong>.</li><li>Order confirmation real-time + email receipt.</li></ul>' },
  { id: 3, title: 'Technical Constraints', html: 'Modul checkout terpisah di Nuxt 3. Database <code>Supabase (PostgreSQL)</code> untuk <code>Orders</code>. Webhook dari <strong>Stripe</strong> untuk payment status. Mobile-first, Lighthouse ≥ 90.' },
  { id: 4, title: 'Acceptance Criteria', html: '<ul><li>Checkout dalam < 3 langkah dari cart.</li><li>Payment status update tanpa refresh.</li><li>Cart clear otomatis setelah sukses.</li><li>Loading state selama proses payment.</li></ul>' },
]

/* ═══ DELIVERABLES ═══ */
const deliverables = ref([
  { id: 1, name: '[Feat] Pinia Cart Store', desc: 'Add/remove, calculate totals, localStorage.', type: 'Frontend', done: true },
  { id: 2, name: '[Feat] Stripe Elements', desc: 'Embed CC form, Elements API.', type: 'Frontend', done: true },
  { id: 3, name: '[DB] Orders & Webhook Table', desc: 'Migration, indexes, foreign keys.', type: 'Backend', done: true },
  { id: 4, name: '[API] Verify Payment Webhook', desc: 'POST /webhook: update status.', type: 'Backend', done: false },
  { id: 5, name: '[FIX] Clear Cart After Pay', desc: 'Hapus localStorage cart.', type: 'Frontend', done: false },
  { id: 6, name: '[UX] Loading State Payment', desc: 'Spinner & disable button.', type: 'Frontend', done: false },
  { id: 7, name: 'Lighthouse ≥ 90', desc: 'Optimasi image, chunks.', type: 'QA', done: false },
])
const completedDeliverables = computed(() => deliverables.value.filter(d => d.done).length)

/* ═══ MILESTONES ═══ */
type MsStatus = 'done' | 'active' | 'upcoming'
const msLabels: Record<MsStatus, string> = { done: '✓ Selesai', active: '⚡ Aktif', upcoming: '○ Mendatang' }
const milestones = ref([
  { id: 1, title: 'Sprint Kickoff & Briefing', date: '10 Apr 2026', status: 'done' as MsStatus, desc: 'Pembagian ticket, PRD review, akses repo.', tags: ['Planning'] },
  { id: 2, title: 'Prototype Checkout Flow', date: '11 Apr 2026', status: 'done' as MsStatus, desc: 'Hi-fi prototype Figma.', tags: ['Figma', 'UI/UX'] },
  { id: 3, title: 'Payment Integration & DB', date: '12 Apr 2026', status: 'active' as MsStatus, desc: 'Stripe Elements, Orders table, Webhook.', tags: ['Backend', 'Stripe'] },
  { id: 4, title: 'Bug Fix & QA Review', date: '13 Apr 2026', status: 'upcoming' as MsStatus, desc: 'Fix revision notes, E2E testing.', tags: ['QA', 'Fix'] },
  { id: 5, title: 'Sprint 4 Final Submission', date: '14 Apr 2026', status: 'upcoming' as MsStatus, desc: 'Submit build + demo ke mentor.', tags: ['Submission'] },
])

/* ═══ SUBMISSION ═══ */
const submission = ref({ liveUrl: 'https://threadmark-arka-v1.vercel.app', repoUrl: 'https://github.com/arkajenar/threadmark-v1', note: '' })
const urgentDeadline = computed(() => true)
const attachments = ref<{ name: string }[]>([])
function handleDrop(e: DragEvent) { dragging.value = false; Array.from(e.dataTransfer?.files || []).forEach(f => attachments.value.push({ name: f.name })) }
function handleFiles(e: Event) { Array.from((e.target as HTMLInputElement).files || []).forEach(f => attachments.value.push({ name: f.name })) }
function handleSubmit() { alert('✅ Submission dikirim!') }

/* ═══ REVISION HISTORY ═══ */
const revisionHistory = ref([
  { id: 1, date: '11 Apr 2026, 23:50', outcome: 'revision', outcomeLabel: 'Revisi', note: 'Loading state & cart clear perlu fix.', items: ['Loading state missing', 'Cart tidak clear'] },
])

/* ═══ THREAD ═══ */
const thread = ref([
  { id: 1, isEvent: true, isMine: false, type: 'event', time: '10 Apr, 09:00', author: 'Sprint Dimulai', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><polyline points="8,4 8,8 11,10"/></svg>', text: 'Repository & requirement Sprint 4 dibuka.' },
  { id: 2, isEvent: false, isMine: true, type: 'message', time: '10 Apr, 11:35', author: 'Kamu (Arka J.)', avInit: 'AJ', avBg: 'linear-gradient(135deg,#1e293b,#475569)', text: 'Kak, untuk Stripe webhook — pakai localtunnel atau deploy dulu?', reactions: [{ emoji: '👍', count: 1 }] },
  { id: 3, isEvent: false, isMine: false, type: 'message', time: '10 Apr, 13:22', author: 'Kak Yudha (Lead Eng.)', avInit: 'YP', avBg: 'linear-gradient(135deg,#6458f5,#818cf8)', text: 'Pakai <code>Stripe CLI</code> saja — <code>stripe listen --forward-to localhost:3000/api/webhook</code>. Lebih cepat dan aman!', reactions: [{ emoji: '🙏', count: 1 }] },
  { id: 4, isEvent: true, isMine: false, type: 'event', time: '11 Apr, 23:50', author: 'Submission Dikirim', icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,8 6,11 13,5"/></svg>', text: 'Kamu mengirim submission #1 untuk review.' },
  { id: 5, isEvent: false, isMine: false, type: 'revision', time: '12 Apr, 09:15', author: 'Kak Sari (QA)', avInit: 'SD', avBg: 'linear-gradient(135deg,#F59E0B,#D97706)', text: '<p>Hi Arka! Payment flow sudah jalan. Tapi ada <strong>2 poin krusial</strong>:</p><ul><li>Belum ada <strong>loading state</strong> — double charge risk.</li><li><strong>Cart localStorage tidak clear</strong> setelah success.</li></ul><p>Fix dulu ya, baru approve! 💪</p>', reactions: [{ emoji: '✅', count: 1 }, { emoji: '🙏', count: 2 }] },
])

function sendMsg() {
  if (!newMsg.value.trim()) return
  thread.value.push({ id: Date.now(), isEvent: false, isMine: true, type: 'message', time: 'Baru saja', author: 'Kamu (Arka J.)', avInit: 'AJ', avBg: 'linear-gradient(135deg,#1e293b,#475569)', text: newMsg.value.replace(/\n/g, '<br>'), reactions: [] })
  newMsg.value = ''
  nextTick(() => { if (threadBody.value) threadBody.value.scrollTop = threadBody.value.scrollHeight })
}

/* ═══════════════════════════════════════════
   MEETINGS
═══════════════════════════════════════════ */
type MeetType   = 'standup' | 'planning' | 'review' | 'retro' | 'uat' | 'oneonone' | 'kickoff'
type MeetStatus = 'live' | 'upcoming' | 'past'

const meetTypeLabel: Record<MeetType, string>  = {
  standup:   'Daily Standup',
  planning:  'Sprint Planning',
  review:    'Sprint Review',
  retro:     'Sprint Retro',
  uat:       'UAT Session',
  oneonone:  '1-on-1 Mentoring',
  kickoff:   'Sprint Kickoff',
}
const meetTypeColor: Record<MeetType, string> = {
  standup:   '#6458f5',
  planning:  '#0EA5E9',
  review:    '#10B981',
  retro:     '#F59E0B',
  uat:       '#EC4899',
  oneonone:  '#8B5CF6',
  kickoff:   '#06B6D4',
}
const meetTypeIcon: Record<MeetType, string> = {
  standup:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="5" r="3"/><path d="M2 14v-1a6 6 0 0112 0v1"/></svg>',
  planning:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h6M5 8h4"/><line x1="11" y1="11" x2="11" y2="7"/><line x1="9" y1="9" x2="13" y2="9"/></svg>',
  review:    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,8 6,12 14,4"/></svg>',
  retro:     '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 8A6 6 0 112 8"/><polyline points="2,4 2,8 6,8"/></svg>',
  uat:       '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M10 7l3-2v6l-3-2"/><circle cx="5.5" cy="8" r="1.5"/></svg>',
  oneonone:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="5" r="2.5"/><path d="M1 14v-.5A4.5 4.5 0 019.5 9"/><circle cx="12" cy="7" r="2"/><path d="M8 14v-.5a3.5 3.5 0 017 0v.5"/></svg>',
  kickoff:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3,2 13,8 3,14"/></svg>',
}
const meetStatusLabel: Record<MeetStatus, string> = {
  live:     '🟢 Live Sekarang',
  upcoming: 'Akan Datang',
  past:     'Sudah Selesai',
}

const teamAll = [
  { init: 'AJ', name: 'Arka Jenar',     role: 'Fullstack Dev',  bg: 'linear-gradient(135deg,#1e293b,#475569)', confirmed: true },
  { init: 'RS', name: 'Rizky Satria',   role: 'Frontend Dev',   bg: 'linear-gradient(135deg,#6458f5,#818cf8)', confirmed: true },
  { init: 'DP', name: 'Dinda Putri',    role: 'UI/UX Designer', bg: 'linear-gradient(135deg,#EC4899,#F472B6)', confirmed: true },
  { init: 'MW', name: 'Maulana W.',     role: 'Backend Dev',    bg: 'linear-gradient(135deg,#059669,#34D399)', confirmed: true },
  { init: 'YP', name: 'Kak Yudha P.',   role: 'Lead Engineer',  bg: 'linear-gradient(135deg,#6458f5,#a78bfa)', confirmed: true },
  { init: 'SD', name: 'Kak Sari D.',    role: 'QA / Reviewer',  bg: 'linear-gradient(135deg,#F59E0B,#D97706)', confirmed: false },
]
const teamDev  = teamAll.slice(0, 4)
const teamFull = teamAll

interface Meeting {
  id: number; title: string; type: MeetType; status: MeetStatus
  date: string; time: string; duration: string; platform: string
  link: string; facilitator: string
  participants: typeof teamAll
  agenda: { title: string; dur: string }[]
  notes?: string
}

const meetings = ref<Meeting[]>([
  {
    id: 1, title: 'Daily Standup — Sprint 4 Day 3', type: 'standup', status: 'live',
    date: '10 Apr 2026', time: '09:00 WIB', duration: '15 menit', platform: 'Google Meet',
    link: 'meet.google.com/xyz-abcd-efg', facilitator: 'Arka Jenar',
    participants: teamDev,
    agenda: [
      { title: 'Update kemarin — apa yang sudah dikerjakan?', dur: '5 mnt' },
      { title: 'Rencana hari ini — target apa?', dur: '5 mnt' },
      { title: 'Blocker / hambatan?', dur: '5 mnt' },
    ],
  },
  {
    id: 2, title: 'Sprint 4 Review & Demo', type: 'review', status: 'upcoming',
    date: '14 Apr 2026', time: '14:00 WIB', duration: '60 menit', platform: 'Zoom',
    link: 'zoom.us/j/987654321', facilitator: 'Kak Yudha P.',
    participants: teamFull,
    agenda: [
      { title: 'Demo Checkout Flow & Payment Integration', dur: '20 mnt' },
      { title: 'Demo Cart & Email Receipt', dur: '10 mnt' },
      { title: 'Feedback stakeholder & mentor', dur: '15 mnt' },
      { title: 'Q&A dan approval', dur: '15 mnt' },
    ],
  },
  {
    id: 3, title: 'Sprint 4 Retrospective', type: 'retro', status: 'upcoming',
    date: '14 Apr 2026', time: '16:00 WIB', duration: '45 menit', platform: 'Google Meet',
    link: 'meet.google.com/retro-sprint4', facilitator: 'Kak Yudha P.',
    participants: teamFull,
    agenda: [
      { title: 'What went well? (Start doing more)', dur: '10 mnt' },
      { title: 'What went wrong? (Stop doing)', dur: '10 mnt' },
      { title: 'Action items untuk Sprint 5', dur: '15 mnt' },
      { title: 'Team appreciation moment', dur: '10 mnt' },
    ],
  },
  {
    id: 4, title: 'UAT Session — Checkout Module', type: 'uat', status: 'upcoming',
    date: '13 Apr 2026', time: '13:00 WIB', duration: '90 menit', platform: 'Zoom',
    link: 'zoom.us/j/uat-checkout', facilitator: 'Kak Sari D.',
    participants: teamFull,
    agenda: [
      { title: 'Setup environment & test account UAT', dur: '10 mnt' },
      { title: 'Happy path: checkout sukses', dur: '20 mnt' },
      { title: 'Negative path: payment gagal, timeout', dur: '25 mnt' },
      { title: 'Mobile viewport testing', dur: '20 mnt' },
      { title: 'Bug triage & severity assessment', dur: '15 mnt' },
    ],
  },
  {
    id: 5, title: '1-on-1 Mentoring — Arka & Kak Yudha', type: 'oneonone', status: 'upcoming',
    date: '12 Apr 2026', time: '16:00 WIB', duration: '30 menit', platform: 'Google Meet',
    link: 'meet.google.com/mentoring-arka', facilitator: 'Kak Yudha P.',
    participants: [
      { init: 'AJ', name: 'Arka Jenar',   role: 'Fullstack Dev', bg: 'linear-gradient(135deg,#1e293b,#475569)', confirmed: true },
      { init: 'YP', name: 'Kak Yudha P.', role: 'Lead Engineer', bg: 'linear-gradient(135deg,#6458f5,#a78bfa)', confirmed: true },
    ],
    agenda: [
      { title: 'Progres Sprint 4 & blocker', dur: '10 mnt' },
      { title: 'Code review live session', dur: '15 mnt' },
      { title: 'Career advice & feedback', dur: '5 mnt' },
    ],
  },
  {
    id: 6, title: 'Sprint 3 Retrospective', type: 'retro', status: 'past',
    date: '7 Apr 2026', time: '16:00 WIB', duration: '45 menit', platform: 'Google Meet',
    link: 'meet.google.com/retro-sprint3', facilitator: 'Kak Yudha P.',
    participants: teamFull,
    agenda: [
      { title: 'What went well?', dur: '10 mnt' },
      { title: 'What to improve?', dur: '10 mnt' },
      { title: 'Action items Sprint 4', dur: '15 mnt' },
      { title: 'Wrap up', dur: '10 mnt' },
    ],
    notes: '<p><strong>What went well:</strong></p><ul><li>Design system selesai lebih cepat dari estimasi.</li><li>Kolaborasi tim solid, communication OK.</li><li>Auth flow diapresiasi mentor — UX sangat baik.</li></ul><p><strong>Improvement:</strong></p><ul><li>Dokumentasi API perlu lebih detail sebelum mulai coding.</li><li>Daily standup kadang terlambat mulai.</li></ul><p><strong>Action items Sprint 4:</strong></p><ul><li>Buat ERD di Notion sebelum mulai DB migration.</li><li>Standup mulai tepat 09:00 WIB tanpa toleransi.</li></ul>',
  },
  {
    id: 7, title: 'UAT Session — Auth Module', type: 'uat', status: 'past',
    date: '5 Apr 2026', time: '10:00 WIB', duration: '60 menit', platform: 'Zoom',
    link: 'zoom.us/j/uat-auth', facilitator: 'Kak Sari D.',
    participants: teamFull,
    agenda: [],
    notes: '<p>UAT selesai. <strong>3 bug minor ditemukan</strong> dan sudah di-fix sebelum EOD. Auth flow <strong>approved</strong> untuk production.</p>',
  },
  {
    id: 8, title: 'Sprint 4 Kickoff', type: 'kickoff', status: 'past',
    date: '10 Apr 2026', time: '09:30 WIB', duration: '30 menit', platform: 'Google Meet',
    link: 'meet.google.com/kickoff-s4', facilitator: 'Kak Yudha P.',
    participants: teamFull,
    agenda: [
      { title: 'Preview Sprint 4 goals & deliverables', dur: '10 mnt' },
      { title: 'Ticket assignment', dur: '10 mnt' },
      { title: 'Q&A', dur: '10 mnt' },
    ],
    notes: '<p>Sprint 4 kickoff sukses. Semua tiket terbagi rata. Fokus utama: Stripe integration & checkout flow. <strong>Target: submit sebelum 14 Apr 23:59 WIB.</strong></p>',
  },
])

const meetFilter        = ref<'all' | MeetStatus>('all')
const selectedMeeting   = ref<Meeting | null>(meetings.value[0])

const meetFilters = [
  { id: 'all',      label: 'Semua' },
  { id: 'live',     label: '🟢 Live' },
  { id: 'upcoming', label: 'Akan Datang' },
  { id: 'past',     label: 'Selesai' },
] as const

const filteredMeetings = computed(() => {
  if (meetFilter.value === 'all') return meetings.value
  return meetings.value.filter(m => m.status === meetFilter.value)
})

const meetStats = computed(() => [
  { label: 'Total Meeting',   value: meetings.value.length,                                            color: '#6458f5' },
  { label: 'Live Sekarang',   value: meetings.value.filter(m => m.status === 'live').length,           color: '#10B981' },
  { label: 'Akan Datang',     value: meetings.value.filter(m => m.status === 'upcoming').length,       color: '#F59E0B' },
  { label: 'Sudah Selesai',   value: meetings.value.filter(m => m.status === 'past').length,           color: '#9CA3AF' },
])

function joinMeeting(mtg: Meeting) {
  window.open('https://' + mtg.link, '_blank')
}
function copyLink(link: string) {
  navigator.clipboard.writeText('https://' + link)
    .then(() => alert('✅ Link disalin!'))
    .catch(() => alert('Link: https://' + link))
}
</script>

<style scoped>
/* ══════════════════════════════════════════
   BASE
══════════════════════════════════════════ */
.ws-page { display: flex; min-height: 100vh; background: #F8F9FD; font-family: 'Instrument Sans', 'Raleway', sans-serif; -webkit-font-smoothing: antialiased; position: relative; overflow-x: hidden; }
.bg-ambients { pointer-events: none; position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.ambient { position: absolute; border-radius: 50%; filter: blur(120px); }
.a-tl { top: -5%; left: -5%; width: 40%; height: 40%; background: radial-gradient(circle, rgba(100,88,245,.07), transparent 70%); }
.a-tr { top: 0; right: -8%; width: 30%; height: 25%; background: radial-gradient(circle, rgba(236,72,153,.04), transparent 70%); }
.a-br { bottom: 0; right: 10%; width: 30%; height: 30%; background: radial-gradient(circle, rgba(100,88,245,.04), transparent 60%); }
.bg-grid { pointer-events: none; position: fixed; inset: 0; z-index: 0; background-image: linear-gradient(to right, rgba(100,88,245,.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,88,245,.03) 1px, transparent 1px); background-size: 80px 80px; mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent); }
.main-wrap { margin-left: 260px; flex: 1; min-width: 0; position: relative; z-index: 10; display: flex; flex-direction: column; }

/* TOPBAR */
.topbar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; gap: 1rem; padding: .875rem 2rem; background: rgba(248,249,253,.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,.07); }
.topbar-toggle { display: none; background: none; border: none; cursor: pointer; padding: .375rem; border-radius: 8px; color: #374151; }
.topbar-toggle svg { width: 20px; height: 20px; }
.topbar-left { flex: 1; }
.breadcrumb { display: flex; align-items: center; gap: .375rem; font-size: .75rem; margin-bottom: .35rem; }
.bc-link { color: #6B7280; text-decoration: none; font-weight: 500; transition: color .2s; }
.bc-link:hover { color: #6458f5; }
.bc-sep { color: #D1D5DB; }
.bc-current { color: #6458f5; font-weight: 700; }
.title-row { display: flex; align-items: center; gap: .875rem; }
.proj-logo { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 800; color: #fff; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,.15); }
.page-title { font-size: 1.0625rem; font-weight: 700; color: #111827; margin: 0; letter-spacing: -.02em; }
.page-sub { font-size: .75rem; color: #9CA3AF; margin-top: .1rem; }
.topbar-right { display: flex; align-items: center; gap: .75rem; }
.status-pill { display: inline-flex; align-items: center; gap: .4rem; font-size: .6875rem; font-weight: 700; padding: .3rem .75rem; border-radius: 999px; text-transform: uppercase; letter-spacing: .04em; }
.sp-dot { width: 6px; height: 6px; border-radius: 50%; }
.sp-active { background: #EEF2FF; color: #4338CA; } .sp-active .sp-dot { background: #6366F1; }
.sp-revision { background: #FEF2F2; color: #DC2626; } .sp-revision .sp-dot { background: #EF4444; animation: blink 2s infinite; }
.sp-review { background: #FFFBEB; color: #B45309; } .sp-review .sp-dot { background: #F59E0B; }
.sp-completed { background: #ECFDF5; color: #047857; } .sp-completed .sp-dot { background: #10B981; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

/* TAB BAR */
.tab-bar { display: flex; gap: 0; padding: 0 2rem; background: rgba(248,249,253,.92); border-bottom: 1px solid rgba(0,0,0,.07); overflow-x: auto; flex-shrink: 0; }
.tab-item { display: inline-flex; align-items: center; gap: .375rem; padding: .75rem 1.125rem; border: none; background: none; font-size: .8125rem; font-weight: 600; color: #6B7280; cursor: pointer; transition: all .15s; position: relative; white-space: nowrap; font-family: inherit; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab-item:hover { color: #111827; }
.tab-item.active { color: #6458f5; border-bottom-color: #6458f5; }
.tab-icon { width: 15px; height: 15px; display: flex; align-items: center; }
.tab-icon :deep(svg) { width: 15px; height: 15px; }
.tab-badge { font-size: .5625rem; font-weight: 800; background: #6458f5; color: #fff; border-radius: 999px; padding: .05rem .4rem; min-width: 16px; text-align: center; }

/* CONTENT */
.ws-content { padding: 1.5rem 2rem 4rem; flex: 1; }
.tab-panel { animation: fadeIn .2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

/* ══════════════════════════════════════════
   KANBAN BOARD
══════════════════════════════════════════ */
.board-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.25rem; gap: 1rem; flex-wrap: wrap; }
.bh-left { display: flex; flex-direction: column; gap: .25rem; }
.section-title { font-size: 1.125rem; font-weight: 700; color: #111827; margin: 0; }
.bh-sub { font-size: .8125rem; color: #9CA3AF; }
.bh-right { display: flex; align-items: center; gap: .75rem; }
.bh-search { position: relative; display: flex; align-items: center; }
.bh-search svg { position: absolute; left: .7rem; width: 13px; height: 13px; color: #9CA3AF; pointer-events: none; }
.bh-search input { padding: .5rem .75rem .5rem 2rem; border-radius: 9px; border: 1.5px solid #E5E7EB; background: #fff; font-size: .8125rem; color: #111827; outline: none; width: 180px; font-family: inherit; transition: all .2s; }
.bh-search input:focus { border-color: #6458f5; }
.btn-add { display: inline-flex; align-items: center; gap: .375rem; padding: .5rem 1rem; border-radius: 9px; border: none; background: #111827; color: #fff; font-size: .8125rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: inherit; }
.btn-add svg { width: 14px; height: 14px; }
.btn-add:hover { background: #374151; }

.kanban { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem; min-height: 500px; align-items: flex-start; }
.kb-col { flex: 1; min-width: 250px; max-width: 300px; display: flex; flex-direction: column; }
.kb-col-head { display: flex; align-items: center; gap: .5rem; padding: .625rem .875rem; border-radius: 10px; margin-bottom: .75rem; background: #fff; border: 1px solid #E9EBF0; }
.kb-col-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.kb-col-title { flex: 1; font-size: .8125rem; font-weight: 700; color: #111827; }
.kb-col-count { font-size: .6875rem; font-weight: 700; background: #F3F4F6; color: #6B7280; padding: .1rem .4rem; border-radius: 999px; min-width: 20px; text-align: center; }
.kb-col-body { display: flex; flex-direction: column; gap: .625rem; min-height: 80px; }
.kb-empty { padding: 1.5rem; text-align: center; font-size: .8125rem; color: #D1D5DB; border: 2px dashed #E9EBF0; border-radius: 12px; }

/* TICKET CARD */
.kb-ticket { background: #fff; border: 1px solid #E9EBF0; border-radius: 12px; cursor: grab; transition: all .2s; position: relative; overflow: hidden; }
.kb-ticket:hover { box-shadow: 0 4px 16px rgba(0,0,0,.07); transform: translateY(-1px); }
.kb-ticket:active { cursor: grabbing; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
.tk-pri-bar { height: 3px; }
.tkpb-critical { background: #EF4444; }
.tkpb-high     { background: #F59E0B; }
.tkpb-medium   { background: #6458f5; }
.tkpb-low      { background: #D1D5DB; }
.tk-header { display: flex; justify-content: space-between; align-items: center; padding: .625rem .875rem 0; }
.tk-id { font-size: .6875rem; font-weight: 700; color: #9CA3AF; font-family: 'JetBrains Mono', monospace; }
.tk-pri-chip { font-size: .5625rem; font-weight: 800; padding: .1rem .4rem; border-radius: 4px; text-transform: uppercase; letter-spacing: .05em; }
.tkpc-critical { background: rgba(239,68,68,.1); color: #B91C1C; }
.tkpc-high     { background: rgba(245,158,11,.1); color: #B45309; }
.tkpc-medium   { background: rgba(100,88,245,.1); color: #4338CA; }
.tkpc-low      { background: #F3F4F6; color: #9CA3AF; }

.tk-name { font-size: .8125rem; font-weight: 600; color: #111827; margin: .375rem .875rem .25rem; line-height: 1.4; }
.tk-desc { font-size: .6875rem; color: #9CA3AF; line-height: 1.45; margin: 0 .875rem .5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tk-tags { display: flex; flex-wrap: wrap; gap: .25rem; padding: 0 .875rem .5rem; }
.tk-tag { font-size: .5625rem; font-weight: 600; padding: .1rem .4rem; border-radius: 4px; background: #F3F4F6; color: #4B5563; }

.tk-footer { display: flex; justify-content: space-between; align-items: center; padding: .5rem .875rem; border-top: 1px solid #F3F4F6; }
.tk-assignee { display: flex; align-items: center; gap: .35rem; font-size: .6875rem; font-weight: 500; color: #6B7280; }
.tk-av { width: 20px; height: 20px; border-radius: 5px; font-size: .5rem; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: center; }
.tk-info-row { display: flex; align-items: center; gap: .5rem; }
.tk-comments, .tk-attachments { display: inline-flex; align-items: center; gap: .2rem; font-size: .6875rem; color: #9CA3AF; }
.tk-comments svg, .tk-attachments svg { width: 11px; height: 11px; }

/* TICKET EXPANDED */
.tk-expand { padding: .75rem .875rem; border-top: 1px solid #F3F4F6; background: #FAFAFA; }
.tk-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: .5rem; }
.tk-detail-item { background: #fff; border-radius: 7px; padding: .4rem .6rem; }
.tdi-label { display: block; font-size: .5625rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9CA3AF; }
.tdi-value { display: block; font-size: .75rem; font-weight: 600; color: #374151; }
.tk-progress-bar { height: 4px; background: #F3F4F6; border-radius: 999px; overflow: hidden; margin-bottom: .5rem; }
.tk-prog-fill { height: 100%; background: linear-gradient(90deg, #6458f5, #818cf8); border-radius: 999px; transition: width .4s; }
.tk-actions { display: flex; gap: .375rem; justify-content: flex-end; }
.tk-act-btn { width: 26px; height: 26px; border-radius: 6px; border: 1px solid #E5E7EB; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6B7280; transition: all .15s; }
.tk-act-btn svg { width: 12px; height: 12px; }
.tk-act-btn:hover { border-color: #6458f5; color: #6458f5; background: rgba(100,88,245,.04); }
.tk-act-delete:hover { border-color: #EF4444; color: #EF4444; background: rgba(239,68,68,.04); }

/* ══════════════════════════════════════════
   OVERVIEW TAB
══════════════════════════════════════════ */
.overview-grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; align-items: start; }
.ov-main { display: flex; flex-direction: column; gap: 1.5rem; }
.ov-side { display: flex; flex-direction: column; gap: 1.5rem; position: sticky; top: 120px; }

.card { background: #fff; border: 1px solid #E9EBF0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.03); overflow: hidden; }
.card-revision { border-color: rgba(239,68,68,.3); }
.side-card { overflow: hidden; }
.card-hd { display: flex; justify-content: space-between; align-items: center; padding: 1.125rem 1.5rem; border-bottom: 1px solid #F3F4F6; gap: .75rem; }
.card-hd-left { display: flex; flex-direction: column; gap: .35rem; }
.card-title { font-size: 1rem; font-weight: 700; color: #111827; margin: 0; }

.section-badge { display: inline-flex; align-items: center; gap: .375rem; padding: .2rem .6rem; border-radius: 999px; font-size: .625rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.section-badge svg { width: 11px; height: 11px; }
.badge-slate  { background: #F1F5F9; color: #475569; }
.badge-indigo { background: rgba(99,102,241,.1); color: #4338CA; }
.badge-purple { background: rgba(100,88,245,.1); color: #6458f5; }
.badge-orange { background: rgba(245,158,11,.1); color: #B45309; }
.badge-green  { background: rgba(16,185,129,.1); color: #047857; }
.badge-red    { background: rgba(239,68,68,.1); color: #B91C1C; }
.badge-amber  { background: rgba(245,158,11,.08); color: #D97706; }

.btn-outline { display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .7rem; border-radius: 8px; border: 1.5px solid #D1D5DB; background: #fff; font-size: .75rem; font-weight: 600; color: #374151; cursor: pointer; transition: all .2s; font-family: inherit; }
.btn-outline svg { width: 13px; height: 13px; }
.btn-outline:hover { border-color: #6458f5; color: #6458f5; }
.btn-sm { font-size: .7rem; }

.mt-md { margin-top: 1.5rem; }
.mt-sm { margin-top: .75rem; }

/* Brief */
.brief-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1.125rem; }
.bb-head { display: flex; align-items: center; gap: .5rem; margin-bottom: .5rem; }
.bb-num { width: 20px; height: 20px; border-radius: 5px; background: #111827; color: #fff; font-size: .625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bb-head h4 { font-size: .875rem; font-weight: 700; color: #111827; margin: 0; }
.bb-text { font-size: .8125rem; color: #374151; line-height: 1.65; padding-left: 1.5rem; }
.bb-text :deep(ul) { margin: .25rem 0; padding-left: 1.25rem; }
.bb-text :deep(code) { background: #F3F4F6; padding: .1em .3em; border-radius: 4px; font-size: .85em; color: #DC2626; font-family: monospace; }
.tech-row { display: flex; align-items: center; gap: .45rem; padding: .875rem 1.5rem; border-top: 1px solid #F3F4F6; flex-wrap: wrap; }
.tech-label { font-size: .6875rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: .06em; }
.tech-tag { background: #F9FAFB; border: 1px solid #E5E7EB; color: #4B5563; padding: .15rem .5rem; border-radius: 5px; font-size: .6875rem; font-weight: 600; font-family: 'JetBrains Mono', monospace; }

/* Deliverables */
.completion-chip { font-size: .75rem; font-weight: 600; background: #F3F4F6; padding: .3rem .75rem; border-radius: 999px; color: #374151; }
.del-list { display: flex; flex-direction: column; }
.del-item { display: flex; align-items: center; gap: .875rem; padding: .75rem 1.5rem; border-top: 1px solid #F3F4F6; cursor: pointer; transition: background .15s; }
.del-item:hover { background: #FAFAFA; }
.del-cb-wrap { position: relative; width: 20px; height: 20px; flex-shrink: 0; }
.del-cb-wrap input { opacity: 0; position: absolute; inset: 0; cursor: pointer; z-index: 2; width: 100%; height: 100%; }
.del-cb { position: absolute; inset: 0; border: 2px solid #D1D5DB; border-radius: 5px; background: #fff; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.del-cb svg { width: 11px; height: 11px; color: #fff; opacity: 0; transform: scale(.5); transition: all .15s; }
.del-cb-wrap input:checked + .del-cb { background: #10B981; border-color: #10B981; }
.del-cb-wrap input:checked + .del-cb svg { opacity: 1; transform: scale(1); }
.del-info { flex: 1; min-width: 0; }
.del-name { font-size: .8125rem; font-weight: 600; color: #111827; display: block; }
.del-desc { font-size: .6875rem; color: #9CA3AF; }
.del-done .del-name { text-decoration: line-through; color: #9CA3AF; }
.del-type { font-size: .625rem; font-weight: 700; padding: .15rem .45rem; border-radius: 4px; text-transform: uppercase; }
.dt-frontend { background: #EEF2FF; color: #4338CA; }
.dt-backend  { background: #F5F3FF; color: #7C3AED; }
.dt-qa       { background: rgba(16,185,129,.1); color: #047857; }

/* Status / Progress (side) */
.ps-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.ps-ring-wrap { position: relative; width: 80px; height: 80px; }
.ps-ring { width: 80px; height: 80px; transform: rotate(-90deg); }
.ps-ring-track { stroke: #F3F4F6; }
.ps-ring-fill { stroke: #6458f5; stroke-linecap: round; transition: stroke-dasharray .8s; }
.ps-ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.ps-ring-pct { font-size: 1rem; font-weight: 800; color: #111827; }
.ps-ring-lbl { font-size: .5625rem; color: #9CA3AF; font-weight: 600; text-transform: uppercase; }
.ps-stat-row { display: flex; width: 100%; border-top: 1px solid #F3F4F6; }
.ps-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: .15rem; padding: .625rem .25rem; border-right: 1px solid #F3F4F6; }
.ps-stat:last-child { border-right: none; }
.ps-sv { font-size: 1.25rem; font-weight: 800; line-height: 1; }
.ps-sl { font-size: .625rem; color: #9CA3AF; }
.text-green { color: #059669 !important; }
.text-yellow { color: #D97706 !important; }
.text-red { color: #DC2626; }

/* Team */
.team-list { padding: .75rem 1.5rem; display: flex; flex-direction: column; gap: .5rem; }
.team-member { display: flex; align-items: center; gap: .75rem; padding: .375rem 0; }
.tm-av { width: 32px; height: 32px; border-radius: 8px; color: #fff; font-size: .65rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tm-info { flex: 1; }
.tm-name { display: block; font-size: .8125rem; font-weight: 600; color: #111827; }
.tm-role { font-size: .6875rem; color: #9CA3AF; }

/* ══════════════════════════════════════════
   TIMELINE TAB
══════════════════════════════════════════ */
.section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; flex-wrap: wrap; gap: .5rem; }
.sh-sub { font-size: .8125rem; color: #6B7280; }

.ms-timeline { display: flex; flex-direction: column; max-width: 680px; }
.ms-item { display: flex; gap: 1rem; padding-bottom: 1.75rem; }
.ms-item.ms-last { padding-bottom: 0; }
.ms-track { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 24px; }
.ms-dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #E5E7EB; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }
.ms-dot svg { width: 12px; height: 12px; }
.msd-done { background: #10B981; border-color: #10B981; color: #fff; }
.msd-active { background: #6458f5; border-color: #6458f5; color: #fff; box-shadow: 0 0 0 4px rgba(100,88,245,.15); }
.msd-upcoming { background: #fff; }
.ms-line { flex: 1; width: 2px; background: #E5E7EB; margin-top: 4px; min-height: 20px; }
.ms-done .ms-line { background: #10B981; }
.ms-active .ms-line { background: linear-gradient(#6458f5, #E5E7EB); }
.ms-body { flex: 1; padding-top: .1rem; }
.ms-head { display: flex; justify-content: space-between; gap: .5rem; margin-bottom: .25rem; }
.ms-title { font-size: .9375rem; font-weight: 700; color: #111827; }
.ms-date { font-size: .75rem; font-weight: 600; color: #6B7280; white-space: nowrap; }
.ms-desc { font-size: .8125rem; color: #4B5563; line-height: 1.5; margin-bottom: .5rem; }
.ms-tags { display: flex; flex-wrap: wrap; gap: .3rem; margin-bottom: .5rem; }
.ms-tag { font-size: .625rem; font-weight: 600; padding: .1rem .45rem; border-radius: 4px; background: #F3F4F6; color: #4B5563; }
.ms-chip { font-size: .625rem; font-weight: 700; padding: .2rem .55rem; border-radius: 5px; display: inline-block; }
.msc-done { background: rgba(16,185,129,.1); color: #047857; }
.msc-active { background: rgba(100,88,245,.1); color: #4338CA; }
.msc-upcoming { background: #F3F4F6; color: #9CA3AF; }

/* ══════════════════════════════════════════
   FILES TAB
══════════════════════════════════════════ */
.files-grid { display: grid; grid-template-columns: 1fr 360px; gap: 1.5rem; align-items: start; }
.f-main, .f-side { display: flex; flex-direction: column; gap: 1.5rem; }
.rev-notice { display: flex; align-items: flex-start; gap: .75rem; padding: .875rem 1.5rem; background: #FEF2F2; border-bottom: 1px solid rgba(239,68,68,.15); }
.rev-notice svg { width: 18px; height: 18px; color: #EF4444; flex-shrink: 0; margin-top: .1rem; }
.rev-notice strong { display: block; font-size: .8125rem; color: #B91C1C; margin-bottom: .2rem; }
.rev-notice p { font-size: .75rem; color: #7F1D1D; margin: 0; line-height: 1.4; }

.sub-form { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: .75rem; }
.form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: .875rem; }
.field { display: flex; flex-direction: column; gap: .35rem; }
.field-lbl { font-size: .75rem; font-weight: 600; color: #374151; }
.f-input { width: 100%; padding: .6rem .875rem; border-radius: 9px; border: 1.5px solid #D1D5DB; background: #fff; font-family: inherit; font-size: .8125rem; color: #111827; transition: all .2s; box-sizing: border-box; }
.f-input:focus { outline: none; border-color: #6458f5; box-shadow: 0 0 0 3px rgba(100,88,245,.1); }
.f-textarea { resize: vertical; min-height: 70px; line-height: 1.5; }

.drop-zone { display: flex; flex-direction: column; align-items: center; gap: .3rem; padding: 1rem; border: 2px dashed #D1D5DB; border-radius: 10px; background: #FAFAFA; cursor: pointer; text-align: center; transition: all .2s; font-size: .8125rem; color: #6B7280; }
.drop-zone svg { width: 22px; height: 22px; color: #9CA3AF; }
.dz-active { border-color: #6458f5; background: rgba(100,88,245,.03); }
.dz-pick { color: #6458f5; font-weight: 600; cursor: pointer; text-decoration: underline; }
.att-list { display: flex; flex-direction: column; gap: .3rem; margin-top: .5rem; }
.att-item { display: flex; align-items: center; gap: .4rem; padding: .35rem .65rem; background: #F9FAFB; border-radius: 7px; font-size: .75rem; color: #374151; }
.att-item svg { width: 12px; height: 12px; color: #6B7280; flex-shrink: 0; }
.att-item span { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.att-del { width: 18px; height: 18px; border-radius: 50%; border: none; background: none; color: #9CA3AF; cursor: pointer; font-size: .875rem; display: flex; align-items: center; justify-content: center; transition: all .15s; }
.att-del:hover { background: #FEE2E2; color: #EF4444; }

.deadline-chip { display: inline-flex; align-items: center; gap: .3rem; font-size: .75rem; font-weight: 700; background: #F3F4F6; padding: .3rem .75rem; border-radius: 7px; color: #374151; }
.deadline-chip svg { width: 13px; height: 13px; }
.dlc-urgent { background: #FEF2F2; color: #DC2626; }

.sub-actions { padding-top: 1rem; border-top: 1px solid #F3F4F6; display: flex; justify-content: flex-end; }
.btn-submit { display: inline-flex; align-items: center; gap: .45rem; padding: .65rem 1.5rem; border-radius: 9px; border: none; background: #111827; color: #fff; font-size: .875rem; font-weight: 700; font-family: inherit; cursor: pointer; transition: all .2s; }
.btn-submit svg { width: 16px; height: 16px; }
.btn-submit:hover { background: #374151; }
.btn-submit:disabled { opacity: .5; cursor: not-allowed; }
.btn-rev { background: #DC2626; }
.btn-rev:hover { background: #B91C1C; }

/* Revision History */
.rh-count { font-size: .75rem; color: #9CA3AF; }
.rh-list { padding: .875rem 1.25rem; display: flex; flex-direction: column; gap: .75rem; }
.rh-item { border: 1px solid #E9EBF0; border-radius: 10px; padding: .75rem; overflow: hidden; }
.rh-item.rh-revision { border-left: 3px solid #EF4444; }
.rh-item.rh-approved { border-left: 3px solid #10B981; }
.rh-head { display: flex; align-items: center; gap: .625rem; margin-bottom: .5rem; }
.rh-badge { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.rh-badge svg { width: 12px; height: 12px; }
.rhb-revision { background: rgba(239,68,68,.1); color: #DC2626; }
.rhb-approved { background: rgba(16,185,129,.1); color: #059669; }
.rh-info { flex: 1; }
.rh-label { display: block; font-size: .75rem; font-weight: 700; color: #111827; }
.rh-date { font-size: .625rem; color: #9CA3AF; }
.rh-chip { font-size: .625rem; font-weight: 700; padding: .15rem .5rem; border-radius: 4px; }
.rhc-revision { background: rgba(239,68,68,.1); color: #B91C1C; }
.rhc-approved { background: rgba(16,185,129,.1); color: #047857; }
.rh-note { font-size: .75rem; color: #374151; line-height: 1.5; margin: 0 0 .4rem; }
.rh-tags { display: flex; flex-wrap: wrap; gap: .25rem; }
.rh-tag { font-size: .625rem; font-weight: 600; padding: .15rem .4rem; border-radius: 4px; background: #FEF2F2; color: #B91C1C; }

/* ══════════════════════════════════════════
   THREAD TAB
══════════════════════════════════════════ */
.thread-layout { max-width: 720px; }
.thread-card { display: flex; flex-direction: column; max-height: calc(100vh - 200px); }
.tc-hd { display: flex; justify-content: space-between; align-items: center; padding: .875rem 1.25rem; border-bottom: 1px solid #F3F4F6; flex-shrink: 0; }
.tc-count { font-size: .75rem; color: #9CA3AF; }
.tc-body { flex: 1; overflow-y: auto; padding: 1.25rem; background: #FAFAFA; scrollbar-width: thin; scrollbar-color: #E5E7EB transparent; }
.timeline { display: flex; flex-direction: column; gap: 1.25rem; }
.tl-item { display: flex; gap: .75rem; position: relative; }
.tl-line { position: absolute; left: 14px; top: 32px; bottom: -18px; width: 2px; background: #E5E7EB; z-index: 0; }
.tl-item:last-child .tl-line { display: none; }
.tl-av { width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0; color: #fff; font-size: .625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }
.tl-ev-icon { width: 28px; height: 28px; border-radius: 50%; background: #F3F4F6; color: #6B7280; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 2; border: 3px solid #FAFAFA; box-sizing: content-box; left: -3px; position: relative; }
.tl-ev-icon :deep(svg) { width: 12px; height: 12px; }
.tl-body { flex: 1; min-width: 0; }
.tl-meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .3rem; }
.tl-author { font-size: .75rem; font-weight: 700; color: #111827; }
.tl-me { color: #4B5563; }
.tl-time { font-size: .625rem; color: #9CA3AF; }
.tl-ev-text { font-size: .75rem; color: #6B7280; }
.tl-msg { background: #fff; border: 1px solid #E5E7EB; border-radius: 2px 10px 10px 10px; padding: .75rem; font-size: .8125rem; color: #374151; line-height: 1.6; box-shadow: 0 1px 3px rgba(0,0,0,.02); }
.tl-msg :deep(p) { margin: 0 0 .4rem; }
.tl-msg :deep(p:last-child) { margin: 0; }
.tl-msg :deep(ul) { margin: .2rem 0; padding-left: 1.1rem; }
.tl-msg :deep(code) { background: #F3F4F6; padding: .1rem .25rem; border-radius: 3px; font-size: .8em; font-family: monospace; color: #DC2626; }
.tl-msg-rev { border-color: rgba(239,68,68,.25); background: #FEF9F9; }
.tl-msg-ok { border-color: rgba(16,185,129,.2); background: #F0FDF9; }
.tl-msg-mine { background: #F5F3FF; border-color: rgba(100,88,245,.15); border-radius: 10px 2px 10px 10px; }
.tl-tag { display: inline-block; margin-top: .5rem; font-size: .625rem; font-weight: 700; padding: .15rem .45rem; border-radius: 4px; text-transform: uppercase; letter-spacing: .04em; }
.tlt-rev { background: #EF4444; color: #fff; }
.tlt-ok { background: #10B981; color: #fff; }
.tl-reactions { display: flex; gap: .3rem; margin-top: .4rem; }
.tl-react { display: inline-flex; align-items: center; gap: .15rem; background: #F3F4F6; border-radius: 999px; padding: .1rem .45rem; font-size: .6875rem; font-weight: 600; cursor: pointer; transition: background .15s; }
.tl-react:hover { background: #E5E7EB; }

.tc-input { padding: .75rem 1.25rem; border-top: 1px solid #F3F4F6; background: #fff; flex-shrink: 0; }
.chat-row { display: flex; gap: .625rem; align-items: flex-start; }
.chat-av { width: 28px; height: 28px; border-radius: 7px; background: linear-gradient(135deg,#1e293b,#475569); color: #fff; font-size: .625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: .1rem; }
.chat-wrap { flex: 1; display: flex; flex-direction: column; gap: .4rem; }
.chat-input { width: 100%; padding: .5rem .75rem; border: 1.5px solid #D1D5DB; border-radius: 9px; font-family: inherit; font-size: .8125rem; color: #111827; resize: none; transition: all .2s; box-sizing: border-box; }
.chat-input:focus { outline: none; border-color: #6458f5; box-shadow: 0 0 0 3px rgba(100,88,245,.1); }
.chat-footer { display: flex; justify-content: space-between; align-items: center; }
.chat-hint { font-size: .625rem; color: #9CA3AF; }
.btn-send { display: inline-flex; align-items: center; gap: .3rem; background: #6458f5; color: #fff; padding: .4rem .875rem; border-radius: 8px; border: none; font-size: .75rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: inherit; }
.btn-send svg { width: 13px; height: 13px; }
.btn-send:hover { background: #5448e0; }
.btn-send:disabled { opacity: .5; cursor: not-allowed; }

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
.modal-overlay { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.45); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; }
.modal { background: #fff; border-radius: 18px; width: 460px; max-width: 95vw; box-shadow: 0 24px 64px rgba(0,0,0,.2); overflow: hidden; }
.modal-hd { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #F3F4F6; }
.modal-hd h3 { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0; }
.modal-close { width: 28px; height: 28px; border-radius: 7px; border: none; background: none; cursor: pointer; color: #9CA3AF; display: flex; align-items: center; justify-content: center; transition: all .15s; }
.modal-close svg { width: 12px; height: 12px; }
.modal-close:hover { background: #F3F4F6; color: #374151; }
.modal-body { padding: 1.25rem; }
.modal-ft { display: flex; justify-content: flex-end; gap: .625rem; padding: 1rem 1.25rem; border-top: 1px solid #F3F4F6; }
.btn-cancel { padding: .5rem 1rem; border-radius: 8px; border: 1.5px solid #D1D5DB; background: #fff; font-size: .8125rem; font-weight: 600; color: #6B7280; cursor: pointer; font-family: inherit; transition: all .15s; }
.btn-cancel:hover { border-color: #111827; color: #111827; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal { transition: transform .25s; }
.modal-fade-enter-from .modal { transform: scale(.96) translateY(8px); }

/* TRANSITIONS */
.expand-enter-active, .expand-leave-active { transition: all .2s ease; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; padding: 0; }

.ticket-move-move, .ticket-move-enter-active, .ticket-move-leave-active { transition: all .3s ease; }
.ticket-move-enter-from, .ticket-move-leave-to { opacity: 0; transform: translateY(8px); }

.sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,.5); backdrop-filter: blur(2px); }

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
/* ══════════════════════════════════════════
   MEETINGS
══════════════════════════════════════════ */
.meet-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
.mh-left { display: flex; flex-direction: column; gap: .25rem; }
.mh-sub { font-size: .8125rem; color: #9CA3AF; }
.mh-right { display: flex; align-items: center; gap: .75rem; }
.meet-filter-tabs { display: flex; gap: .375rem; background: #F3F4F6; border-radius: 10px; padding: .25rem; }
.mftab { padding: .35rem .75rem; border-radius: 7px; border: none; background: none; font-size: .75rem; font-weight: 600; color: #6B7280; cursor: pointer; transition: all .15s; font-family: inherit; }
.mftab.active { background: #fff; color: #111827; box-shadow: 0 1px 4px rgba(0,0,0,.08); }

.meet-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: .75rem; margin-bottom: 1.5rem; }
.ms-card { background: #fff; border: 1px solid #E9EBF0; border-radius: 12px; padding: .875rem 1.125rem; display: flex; flex-direction: column; gap: .2rem; border-top: 3px solid var(--c); transition: transform .2s; }
.ms-card:hover { transform: translateY(-2px); }
.msc-val { font-size: 1.375rem; font-weight: 800; color: #111827; line-height: 1; }
.msc-label { font-size: .6875rem; color: #9CA3AF; font-weight: 500; }

.meet-grid { display: grid; grid-template-columns: 1fr 380px; gap: 1.25rem; align-items: start; }
.meet-main { display: flex; flex-direction: column; gap: .75rem; }
.meet-list { display: flex; flex-direction: column; gap: .75rem; }

/* Meeting Card */
.meet-card {
  background: #fff; border: 1px solid #E9EBF0; border-radius: 14px;
  display: flex; overflow: hidden; cursor: pointer;
  transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,.03);
}
.meet-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-1px); border-color: #D1D5DB; }
.meet-card.mc-selected { border-color: rgba(100,88,245,.4); box-shadow: 0 0 0 3px rgba(100,88,245,.08); }
.mc-status-live { border-color: rgba(16,185,129,.4); animation: livePulse 2s ease-in-out infinite; }
@keyframes livePulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.2);} 50%{box-shadow:0 0 0 6px rgba(16,185,129,0);} }

.mc-stripe { width: 4px; flex-shrink: 0; }
.mc-body { flex: 1; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: .625rem; }

.mc-top { display: flex; align-items: flex-start; gap: .875rem; }
.mc-icon-wrap { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mc-icon-wrap :deep(svg) { width: 18px; height: 18px; }
.mc-info { flex: 1; min-width: 0; }
.mc-title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: .5rem; margin-bottom: .3rem; }
.mc-title { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0; }
.mc-type-chip { font-size: .625rem; font-weight: 700; padding: .2rem .55rem; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
.mc-meta { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.mc-datetime, .mc-duration, .mc-platform { display: inline-flex; align-items: center; gap: .25rem; font-size: .6875rem; color: #6B7280; font-weight: 500; }
.mc-datetime svg, .mc-duration svg, .mc-platform svg { width: 11px; height: 11px; flex-shrink: 0; }

.mc-participants { display: flex; align-items: center; gap: .5rem; }
.mc-av-stack { display: flex; align-items: center; }
.mc-av { width: 24px; height: 24px; border-radius: 50%; color: #fff; font-size: .5rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; margin-left: -.4rem; flex-shrink: 0; }
.mc-av:first-child { margin-left: 0; }
.mc-av-more { background: #F3F4F6; color: #6B7280; }
.mc-pcount { font-size: .6875rem; color: #9CA3AF; font-weight: 500; }

.mc-footer { display: flex; justify-content: space-between; align-items: center; gap: .75rem; flex-wrap: wrap; }
.mc-status-badge { display: inline-flex; align-items: center; gap: .375rem; font-size: .6875rem; font-weight: 700; }
.msb-dot { width: 6px; height: 6px; border-radius: 50%; }
.msb-live .msb-dot     { background: #10B981; animation: blink 1.2s infinite; }
.msb-upcoming .msb-dot { background: #F59E0B; }
.msb-past .msb-dot     { background: #9CA3AF; }
.mc-actions { display: flex; align-items: center; gap: .5rem; }

.btn-join {
  display: inline-flex; align-items: center; gap: .375rem;
  color: #fff; padding: .4rem .875rem; border-radius: 8px;
  border: none; font-size: .75rem; font-weight: 700; cursor: pointer;
  transition: all .2s; font-family: inherit;
}
.btn-join svg { width: 13px; height: 13px; }
.btn-join:hover { filter: brightness(1.1); transform: translateY(-1px); }
.btn-live { animation: joinPulse 2s ease-in-out infinite; }
@keyframes joinPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; animation: blink 1s infinite; }

.btn-past {
  display: inline-flex; align-items: center; gap: .3rem;
  background: #F3F4F6; color: #6B7280; padding: .35rem .75rem;
  border-radius: 7px; border: none; font-size: .6875rem; font-weight: 600;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.btn-past svg { width: 12px; height: 12px; }
.btn-past:hover { background: #E5E7EB; color: #374151; }

.meet-empty { display: flex; flex-direction: column; align-items: center; gap: .75rem; padding: 3rem; color: #9CA3AF; text-align: center; }
.meet-empty svg { width: 36px; height: 36px; }
.meet-empty p { font-size: .875rem; }

/* ── Meeting Detail Panel ── */
.meet-detail { position: sticky; top: 120px; }
.meet-detail-empty { display: flex; align-items: center; justify-content: center; min-height: 300px; }
.mde-placeholder { display: flex; flex-direction: column; align-items: center; gap: .75rem; color: #D1D5DB; text-align: center; padding: 2rem; }
.mde-placeholder svg { width: 56px; height: 56px; }
.mde-placeholder p { font-size: .875rem; line-height: 1.5; color: #9CA3AF; }

.md-card { overflow: hidden; border-top: 3px solid #6458f5; }
.md-hd { display: flex; align-items: flex-start; gap: .875rem; padding: 1.125rem 1.25rem; border-bottom: 1px solid #F3F4F6; }
.md-hd-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.md-hd-icon :deep(svg) { width: 20px; height: 20px; }
.md-hd-info { flex: 1; min-width: 0; }
.md-title { font-size: .9375rem; font-weight: 700; color: #111827; margin: 0 0 .2rem; }
.md-sub { font-size: .6875rem; color: #9CA3AF; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
.md-close { width: 28px; height: 28px; border-radius: 7px; border: none; background: none; cursor: pointer; color: #9CA3AF; display: flex; align-items: center; justify-content: center; transition: all .15s; flex-shrink: 0; }
.md-close svg { width: 12px; height: 12px; }
.md-close:hover { background: #F3F4F6; color: #374151; }

.md-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; padding: 1rem 1.25rem; border-bottom: 1px solid #F3F4F6; }
.md-info-item { display: flex; flex-direction: column; gap: .2rem; }
.md-info-label { font-size: .625rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #9CA3AF; }
.md-info-val { font-size: .8125rem; font-weight: 600; color: #374151; }

.md-link-section { padding: 1rem 1.25rem; border-bottom: 1px solid #F3F4F6; display: flex; flex-direction: column; gap: .625rem; }
.md-link-label { font-size: .6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #9CA3AF; }
.md-link-box { display: flex; align-items: center; gap: .5rem; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: .5rem .75rem; }
.md-link-box svg { width: 14px; height: 14px; color: #9CA3AF; flex-shrink: 0; }
.md-link-url { flex: 1; font-size: .75rem; color: #6B7280; font-family: 'JetBrains Mono', monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.md-copy { width: 26px; height: 26px; border-radius: 6px; border: 1px solid #E5E7EB; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6B7280; transition: all .15s; flex-shrink: 0; }
.md-copy svg { width: 12px; height: 12px; }
.md-copy:hover { border-color: #6458f5; color: #6458f5; }
.btn-join-lg { display: flex; align-items: center; justify-content: center; gap: .5rem; color: #fff; padding: .65rem 1rem; border-radius: 10px; border: none; font-size: .875rem; font-weight: 700; cursor: pointer; font-family: inherit; transition: all .2s; }
.btn-join-lg svg { width: 16px; height: 16px; }
.btn-join-lg:hover { filter: brightness(1.1); transform: translateY(-1px); }

.md-section { padding: .875rem 1.25rem; border-bottom: 1px solid #F3F4F6; }
.md-section:last-child { border-bottom: none; }
.md-section-title { font-size: .8125rem; font-weight: 700; color: #111827; margin: 0 0 .75rem; }

.md-agenda { list-style: none; display: flex; flex-direction: column; gap: .5rem; padding: 0; margin: 0; }
.md-agenda-item { display: flex; align-items: flex-start; gap: .625rem; }
.ag-num { width: 20px; height: 20px; border-radius: 5px; background: #F3F4F6; color: #6B7280; font-size: .625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ag-content { flex: 1; display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; }
.ag-title { font-size: .8125rem; color: #374151; line-height: 1.4; }
.ag-dur { font-size: .625rem; color: #9CA3AF; font-weight: 600; white-space: nowrap; }

.md-participants { display: flex; flex-direction: column; gap: .5rem; }
.md-participant { display: flex; align-items: center; gap: .625rem; }
.mdp-av { width: 28px; height: 28px; border-radius: 7px; color: #fff; font-size: .575rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mdp-info { flex: 1; }
.mdp-name { display: block; font-size: .8125rem; font-weight: 600; color: #111827; }
.mdp-role { font-size: .6875rem; color: #9CA3AF; }
.mdp-status { font-size: .625rem; font-weight: 700; padding: .15rem .45rem; border-radius: 4px; }
.mdps-confirmed { background: rgba(16,185,129,.1); color: #047857; }
.mdps-pending   { background: #F3F4F6; color: #9CA3AF; }

.md-notes { font-size: .8125rem; color: #374151; line-height: 1.65; background: #FAFAFA; border-radius: 8px; padding: .875rem; }
.md-notes :deep(ul) { margin: .25rem 0; padding-left: 1.25rem; }
.md-notes :deep(p)  { margin: 0 0 .5rem; }
.md-notes :deep(p:last-child) { margin: 0; }
.md-notes :deep(strong) { color: #111827; }

.md-recording { display: flex; gap: .75rem; align-items: center; background: #F9FAFB; border-radius: 10px; padding: .75rem; }
.mdr-thumb { width: 64px; height: 48px; border-radius: 7px; background: #E5E7EB; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #9CA3AF; }
.mdr-thumb svg { width: 40px; height: 30px; }
.mdr-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: .2rem; }
.mdr-title { font-size: .75rem; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mdr-dur { font-size: .625rem; color: #9CA3AF; }
.mdr-btn { margin-top: .3rem; text-decoration: none; }

/* ── Meeting btn-outline inline ── */
.btn-outline { display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .7rem; border-radius: 8px; border: 1.5px solid #D1D5DB; background: #fff; font-size: .75rem; font-weight: 600; color: #374151; cursor: pointer; transition: all .2s; font-family: inherit; }
.btn-outline:hover { border-color: #6458f5; color: #6458f5; }
.btn-sm { font-size: .7rem; }

@media (max-width: 1200px) {
  .overview-grid { grid-template-columns: 1fr; }
  .ov-side { position: static; flex-direction: row; flex-wrap: wrap; }
  .ov-side > * { flex: 1; min-width: 280px; }
  .files-grid { grid-template-columns: 1fr; }
  .meet-grid { grid-template-columns: 1fr; }
  .meet-detail { position: static; }
}
@media (max-width: 900px) {
  .main-wrap { margin-left: 0; }
  .topbar-toggle { display: block; }
  .ws-content { padding: 1.25rem 1rem 3rem; }
  .sidebar-overlay { display: block; }
  .kanban { flex-direction: column; }
  .kb-col { max-width: none; min-width: auto; }
}
@media (max-width: 600px) {
  .form-2col { grid-template-columns: 1fr; }
  .tab-bar { padding: 0 1rem; }
}
</style>
