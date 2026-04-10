export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Carriera',
      meta: [
        { name: 'description', content: 'Platform belajar online terbaik' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap'
        }
      ]
    }
  },

  modules: ['@nuxtjs/tailwindcss']
})