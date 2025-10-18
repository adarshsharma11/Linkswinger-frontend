import { userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user_store = userStore();
    if (user_store.getLoginId !== 0) {
       return await navigateTo('/profile');
    }
    if (to.fullPath === '/authentication/signup')
    {
        return await navigateTo('/early-access');
    }
})