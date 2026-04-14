<template>
  <header class="relative z-50 mx-auto max-w-[1200px] px-4 pt-4 md:px-6">
    <div class="flex items-center justify-between rounded-2xl md:rounded-full bg-white/90 p-4 md:px-6 md:py-4 shadow-[0_8px_30px_rgba(96,72,255,0.04)] backdrop-blur border border-white/50">
      <div class="flex items-center gap-3 w-32">
        <NuxtLink to="/">
          <img :src="logo" alt="Logo" class="h-auto w-full object-contain" />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8 text-[15px] text-[#2d2d2d]">
        <div v-for="item in navItems" :key="item.linkText" class="relative group">
          
          <!-- Normal Link -->
          <NuxtLink
            v-if="!item.children"
            :to="item.href"
            class="transition duration-300 hover:text-[#6458f5] font-semibold"
          >
            {{ item.linkText }}
          </NuxtLink>

          <!-- Dropdown -->
          <div v-else>
            <button class="flex items-center gap-1.5 transition duration-300 hover:text-[#6458f5] font-semibold pb-1 border-b-2 border-transparent group-hover:border-[#6458f5]">
              {{ item.linkText }}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:-rotate-180"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute left-1/2 top-full mt-2 hidden w-48 -translate-x-1/2 rounded-2xl bg-white p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] opacity-0 translate-y-3 group-hover:block group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-[#f0f0f0] z-50 before:content-[''] before:-top-4 before:left-0 before:h-4 before:w-full">
              <NuxtLink
                v-for="child in item.children"
                :key="child.href"
                :to="child.href"
                class="block rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#444] transition-all hover:bg-[#f7f5ff] hover:text-[#6458f5] hover:pl-5"
              >
                {{ child.linkText }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Desktop Auth -->
      <div class="hidden md:flex items-center gap-3">
        <NuxtLink to="/login" class="h-11 rounded-full border border-[#e7e4ff] bg-white px-6 text-[14px] font-bold text-[#2d2d2d] shadow-sm transition-all hover:bg-[#f7f5ff] hover:border-[#d1ccff] flex items-center justify-center">
          Masuk
        </NuxtLink>
        <NuxtLink to="/register" class="h-11 rounded-full bg-[#6458f5] px-6 text-[14px] font-bold text-white shadow-[0_12px_30px_rgba(100,88,245,0.25)] transition-all hover:bg-[#5548eb] hover:shadow-[0_12px_30px_rgba(100,88,245,0.35)] flex items-center justify-center gap-1.5 group">
          <span>Daftar</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="flex md:hidden items-center justify-center h-11 w-11 border border-[#e7e4ff] bg-white rounded-full text-[#444] shadow-sm transition hover:bg-[#f7f5ff]"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <transition name="fade" mode="out-in">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </transition>
      </button>

    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="slide-fade">
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute left-4 right-4 top-[92px] rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#f0f0f0] p-6 flex flex-col gap-4 z-40 transform origin-top"
      >
        <nav class="flex flex-col space-y-2">
          <template v-for="item in navItems" :key="item.linkText">
            
            <NuxtLink
              v-if="!item.children"
              :to="item.href"
              class="block py-3 px-4 rounded-xl text-[16px] font-bold text-[#2d2d2d] transition-colors hover:bg-[#f7f5ff] hover:text-[#6458f5]"
              @click="isMobileMenuOpen = false"
            >
              {{ item.linkText }}
            </NuxtLink>
            
            <div v-else class="py-1">
              <div class="px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-[#999]">
                {{ item.linkText }}
              </div>
              <div class="flex flex-col mt-1 space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.href"
                  :to="child.href"
                  class="block py-2.5 px-6 rounded-xl text-[15px] font-semibold text-[#555] transition-colors hover:bg-[#f7f5ff] hover:text-[#6458f5]"
                  @click="isMobileMenuOpen = false"
                >
                  {{ child.linkText }}
                </NuxtLink>
              </div>
            </div>
            
          </template>
        </nav>

        <div class="h-px w-full bg-[#f0f0f0] my-2"></div>

        <div class="flex flex-col gap-3">
          <NuxtLink to="/login" class="h-12 w-full rounded-xl border border-[#e7e4ff] bg-white text-[15px] font-bold text-[#2d2d2d] flex items-center justify-center transition-colors hover:bg-[#f7f5ff]" @click="isMobileMenuOpen = false">
            Masuk
          </NuxtLink>
          <NuxtLink to="/register" class="h-12 w-full rounded-xl bg-[#6458f5] text-[15px] font-bold text-white shadow-md flex items-center justify-center gap-2 transition-colors hover:bg-[#5548eb]" @click="isMobileMenuOpen = false">
            <span>Daftar Sekarang</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '~/assets/images/logo-pc.png'

const isMobileMenuOpen = ref(false)

const navItems = [
  { linkText: 'Beranda', href: '/' },
  { linkText: 'Community', href: '/community' },
  { linkText: 'How It Works', href: '/how-it-works' },

  {
    linkText: 'Program',
    children: [
      { linkText: 'Portfolio', href: '/portfolio' },
      { linkText: 'Roadmap', href: '/roadmap' },
    ],
  },

  { linkText: 'Pricing', href: '/pricing' },

  {
    linkText: 'Lainnya',
    children: [
      { linkText: 'About', href: '/about' },
      { linkText: 'FAQ', href: '/faq' },
    ],
  },
]
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px) scale(0.98);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
