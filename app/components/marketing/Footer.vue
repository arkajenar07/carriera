<template>
  <footer class="relative z-10 border-t border-[#ece8ff] bg-[#fafafa]">
    <div class="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="text-[26px] font-bold text-[#6458f5]">Carriera <span class="text-[#2d2d2d]">Course</span></div>
        <p class="mt-4 max-w-[260px] text-[15px] leading-7 text-[#777]">
          Carriera helps SMK students gain digital skills and stand out. Learn through simulations and graduate with a career-ready portfolio.
        </p>
        <div class="mt-6 flex gap-3">
          <div v-for="icon in socialIcons" :key="icon" class="flex h-9 w-9 items-center justify-center rounded-full border border-[#ece8ff] bg-white text-[#6458f5] shadow-sm">{{ icon }}</div>
        </div>
      </div>

      <div>
        <h3 class="text-[18px] font-semibold text-[#2d2d2d]">Fitur</h3>
        <ul class="mt-4 space-y-3 text-[15px] text-[#777]">
          <li>Podcast</li>
          <li>Consult Grup</li>
          <li>Business</li>
        </ul>
      </div>

      <div>
        <h3 class="text-[18px] font-semibold text-[#2d2d2d]">Company</h3>
        <ul class="mt-4 space-y-3 text-[15px] text-[#777]">
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Help Center</li>
        </ul>
      </div>

      <div>
        <h3 class="text-[18px] font-semibold text-[#2d2d2d]">Department</h3>
        <ul class="mt-4 space-y-3 text-[15px] text-[#777]">
          <li>Economic</li>
          <li>UMKM</li>
          <li>Blockchain</li>
          <li>Neurology</li>
          <li>Business Lifestyle</li>
          <li>Money Management</li>
        </ul>
      </div>
    </div>

    <div class="mx-auto max-w-[1200px] px-6 pb-8 text-center text-[13px] text-[#777]">
      Copyright © 2026. Carriera Course. All right reserved
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialIcons = ['𝕏', '◎', 'f']
</script>
