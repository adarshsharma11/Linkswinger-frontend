<template>
  <div class="w-100 bg-theme-color fixed-top" style="height: 70px;">
    <div class="marquee" v-if="text.length !== 0">
      <span class="text-black" :style="{ '--scroll-speed': scrollSpeed + 's' }" v-html="text"></span>
    </div>
  </div>
  <CommonCallAlert @accept="handleAccept" @reject="handleReject" :is_loading="is_loading" :alert-model="alertModel">
  </CommonCallAlert>
</template>

<script setup lang="ts">
import { CommonCallAlert } from '#components';
import type { CallsModel } from '~/composables/websocketModels';

interface Props {
  text: string
  speed?: number
}
const props = defineProps<Props>()
const scrollSpeed = ref(props.speed ?? 100)
const eventBus = useMittEmitter()
const alertModel = ref(null as CallAlertModel | null)
const is_loading = ref(false)
var callAlertSub: any = null
const { $bootstrap } = useNuxtApp();
onMounted(() => {
  console.log('onmounted...strip')
  callAlertSub = new ($bootstrap as any).Modal(document.getElementById('callAlertModal'));
  eventBus.on('callAlert', (alertmodel) => {
    if (alertModel.value !== null) {
      // already showing a call alert
      return
    }
    alertModel.value = alertmodel as CallAlertModel
    callAlertSub.show()
  })
  if (import.meta.client) {


    window.addEventListener('visibilitychange', () => {

      console.log('visibilitychange...strip', document.visibilityState)
      if (document.visibilityState === 'hidden') {

        if (alertModel.value !== null) {

          sendDeclineCallBeacon()
        }
      }
    })


   

  }

})

const closeModal = async () => {


  // callAlertSub.hide()
  // await abandonrequest()
  // let closePopUp = new BookingsRequestModel()
  // closePopUp.event_name = "close_request_popup"
  // closePopUp.booking_request_id = bookingModel.value.booking_request_id
  // sendmsgtoworker(closePopUp)

};

onBeforeUnmount(() => {
  console.log('beforemount...strip')
  eventBus.off('callAlert')
})

async function handleAccept() {
  if (is_loading.value) {
    return
  }
  is_loading.value = true
  let api_url = getUrl(RequestURL.acceptCall);
  let postData = {
    from_id: alertModel.value?.from_id,
    from_socket_id: alertModel.value?.from_socket_id,
    to_id: useLoginStore().getUserDetails?.user_id,
    to_socket_id: idStore().getDeviceId,
    is_video: alertModel.value?.is_video
  }
  let response = await $fetch<SuccessError<CallsModel.AcceptCallResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_loading.value = false
  if (response.success) {
    showToastSuccess(response.message ?? "Call Accepted");
    alertModel.value = null
    callAlertSub.hide()
    if (response.response?.is_video) {
      await navigateTo(`/video-call/${response.response?.token}`)
    }
    else {
      await navigateTo(`/voice-call/${response.response?.token}`)
    }
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

async function handleReject() {
  if (is_loading.value) {
    return
  }
  is_loading.value = true
  let api_url = getUrl(RequestURL.declineCall);
  let postData = {
    from_id: alertModel.value?.from_id,
    from_socket_id: alertModel.value?.from_socket_id
  }
  let response = await $fetch<SuccessError<CallsModel.ValidateCallResponseModel>>(api_url, {
    method: 'POST',
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  is_loading.value = false
  if (response.success) {
    showToastSuccess(response.message ?? "Call Declined");
    alertModel.value = null
    callAlertSub.hide()
  }
  else {
    showToastError(response.message ?? "Something went wrong");
  }
}

function sendDeclineCallBeacon() {
  const api_url = getUrl(RequestURL.declineCall);
  const postData = {
    from_id: alertModel.value?.from_id,
    from_socket_id: alertModel.value?.from_socket_id
  };
  // Convert to JSON string
  const blob = new Blob([JSON.stringify(postData)], {
    type: 'application/json'
  });
  navigator.sendBeacon(api_url, blob);
}

</script>

<style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;
  animation: scroll var(--scroll-speed) linear infinite;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>