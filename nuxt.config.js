// https://nuxt.com/docs/api/configuration/nuxt-config

import { visualizer } from 'rollup-plugin-visualizer'
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
  vite:{
    plugins : [
      //  visualizer({
      //   filename: 'stats.html',  // output file
      //   template: 'treemap',     // sunburst | treemap | network
      //   open: false               // auto-open in browser after build
      // })
    ]
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
  devtools: { enabled: false },
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: "/",
      API_BASE_URL: process.env.API_BASE_URL,
      LOCAL_API_BASE_URL: process.env.LOCAL_API_BASE_URL,
    }
  }
})
