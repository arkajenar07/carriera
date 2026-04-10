<template>
  <div class="pricing-page">
    <div class="bg-ambients" aria-hidden="true">
      <div class="ambient ambient-tl"></div>
      <div class="ambient ambient-tr"></div>
      <div class="ambient ambient-bl"></div>
    </div>
    <div class="bg-grid" aria-hidden="true"></div>

    <MarketingHeader class="z-header" />

    <main class="pricing-main">

      <!-- ══════════════════════ HERO ══════════════════════ -->
      <section class="hero text-center">
        <div class="badge mx-auto">
          <span class="badge-dot"></span>
          Investasi Karier
        </div>
        <h1 class="hero-title max-w-4xl mx-auto">
          Harga Transparan.<br />
          <em class="accent">Tanpa Biaya Tersembunyi.</em>
        </h1>
        <p class="hero-desc mx-auto mt-6">
          Pilih sistem pembayaran yang sesuai dengan kondisimu. Kualitas materi, review mentor, dan akses jaringan komunitas tidak dibedakan. Semua mendapatkan pengalaman <i>end-to-end</i>.
        </p>
      </section>

      <!-- ══════════════════════ PRICING CARDS ══════════════════════ -->
      <section class="pricing-section">
         <div class="pricing-grid">
            
            <!-- Plan 1: Reguler -->
            <div class="pricing-card">
               <div class="pc-header">
                  <h3 class="pc-title">Reguler</h3>
                  <p class="pc-desc">Investasi langsung untuk akses program penuh tanpa terikat pembagian gaji.</p>
               </div>
               <div class="pc-price">
                  <span class="p-currency">Rp</span>
                  <span class="p-amount">12.5</span>
                  <span class="p-million">Juta</span>
               </div>
               <p class="pc-sub-price">Bisa dicicil 3x hingga 6x (Bunga 0%)</p>
               
               <a href="#daftar" class="btn-primary w-full justify-center mt-6">
                  Daftar Reguler
                  <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </a>
               
               <div class="pc-features">
                  <div class="feat-item" v-for="f in regulerFeatures" :key="f">
                     <svg class="feat-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                     <span>{{ f }}</span>
                  </div>
               </div>
            </div>

            <!-- Plan 2: ISA (Highlighted) -->
            <div class="pricing-card pc-highlight">
               <div class="pc-badge">Paling Diminati</div>
               <div class="pc-header">
                  <h3 class="pc-title text-white">ISA (Bagi Hasil)</h3>
                  <p class="pc-desc text-white/70">Ikuti program tanpa biaya di depan. Pembayaran dilakukan secara mencicil setelah kamu memasuki industri atau memiliki pendapatan.</p>
               </div>
               <div class="pc-price text-white">
                  <span class="p-currency">Rp</span>
                  <span class="p-amount">0</span>
                  <span class="p-million text-white/50">Di awal</span>
               </div>
               <p class="pc-sub-price text-white/80">Potongan 15% dari Gaji / Bulan selama 12x</p>
               
               <a href="#apply" class="btn-isa w-full justify-center mt-6">
                  Apply ISA
                  <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </a>
               
               <div class="pc-features pc-features-light">
                  <div class="feat-item" v-for="f in isaFeatures" :key="f">
                     <svg class="feat-icon text-[#8b83ff]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                     <span>{{ f }}</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      <!-- ══════════════════════ APA YANG DIDAPAT (ROLES) ══════════════════════ -->
      <section class="section">
         <div class="section-label">
           <span class="label-dot"></span>
           Termasuk dalam Biaya
         </div>
         <h2 class="section-title">
           Semua Akses <em class="accent">16 Minggu Simulasi.</em>
         </h2>
         <p class="section-desc">
           Tidak ada materi (*upsell*) tambahan. Semua yang kamu butuhkan untuk dari tahap onboarding hingga kelulusan program sudah termasuk di dalam paket pilihanmu.
         </p>
         
         <div class="includes-grid">
            <div class="inc-card">
               <div class="inc-icon">📚</div>
               <h3 class="inc-title">Prep-Course 2 Minggu</h3>
               <p class="inc-desc">Materi sinkronisasi untuk menyamakan pondasi tech & mindset sebelum bootcamp intensif dimulai.</p>
            </div>
            <div class="inc-card">
               <div class="inc-icon">👥</div>
               <h3 class="inc-title">1-on-1 Mentor Session</h3>
               <p class="inc-desc">Sesi privat minimal 2x seminggu untuk membedah kelemahan teknis & review progres capstone.</p>
            </div>
            <div class="inc-card">
               <div class="inc-icon">🌐</div>
               <h3 class="inc-title">Real-World Capstone</h3>
               <p class="inc-desc">Mengerjakan proyek berbasis brief riil perusahaan rekanan kami untuk melengkapi portofolio enterprise.</p>
            </div>
            <div class="inc-card">
               <div class="inc-icon">💼</div>
               <h3 class="inc-title">Career Preparation</h3>
               <p class="inc-desc">Mock interview, bedah resume, optimasi LinkedIn, dan referensi jika kamu mencapai standar kualitas industri.</p>
            </div>
         </div>
      </section>

      <!-- ══════════════════════ PERBANDINGAN VALUE (DARK SECTION) ══════════════════════ -->
      <section class="section dark-section">
        <div class="dark-inner">
          <div class="section-label section-label-light text-center w-full block mb-2">
            <span class="label-dot label-dot-light"></span>
            Value Comparison
          </div>
          <h2 class="section-title section-title-light text-center">
            Lebih Murah dari <em class="accent-light">Kerugian Salah Pilih.</em>
          </h2>
          
          <div class="comparison-table mt-12 overflow-x-auto">
             <table class="w-full text-left min-w-[600px]">
                <thead>
                   <tr>
                      <th class="py-4 px-6 text-[#9CA3AF] font-semibold">Aspek</th>
                      <th class="py-4 px-6 text-white font-semibold bg-[#1E293B]/50 rounded-tl-xl rounded-tr-xl border-x border-t border-white/5">Carriera</th>
                      <th class="py-4 px-6 text-[#6B7280] font-semibold">Bootcamp Generik</th>
                   </tr>
                </thead>
                <tbody class="text-sm">
                   <tr v-for="(row, i) in comparisonData" :key="i" class="border-b border-white/5">
                      <td class="py-5 px-6 font-medium text-[#D1D5DB]">{{ row.aspect }}</td>
                      <td class="py-5 px-6 font-medium text-[#A5B4FC] bg-[#1E293B]/50 border-x border-white/5">{{ row.carriera }}</td>
                      <td class="py-5 px-6 text-[#6B7280]">{{ row.generic }}</td>
                   </tr>
                </tbody>
             </table>
          </div>
        </div>
      </section>

      <!-- ══════════════════════ FAQ KHUSUS PRICING ══════════════════════ -->
      <section class="section max-w-3xl mx-auto">
         <h2 class="section-title text-center mb-10">FAQ: Pembayaran & ISA</h2>
         
         <div 
            v-for="(q, index) in pricingFAQ" 
            :key="q.question"
            class="faq-item"
            :class="{ 'is-open': openFaq === index }"
         >
            <button class="faq-question" @click="openFaq = openFaq === index ? -1 : index">
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
      </section>

      <!-- ══════════════════════ CTA ══════════════════════ -->
      <section class="cta-section text-center" id="apply">
        <div class="cta-glow" aria-hidden="true"></div>
        <div class="cta-inner">
          <div class="cta-badge mx-auto">
            <span class="label-dot label-dot-light"></span>
            Tahap Intake
          </div>
          <h2 class="cta-title">
            Kursi Dibatasi Agar<br />
            <em class="cta-accent">Kualitas Tetap Terjaga.</em>
          </h2>
          <p class="cta-desc mx-auto mt-4">
            Kami hanya menerima 20 orang per angkatan. Pendaftaran tidak berarti otomatis diterima; kamu perlu melewati tes logika singkat untuk memastikan kesiapan program intensif.
          </p>

          <div class="cta-actions justify-center mt-8">
            <button class="btn-primary btn-lg">
              Isi Form Pendaftaran (5 Menit)
              <svg class="btn-arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

    </main>

    <MarketingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Paket & Harga Carriera — Investasi Program Reguler & ISA',
  description: 'Informasi transparan mengenai biaya pendaftaran program Carriera. Tersedia opsi Reguler (langsung lunas/cicilan) dan skema ISA (Bayar Setelah Kerja).'
})

const openFaq = ref(0) // Default open first FAQ

const regulerFeatures = [
   "Akses materi & modul seumur hidup", 
   "16 Minggu Code & Design Review mingguan",
   "1-on-1 private mentoring tanpa batas",
   "Fasilitas mock interview & optimasi CV",
   "Akses referral & komunitas pasca-lulus",
   "Cicilan bank bunga 0%"
]

const isaFeatures = [
   "Semua fitur di paket Reguler TERMASUK",
   "Tanpa biaya pendaftaran & SPP di awal",
   "Pembayaran dimulai hanya setelah kamu punya pendapatan mandiri",
   "Sistem cicilan menyesuaikan batas pendapatan",
   "Sesi mock-interview intensif khusus"
]

const comparisonData = [
   { aspect: "Mentorship", carriera: "Sesi 1-on-1 dengan Senior level.", generic: "Asisten instruktur (freshgrad) yang menjawab massal." },
   { aspect: "Porsi Portofolio", carriera: "Real business case. Berbeda untuk setiap siswa.", generic: "Clone Spotify/Netflix. Sama persis sekelas." },
   { aspect: "Standard Review", carriera: "Pull Request bedah per baris kode & architecture.", generic: "App jalan = Lulus = Sertifikat." },
   { aspect: "Persiapan Karier", carriera: "Koneksi ke praktisi dan penajaman portfolio industri.", generic: "Sekadar di-blast CV-nya dengan iming-iming 'dijamin salur'." }
]

const pricingFAQ = [
   { question: "Apa syarat utama untuk mendaftar program ISA (Bagi Hasil)?", answer: "Kamu harus lolos tiga tahap seleksi: Ujian Logika & Technical Assessment, Interview Komitmen Belajar dengan tim Admissions, serta verifikasi kelengkapan dokumen pendukung." },
   { question: "Berapa lama batas maksimal skema pembayaran ISA berlaku?", answer: "Kontrak ISA memiliki batas waktu (Drop-dead date) 36 bulan sejak kamu lulus. Jika selama masa itu penghasilanmu belum konsisten melebihi batas pembayaran, sisa cicilan akan diputihkan." },
   { question: "Jika di tengah jalan saya berhenti (keluar), apakah saya masih harus bayar?", answer: "Kamu bisa keluar tanpa penalti finansial selama masa percobaan (Prep-course 2 minggu awal). Lewat dari itu, akan dikenakan biaya prorata sesuai jumlah minggu yang sudah kamu jalani." },
   { question: "Apakah ada biaya di luar harga yang tertera?", answer: "Sama sekali tidak. Tidak ada hidden fee, biaya server, biaya sertifikat, dsb. Hanya saja pastikan kamu memiliki device (laptop/PC) pribadi dengan koneksi internet yang memadai." }
]
</script>

<style scoped>
/* ════════════════ BASE ════════════════ */
.pricing-page {
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
.pricing-main { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 2rem 2rem 6rem; }

/* ════════════════ TOKENS ════════════════ */
.section { margin-top: 7rem; }
.section-label { display: inline-flex; align-items: center; gap: .5rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #6458f5; margin-bottom: 1.125rem; }
.section-label-light { color: #A5B4FC; }
.label-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; flex-shrink: 0; }
.label-dot-light { background: #A5B4FC; }
.section-title { font-size: clamp(1.75rem, 3.2vw, 2.75rem); font-weight: 300; line-height: 1.2; letter-spacing: -.025em; color: #111827; margin-bottom: .875rem; }
.section-title-light { color: #F9FAFB; }
.section-desc { font-size: 1.0625rem; font-weight: 300; line-height: 1.75; color: #6B7280; margin-bottom: 2rem; }
.accent { font-style: italic; font-weight: 700; color: #6458f5; }
.accent-light { font-style: italic; font-weight: 700; color: #818CF8; }

/* ── Buttons ── */
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; height: 48px; padding: 0 1.75rem; border-radius: 9999px; background: #6458f5; color: white; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 10px 30px rgba(100,88,245,.25); text-decoration: none;}
.btn-primary:hover { background: #5448e0; box-shadow: 0 16px 40px rgba(100,88,245,.35); transform: translateY(-1px); }
.btn-isa { display: inline-flex; align-items: center; gap: .5rem; height: 48px; padding: 0 1.75rem; border-radius: 9999px; background: white; color: #0F172A; font-size: .875rem; font-weight: 600; border: none; cursor: pointer; transition: all .25s; text-decoration: none;}
.btn-isa:hover { background: #FAFAFA; transform: translateY(-1px); }
.btn-lg { height: 52px; padding: 0 2rem; font-size: .9375rem; }
.btn-arr { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover .btn-arr, .btn-isa:hover .btn-arr { transform: translateX(3px); }

/* ════════════════ HERO ════════════════ */
.hero { padding: 4rem 0 2rem; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; line-height: 1.1; letter-spacing: -.035em; color: #111827; }
.badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(99,88,245,.2); background: rgba(99,88,245,.04); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #6458f5; margin-bottom: 2rem; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6458f5; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(.8);} }

/* ════════════════ PRICING CARDS ════════════════ */
.pricing-section { max-width: 900px; margin: 0 auto; }
.pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;}
@media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr; align-items: stretch;} }

.pricing-card {
   background: white; border: 1px solid #E5E7EB; border-radius: 24px; padding: 3rem 2rem; position: relative;
}
.pc-highlight { background: #0F172A; border: 1px solid #334155; transform: scale(1.05); box-shadow: 0 24px 64px -12px rgba(99,88,245,0.4); }
@media (max-width: 768px) { .pc-highlight { transform: scale(1); } }

.pc-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #6458f5, #8b83ff); color: white; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 1rem; border-radius: 9999px; letter-spacing: 0.05em; text-transform: uppercase; }

.pc-title { font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
.pc-desc { font-size: 0.875rem; color: #6B7280; line-height: 1.5; min-height: 45px;}

.pc-price { display: flex; align-items: baseline; gap: 0.25rem; margin-top: 2rem; }
.p-currency { font-size: 1.5rem; font-weight: 600; }
.p-amount { font-size: 4rem; font-weight: 800; line-height: 1; letter-spacing: -0.05em; }
.p-million { font-size: 1rem; font-weight: 500; color: #9CA3AF; margin-left: 0.25rem;}
.pc-sub-price { font-size: 0.8125rem; color: #6B7280; margin-top: 0.5rem; font-weight: 500;}

.pc-features { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
.feat-item { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.875rem; color: #4B5563; line-height: 1.5; }
.pc-features-light .feat-item { color: #E2E8F0; }
.feat-icon { width: 20px; height: 20px; color: #6458f5; flex-shrink: 0; }

/* ════════════════ WHAT YOU GET ════════════════ */
.includes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem;}
@media (max-width: 900px) { .includes-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .includes-grid { grid-template-columns: 1fr; } }

.inc-card { background: white; border: 1px solid #E5E7EB; border-radius: 16px; padding: 1.5rem; }
.inc-icon { font-size: 1.75rem; margin-bottom: 1rem; }
.inc-title { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
.inc-desc { font-size: 0.8125rem; color: #6B7280; line-height: 1.6; }

/* ════════════════ VALUE COMPARISON (DARK) ════════════════ */
.dark-section { border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.dark-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.5), transparent); }
.dark-inner { padding: 5rem 4rem; position: relative; }
@media (max-width: 640px) { .dark-inner { padding: 3.5rem 1.5rem; } }

/* ════════════════ FAQ ACCORDION ════════════════ */
.faq-item { background: #fff; border: 1px solid #E5E7EB; border-radius: 16px; margin-bottom: 1rem; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; }
.faq-item.is-open { border-color: rgba(99,88,245, 0.3); box-shadow: 0 10px 20px rgba(0,0,0,0.02); }
.faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 1.75rem; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 1.0625rem; font-weight: 600; color: #111827; text-align: left; transition: background 0.2s; }
.faq-question:hover { background: #FAFAFA; }
.faq-icon { width: 20px; height: 20px; color: #9CA3AF; transition: transform 0.3s ease; flex-shrink: 0; margin-left: 1rem; }
.faq-item.is-open .faq-icon { transform: rotate(180deg); color: #6458f5; }
.faq-answer-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; }
.faq-item.is-open .faq-answer-wrapper { grid-template-rows: 1fr; }
.faq-answer { overflow: hidden; padding: 0 1.75rem; font-size: 0.9375rem; line-height: 1.7; color: #4B5563; opacity: 0; transition: opacity 0.2s ease-out, padding 0.3s; }
.faq-item.is-open .faq-answer { opacity: 1; padding: 0 1.75rem 1.5rem 1.75rem; }

/* ════════════════ CTA ════════════════ */
.cta-section { margin-top: 7rem; padding: 6rem 2rem; border-radius: 28px; background: #0F172A; overflow: hidden; position: relative; }
.cta-glow { position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 60%; height: 120%; background: radial-gradient(circle, rgba(99,88,245,.15) 0%, transparent 60%); pointer-events: none; }
.cta-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(to right, transparent, rgba(99,88,245,.4), transparent); }
.cta-inner { position: relative; }
.cta-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #A5B4FC; margin-bottom: 1.25rem; }
.cta-title { font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 300; line-height: 1.15; letter-spacing: -.03em; color: #F9FAFB; }
.cta-accent { font-style: italic; font-weight: 800; background: linear-gradient(135deg, #818CF8, #A5B4FC); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cta-desc { font-size: 1rem; font-weight: 300; line-height: 1.75; color: #818CF8; max-width: 500px;}
</style>
