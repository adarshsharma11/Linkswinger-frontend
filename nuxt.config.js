// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app:{
    head:{
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }, 
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap' }
      ]
    },
    baseURL: "/"
  },
  css: [
    '@/assets/scss/app.scss',
  ],
  modules: ['nuxt-icon','@pinia/nuxt','floating-vue/nuxt'],
  pinia: {
    storesDirs: ['./store/**', './custom-folder/store/**'],
  },
  plugins: [
    { src: "~/plugins/plugin.js", mode: "client" } ],
  devtools: { enabled: true },
  nitro: {
    preset: 'static'
  },
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: "/"
    }
  }
})
