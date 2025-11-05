<template>
  <div class="w-100 bg-theme-color fixed-top" style="height: 70px;">
    <div class="marquee" v-if="text.length !== 0">
      <span class="text-black" :style="{ '--scroll-speed': scrollSpeed + 's' }" v-html="text"></span>
    </div>
  </div>
   <div class="full-width">
        <div v-if="(alertModel.from_id ?? 0) > 0" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop style="background-color: white;">
                <h4>You have received new session request</h4>
                <!-- <h4>00:{{ max_count - timer_count }}</h4> -->
                <div class="modal-btn-group" v-if="!is_loading">
                    <button class="btn btn-default btn-icon" >Accept</button>
                    <button class="btn btn-default-outline btn-icon" ><span
                            class="icon-token"></span>
                        Reject</button>
                </div>
                <button v-if="is_loading" disabled style="width: 30px; height: 30px;"><span
                        class="btn-loader"></span></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  speed?: number
}
const props = defineProps<Props>()
const scrollSpeed = ref(props.speed ?? 100)
const eventBus = useMittEmitter()
const alertModel = ref({} as CallAlertModel)
const is_loading = ref(false)
onMounted(() => {
  console.log('onmounted...strip')

  eventBus.on('callAlert', (alertmodel) => {
    alertModel.value = alertModel as CallAlertModel
  })

})

const closeModal = async () => {


    // await abandonrequest()
    // let closePopUp = new BookingsRequestModel()
    // closePopUp.event_name = "close_request_popup"
    // closePopUp.booking_request_id = bookingModel.value.booking_request_id
    // sendmsgtoworker(closePopUp)

};

onBeforeUnmount(() => {
  console.log('beforemount...strip')
})

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