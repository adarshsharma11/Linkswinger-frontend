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

interface Props {
  text: string
  speed?: number
}
const props = defineProps<Props>()
const scrollSpeed = ref(props.speed ?? 100)
const eventBus = useMittEmitter()
const alertModel = ref({} as CallAlertModel)
const is_loading = ref(false)
var callAlertSub: any = null
const { $bootstrap } = useNuxtApp();
onMounted(() => {
  console.log('onmounted...strip')
  callAlertSub = new ($bootstrap as any).Modal(document.getElementById('callAlertModal'));
  eventBus.on('callAlert', (alertmodel) => {
    alertModel.value = alertmodel as CallAlertModel
    callAlertSub.show()
  })

})

const closeModal = async () => {


      callAlertSub.hide()
  // await abandonrequest()
  // let closePopUp = new BookingsRequestModel()
  // closePopUp.event_name = "close_request_popup"
  // closePopUp.booking_request_id = bookingModel.value.booking_request_id
  // sendmsgtoworker(closePopUp)

};

onBeforeUnmount(() => {
  console.log('beforemount...strip')
})

function handleAccept() {
  console.log('Accepted call!')
     callAlertSub.hide()
}

function handleReject() {
  console.log('Rejected call!')
     callAlertSub.hide()
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