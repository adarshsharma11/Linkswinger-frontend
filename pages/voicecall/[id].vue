<template>
    <div class="full-width videocall-page">
        <div class="container pt-60 pb-60">
            <div class="videocall-container">
                <div class="videocall-main">
                    <div class="videocall-header">
                        <div class="timer">
                            <Clock /> <span>{{ formattedTime }}</span>
                        </div>
                        <button class="btn btn-default-outline btn-sm btn-end-session">
                            <LogOut /> End Call
                        </button>
                    </div>

                    <div class="video-wrapper">
                        <div class="advisor-video">
                            <!-- <div class="advisor-profile-photo">
                                <img :src="getImagePath(advisor.image)" alt="Advisor Image" class="advisor-photo" />
                            </div> -->
                            <video id="remote-video-track" autoplay playsinline class="video-element">
                            </video>
                            <div class="video-overlay">

                            </div>
                        </div>
                        <div class="user-video">
                            <video id="local-video-track" autoplay playsinline muted class="video-element">
                            </video>
                        </div>
                    </div>

                    <div class="call-controls">
                        <button class="control-btn"
                            v-if="call_store.getCallDetails?.from_id === login_store.getUserDetails?.user_id"
                            :class="{ inactive: isMicActive }" @click="enabledisableaudio()">

                        </button>
                        <button class="control-btn danger">

                        </button>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import userdetails from '~/middleware/userdetails';
import validatecall from '~/middleware/validatecall';
import { useCallStore } from '~/store/appstores';

definePageMeta({
    middleware: [userdetails, validatecall],
})
const login_store = useLoginStore()
const call_store = useCallStore()
const advisor = ref(null);
const isMicActive = ref(true)
const showModal = ref(false);
const timeLeft = ref(0);
const timeStart = ref(0);
var is_session_ending = ref(false);
var isalertshown = false
let webrtcclient = new WebRTCClient(false)
const eventBus = useMittEmitter()
const isAnswerSent = ref(false)
const hasAnswer = ref(false)
const hasOfferSent = ref(false)
var queueCandidates: RTCIceCandidate[] = []
const formattedTime = computed(() => {
    const hours = Math.floor(timeStart.value / 3600).toString().padStart(2, '0');
    const mins = Math.floor((timeStart.value % 3600) / 60).toString().padStart(2, '0');
    const secs = (timeStart.value % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
});
onBeforeUnmount(() => {
    eventBus.off('callEvent')
    eventBus.off('socketConnection')
    webrtcclient.stopLocalStream()
    webrtcclient.teardown()
});

onMounted(async () => {

    eventBus.on('socketConnection', (isConnected: boolean) => {
        if (isConnected === true && hasOfferSent.value === false) {
            hasOfferSent.value = true
            console.log('Socket connected, sending offer')
            sendoffer()
        }
    })
    eventBus.on('callEvent', (callModel: CallSocketModel) => {
        handlecallevent(callModel)
    })
    // if (isSocketConnected()) {
    //     hasOfferSent.value = true
    //     sendoffer()
    // }
    try {
        await webrtcclient.getAccess()
        webrtcclient.setLocalVideoTrack()
    }
    catch (error) {
        showalert('Unable to get permission of microphone or camera', false, 5000)
    }
});

function enabledisableaudio() {
    if (isMicActive.value === true) {
        isMicActive.value = false
    }
    else {
        isMicActive.value = true
    }
    webrtcclient.toggleMicrophone(isMicActive.value)
}
function sendoffer() {
    if (hasAnswer.value === false) {
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
    if (isAnswerSent.value === false) {
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

const extendSession = () => {

};



</script>
<style scoped>
.videocall-page {
    background-color: #f8f9fa;
}

.videocall-container {
    height: 75vh;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.videocall-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}

.timer {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 18px;
    font-weight: 500;
}

.btn-end-session {
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
}

.btn-end-session:hover {
    color: white;
    border-color: #FF4D4F;
    background-color: #FF4D4F;
}

.video-wrapper {
    height: 75vh;
    position: relative;
}

.advisor-video {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #1a1726;
}

.advisor-profile-photo {
    width: auto;
    height: auto;
    inset: 0;
    position: absolute;
}

.advisor-profile-photo .advisor-photo {
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: contain;
    position: absolute;
}

.advisor-video .video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.video-placeholder {
    height: 100%;
    opacity: 0.3;
}

.video-overlay {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
}

.video-overlay h3 {
    font-weight: 600;
    letter-spacing: .4px;
    margin: 0 0 6px 0;
    text-shadow: 1px 1px 2px #1a1726;
    ;
}

.video-overlay .advisor-rates {
    font-size: 14px;
    font-weight: 400;
    color: #EEE;
    letter-spacing: .6px;
    text-shadow: 1px 1px 2px #1a1726;
    ;
}

.user-video {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 160px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #1a1726;
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-video .video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.call-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
    z-index: 2;
}

.control-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.control-btn:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
}

.control-btn.danger {
    background-color: #ff4d4f;
}

.control-btn.danger:hover {
    background-color: #ff7875;
}

.control-btn.inactive {
    color: #ff7875;
    background-color: #FFF;
}

.control-btn.inactive:hover {
    color: #ff4d4f;
    background-color: #FFF;
}

.status {
    font-size: 14px;
    color: #4caf50;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    width: 500px;
    max-width: 92%;
    padding: 30px;
    border-radius: 8px;
    background-color: white;
}

.modal-content h4 {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.modal-btn-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

@media (max-width: 640px) {
    .user-video {
        width: 100px;
        height: 80px;
    }

    .control-btn {
        width: 40px;
        height: 40px;
    }

    .videocall-header {
        padding: 15px;
    }

    .timer {
        font-size: 16px;
    }
}
</style>