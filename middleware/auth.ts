import type { UsersModel } from "~/composables/models";
import { useLoginStore, userStore } from "~/store/appstores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp()
    const user_store = userStore();
    if (user_store.getLoginId === 0) {
        return nuxtApp.runWithContext(() => navigateTo('/'))
    }
    else {
        const login_store = useLoginStore();
        if (login_store.getUserDetails === null) {
            const api_url = getUrl(RequestURL.getProfileDetails)
            try {
                const response = await $fetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
                    cache: "no-cache",
                    method: "post",
                    body: {
                        "user_id": user_store.getLoginId,
                        "login_id": user_store.getLoginId
                    },
                    headers: {
                        "content-type": "application/json"
                    }
                });
                if (response.success) {
                    login_store.setUserDetails(response.response)
                }
                else {
                    let code = response.code
                    if (code === 300) {
                        user_store.clear()
                        return nuxtApp.runWithContext(async () => {
                            if (import.meta.client) {
                                try {
                                    await clearloginstore()
                                }
                                catch {

                                }
                            }
                            return await navigateTo('/')
                        })


                    }
                }
            }
            catch (error) {
                console.error("Login failed:", error);
            }
        }
    }
})