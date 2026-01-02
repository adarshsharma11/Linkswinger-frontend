<template>
  <NuxtLoadingIndicator color="#FF0000" />
  <CommonPromotionStrip :text="promotion_text" :speed = "speed" />
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
const user_store = userStore()
const promotion_text = ref('')
const speed = ref(50)

const fetchOptions = async () => {
  try {
  const api_url = getUrl(RequestURL.fetchPromotion);
  const { data: fetch_response, error: option_error } = await useFetch<SuccessError<PromotionsModel.FetchResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: {
      "content-type": "application/json"
    }
  });
  return fetch_response.value?.response 
  }
  catch {
return {}
  }

}
let response_model = await fetchOptions() as PromotionsModel.FetchResponseModel

if (user_store.getLoginId === 0)
{
promotion_text.value = response_model.text ?? ''
speed.value = response_model.speed ?? 5
}
else
{
promotion_text.value = response_model.post_login_text ?? ''
speed.value = response_model.post_login_speed ?? 5
}

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

