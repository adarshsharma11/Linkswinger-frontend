<template>
 <Feeds :all-feeds="allFeeds" :from-feeds=true :media-type="(route.query.media_type ?? 'image')" @open-profile="openProfile"></Feeds>
</template>

<script setup lang="ts">
import { Feeds } from '#components';
import { FeedsModel, RequestURL } from '~/composables/models';
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const route = useRoute();
const login_store = useLoginStore()
definePageMeta({
    middleware: 'auth',
})

const fetchFeeds = async () => {
    const api_url = getUrl(RequestURL.fetchFeeds);
    const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
        cache: "no-cache",
        method: "post",
        body: {
            login_id: login_store.getUserDetails?.user_id ?? 0,
            user_id: Number(route.params.id),
            media_type: route.query.media_type,
            feed_type: route.query.feed_type,
            approval_status: 'approved',
        },
        headers: {
            "content-type": "application/json"
        }
    });
    return feed_response.value?.result ?? []
}
allFeeds.value = await fetchFeeds() as FeedsModel.FeedsResponseModel[]

async function openProfile(item:FeedsModel.FeedsResponseModel) {

   await navigateTo(`/user-profile/${item.user_id}`)
}

</script>

<style scoped>
@import "video.js/dist/video-js.css";
</style>