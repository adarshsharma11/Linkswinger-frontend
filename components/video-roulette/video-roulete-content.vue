<template>
  <section class="video-roulete-page text-white min-vh-100 py-4">
    <div class="vd-roulete-header">
      <div class="vd-logo">
        <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo">
      </div>
      <div class="vd-brand">LinkSwingers</div>
    </div>
    <div class="container-fluid py-4">
      <section class="video-stage" aria-label="Video stage" ref="stageRef">
        <div class="video-card self-video-card" ref="pipRef" :class="{ pip: isMobile, minimised: isMobile && isMinimised }">
            <div class="pipControls" v-if="isMobile">
              <button class="pipBtn btnMin" @click.stop="minimisePip" v-show="!isMinimised">—</button>
              <button class="pipBtn btnRestore" @click.stop="restorePip" v-show="isMinimised">▢</button>
            </div>

            <video
              id="local-video-track"
              class="w-100 h-100 object-cover bg-black"
              autoplay
              muted
              playsinline
            ></video>
          </div>
        <!-- <div class="video-card self-video-card">
          <span class="corner-tag">You</span>
          <video id="local-video-track" muted class="placeholder"
            style="background: repeating-conic-gradient(rgb(10, 10, 10) 0%, rgb(10, 10, 10) 25%, rgb(16, 16, 23) 0%, rgb(16, 16, 23) 50%) 50% center / 20px 20px; display: grid; place-items: center; color: rgb(154, 163, 175);">
            <p style="padding:16px; text-align:center;">Camera unavailable. Allow access to preview yourself here.</p>
          </video>
          <video id="local-video-track" class="w-100 h-100 object-cover bg-black" autoplay playsinline muted></video>
        </div> -->

        <div class="video-card">
          <!-- <span class="corner-tag">Partner {{ connectStatus }}</span> -->
          <!-- <video id="remote-video-track"  class="placeholder"  style="display:grid;place-items:center;color:#9aa3af;">
            <div style="text-align:center;">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"></circle>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="1.5"></path>
              </svg>
              <p style="margin-top:8px;">Waiting for next match…</p>
            </div>
          </video> -->
          <video id="remote-video-track" class="w-100 vh-80 object-cover bg-black" autoplay playsinline></video>
        </div>
      </section>
      <section class="vd-roulete-controls" aria-label="Controls">
        <div class="filters">
          <div>
            <label for="gender">Gender filter</label><br>
            <span class="btn-loader" v-if="isGenderLoading"></span>
            <select id="gender" name="gender" v-model="genderSelect" v-if="!isGenderLoading" @change="updateRoulleteGender()">
              <option value="any">Any</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="TS">TS</option>
              <option value="Couple">Couple</option>
            </select>
          </div>
          <div>
            <label for="radius">Location radius: <span id="radiusVal">{{ radiusSelect }}</span> mi</label><br>
             <span class="btn-loader" v-if="isRadiusLoading"></span>
            <input v-model.number="radiusSelect" id="radius" type="range" min="10" max="3000"  @change="updateRoulleteRadius()" v-if="!isRadiusLoading">
          </div>
        </div>

        <div class="actions">
          <!-- <button class="btn" id="prevBtn" title="Skip backward">⟵ Back</button> -->
          <button class="btn" id="nextBtn" title="Skip forward" v-if="!isNextLoading" @click="nextRoullete()">Next
            ⟶</button>
          <span class="btn-loader" v-if="isNextLoading"></span>
          <button v-if="!isStartLoading" class="btn" id="nextBtn" title="Skip forward" @click="startstopRoullete()">{{
            isStarted ? 'Stop' : 'Start' }}</button>
          <span class="btn-loader" v-if="isStartLoading"></span>
          <button class="btn btn-danger" id="reportBtn" title="Report current partner">⚠ Report</button>
        </div>


      </section>

      <!-- <section class="ads-section" aria-label="Demo ads">
        <div class="ad-box">Ad Space 1</div>
        <div class="ad-box">Ad Space 2</div>
        <div class="ad-box">Ad Space 3</div>
        <div class="ad-box">Ad Space 4</div>
      </section> -->

      <!-- Scrollable content with demo ad squares -->
      <!-- <section class="ads" aria-label="Sponsored">
        <h2>Sponsored</h2>
        <div class="ad-grid">
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
          <div class="ad-card">AD</div>
        </div>
      </section> -->
    </div>
  </section>
</template>

<script setup lang="ts">
let webrtcclient = new WebRTCClient(true)
const eventBus = useMittEmitter()
const isAnswerSent = ref(false)
const hasAnswer = ref(false)
const timeStart = ref(0);
const connectStatus = ref('Connecting...')
var queueCandidates: RTCIceCandidate[] = []
const isPremissionAccepted = ref(false);
const id_store = idStore();
const login_store = useLoginStore()
const call_store = ref<RouletteWorkerModel | null>(null)
const pipRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const isMinimised = ref(false)
const isMobile = ref(false)
var updatecount = 0

const route = useRoute()
const isStarted = ref(false)
const isStartLoading = ref(false)
const isNextLoading = ref(false)
const isRadiusLoading = ref(false)
const isGenderLoading = ref(false)
const genderSelect = ref("any");
const radiusSelect = ref(3000);
let dragging = false
let startX = 0
let startY = 0
let startLeft = 0
let startTop = 0
const pipX = ref(0)
const pipY = ref(0)
const bounds = ref({ maxLeft: 0, maxTop: 0 })
let rafId: number | null = null

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

function onPointerDown(e: PointerEvent) {
  if (!isMobile.value) return
  if (e.pointerType !== 'touch') return
  if ((e.target as HTMLElement)?.closest('button')) return

  dragging = true
  pipRef.value?.setPointerCapture(e.pointerId)

  startX = e.clientX
  startY = e.clientY
  startLeft = pipX.value
  startTop = pipY.value

  e.preventDefault()
}


function onPointerMove(e: PointerEvent) {
  if (!dragging || !isMobile.value) return

  const dx = e.clientX - startX
  const dy = e.clientY - startY

  pipX.value = clamp(startLeft + dx, 0, bounds.value.maxLeft)
  pipY.value = clamp(startTop + dy, 0, bounds.value.maxTop)

  if (rafId !== null) return

  rafId = requestAnimationFrame(() => {
    pipRef.value!.style.transform =
      `translate3d(${pipX.value}px, ${pipY.value}px, 0)`
    rafId = null
  })
}



function onPointerUp() {
  dragging = false
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  pipRef.value?.classList.remove('dragging')
}

function minimisePip() {
  if (!isMobile.value || !pipRef.value) return
  isMinimised.value = true
}

function restorePip() {
  if (!isMobile.value || !pipRef.value) return
  isMinimised.value = false
}



const formattedTime = computed(() => {
  const hours = Math.floor(timeStart.value / 3600).toString().padStart(2, '0');
  const mins = Math.floor((timeStart.value % 3600) / 60).toString().padStart(2, '0');
  const secs = (timeStart.value % 60).toString().padStart(2, '0');
  return `${hours}:${mins}:${secs}`;
});
onBeforeUnmount(() => {
  eventBus.off('callEvent')
  eventBus.off('socketConnection')
  eventBus.off('serverTime')
  eventBus.off('random_match_server_push')
  eventBus.off('random_user_remove_server_push')
  eventBus.off('roullete_session_expired')
  eventBus.off('roullete_partner_left')

  eventBus.off('roullete_started')
  eventBus.off('roullete_start_failed')

  eventBus.off('roullete_stopped')
  eventBus.off('roullete_stop_failed')

  eventBus.off('roullete_next_success')
  eventBus.off('roullete_next_failed')

  eventBus.off('roullete_radius_success')
  eventBus.off('roullete_gender_success')



  window.removeEventListener('pagehide', onPageHide)
  sendEndRoulleteBeacon()
  webrtcclient.stopLocalStream()
  webrtcclient.teardown()

});

onMounted(async () => {
  eventBus.on('socketConnection', (isConnected: boolean) => {
    isStartLoading.value = false;
    isNextLoading.value = false;
    isRadiusLoading.value = false;
    isGenderLoading.value = false;
  })
  isMobile.value =
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 767


  eventBus.on('serverTime', (serverTime: Date) => {
    if (isSocketConnected()) {
      sendoffer()
    }
    connectStatus.value = webrtcclient.peerConnection?.connectionState || 'Connecting...'
    if (webrtcclient.peerConnection) {
      if (webrtcclient.peerConnection.connectionState === "connected") {
        timeStart.value += 1


      }
      else if (webrtcclient.peerConnection.connectionState === "disconnected" || webrtcclient.peerConnection.connectionState === "failed" || webrtcclient.peerConnection.connectionState === "closed") {
        // showalert('Connection lost. Trying to reconnect...', false, 5000)    


        console.log('Connection lost. Teardown and reset state.', login_store.getUserDetails?.user_id)


        // sendEndCallBeacon()
        // reloadNuxtApp({
        //     path: "/",
        //     ttl: 1000
        // })
      }
    }
    if (isSocketConnected()) {
      sendcallupdates()
    }

  })

  eventBus.on('callEvent', (callModel: CallSocketModel) => {

    handlecallevent(callModel)
  })

  eventBus.on('roullete_radius_success', (callModel: RouletteWorkerModel) => {
    isRadiusLoading.value = false;


  })

  eventBus.on('roullete_gender_success', (callModel: RouletteWorkerModel) => {
    isGenderLoading.value = false;

  })

  eventBus.on('random_match_server_push', (rouletteModel: RouletteWorkerModel) => {
    call_store.value = rouletteModel
    console.log('random_match_server_push', rouletteModel.user_id ?? 0)
    if (isSocketConnected()) {
      sendserverstatusupdates()
    }
  })

  eventBus.on('random_user_remove_server_push', (rouletteModel: RouletteWorkerModel) => {
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
    reloadNuxtApp({
      path: "/",
      ttl: 1000
    })
  })
  eventBus.on('roullete_session_expired', (rouletteModel: RouletteWorkerModel) => {
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
    reloadNuxtApp({
      path: "/",
      ttl: 1000
    })
    console.log('roullete_session_expired')
  })

  eventBus.on('roullete_partner_left', (rouletteModel: RouletteWorkerModel) => {

    console.log('roullete_partner_left', rouletteModel.user_id ?? 0, getFromId(), getToId())

    webrtcclient.teardown()
    queueCandidates = []
    call_store.value = null
    hasAnswer.value = false
    isAnswerSent.value = false


  })

  eventBus.on('roullete_started', (rouletteModel: RouletteWorkerModel) => {
    isStartLoading.value = false;
    isStarted.value = true;

  })

  eventBus.on('roullete_stopped', (rouletteModel: RouletteWorkerModel) => {
    isStartLoading.value = false;
    isStarted.value = false;

  })
  eventBus.on('roullete_start_failed', (rouletteModel: RouletteWorkerModel) => {
    isStartLoading.value = false;
    showToastError('Failed to start video roulette. Please try again later.')

  })

  eventBus.on('roullete_stop_failed', (rouletteModel: RouletteWorkerModel) => {
    isStartLoading.value = false;
    showToastError('Failed to stop video roulette. Please try again later.')

  })
  eventBus.on('roullete_next_success', (rouletteModel: RouletteWorkerModel) => {
    isNextLoading.value = false;

    console.log('roullete_next_success')

  })

  eventBus.on('roullete_next_failed', (rouletteModel: RouletteWorkerModel) => {
    isNextLoading.value = false;
    showToastError('Failed to stop video roulette. Please try again later.')
  })

  window.addEventListener("pagehide", onPageHide);

  try {
    await webrtcclient.getAccess()
    webrtcclient.setLocalVideoTrack()
    isPremissionAccepted.value = true;
    const localVideo = document.getElementById("local-video-track") as HTMLVideoElement;
    localVideo.style.transform = "scaleX(-1)";
  }
  catch (error) {
    webrtcclient.setLocalVideoTrack()
    isPremissionAccepted.value = true;
    // showalert('Unable to get permission of microphone or camera', false, 5000)
  }
  if (isMobile.value && pipRef.value && stageRef.value) {
  const pip = pipRef.value
  const stage = stageRef.value

  const r = stage.getBoundingClientRect()
  const p = pip.getBoundingClientRect()

  const left = p.left - r.left
  const top = p.top - r.top

  // 🔑 CRITICAL: reset anchors
  pip.style.left = '0px'
  pip.style.top = '0px'
  pip.style.transform = `translate(${left}px, ${top}px)`
}
if (isMobile.value && pipRef.value && stageRef.value) {
  const stage = stageRef.value.getBoundingClientRect()
  const pip = pipRef.value.getBoundingClientRect()

  bounds.value = {
    maxLeft: stage.width - pip.width,
    maxTop: stage.height - pip.height,
  }
}
  if (!isMobile.value) return

  const pip = pipRef.value
  if (!pip) return

  pip.style.touchAction = 'none'

  pip.addEventListener('pointerdown', onPointerDown)
  pip.addEventListener('pointermove', onPointerMove)
  pip.addEventListener('pointerup', onPointerUp)
  pip.addEventListener('pointercancel', onPointerUp)

})

function onPageHide(event: any) {
  if (event.persisted) return;
  const nav = performance.getEntriesByType("navigation")[0];
  const isReload = nav && (nav.type === "reload" || nav.type === "navigate");
  if (isReload) {
    sendEndRoulleteBeacon()
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
  }
}



function getFromId(): number {
  if (call_store.value) {
    return call_store.value.is_from ? call_store.value.user_id ?? 0 : call_store.value.matched_id ?? 0
  }
  return 0
}
function getFromSocketId(): string {
  if (call_store.value) {
    return call_store.value.is_from ? call_store.value.socket_id ?? '' : call_store.value.matched_socket_id ?? ''
  }
  return ''
}
function getToId() {
  if (call_store.value) {
    return call_store.value.is_from ? call_store.value.matched_id ?? 0 : call_store.value.user_id ?? 0
  }
  return 0
}
function getToSocketId(): string {
  if (call_store.value) {
    return call_store.value.is_from ? call_store.value.matched_socket_id ?? '' : call_store.value.socket_id ?? ''
  }
  return ''
}



function startstopRoullete() {
  if (!isSocketConnected()) {
    return;
  }
  if (!isStartLoading.value) {
    isStartLoading.value = true;
    if (!isStarted.value) {
      let roulleteModel = new RouletteWorkerModel()
      roulleteModel.event_name = "roullete_start"
      roulleteModel.user_id = login_store.getUserDetails?.user_id ?? 0
      sendmsgtoworker(roulleteModel, true)
    }
    else {
      let roulleteModel = new RouletteWorkerModel()
      roulleteModel.event_name = "roullete_stop"
      roulleteModel.user_id = login_store.getUserDetails?.user_id ?? 0
      sendmsgtoworker(roulleteModel, true)
    }
  }
}

function nextRoullete() {
  if (!isSocketConnected() || call_store.value === null || isNextLoading.value) {
    return;
  }

  isNextLoading.value = true;
  webrtcclient?.sendHangup()
  webrtcclient.teardown()
  queueCandidates = []
  call_store.value = null
  hasAnswer.value = false
  isAnswerSent.value = false
  let roulleteModel = new RouletteWorkerModel()
  roulleteModel.event_name = "roullete_next"
  roulleteModel.user_id = login_store.getUserDetails?.user_id ?? 0
  sendmsgtoworker(roulleteModel, true)
}

function updateRoulleteGender() {
  if (!isSocketConnected() || isGenderLoading.value) {
    return;
  }
  var looking_for = [] as string[];
  if (genderSelect.value !== "any") {
   looking_for = [genderSelect.value];
  }
  
  isGenderLoading.value = true;
  let roulleteModel = new RouletteWorkerModel()
  roulleteModel.event_name = "update_roullete_gender"
  roulleteModel.user_id = login_store.getUserDetails?.user_id ?? 0
  roulleteModel.looking_for = looking_for
  sendmsgtoworker(roulleteModel, true)
}


function updateRoulleteRadius() {
  if (!isSocketConnected() || isRadiusLoading.value) {
    return;
  }
 
  isRadiusLoading.value = true;
  let roulleteModel = new RouletteWorkerModel()
  roulleteModel.event_name = "update_roullete_radius"
  roulleteModel.user_id = login_store.getUserDetails?.user_id ?? 0
  roulleteModel.radius = radiusSelect.value
  sendmsgtoworker(roulleteModel, true)
}


function sendcallupdates() {
  if (updatecount >= 2) {
    let callupdates = new CallAlertModel()
    callupdates.event_name = "roullete_updates"
    callupdates.from_id = login_store.getUserDetails?.user_id ?? 0
    sendmsgtoworker(callupdates, true)
    updatecount = 0
  }
  updatecount += 1
}

function sendserverstatusupdates() {
  let callupdates = new CallAlertModel()
  callupdates.event_name = "roullete_socket_status_updates"
  callupdates.from_id = login_store.getUserDetails?.user_id ?? 0
  sendmsgtoworker(callupdates, true)
}

function sendoffer() {
  if (hasAnswer.value === false && isPremissionAccepted.value && call_store.value) {
    if (getFromId() === login_store.getUserDetails?.user_id) {
      let socketmodel = new CallSocketModel()
      socketmodel.event_name = 'call'
      socketmodel.from_id = getFromId()
      socketmodel.from_socket_id = getFromSocketId()
      socketmodel.to_id = getToId()
      socketmodel.to_socket_id = getToSocketId()
      socketmodel.is_video = true
      socketmodel.type = CallSocketModel.CallType.OFFER
      sendmsgtoworker(socketmodel, true)
    }
  }
}
function sendanswer() {
  if (isAnswerSent.value === false && isPremissionAccepted.value) {
    isAnswerSent.value = true
    let socketmodel = new CallSocketModel()
    socketmodel.event_name = 'call'
    socketmodel.from_id = getToId()
    socketmodel.from_socket_id = getToSocketId()
    socketmodel.to_id = getFromId()
    socketmodel.to_socket_id = getFromSocketId()
    socketmodel.is_video = true
    socketmodel.type = CallSocketModel.CallType.ANSWER
    sendmsgtoworker(socketmodel, true)
  }
}
function sendlocaldes(localdes: RTCSessionDescription) {

  let socketmodel = new CallSocketModel()
  socketmodel.event_name = 'call'
  socketmodel.from_id = getFromId()
  socketmodel.from_socket_id = getFromSocketId()
  socketmodel.to_id = getToId()
  socketmodel.to_socket_id = getToSocketId()
  socketmodel.is_video = true
  socketmodel.webrtc_model = Array.from(encodeToUint8Array(createSdpMessage(localdes)))
  socketmodel.type = CallSocketModel.CallType.CANDIDATE
  sendmsgtoworker(socketmodel, true)
}
function sendlocalcandidate(localcandidate: RTCIceCandidate) {
  let socketmodel = new CallSocketModel()
  socketmodel.event_name = 'call'
  socketmodel.from_id = getFromId()
  socketmodel.from_socket_id = getFromSocketId()
  socketmodel.to_id = getToId()
  socketmodel.to_socket_id = getToSocketId()
  socketmodel.is_video = true
  socketmodel.webrtc_model = Array.from(encodeToUint8Array(createCandidateMessage(localcandidate)))
  socketmodel.type = CallSocketModel.CallType.CANDIDATE
  sendmsgtoworker(socketmodel, true)

}
function sendremotedes(remotedes: RTCSessionDescription) {

  let socketmodel = new CallSocketModel()
  socketmodel.event_name = 'call'
  socketmodel.from_id = getToId()
  socketmodel.from_socket_id = getToSocketId()
  socketmodel.to_id = getFromId()
  socketmodel.to_socket_id = getFromSocketId()
  socketmodel.is_video = true
  socketmodel.type = CallSocketModel.CallType.CANDIDATE
  socketmodel.webrtc_model = Array.from(encodeToUint8Array(createSdpMessage(remotedes)))
  sendmsgtoworker(socketmodel, true)

}
function sendremotecandidate(remotecandidate: RTCIceCandidate) {
  let socketmodel = new CallSocketModel()
  socketmodel.event_name = 'call'
  socketmodel.from_id = getToId()
  socketmodel.from_socket_id = getToSocketId()
  socketmodel.to_id = getFromId()
  socketmodel.to_socket_id = getFromSocketId()
  socketmodel.is_video = true
  socketmodel.type = CallSocketModel.CallType.CANDIDATE
  socketmodel.webrtc_model = Array.from(encodeToUint8Array(createCandidateMessage(remotecandidate)))
  sendmsgtoworker(socketmodel, true)

}
function setremotedesc(remote: RTCSessionDescription) {
  if (getFromId() === login_store.getUserDetails?.user_id) {
    webrtcclient?.setRemoteDes(remote, () => {
      for (let i = 0; i < queueCandidates.length; i++) {
        setremotecandidate(queueCandidates[i])
      }
      queueCandidates = []
    })
  }
}
function setremotecandidate(remote: RTCIceCandidate) {
  if (webrtcclient.peerConnection?.remoteDescription == null) {
    queueCandidates.push(remote)
  }
  else {
    webrtcclient?.setRemoteCandidate(remote, () => {

    })
  }
}

function createanswer(remote: RTCSessionDescription) {
  if (getToId() === login_store.getUserDetails?.user_id) {
    webrtcclient.createAnswer(remote, (session) => {
      sendremotedes(session)
      for (let i = 0; i < queueCandidates.length; i++) {
        setremotecandidate(queueCandidates[i])
      }
      queueCandidates = []
    }, (candidate) => {
      sendremotecandidate(candidate)
    }, (event) => {
      if (event.type === 'message') {
        if (event.data.type === 'hangup') {
          // Respond to ping messages
          console.log('Data channel remote event:', event);
          webrtcclient.teardown()
          queueCandidates = []
          hasAnswer.value = false
          isAnswerSent.value = false
          call_store.value = null
        }
      }
    })
  }
}

function handlecallevent(callModel: CallSocketModel) {

  if (callModel.type === CallSocketModel.CallType.OFFER) {
    console.log('Received offer', login_store.getUserDetails?.user_id)
    sendanswer()
  }
  else if (callModel.type === CallSocketModel.CallType.ANSWER) {

    if (hasAnswer.value === false) {
      hasAnswer.value = true
      webrtcclient.createOffer((localdes) => {
        sendlocaldes(localdes)
      }, (candidate) => {
        sendlocalcandidate(candidate)
      }, (event) => {

        if (event.type === 'message') {
          if (event.data.type === 'hangup') {
            // Respond to ping messages
            console.log('Data channel event:', event);
            webrtcclient.teardown()
            queueCandidates = []
            hasAnswer.value = false
            isAnswerSent.value = false
            call_store.value = null
          }
        }
      })
    }
  }
  else if (callModel.type === CallSocketModel.CallType.CANDIDATE) {

    if (callModel.webrtc_model) {
      let message = decodeFromUint8Array(new Uint8Array(callModel.webrtc_model));
      if (message.type === 'SessionDescription') {

        setremotedesc(toRTCSessionDescription(message.sdp))
        createanswer(toRTCSessionDescription(message.sdp))
      }
      else if (message.type === 'IceCandidate') {
        console.log('Received remote candidate', login_store.getUserDetails?.user_id)
        setremotecandidate(toRTCIceCandidate(message.candidate))
      }
    }
  }

}

function toggleCamera() {
  webrtcclient.toggleCamera()

  setTimeout(() => {
    const localVideo = document.getElementById("local-video-track") as HTMLVideoElement;
    if (!localVideo) return;

    if (webrtcclient.currentFacingMode === "user") {
      // front camera → show mirror view
      localVideo.style.transform = "scaleX(-1)";
    } else {
      // back camera → normal
      localVideo.style.transform = "scaleX(1)";
    }
  }, 150);
}

function sendEndRoulleteBeacon() {
  const api_url = getUrl(RequestURL.rouletteEnd);
  let postData = {
    user_id: login_store.getUserDetails?.user_id,
  }
  // Convert to JSON string
  const blob = new Blob([JSON.stringify(postData)], {
    type: 'application/json'
  });
  navigator.sendBeacon(api_url, blob);
}

</script>
