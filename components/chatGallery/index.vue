<template>
    <div class="shorts-wrapper">

        <video ref="videoRef" class="video-js vjs-defaultskin short-video vjs-16-9" playsinline webkit-playsinline
            x5-playsinline></video>
        <Swiper :modules="[Pagination, Navigation, Mousewheel, Virtual]" direction="vertical" :mousewheel="true"
            :slides-per-view="1" class="shorts-swiper" @swiper="onSwiper" :lazy="true" @slideChange="onSlideChange"
            @reachEnd="onReachEnd" :initial-slide="props.selectedIndex" :virtual="true">
            <SwiperSlide v-for="(item, index) in allFeeds" :key="item.chat_id" :virtualIndex="index"
                class="short-slide">
                <div class="short-container" :key="item.chat_id">
                    <div class="short-frame" :key="item.chat_id" @click="onFrameTap(index)"
                        @touchstart="onFrameTap(index)" :ref="el => setFrameRef(el, index)">
                        <img :key="item.chat_id" :src="`${item.media_path}${item.message}`" class="short-image"
                            loading="lazy" v-if="item.message_type === 'image'" data-type="thumb" />
                        <!-- <img :key="item.chat_id" :src="`${item.media_path}${item.message}`" class="short-image"
                            loading="lazy" v-if="item.message_type === 'video'" data-type="video-thumb" /> -->


                        <transition name="fade" v-if="item.message_type === 'video'">
                            <button v-if="showPlayBtn[index]" class="play-toggle" @click="togglePlay(index)">
                                <img v-if="playingStates[index]" src="/images/icons-folder/Pause-150x150px.png"
                                    class="play-icon">

                                <img v-else src="/images/icons-folder/Play-150x150px.png" class="play-icon">
                            </button>
                        </transition>
                        <div v-if="item.message_type === 'image'" class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        <div class="overlay">
                            <!-- Seekbar for video -->
                            <div v-if="item.message_type === 'video'" class="seekbar-container">
                                <div class="seekbar-track" @click="seekToPosition($event, index)"
                                    @touchstart="seekToPosition($event, index)"
                                    @touchmove="seekToPosition($event, index)">
                                    <div class="seekbar-progress" :style="{ width: getProgressWidth(index) + '%' }">
                                    </div>
                                    <div class="seekbar-handle" :style="{ left: getProgressWidth(index) + '%' }"></div>
                                </div>
                                <div class="seekbar-time">
                                    <span class="current-time text-white">{{ formatTime(getCurrentTime(index)) }}</span>
                                    <span class="duration text-white">{{ formatTime(getDuration(index)) }}</span>
                                </div>
                            </div>
                            <div class="overlay-inner d-flex flex-wrap justify-content-between">
                              
                                <div class="overlay-right">
                                   
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    allFeeds: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: () => 0 }
})
const emit = defineEmits(['modelOpen', 'modelClosed'])
const showPicker = ref(false)
const showReport = ref(false)
const showComment = ref(false)
import { ChatsModel, FeedsModel, RequestURL } from '~/composables/models';
import videojs from "video.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, Pagination, Virtual } from 'swiper/modules'
import "swiper/css";
import { bool, boolean } from 'yup';
import type Player from 'video.js/dist/types/player'

const route = useRoute();
let swiperInstance = null
const videoRefs = ref([])
const frameRefs = ref([])
const players = ref<Player>([] as Player[])
const showPlayBtn = ref([])
const playingStates = ref([]) // track play/pause per video
const videoProgress = ref([]) // track video progress
const videoDurations = ref([]) // track video durations
const videoCurrentTimes = ref([]) // track current time
var videoPlayer: Player | null = null
let fadeTimers = [] // store timeout IDs
const { $bootstrap } = useNuxtApp();
var commentModal: any = null
const selectedFeedId = ref(0);
const commentTxt = ref('');
const login_store = useLoginStore()
const comments = ref([] as FeedsModel.FetchFeedCommentResponseModel[])
const is_comment_loading = ref(false);
const is_like_loading = ref([] as boolean[]);
const is_add_comment_loading = ref(false);
const commentRef = ref<HTMLInputElement | null>(null);
const emojiPickerRef = ref(null)
const videoRef = ref(null)
var reportModel: any = null
const isFullscreen = ref([]) // track fullscreen state per video


const allFeeds = ref(props.allFeeds as ChatsModel.ChatResponseModel[])
// Initialize per-video loading states
is_like_loading.value = new Array(allFeeds.value.length).fill(false);

const likeImage = ref('/images/icons-folder/Like-150x150px.png')
const commentImage = ref('/images/icons-folder/Comments-150x150px.png')
const reportImage = ref('/images/icons-folder/Report-150x150px.png')
const fullscreenImage = ref('/images/icons-folder/Full screen-150x150px.png')
//var observer: IntersectionObserver | null
var currentIndex = ref(0)
var shouldshow = ref(false)
onMounted(async () => {


    await nextTick()

    allFeeds.value.forEach((feed, i) => {

        const videoEl = videoRefs.value[i]

        if (feed.message_type === 'video' && videoEl) {
            players.value.push(null)
            playingStates.value.push(false)
            showPlayBtn.value.push(true) // show initially
            videoProgress.value[i] = 0
            videoCurrentTimes.value[i] = 0
            videoDurations.value[i] = 0
            isFullscreen.value.push(false) // initialize fullscreen state
        }
        else {

            players.value.push(null)
            playingStates.value.push(false)
            showPlayBtn.value.push(true) // show initially
            videoProgress.value[i] = 0
            videoCurrentTimes.value[i] = 0
            videoDurations.value[i] = 0
            isFullscreen.value.push(false) // initialize fullscreen state
        }

    })
    createPlayer()
    removeVideoFromShortsWrapper()
    nextTick(() => {
        playAtIndex(props.selectedIndex)
    })
})
onBeforeUnmount(() => {

    players.value.forEach(p => {
        if (p) {
            p.dispose()
        }
    })
    allFeeds.value.forEach(fe => {
        fe.is_attached = false
    })
    videoPlayer?.dispose()
})

const setFrameRef = (el, index) => {
    if (el) frameRefs.value[index] = el

}
const setVideoRef = (el, index) => {
    if (el) videoRefs.value[index] = el
}

const onSwiper = (swiper: any) => {
    swiperInstance = swiper
}

function createPlayer() {

    if (videoRef.value) {

        videoPlayer = videojs(videoRef.value, {
            controls: false, // ✅ hide default UI
            autoplay: false,
            preload: 'auto',
            muted: false,
            loop: true,
            fluid: true,
            html5: {
                vhs: {
                    overrideNative: true
                },
                nativeAudioTracks: false,
                nativeVideoTracks: false
            }
        })

        videoPlayer.on('timeupdate', () => {
            if (currentIndex.value !== -1) {
                updateSeekbar(currentIndex.value)
                let feed = allFeeds.value[currentIndex.value]
                let is_attached = feed.is_attached ?? false
                if (is_attached === false) {
                    attachToIndex2Top(currentIndex.value)
                }

            }

        })

        videoPlayer.on('loadedmetadata', () => {
            if (currentIndex.value !== -1) {
                videoDurations.value[currentIndex.value] = videoPlayer.duration()
            }

        })

        // Listen for fullscreen change events to update state
        videoPlayer.on('fullscreenchange', () => {
            if (currentIndex.value !== -1) {
                isFullscreen.value[currentIndex.value] = videoPlayer.isFullscreen();
            }

        });

        // Listen for fullscreen changes to update button state
        document.addEventListener('fullscreenchange', () => {

            const player = videoPlayer
            if (player) {
                isFullscreen.value[currentIndex.value] = !!document.fullscreenElement;
            }
        });
    }
}

const onFrameTap = (index) => {
    const isPlaying = playingStates.value[index]
    if (showPlayBtn.value[index]) {
        // Hide only if currently playing (so paused keeps button visible)
        if (isPlaying) {
            showPlayBtn.value[index] = false
            clearTimeout(fadeTimers[index])
        }
    } else {
        // Show only if playing — paused should always show the button
        if (isPlaying) {
            showPlayTemporarily(index)
        }
        else {
            clearTimeout(fadeTimers[index])
            playingStates.value[index] = false
            showPlayBtn.value[index] = true

        }
    }
}

// ✅ Play/Pause toggle
const togglePlay = (index) => {
    //const player = players.value[index]
    const player = videoPlayer
    if (!player) return


    if (player.paused()) {
        player.play()
        playingStates.value[index] = true
        showPlayTemporarily(index)

    } else {
        player.pause()

        playingStates.value[index] = false
        showPlayBtn.value[index] = true
    }
}

// ✅ Show for 2 seconds only if playing
function showPlayTemporarily(index) {

    showPlayBtn.value[index] = true
    clearTimeout(fadeTimers[index])
    if (playingStates.value[index]) {
        fadeTimers[index] = setTimeout(() => {
            if (playingStates.value[index]) {
                showPlayBtn.value[index] = false

            }

        }, 2000)
    }
}
// Handle slide changes (pause others)
const onSlideChange = () => {
    const activeIndex = swiperInstance?.activeIndex ?? 0


    if (allFeeds.value.length > 0) {
        const feed = allFeeds.value[activeIndex]
        if (videoPlayer && feed.message_type === 'video') {

            playAtIndex(activeIndex)


        }
        else {

            videoPlayer?.pause()


            nextTick(() => {
                detachVideoFromFrames()
                playingStates.value[activeIndex] = false
                showPlayBtn.value[activeIndex] = false
            })

        }
    }
}




function attachToIndex2Top(index: number) {
    nextTick(() => {
        const frame = frameRefs.value[index]
        const video = videoPlayer?.el()
        const feed = allFeeds.value[index]
        if (!frame || !videoRef.value || !feed) return
        const thumbnail = frame.querySelector('img[data-type="video-thumb"]')
        if (thumbnail && thumbnail.nextSibling) {
            frame.insertBefore(video, thumbnail.nextElementSibling)
            feed.is_attached = true
        } else {
                feed.is_attached = true
              frame.appendChild(video)
        }
    })

}

function removeVideoFromShortsWrapper() {
    const wrapper = document.querySelector('.shorts-wrapper')
    const video = videoRef.value
    if (!wrapper || !video || videoPlayer === null) return
    const videoEl = document.getElementById(videoPlayer.id())
    if (wrapper && videoEl && wrapper.contains(videoEl)) {
        wrapper.removeChild(videoEl)
    }
}

function detachVideoFromFrames() {
    if (!videoRef.value) return

    const parent = videoRef.value.parentElement

    // If video is currently inside a short-frame, move it back
    if (parent && parent.classList.contains('short-frame')) {

        //parent.removeChild(videoRef.value)
    }
}



function playAtIndex(index: number) {
    if (allFeeds.value.length > 0) {
        const feed = allFeeds.value[index]
        console.log(feed,index)
        if (feed.message_type !== 'video' || videoPlayer === null) {
            return;
        }
        attachToIndex2Top(index);
        videoPlayer.pause()
        let fileExtension = getFileExtension(feed.message ?? '')
        if (fileExtension === ".m3u8") {
            videoPlayer.src({
                src: `${feed.media_path}${feed.message}`,
                type: 'application/x-mpegURL'
            })
        }
        else
        {
            videoPlayer.src({
                src: `${feed.media_path}${feed.message}`,
                type: 'video/mp4'
            })
        }
        videoPlayer.load()
        videoPlayer.play().catch(() => { })

        playingStates.value[index] = true
        showPlayBtn.value[index] = false
        currentIndex.value = index
    }


}

// ✅ Stop last video when reaching the end
const onReachEnd = () => {
    const lastIndex = allFeeds.value.length - 1
    //const lastPlayer = players.value[lastIndex]
    const lastPlayer = videoPlayer
    if (lastPlayer) {
        lastPlayer.pause()
        playingStates.value[lastIndex] = false
    }
}
function openReport(feed_id: number) {

    selectedFeedId.value = feed_id
    showReport.value = true
    nextTick(() => {
        reportModel = new ($bootstrap as any).Modal(document.getElementById('reportModel'));
        reportModel._element.addEventListener('hidden.bs.modal', () => {
            showReport.value = false
            console.log('reportModel closed')
            emit('modelClosed')
        })
        emit('modelOpen')
        reportModel.show();
    })


}

function closeReport() {

    reportModel.hide()

}

function closedEmojiPicker() {

    emit('modelOpen')
    showPicker.value = false
}

function openComments(feed_id: number) {
    emit('modelOpen')
    showComment.value = true
    nextTick(() => {
        commentModal = new ($bootstrap as any).Modal(document.getElementById('commentmodal'));
        commentModal._element.addEventListener('hidden.bs.modal', () => {
            showComment.value = false
            console.log('comment closed')
            emit('modelClosed')
        })
        commentImage.value = '/images/icons-folder/comments-50x50px.gif'
        setTimeout(() => {
            commentImage.value = '/images/icons-folder/Comments-150x150px.png'
            commentTxt.value = ''
            selectedFeedId.value = feed_id
            commentModal.show();
            fetchComments(feed_id)
        }, 300);
    })



}
function getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return ''; // No extension found
    }
    return filename.slice(lastDotIndex);
}

function selectedEmoji(emoji: string) {
    const statusInput = commentRef.value;
    if (statusInput) {
        const start = statusInput.selectionStart;
        const end = statusInput.selectionEnd;
        const value = statusInput.value;

        statusInput.value = value.substring(0, start) + emoji + value.substring(end);

        // Move cursor after the emoji
        const newPos = start + emoji.length;
        statusInput.setSelectionRange(newPos, newPos);

        // Ensure input stays focused
        statusInput.focus();
    }
}

async function selectCustomEmoji(emoji: string) {

    if (is_add_comment_loading.value) {
        return;
    }
    is_add_comment_loading.value = true;
    let postData = {
        feed_id: selectedFeedId.value,
        user_id: login_store.getUserDetails?.user_id,
        comment: emoji,
        comment_type: 'emoji'
    }

    let api_url = getUrl(RequestURL.addFeedComment);
    let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
        method: 'POST',
        body: postData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    is_add_comment_loading.value = false;
    if (response.success) {
        comments.value.push(response.response ?? {})
    }
    else {
        showToastError(response.message)
    }
}

function handleToggle() {
    showPicker.value = true
    nextTick(() => {
        if (emojiPickerRef.value) {
            emojiPickerRef.value.toggleEmojiPicker()
        }
    })
}

async function addLikeDisLike(feed_id: number, index: number) {
    if (is_like_loading.value[index]) {
        return;
    }
    likeImage.value = '/images/icons-folder/like-50x50px.gif'


    comments.value = []
    is_like_loading.value[index] = true;
    let api_url = getUrl(RequestURL.feedLikeDisLike);
    let postData = {
        feed_id: feed_id,
        user_id: login_store.getUserDetails?.user_id
    }
    let response = await $fetch<SuccessError<FeedsModel.FeedLikeDisLikeResponseModel>>(api_url, {
        method: 'POST',
        body: postData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    is_like_loading.value[index] = false;
    likeImage.value = '/images/icons-folder/Like-150x150px.png'
    if (response.success) {
        let state = response.response?.state ?? ''
        let feed = allFeeds.value.filter((history: FeedsModel.FeedsResponseModel) => history.feed_id === feed_id)
        if (feed.length > 0) {
            if (state === 'liked') {
                feed[0].is_liked = true
            }
            else {
                feed[0].is_liked = false
            }
        }
    }
    else {
        showToastError(response.message)
    }


}

async function addComment() {
    let trim = commentTxt.value.trim() ?? ''
    if (is_add_comment_loading.value || trim.length === 0) {
        return;
    }
    is_add_comment_loading.value = true;
    let postData = {
        feed_id: selectedFeedId.value,
        user_id: login_store.getUserDetails?.user_id,
        comment: trim,
        comment_type: 'text'
    }

    let api_url = getUrl(RequestURL.addFeedComment);
    let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
        method: 'POST',
        body: postData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    is_add_comment_loading.value = false;
    if (response.success) {
        comments.value.push(response.response ?? {})
        commentTxt.value = ''
    }
    else {
        showToastError(response.message)
    }

}
async function fetchComments(feed_id: number) {
    if (is_comment_loading.value) {
        return;
    }
    comments.value = []
    is_comment_loading.value = true;
    let api_url = getUrl(RequestURL.fetchFeedComments);
    let postData = {
        feed_id: feed_id
    }
    let response = await $fetch<SuccessError<FeedsModel.FetchFeedCommentResponseModel>>(api_url, {
        method: 'POST',
        body: postData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    is_comment_loading.value = false;
    comments.value = response.result ?? []
}

function getProfilePlaceholder(media_path: string, profile_image: string, profile_type: string): string {
    if (media_path.length > 0 && profile_image.length > 0) {
        return media_path + profile_image
    }
    if (profile_type === 'Couple') return "/images/profile-placeholders/MF-COUPLE.png";
    if (profile_type === 'Others') return "/images/profile-placeholders/TRANS.png";
    if (profile_type === 'Woman') return "/images/profile-placeholders/WOMEN.png";
    if (profile_type === 'Man') return "/images/profile-placeholders/man.png";
    return "/images/profile-placeholders/man.png"
}

// Seekbar functions
function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getProgressWidth(index: number): number {
    const progress = videoProgress.value[index];
    return progress || 0;
}

function getCurrentTime(index: number): number {
    const currentTime = videoCurrentTimes.value[index];
    return currentTime || 0;
}

function getDuration(index: number): number {
    const duration = videoDurations.value[index];
    return duration || 0;
}

function seekToPosition(event: MouseEvent | TouchEvent, index: number) {
    // const player = players.value[index];

    const player = videoPlayer;
    if (!player) return;

    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Prevent event bubbling

    const track = event.currentTarget as HTMLElement;
    const rect = track.getBoundingClientRect();

    // Handle both mouse and touch events
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * player.duration();

    player.currentTime(newTime);
}

function updateSeekbar(index: number) {
    // const player = players.value[index];



    const player = videoPlayer;
    if (!player) return;

    const currentTime = player.currentTime();
    const duration = player.duration();

    if (duration > 0) {
        videoProgress.value[index] = (currentTime / duration) * 100;
        videoCurrentTimes.value[index] = currentTime;
        videoDurations.value[index] = duration;
    }
}

function toggleFullscreen(feed_id: number, index: number) {
    //   const player = players.value[index];
    const player = videoPlayer;
    if (!player || player.el().isConnected === false) return;
    fullscreenImage.value = '/images/icons-folder/full_screen-50x50px.gif'
    setTimeout(() => {
        fullscreenImage.value = '/images/icons-folder/Full screen-150x150px.png'

        try {
            if (player.isFullscreen()) {
                player.exitFullscreen();
                isFullscreen.value[index] = false;
            } else {
                player.requestFullscreen();
                isFullscreen.value[index] = true;
            }
        } catch (error) {
            // Fallback to native fullscreen API

            const videoElement = videoRefs.value[index];
            if (videoElement) {
                if (!document.fullscreenElement) {
                    videoElement.requestFullscreen().then(() => {
                        isFullscreen.value[index] = true;
                    }).catch(err => {
                        console.log('Fullscreen failed:', err);
                    });
                } else {
                    document.exitFullscreen().then(() => {
                        isFullscreen.value[index] = false;
                    });
                }
            }
        }



    }, 700);


}

</script>

<style scoped>
@import "video.js/dist/video-js.css";
</style>