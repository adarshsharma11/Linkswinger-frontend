
import { useCallStore, userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const user_store = userStore();
    if (user_store.getLoginId !== 0) {
        const call_store = useCallStore();
        if (call_store.getCallDetails === null) {

            var token = ""
            if (to.path.startsWith('/voice-call/') || to.path.startsWith('/video-call/')) {
               token = to.params.id as string
            }
            if (from.path.startsWith('/voice-call/') || from.path.startsWith('/video-call/')) {
               token = to.params.id as string
            }
            const api_url = getUrl(RequestURL.fetchCallDetails)
            try {
               const response = await $fetch<SuccessError<CallSocketModel>>(api_url, {
                    cache: "no-cache",
                    method: "post",
                    body: {
                        "token": token,
                    },
                    headers: {
                        "content-type": "application/json"
                    }
                });
                if (response.success) {
                    call_store.setCallDetails(response.response)
                }
                else{
                    return nuxtApp.runWithContext(() => navigateTo('/'))
                }
            }
            catch (error) {
                console.error("Login failed:", error);
            }
        }
    }
    else
    {
        return nuxtApp.runWithContext(() => navigateTo('/'))
    }
})