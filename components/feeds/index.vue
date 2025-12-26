<template>
    <div class="shorts-wrapper">

        <video ref="videoRef" class="video-js vjs-defaultskin short-video vjs-16-9" playsinline webkit-playsinline
            x5-playsinline></video>
        <Swiper :modules="[Pagination, Navigation, Mousewheel, Virtual]" direction="vertical" :mousewheel="true"
            :slides-per-view="1" class="shorts-swiper" @swiper="onSwiper" :lazy="true" @slideChange="onSlideChange"
            @reachEnd="onReachEnd" :initial-slide="props.selectedIndex" :virtual="true">
            <SwiperSlide v-for="(item, index) in allFeeds" :key="item.feed_id" :virtualIndex="index"
                class="short-slide">
                <div class="short-container" :key="item.feed_id">
                    <div class="short-frame" :key="item.feed_id" @click="onFrameTap(index)"
                        @touchstart="onFrameTap(index)" :ref="el => setFrameRef(el, index)">
                        <img :key="item.feed_id" :src="`${item.media_path}${item.hd_feed_image}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'image'" data-type="thumb" />
                        <img :key="item.feed_id" :src="`${item.media_path}${item.feed_thumbnail}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'video'" data-type="video-thumb" />


                        <transition name="fade" v-if="item.media_type === 'video'">
                            <button v-if="showPlayBtn[index]" class="play-toggle" @click="togglePlay(index)">
                                <img v-if="playingStates[index]" src="/images/icons-folder/Pause-150x150px.png"
                                    class="play-icon">

                                <img v-else src="/images/icons-folder/Play-150x150px.png" class="play-icon">
                            </button>
                        </transition>
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        <div class="overlay">
                            <!-- Seekbar for video -->
                            <div v-if="item.media_type === 'video'" class="seekbar-container">
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
                                <div class="overlay-left" v-if="props.fromFeeds === true">
                                    <div class="vd-name">
                                        <div class="vd-img">
                                            <img
                                                :src="getProfilePlaceholder(item.media_path ?? '', item.profile_image ?? '', item.profile_type ?? '')" />
                                        </div>
                                        <div class="vdo-name">
                                            <h3>{{ item.nick_name }}</h3>
                                        </div>
                                    </div>
                                    <div class="feed-description">
                                        <h3 style="color: white;">{{ item.feed_desc }}</h3>
                                    </div>
                                </div>
                                <div class="overlay-right">
                                    <!-- <span class="btn-loader" v-if="is_like_loading[index]"></span> -->
                                    <button>
                                        <img src="/public/images/icons-folder/Report-150x150px.png" class="Report-icon"
                                            @click="openReport(item.feed_id ?? 0)" />
                                    </button>
                                    <button :style="{ backgroundColor: item.is_liked ? 'green' : 'white' }"
                                        v-if="item.can_like === true"
                                        @click.stop="addLikeDisLike(item.feed_id ?? 0, index)">
                                        <img :src="likeImage" class="like-icon" />
                                    </button>
                                    <button v-if="item.can_comment === true" aria-label="Go to Comment"
                                        @click.stop="openComments(item.feed_id ?? 0)">
                                        <img :src="commentImage" class="comment-icon" />
                                    </button>
                                    <!--<button aria-label="Fullscreen" @click.stop="toggleFullscreen(item.feed_id ?? 0, index)" class="fullscreen-btn">
                                        <svg v-if="!isFullscreen[index]" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"
                                            style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"
                                            style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                                            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                                        </svg>
                                    </button>-->
                                    <button aria-label="Fullscreen"
                                        @click.stop="toggleFullscreen(item.feed_id ?? 0, index)" class="fullscreen-btn">
                                        <!-- Fullscreen Icon -->
                                        <img v-if="!isFullscreen[index]" :src="fullscreenImage" class="fullscreen-icon">

                                        <!-- Restore Screen Icon -->
                                        <img v-else src="/public/images/icons-folder/restore fullscreen-150x150px.png"
                                            class="fullscreen-icon">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>

    <div class="modal fade comment-modal" id="commentmodal" tabindex="-1" role="dialog" aria-hidden="true"
        v-if="showComment">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content bg-dark text-white">
                <!-- Header -->

                <div class="modal-header ad-sc-header border-0">
                    <h2 class="modal-title text-white">Comments</h2>
                    <button class="close text-danger fs-3 fw-bold" type="button" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body comment-body">
                    <div class="comment-list">
                        <span class="btn-loader" v-if="is_comment_loading"></span>
                        <div v-if="!is_comment_loading" class="comment-items" v-for="comment in comments"
                            :key="comment.feed_comment_id">
                            <div class="cmt-img">
                                <img
                                    :src="getProfilePlaceholder(comment.media_path ?? '', comment.profile_image ?? '', comment.profile_type ?? '')" />
                            </div>
                            <div class="cmt-content">
                                <h3> {{ comment.nick_name }} </h3>
                                <div v-if="comment.comment_type !== 'emoji'">
                                    <p>{{ comment.comment }}</p>
                                </div>
                                <div v-if="comment.comment_type === 'emoji'">
                                    <Lottie renderer="svg" v-if="getFileExtension(comment.comment ?? '') === '.json'"
                                        :link="(comment.media_path ?? '') + (comment.comment ?? '')"
                                        style="max-width: 80px; max-height: 80px;">
                                    </Lottie>
                                    <video loop autoplay playsinline
                                        v-else-if="getFileExtension(comment.comment ?? '') === '.webm'"
                                        :src="(comment.media_path ?? '') + (comment.comment ?? '')"
                                        style="max-width: 40px; max-height: 40px;"></video>
                                    <img v-else-if="getFileExtension(comment.comment ?? '') !== '.json'"
                                        :src="(comment.media_path ?? '') + (comment.comment ?? '')"
                                        style="max-width: 80px; max-height: 80px;" />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="cmt-ath">
                            <img
                                :src="getProfilePlaceholder(login_store.getUserDetails?.media_path ?? '', login_store.getUserDetails?.profile_image ?? '', login_store.getUserDetails?.profile_type ?? '')" />
                        </div>
                        <div class="cmt-text">
                            <input ref="commentRef" v-model="commentTxt" type="text" placeholder="Add a comment" />
                            <button class="btn btn-link text-light fs-5" @click="handleToggle">😊</button>
                            <div class="comt-buttons">
                                <button class="cmt-cancel-btn">Cancel</button>
                                <button v-if="!is_add_comment_loading" class="cmt-send-btn"
                                    @click="addComment()">Comment</button>
                                <span class="btn-loader" v-if="is_add_comment_loading"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <EmojiPicker v-if="showPicker" ref="emojiPickerRef" v-on:selected-emoji="selectedEmoji"
        v-on:select-custom-emoji="selectCustomEmoji" @closed-emoji-picker="closedEmojiPicker()" />


    <CommonReportModal id="reportModel" v-if="showReport" @close="closeReport" :report-type="'feed'"
        :ref-id="selectedFeedId"></CommonReportModal>
</template>

<script setup lang="ts">

const props = defineProps({
    allFeeds: { type: Array, default: () => [] },
    fromFeeds: { type: Boolean, default: () => true },
    mediaType: { type: String, default: () => 'image' },
    selectedIndex: { type: Number, default: () => 0 }
})
const emit = defineEmits(['modelOpen', 'modelClosed'])
const showPicker = ref(false)
const showReport = ref(false)
const showComment = ref(false)
import { FeedsModel, RequestURL } from '~/composables/models';
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

const selectedFeed = ref({} as FeedsModel.FeedsResponseModel)
const allFeeds = ref(props.allFeeds as FeedsModel.FeedsResponseModel[])
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

        if (feed.media_type === 'video' && videoEl) {

            // const player = videojs(videoEl, {
            //     controls: false, // ✅ hide default UI
            //     autoplay: false,
            //     preload: 'none',
            //     muted: false,
            //     loop: true,
            //     fluid: true,
            //     sources: [
            //         {
            //             src: `${feed.media_path}${feed.hd_feed_video}`,
            //             type: 'application/x-mpegURL'
            //         }
            //     ],
            //     html5: {
            //         vhs: {
            //             overrideNative: true
            //         },
            //         nativeAudioTracks: false,
            //         nativeVideoTracks: false
            //     }

            // })
            players.value.push(null)
            playingStates.value.push(false)
            showPlayBtn.value.push(true) // show initially
            videoProgress.value[i] = 0
            videoCurrentTimes.value[i] = 0
            videoDurations.value[i] = 0
            isFullscreen.value.push(false) // initialize fullscreen state

            // player.on('timeupdate', () => {
            //     updateSeekbar(i)
            // })

            // player.on('loadedmetadata', () => {
            //     videoDurations.value[i] = player.duration()
            // })

            // // Listen for fullscreen change events to update state
            // player.on('fullscreenchange', () => {
            //     isFullscreen.value[i] = player.isFullscreen();
            // });
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

    // 🧠 Observe which slide is visible → play/pause automatically
    // observer = new IntersectionObserver(
    //     entries => {
    //         entries.forEach(entry => {
    //             const index = entry.target.querySelector('video')?.dataset.index
    //             //    const player = players.value[index]
    //             if (allFeeds.value.length > 0 && index) {
    //                 const player = videoPlayer
    //                 const feed = allFeeds.value[index]
    //                 if (!player || feed.media_type !== 'video') return
    //                 if (entry.isIntersecting) {
    //                     player.play().catch(() => { })
    //                     playingStates.value[index] = true
    //                 } else {
    //                     player.pause()
    //                     playingStates.value[index] = false
    //                 }
    //             }

    //         })
    //     },
    //     { threshold: 0.7 }
    // )
    //  document.querySelectorAll('.short-slide').forEach(el => observer.observe(el))

    createPlayer()
    removeVideoFromShortsWrapper()
    //attachToIndex2Top(props.selectedIndex)
    nextTick(() => {
        playAtIndex(props.selectedIndex)
    })

})
onBeforeUnmount(() => {
   
    //  observer?.disconnect()
    players.value.forEach(p => {
        if (p) {
            p.dispose()
        }
    })
    allFeeds.value.forEach(fe =>{
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
    // if (props.selectedIndex > 0) {
    //     swiperInstance.slideTo(props.selectedIndex, 0);
    // }



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
            // players.value.forEach((player, index) => {
            //     if (player) {
            //         isFullscreen.value[index] = !!document.fullscreenElement;
            //     }
            // });
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
        if (videoPlayer && feed.media_type === 'video') {

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



    // players.value.forEach((player, i) => {
    //     player = videoPlayer

    //     if (player) {

    //         if (i === activeIndex) {

    //             //   player.play().catch(() => { })

    //             playAtIndex(activeIndex)
    //             playingStates.value[i] = true
    //             showPlayBtn.value[i] = false // ✅ hide immediately on new slide
    //             // or showPlayTemporarily(i) if you want a short flash
    //         } else {
    //             player.pause()
    //             //  player.reset()
    //             playingStates.value[i] = false
    //             showPlayBtn.value[i] = true // keep visible if paused
    //         }
    //     }
    //     else 
    //     {
    //         player.pause()
    //           detachVideoFromFrames()
    //         playingStates.value[i] = false
    //         showPlayBtn.value[i] = false
    //     }
    // })
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
            //  frame.appendChild(video)
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
        if (feed.media_type !== 'video' || videoPlayer === null) {
            return;
        }
        attachToIndex2Top(index);


        videoPlayer.pause()
        videoPlayer.src({
            src: `${feed.media_path}${feed.hd_feed_video}`,
            type: 'application/x-mpegURL'
        })
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

function closedEmojiPicker()
{
 
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