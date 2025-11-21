<template>
    <section class="video-call-page text-white min-vh-100 py-4">
        <div class="vd-header">
            <div class="container">
                <div class="vdhd-inner d-flex flex-wrap align-items-center justify-content-between">
                    <div class="vd-hd-left">
                        <span id="callStatusDot" class="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span id="callStatusText">Call {{ connectStatus }}</span>
                    </div>
                    <div class="vd-hd-center">
                        <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo" class="">
                    </div>
                    <div class="vd-hd-right d-flex flex-wrap align-items-center justify-content-end gap-2">
                        <span id="callTimer" class="sh-btn">{{ formattedTime }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container py-4">
            <div class="row g-4 justify-content-center">
                <!-- Video stage - now full width and centered -->
                <section class="col-12 col-lg-10 col-xl-8">
                    <!-- Remote video with red metallic contour -->
                    <div id="videoStage" class="relative red-contour  overflow-hidden">
                        <video id="remote-video-track" class="w-100 vh-80 object-cover bg-black" autoplay
                            playsinline></video>
                        <!-- Labels -->
                        <div id="netBadge" class="position-absolute top-12 right-12 px-2 py-1 label-red">{{
                            connectStatus }}</div>
                        <!-- Local PiP -->
                        <div class="position-absolute bottom-12 right-12 selfVideo aspect-video overflow-hidden">
                            <video id="local-video-track" class="w-100 h-100 object-cover bg-black" autoplay playsinline
                                muted></video>
                            <div class="position-absolute bottom-4 left-4 px-2 py-0.5">You</div>
                        </div>
                    </div>

                    <!-- Controls -->
                    <div class="d-flex flex-wrap align-items-center justify-content-center gap-2 md:gap-3 vd-controls">
                        <button @click="enabledisableaudio()" id="btnMic" class="d-inline-flex align-items-center gap-2"
                            data-on="0"><span>🎤</span>
                            Mic <span v-if="isMicActive" class="hidden sm:inline">Off</span> <span v-if="!isMicActive"
                                class="hidden sm:inline">On</span></button>
                        <button @click="enabledisablevideo()" v-if="props.is_video" id="btnCam"
                            class="d-inline-flex align-items-center gap-2" data-on="0"><span>📷</span>
                            <span class="hidden sm:inline">Cam </span><span v-if="isVideoActive"
                                class="hidden sm:inline">Off</span> <span v-if="!isVideoActive"
                                class="hidden sm:inline">On</span></button>
                        <button @click="toggleCamera()" v-if="props.is_video" id="btnFlip"
                            class="d-inline-flex align-items-center gap-2"><span>🔁</span><span
                                class="hidden sm:inline">Flip</span></button>
                        <button id="btnEnd" class="text-white font-medium" @click="endCall()"
                            v-if="!is_loading">End</button>
                        <span class="btn-loader" v-if="is_loading"></span>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { CallAlertModel, type CallsModel } from '~/composables/websocketModels';
import { useCallStore } from '~/store/appstores';

interface Props {
    is_video: boolean,
}
const props = defineProps<Props>()

const login_store = useLoginStore()
const call_store = useCallStore()
const advisor = ref(null);
const isMicActive = ref(true)
const isVideoActive = ref(true)
const showModal = ref(false);
const timeLeft = ref(0);
const timeStart = ref(0);
var is_session_ending = ref(false);
var isalertshown = false
let webrtcclient = new WebRTCClient(props.is_video)
const eventBus = useMittEmitter()
const isAnswerSent = ref(false)
const hasAnswer = ref(false)
const is_loading = ref(false)
const id_store = idStore();
const connectStatus = ref('Connecting...')
var queueCandidates: RTCIceCandidate[] = []
const isPremissionAccepted = ref(false);
var updatecount = 0
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
    eventBus.off('callEndAlert')
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
});

onMounted(async () => {

    eventBus.on('socketConnection', (isConnected: boolean) => {

    })

    eventBus.on('callEndAlert', (callEndAlert: CallAlertModel) => {
        webrtcclient.stopLocalStream()
        webrtcclient.teardown()
        reloadNuxtApp({
            path: "/",
            ttl: 1000
        })
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
                webrtcclient.stopLocalStream()
                webrtcclient.teardown()
                sendEndCallBeacon()
                reloadNuxtApp({
                    path: "/",
                    ttl: 1000
                })
            }
        }
        if (isSocketConnected()) {
            sendcallupdates()
        }

    })
    eventBus.on('callEvent', (callModel: CallSocketModel) => {

        handlecallevent(callModel)
    })

    window.addEventListener("pagehide", (event) => {
        if (event.persisted) return;
        const nav = performance.getEntriesByType("navigation")[0];
        const isReload = nav && (nav.type === "reload" || nav.type === "navigate");
        if (isReload) {
            sendEndCallBeacon()
            webrtcclient.stopLocalStream()
            webrtcclient.teardown()
            reloadNuxtApp({
                path: "/",
                ttl: 1000
            })
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
});

function sendcallupdates() {
    if (updatecount > 2) {
        let callupdates = new CallAlertModel()
        callupdates.event_name = "call_updates"
        callupdates.from_id = call_store.getCallDetails?.from_id
        callupdates.to_id = call_store.getCallDetails?.to_id
        sendmsgtoworker(callupdates, true)
        updatecount = 0
    }
    updatecount += 1
}

function enabledisableaudio() {
    if (isMicActive.value === true) {
        isMicActive.value = false
    }
    else {
        isMicActive.value = true
    }
    webrtcclient.toggleMicrophone(isMicActive.value)
}

function enabledisablevideo() {
    if (isVideoActive.value === true) {
        isVideoActive.value = false
    }
    else {
        isVideoActive.value = true
    }
    webrtcclient.toggleVideo(isVideoActive.value)
}
function toggleCamera() {
    webrtcclient.toggleCamera()
}


function sendoffer() {
    if (hasAnswer.value === false && isPremissionAccepted.value) {
        if (call_store.getCallDetails?.from_id === login_store.getUserDetails?.user_id) {

            let socketmodel = new CallSocketModel()
            socketmodel.event_name = 'call'
            socketmodel.from_id = call_store.getCallDetails?.from_id
            socketmodel.from_socket_id = call_store.getCallDetails?.from_socket_id
            socketmodel.to_id = call_store.getCallDetails?.to_id
            socketmodel.to_socket_id = call_store.getCallDetails?.to_socket_id
            socketmodel.is_video = call_store.getCallDetails?.is_video
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
        socketmodel.from_id = call_store.getCallDetails?.to_id
        socketmodel.from_socket_id = call_store.getCallDetails?.to_socket_id
        socketmodel.to_id = call_store.getCallDetails?.from_id
        socketmodel.to_socket_id = call_store.getCallDetails?.from_socket_id
        socketmodel.is_video = call_store.getCallDetails?.is_video
        socketmodel.type = CallSocketModel.CallType.ANSWER
        sendmsgtoworker(socketmodel, true)
    }
}
function sendlocaldes(localdes: RTCSessionDescription) {

    let socketmodel = new CallSocketModel()
    socketmodel.event_name = 'call'
    socketmodel.from_id = call_store.getCallDetails?.from_id
    socketmodel.from_socket_id = call_store.getCallDetails?.from_socket_id
    socketmodel.to_id = call_store.getCallDetails?.to_id
    socketmodel.to_socket_id = call_store.getCallDetails?.to_socket_id
    socketmodel.is_video = call_store.getCallDetails?.is_video
    socketmodel.webrtc_model = Array.from(encodeToUint8Array(createSdpMessage(localdes)))
    socketmodel.type = CallSocketModel.CallType.CANDIDATE
    sendmsgtoworker(socketmodel, true)
}
function sendlocalcandidate(localcandidate: RTCIceCandidate) {
    let socketmodel = new CallSocketModel()
    socketmodel.event_name = 'call'
    socketmodel.from_id = call_store.getCallDetails?.from_id
    socketmodel.from_socket_id = call_store.getCallDetails?.from_socket_id
    socketmodel.to_id = call_store.getCallDetails?.to_id
    socketmodel.to_socket_id = call_store.getCallDetails?.to_socket_id
    socketmodel.is_video = call_store.getCallDetails?.is_video
    socketmodel.webrtc_model = Array.from(encodeToUint8Array(createCandidateMessage(localcandidate)))
    socketmodel.type = CallSocketModel.CallType.CANDIDATE
    sendmsgtoworker(socketmodel, true)

}
function sendremotedes(remotedes: RTCSessionDescription) {

    let socketmodel = new CallSocketModel()
    socketmodel.event_name = 'call'
    socketmodel.from_id = call_store.getCallDetails?.to_id
    socketmodel.from_socket_id = call_store.getCallDetails?.to_socket_id
    socketmodel.to_id = call_store.getCallDetails?.from_id
    socketmodel.to_socket_id = call_store.getCallDetails?.from_socket_id
    socketmodel.is_video = call_store.getCallDetails?.is_video
    socketmodel.type = CallSocketModel.CallType.CANDIDATE
    socketmodel.webrtc_model = Array.from(encodeToUint8Array(createSdpMessage(remotedes)))
    sendmsgtoworker(socketmodel, true)

}
function sendremotecandidate(remotecandidate: RTCIceCandidate) {
    let socketmodel = new CallSocketModel()
    socketmodel.event_name = 'call'
    socketmodel.from_id = call_store.getCallDetails?.to_id
    socketmodel.from_socket_id = call_store.getCallDetails?.to_socket_id
    socketmodel.to_id = call_store.getCallDetails?.from_id
    socketmodel.to_socket_id = call_store.getCallDetails?.from_socket_id
    socketmodel.is_video = call_store.getCallDetails?.is_video
    socketmodel.type = CallSocketModel.CallType.CANDIDATE
    socketmodel.webrtc_model = Array.from(encodeToUint8Array(createCandidateMessage(remotecandidate)))
    sendmsgtoworker(socketmodel, true)

}
function setremotedesc(remote: RTCSessionDescription) {
    if (call_store.getCallDetails?.from_id === login_store.getUserDetails?.user_id) {
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
    if (call_store.getCallDetails?.to_id === login_store.getUserDetails?.user_id) {
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

async function endCall() {
    if (is_loading.value) {
        return
    }
    is_loading.value = true
    let api_url = getUrl(RequestURL.endCall);

    let to_id = call_store.getCallDetails?.to_id === login_store.getUserDetails?.user_id ? call_store.getCallDetails?.from_id : call_store.getCallDetails?.to_id
    let to_socket_id = call_store.getCallDetails?.to_socket_id === id_store.getDeviceId ? call_store.getCallDetails?.from_socket_id : call_store.getCallDetails?.to_socket_id

    let postData = {
        from_id: login_store.getUserDetails?.user_id,
        from_socket_id: id_store.getDeviceId,
        to_id: to_id,
        to_socket_id: to_socket_id,
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
        webrtcclient.stopLocalStream()
        webrtcclient.teardown()
        reloadNuxtApp({
            path: "/",
            ttl: 1000
        })
    }
    else {
        showToastError(response.message ?? "Something went wrong");
    }
}

function sendEndCallBeacon() {
    const api_url = getUrl(RequestURL.endCall);
    let to_id = call_store.getCallDetails?.to_id === login_store.getUserDetails?.user_id ? call_store.getCallDetails?.from_id : call_store.getCallDetails?.to_id
    let to_socket_id = call_store.getCallDetails?.to_socket_id === id_store.getDeviceId ? call_store.getCallDetails?.from_socket_id : call_store.getCallDetails?.to_socket_id

    let postData = {
        from_id: login_store.getUserDetails?.user_id,
        from_socket_id: id_store.getDeviceId,
        to_id: to_id,
        to_socket_id: to_socket_id,
    }
    // Convert to JSON string
    const blob = new Blob([JSON.stringify(postData)], {
        type: 'application/json'
    });
    navigator.sendBeacon(api_url, blob);
}

</script>
