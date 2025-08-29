import VueEasyLightbox from 'vue-easy-lightbox'
import VueNumber from "vue-number-animation";


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueEasyLightbox)
    nuxtApp.vueApp.use(VueNumber)
})