<template>
  <footer class="relative z-10 border-t border-[#f0f0f0] bg-white pt-16 pb-8 md:pt-24 md:pb-12 mt-16 md:mt-24">
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-12 mb-16">
        <div class="lg:col-span-5">
          <div class="text-[28px] font-bold text-[#6458f5] tracking-tight">Carriera<span class="text-[#2d2d2d]">Course</span></div>
          <p class="mt-6 max-w-[320px] text-[16px] leading-[1.7] text-[#666]">
            Platform belajar interaktif bagi siswa SMK untuk mengasah digital skill melalui simulasi nyata dan membangun portfolio yang siap kerja.
          </p>
          <div class="mt-8 flex gap-4">
            <a href="#" aria-label="Twitter" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0f0f0] bg-[#fafafa] text-[#666] transition-all hover:border-[#6458f5] hover:bg-[#6458f5] hover:text-white hover:shadow-[0_8px_20px_rgba(100,88,245,0.25)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0f0f0] bg-[#fafafa] text-[#666] transition-all hover:border-[#6458f5] hover:bg-[#6458f5] hover:text-white hover:shadow-[0_8px_20px_rgba(100,88,245,0.25)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0f0f0] bg-[#fafafa] text-[#666] transition-all hover:border-[#6458f5] hover:bg-[#6458f5] hover:text-white hover:shadow-[0_8px_20px_rgba(100,88,245,0.25)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0f0f0] bg-[#fafafa] text-[#666] transition-all hover:border-[#6458f5] hover:bg-[#6458f5] hover:text-white hover:shadow-[0_8px_20px_rgba(100,88,245,0.25)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h3 class="text-[17px] font-bold text-[#2d2d2d] mb-6">Fitur</h3>
          <ul class="space-y-4 text-[15px] font-medium text-[#666]">
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Podcast</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Consult Grup</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Business</NuxtLink></li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h3 class="text-[17px] font-bold text-[#2d2d2d] mb-6">Company</h3>
          <ul class="space-y-4 text-[15px] font-medium text-[#666]">
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">About Us</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Help Center</NuxtLink></li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-[17px] font-bold text-[#2d2d2d] mb-6">Department</h3>
          <ul class="space-y-4 text-[15px] font-medium text-[#666]">
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Economic</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">UMKM</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Blockchain</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Neurology</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Business Lifestyle</NuxtLink></li>
            <li><NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Money Management</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between border-t border-[#f0f0f0] pt-8 text-[14px] text-[#888]">
        <p>Copyright &copy; {{ new Date().getFullYear() }} Carriera Course. All rights reserved.</p>
        <div class="mt-4 md:mt-0 flex items-center gap-6">
          <NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Privacy</NuxtLink>
          <NuxtLink to="#" class="transition-colors hover:text-[#6458f5]">Terms</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>
