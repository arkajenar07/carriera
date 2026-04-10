<template>
  <div class="faq-page">
    <!-- Ambient glows -->
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="faq-main">

      <!-- ══════════════════════ HERO ══════════════════════ -->
      <section class="hero text-center">
        <div class="badge mx-auto">
          <span class="badge-dot"></span>
          Frequently Asked Questions
        </div>
        <h1 class="hero-title max-w-4xl mx-auto">
          Menjawab Semua<br />
          <em class="accent">Keraguanmu.</em>
        </h1>
        <p class="hero-desc mx-auto mt-6">
          Memulai sebuah perjalanan karier yang intensif wajar menimbulkan banyak pertanyaan.
          Kami menjabarkan semuanya di sini tanpa janji manis—hanya ekspektasi yang realisits.
        </p>
      </section>

      <!-- ══════════════════════ FAQ ACCORDION ══════════════════════ -->
      <section class="faq-section">
         <div class="faq-container">
            
            <!-- Kategori 1: Syarat & Kelayakan -->
            <div class="faq-category">
               <h2 class="faq-cat-title">Syarat & Kelayakan</h2>
               
               <div 
                  v-for="(q, index) in faqEligibility" 
                  :key="q.question"
                  class="faq-item"
                  :class="{ 'is-open': openState.eligibility === index }"
               >
                  <button class="faq-question" @click="toggleFaq('eligibility', index)">
                     <span>{{ q.question }}</span>
                     <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </button>
                  <div class="faq-answer-wrapper">
                     <div class="faq-answer">
                        <p>{{ q.answer }}</p>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Kategori 2: Beban Program -->
            <div class="faq-category">
               <h2 class="faq-cat-title">Intensitas & Pengerjaan</h2>
               
               <div 
                  v-for="(q, index) in faqWorkload" 
                  :key="q.question"
                  class="faq-item"
                  :class="{ 'is-open': openState.workload === index }"
               >
                  <button class="faq-question" @click="toggleFaq('workload', index)">
                     <span>{{ q.question }}</span>
                     <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </button>
                  <div class="faq-answer-wrapper">
                     <div class="faq-answer">
                        <p>{{ q.answer }}</p>
                        <div v-if="q.alert" class="faq-alert">
                           <span class="faq-alert-icon">⚠️</span>
                           <span>{{ q.alert }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Kategori 3: Karir & Outcome -->
            <div class="faq-category">
               <h2 class="faq-cat-title">Hasil Simulasi & Lulusan</h2>
               
               <div 
                  v-for="(q, index) in faqCareer" 
                  :key="q.question"
                  class="faq-item"
                  :class="{ 'is-open': openState.career === index }"
               >
                  <button class="faq-question" @click="toggleFaq('career', index)">
                     <span>{{ q.question }}</span>
                     <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </button>
                  <div class="faq-answer-wrapper">
                     <div class="faq-answer">
                        <p>{{ q.answer }}</p>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>

      <!-- ══════════════════════ NEED HELP (DARK SECTION) ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="help-box">
             <div class="hb-left">
                <div class="section-label section-label-light">
                  <span class="label-dot label-dot-light"></span>
                  Masih Ragu?
                </div>
                <h2 class="section-title section-title-light">
                  Konsultasikan <em class="accent-light">Kondisimu.</em>
                </h2>
                <p class="section-desc section-desc-light">
                  Kami mengerti setiap orang punya kesibukan dan latar belakang berbeda. Jika kamu bingung apakah program ini tepat untukmu saat ini, mari jadwalkan diskusi tatap muka 15 menit dengan tim kurikulum kami secara gratis.
                </p>
             </div>
             
             <div class="hb-right">
                <button class="btn-primary btn-lg w-full justify-center">
                   Jadwalkan Konsultasi 
                   <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </button>
                <div class="hb-contact mt-4 text-center">
                   <p class="text-sm text-gray-400">Atau hubungi kami via WhatsApp</p>
                   <a href="#" class="text-[#A5B4FC] font-semibold mt-1 inline-block hover:underline">+62 812-3456-7890</a>
                </div>
             </div>
          </div>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

useSeoMeta({
  title: 'FAQ Carriera — Jawaban Jujur Seputar Program Kelayakan',
  description: 'Temukan jawaban untuk pertanyaan umum terkait kurikulum, sistem pengerjaan project, jaminan karier, dan intensitas program Carriera.'
})

// State untuk accordion management supaya auto-close yang lain
const openState = reactive({
   eligibility: 0, // Buka pertanyaan pertama default
   workload: -1,
   career: -1
})

const toggleFaq = (category: 'eligibility' | 'workload' | 'career', index: number) => {
   if (openState[category] === index) {
      openState[category] = -1 // Tutup jika di-klik lagi
   } else {
      openState[category] = index // Buka yang di-klik
   }
}

// Data FAQ
const faqEligibility = [
   {
      question: "Sebenarnya program ini cocok untuk siapa?",
      answer: "Program ini sangat ideal untuk: 1) Fresh graduate yang sulit tembus lamaran karena portofolio kurang meyakinkan. 2) Pekerja di bidang lain yang ingin banting setir (career switch) secara serius. 3) Mahasiswa IT yang merasa kampus terlalu teoritis dan butuh pengalaman bikin produk nyata."
   },
   {
      question: "Apakah saya harus sudah bisa coding atau UI/UX design sebelumnya?",
      answer: "Tidak wajib mahir, tapi harus punya pemahaman dasar (basic computer literacy). Program ini BUKAN dari nol besar (absolute beginner). Kami menyediakan prep-course gratis 2 minggu sebelum program utama dimulai untuk menyamakan fondasi. Jika kamu gagal di ujian akhir prep-course, kamu belum bisa masuk program utama."
   },
   {
      question: "Saya pekerja full-time, apakah jadwalnya fleksibel?",
      answer: "Materi belajar direkam (async) sehingga bisa ditonton kapan saja. Namun, Weekly Sync (Code Review & Design Critique) dilakukan pada akhir pekan. Kamu harus bersedia mengalokasikan minimal 15-20 jam seminggu. Kami sangat tidak menyarankan mengambil jalur Fast-Track jika kamu bekerja full-time."
   }
]

const faqWorkload = [
   {
      question: "Seberapa berat beban pengerjaan project-nya?",
      answer: "Sangat intens. Kami bilang ini 'Simulasi Kerja' dan bukan 'Kursus'. Setiap minggu ada timeline (sprint) yang ketat. Jika kamu tertinggal 2 sprint berturut-turut, kamu akan dipanggil untuk 1-on-1 dengan mentor.",
      alert: "Ini bukan program untuk yang hanya ingin sekadar tahu (casual learner)."
   },
   {
      question: "Bagaimana sistem deadline dan revisi berfungsi?",
      answer: "Sebuah project brief akan turun di hari Senin. Hari Kamis adalah soft-deadline untuk pengajuan Pull Request / Draf Figma pertama. Weekend adalah sesi Review. Mentor akan memberikan list revisi, dan kamu wajib menyelesaikannya (Merge) sebelum siklus sprint baru dimulai."
   },
   {
      question: "Apa bedanya project Carriera dari hasil kursus biasa?",
      answer: "Project di sini tidak punya 1 cara pengerjaan yang benar. Kami tidak memberikan tutorial langkah-demi-langkah (clone App A). Kami berikan Problem Business dan Requirement. Tech stack kamu tentukan sendiri. Cara implementasi database atau struktur UI kamu susun sendiri lalu dipertahankan argumennya saat di-review."
   }
]

const faqCareer = [
   {
      question: "Apakah setelah lulus program ini saya otomatis bisa kerja?",
      answer: "Kami BUKAN lembaga penyalur kerja. Kami adalah penyedia tempat berlatih dan simulasi. Kami membekalimu dengan mindset adaptif dan portofolio tingkat enterprise seakan pengalaman kerja nyata. Mendapatkan pekerjaan murni adalah hasil dari usahamu di industri."
   },
   {
      question: "Apakah akan ada simulasi klien dunia nyata?",
      answer: "Ya. Studi kasus yang kamu hadapi dirancang persis dengan requirement dari industri. Terkadang kami mengikutsertakan masukan langsung dari praktisi profesional untuk memberikan standar evaluasi yang tidak memanjakan agar mental kamu terbentuk."
   },
   {
      question: "Jika sudah lulus, apakah akses komunitas langsung hilang?",
      answer: "Tidak. Kamu berstatus 'Alumni' selamanya. Kamu tetap punya akses ke kolaborasi lanjutan, channel diskusi industri di Discord, serta resource pengembangan tanpa jeda."
   }
]

</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.faq-page {
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
.faq-main { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 2rem 2rem 6rem; }

/* ════════════════ TOKENS ════════════════ */
.section { margin-top: 7rem; }
.section-label { display: inline-flex; align-items: center; gap: .5rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6458f5; margin-bottom: 1.125rem; }
.section-label-light { color: #A5B4FC; }
.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; flex-shrink: 0; }
.label-dot-light { background: #A5B4FC; }
.section-title { font-size: clamp(1.75rem, 3.2vw, 2.75rem); font-weight: 300; line-height: 1.2; letter-spacing: -.025em; color: #111827; margin-bottom: .875rem; }
.section-title-light { color: #F9FAFB; }
.section-desc { font-size: 1.0625rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 2rem; }
.section-desc-light { color: #818CF8; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* ── Buttons ── */
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; height: 48px; padding: 0 1.75rem; border-radius: 9999px; background: #6458f5; color: white; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 10px 30px rgba(100,88,245,.25); }
.btn-primary:hover { background: #5448e0; box-shadow: 0 16px 40px rgba(100,88,245,.35); transform: translateY(-1px); }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr { transform: translateX(3px); }

/* ════════════════ HERO ════════════════ */
.hero { padding: 4rem 0 2rem; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; line-height: 1.1; letter-spacing: -.035em; color: #111827; }
.badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(99,88,245,.2); background: rgba(99,88,245,.04); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #6458f5; margin-bottom: 2rem; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }

/* ════════════════ FAQ ACCORDION ════════════════ */
.faq-section { max-width: 800px; margin: 4rem auto 0; }
.faq-category { margin-bottom: 3.5rem; }
.faq-cat-title { font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 2px solid #F3F4F6;}

.faq-item {
   background: #fff;
   border: 1px solid #E5E7EB;
   border-radius: 16px;
   margin-bottom: 1rem;
   overflow: hidden;
   transition: border-color 0.3s, box-shadow 0.3s;
}
.faq-item.is-open { border-color: rgba(99,88,245, 0.3); box-shadow: 0 10px 20px rgba(0,0,0,0.02); }

.faq-question {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1.5rem 1.75rem;
   background: none;
   border: none;
   cursor: pointer;
   font-family: inherit;
   font-size: 1.0625rem;
   font-weight: 600;
   color: #111827;
   text-align: left;
   transition: background 0.2s;
}
.faq-question:hover { background: #FAFAFA; }
.faq-icon {
   width: 20px;
   height: 20px;
   color: #9CA3AF;
   transition: transform 0.3s ease;
   flex-shrink: 0;
   margin-left: 1rem;
}
.faq-item.is-open .faq-icon { transform: rotate(180deg); color: #6458f5; }

.faq-answer-wrapper {
   display: grid;
   grid-template-rows: 0fr;
   transition: grid-template-rows 0.3s ease-out;
}
.faq-item.is-open .faq-answer-wrapper { grid-template-rows: 1fr; }
.faq-answer {
   overflow: hidden;
   padding: 0 1.75rem;
   font-size: 0.9375rem;
   line-height: 1.7;
   color: #4B5563;
   opacity: 0;
   transition: opacity 0.2s ease-out, padding 0.3s;
}
.faq-item.is-open .faq-answer {
   opacity: 1;
   padding: 0 1.75rem 1.5rem 1.75rem;
}
.faq-alert {
   margin-top: 1rem;
   background: #FFF7ED;
   border: 1px solid #FFEDD5;
   padding: 0.75rem 1rem;
   border-radius: 8px;
   display: flex;
   gap: 0.5rem;
   font-size: 0.8125rem;
   color: #9A3412;
   font-weight: 500;
   align-items: flex-start;
}
.faq-alert-icon { font-size: 1rem; }


/* ════════════════ HELP / CONTACT (DARK) ════════════════ */
.dark-section { border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.dark-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent); }
.dark-inner { padding: 5rem 4rem; position: relative; }

.help-box {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 4rem;
}
.hb-left { flex: 1; }
.hb-left .section-desc { margin-bottom: 0; }
.hb-right { width: 300px; flex-shrink: 0;}

@media (max-width: 860px) {
   .dark-inner { padding: 3.5rem 2rem; }
   .help-box { flex-direction: column; text-align: center; gap: 2.5rem;}
   .hb-left { display: flex; flex-direction: column; align-items: center; }
   .hb-right { width: 100%; max-width: 320px; }
}

</style>
