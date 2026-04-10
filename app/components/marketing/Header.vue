<template>
  <header class="relative z-10 mx-auto max-w-[1200px] px-6 pt-4">
    <div class="flex items-center justify-between rounded-full bg-white/90 p-5 shadow-[0_8px_30px_rgba(96,72,255,0.04)] backdrop-blur">
      <div class="flex items-center gap-3 w-32">
        <img :src="logo" alt="Logo" class="h-auto w-full object-contain" />
      </div>

      <nav class="hidden items-center gap-6 text-[15px] text-[#2d2d2d] md:flex">
  <div v-for="item in navItems" :key="item.linkText" class="relative group">
    
    <!-- Normal Link -->
    <a
      v-if="!item.children"
      :href="item.href"
      class="transition hover:text-[#6458f5]"
    >
      {{ item.linkText }}
    </a>

    <!-- Dropdown -->
    <div v-else>
      <button class="flex items-center gap-1 transition hover:text-[#6458f5]">
        {{ item.linkText }}
        <span class="text-xs">▼</span>
      </button>

      <div class="absolute left-0 top-full mt-2 hidden min-w-[160px] rounded-xl bg-white p-3 shadow-lg group-hover:block">
        <a
          v-for="child in item.children"
          :key="child.href"
          :href="child.href"
          class="block rounded-md px-3 py-2 text-sm hover:bg-[#f5f5ff]"
        >
          {{ child.linkText }}
        </a>
      </div>
    </div>

  </div>
</nav>

      <div class="flex items-center gap-3">
        <NuxtLink to="/login" class="h-10 rounded-full border border-[#e7e4ff] bg-white px-5 text-[14px] font-medium text-[#2d2d2d] shadow-sm transition hover:bg-[#f7f5ff]">
          Masuk
        </NuxtLink>
        <NuxtLink to="/register" class="h-10 rounded-full bg-[#6458f5] px-5 text-[14px] font-medium text-white shadow-[0_12px_30px_rgba(100,88,245,0.25)] transition hover:bg-[#5548eb]">
          ✨ Daftar
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '~/assets/images/logo-pc.png'


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
