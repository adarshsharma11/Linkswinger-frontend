<template>
  <section class="video-roulete-page text-white min-vh-100 py-4">
    <div class="vd-roulete-header">
      <div class="vd-logo">
        <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo">
      </div>
      <div class="vd-brand">LinkSwingers</div>
    </div>
    <div class="container-fluid py-4">
      <section class="video-stage" aria-label="Video stage">
        <div class="video-card">
          <span class="corner-tag">You</span>
          <!-- <video id="local-video-track" muted class="placeholder"
            style="background: repeating-conic-gradient(rgb(10, 10, 10) 0%, rgb(10, 10, 10) 25%, rgb(16, 16, 23) 0%, rgb(16, 16, 23) 50%) 50% center / 20px 20px; display: grid; place-items: center; color: rgb(154, 163, 175);">
            <p style="padding:16px; text-align:center;">Camera unavailable. Allow access to preview yourself here.</p>
          </video> -->
          <video id="local-video-track"  class="w-100 h-100 object-cover bg-black" autoplay playsinline muted></video>
        </div>

        <div class="video-card">
          <span class="corner-tag">Partner {{ connectStatus }}</span>
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
            <select id="gender" name="gender">
              <option value="any">Any</option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
              <option value="ts">TS</option>
              <option value="couple">Couple</option>
            </select>
          </div>
          <div>
            <label for="radius">Location radius: <span id="radiusVal">500</span> mi</label><br>
            <input id="radius" type="range" min="5" max="500" value="500">
          </div>
        </div>

        <div class="actions">
          <!-- <button class="btn" id="prevBtn" title="Skip backward">⟵ Back</button> -->
          <button class="btn" id="nextBtn" title="Skip forward">Next ⟶</button>
          <button class="btn btn-danger" id="reportBtn" title="Report current partner">⚠ Report</button>
        </div>

        <div class="hint">Demo mockup • Buttons are non-functional (no backend). Local camera preview on the left.</div>
      </section>

      <section class="ads-section" aria-label="Demo ads">
        <div class="ad-box">Ad Space 1</div>
        <div class="ad-box">Ad Space 2</div>
        <div class="ad-box">Ad Space 3</div>
        <div class="ad-box">Ad Space 4</div>
      </section>

      <!-- Scrollable content with demo ad squares -->
      <section class="ads" aria-label="Sponsored">
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
      </section>
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
var updatecount = 0

const route = useRoute()
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

     sendEndRoulleteBeacon()
  webrtcclient.stopLocalStream()
  webrtcclient.teardown()

});

onMounted(async () => {
  eventBus.on('socketConnection', (isConnected: boolean) => {

  })


  eventBus.on('serverTime', (serverTime: Date) => {
    if (isSocketConnected()) {
      sendoffer()
    }
    connectStatus.value = webrtcclient.peerConnection?.connectionState || 'Connecting...'
    if (webrtcclient.peerConnection) {
      if (webrtcclient.peerConnection.connectionState === "connected") {
        timeStart.value += 1
      }
      else if (webrtcclient.peerConnection.connectionState === "disconnected" || webrtcclient.peerConnection.connectionState === "failed") {
        // showalert('Connection lost. Trying to reconnect...', false, 5000)    

        webrtcclient.teardown()
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

  eventBus.on('random_match_server_push', (rouletteModel: RouletteWorkerModel) => {
    call_store.value = rouletteModel
  })

  eventBus.on('random_user_remove_server_push', (rouletteModel: RouletteWorkerModel) => {
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
    reloadNuxtApp({
      path: "/",
      ttl: 1000
    })
  })

  window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;
    const nav = performance.getEntriesByType("navigation")[0];
    const isReload = nav && (nav.type === "reload" || nav.type === "navigate");
    if (isReload) {
      sendEndRoulleteBeacon()
      webrtcclient.stopLocalStream()
      webrtcclient.teardown()
    }
  });

  try {
    await webrtcclient.getAccess()
    webrtcclient.setLocalVideoTrack()
    isPremissionAccepted.value = true;
  }
  catch (error) {
    webrtcclient.setLocalVideoTrack()
    isPremissionAccepted.value = true;
    // showalert('Unable to get permission of microphone or camera', false, 5000)
  }

})





function getFromId(): number {
  if (call_store.value) {
    return call_store.value.user_id ?? 0
  }
  return 0
}
function getFromSocketId(): string {
  if (call_store.value) {
    return call_store.value.socket_id ?? ''
  }
  return ''
}
function getToId() {
  if (call_store.value) {
    return call_store.value.matched_id ?? 0
  }
  return 0
}
function getToSocketId(): string {
  if (call_store.value) {
    return call_store.value.matched_socket_id ?? ''
  }
  return ''
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
    })
  }
}

function handlecallevent(callModel: CallSocketModel) {

  if (callModel.type === CallSocketModel.CallType.OFFER) {
    sendanswer()
  }
  else if (callModel.type === CallSocketModel.CallType.ANSWER) {

    if (hasAnswer.value === false) {
      hasAnswer.value = true
      webrtcclient.createOffer((localdes) => {
        sendlocaldes(localdes)
      }, (candidate) => {
        sendlocalcandidate(candidate)
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
