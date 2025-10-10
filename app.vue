<template>
  <NuxtLoadingIndicator color="#FF0000" />
  <CommonPromotionStrip :text="promotion_text" />
  <div class="mb-6">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components';
import type { PromotionsModel } from './composables/models';
const id_store = idStore()
const promotion_text = ref('')

const fetchOptions = async () => {
  const api_url = getUrl(RequestURL.fetchPromotion);
  const { data: fetch_response, error: option_error } = await useFetch<SuccessError<PromotionsModel.FetchResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: {
      "content-type": "application/json"
    }
  });
  return fetch_response.value?.response?.text ?? ''
}
promotion_text.value = await fetchOptions()

onMounted(() => {
    useDatabase();

    initworker()
    let socketmodel = new SocketIdModel()
    socketmodel.event_name = "socketId"
    socketmodel.socketId = id_store.device_id
    sendmsgtoworker(socketmodel)

});

</script>
<style scoped>
/* Or Tailwind class works just fine */
.mb-6 {
  margin-top: 50px; /* adjust as needed */
}
</style>
