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
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=AW-17646009228', async: true },
        { children: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-17646009228');", type: 'text/javascript', charset: 'utf-8' }
      ],
      // meta: [
      //   { charset: 'utf-8' },
      //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      //   { hid: 'description', name: 'description', content: 'LinkSwinger is a free link management tool that allows you to shorten, manage, and track your links with ease. Perfect for marketers, businesses, and anyone looking to optimize their online presence.' },
      //   { name: 'format-detection', content: 'telephone=no' }
      // ]
    },
    baseURL: "/"
  },
  // vite:{
  //   plugins : [
  //      visualizer({
  //       filename: 'stats.html',  // output file
  //       template: 'treemap',     // sunburst | treemap | network
  //       open: false               // auto-open in browser after build
  //     })
  //   ]
  // },
  css: [
    '@/assets/scss/app.scss',
    'video.js/dist/video-js.css',
   
  ],
  modules: ['nuxt-icon', '@pinia/nuxt', 'floating-vue/nuxt', 'nuxt-lottie'],
  pinia: {
    storesDirs: ['./store/**', './custom-folder/store/**'],
  },
  plugins: [
    { src: "~/plugins/plugin.js", mode: "client" } , { src : "~/plugins/gtag.client.ts"} ],
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