
import { userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const user_store = userStore();
     const id_store = idStore();
    if (user_store.getLoginId !== 0) {
        const api_url = getUrl(RequestURL.rouletteEnter)
        try {
            const response = await $fetch<SuccessError<CallSocketModel>>(api_url, {
                cache: "no-cache",
                method: "post",
                body: {
                    "user_id": user_store.getLoginId,
                    "socket_id" : id_store.getDeviceId
                },
                headers: {
                    "content-type": "application/json"
                }
            });
            if (response.success) {}
            else {
                return nuxtApp.runWithContext(() => navigateTo('/'))
            }
        }
        catch (error) {
            return nuxtApp.runWithContext(() => navigateTo('/'))
        }
    }
    else {
        return nuxtApp.runWithContext(() => navigateTo('/'))
    }
})