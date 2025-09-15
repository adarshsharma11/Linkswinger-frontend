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
        if (login_store.getUserDetails == null) {
            const api_url = getUrl(RequestURL.getProfileDetails)
            const { data: profile, error: error } = await useFetch<SuccessError<UsersModel.ProfileDetailsResponseModel>>(api_url, {
                cache: "no-cache",
                method: "post",
                body: {
                    "user_id": user_store.getLoginId,
                },
                headers: {
                    "content-type": "application/json"
                }
            });
            if (error.value != null) {
                return nuxtApp.runWithContext(() => navigateTo('/'))
            }
            else {
                login_store.setUserDetails(profile.value?.response)
            }
        }
        else {
            return nuxtApp.runWithContext(() => navigateTo('/'))
        }

    }
})