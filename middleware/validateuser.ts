import { userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware((to, from) => {
    const user_store = userStore();
    if (user_store.getLoginId !== 0) {
       return navigateTo('/profile');
    }
     console.log("defineNuxtRouteMiddleware")
})