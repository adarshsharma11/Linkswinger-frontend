import { userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const user_store = userStore();
    if (user_store.getLoginId === 0) {
        return nuxtApp.runWithContext(() => navigateTo('/'))
    }
    else {
        return nuxtApp.runWithContext(() => navigateTo('/'))
    }
})