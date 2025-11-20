<template>
    <div class="shorts-wrapper">
        <Swiper :modules="[Pagination, Navigation, Mousewheel]" direction="vertical" :mousewheel="true"
            :slides-per-view="1" class="shorts-swiper" @swiper="onSwiper" :lazy="true" @slideChange="onSlideChange"
            @reachEnd="onReachEnd">
            <SwiperSlide v-for="(item, index) in allFeeds" :key="item.feed_id" class="short-slide">
                <div class="short-container" :key="item.feed_id">
                    <div class="short-frame" :key="item.feed_id" @click="onFrameTap(index)">
                        <img :key="item.feed_id" :src="`${item.media_path}${item.hd_feed_image}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'image'" />
                        <img :key="item.feed_id" :src="`${item.media_path}${item.feed_thumbnail}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'video'" />
                        <video v-if="item.media_type === 'video'" ref="videoRefs"
                            class="video-js vjs-defaultskin short-video" playsinline webkit-playsinline
                            x5-playsinline></video>
                        <!-- ✅ Simple Play / Pause Button -->
                        <!-- ✅ Play/Pause button with fade -->
                        <transition name="fade" v-if="item.media_type === 'video'">
                            <button v-if="showPlayBtn[index]" class="play-toggle" @click="togglePlay(index)">
                                {{ playingStates[index] ? '❚❚' : '▶️' }}
                            </button>
                        </transition>
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        <div class="overlay">
                            <div class="overlay-inner d-flex flex-wrap justify-content-between">
                                <div class="overlay-left">
                                    <div class="vd-name">
                                        <div class="vd-img">
                                            <img
                                                :src="getProfilePlaceholder(item.media_path ?? '', item.profile_image ?? '', item.profile_type ?? '')" />
                                        </div>
                                        <div class="vdo-name">
                                            <h3>{{ item.nick_name }}</h3>
                                        </div>
                                    </div>
                                    <h3 style="color: white;">{{ item.feed_desc }}</h3>
                                </div>
                                <div class="overlay-right">
                                    <span class="btn-loader" v-if="is_like_loading"></span>
                                    <button :style="{ backgroundColor: item.is_liked ? 'green' : 'white' }"
                                        v-if="!is_like_loading" @click="addLikeDisLike(item.feed_id ?? 0)"><svg
                                            xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
                                            width="24" focusable="false" aria-hidden="true"
                                            style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                                            <path
                                                d="M9.221 1.795a1 1 0 011.109-.656l1.04.173a4 4 0 013.252 4.784L14 9h4.061a3.664 3.664 0 013.576 2.868A3.68 3.68 0 0121 14.85l.02.087A3.815 3.815 0 0120 18.5v.043l-.01.227a2.82 2.82 0 01-.135.663l-.106.282A3.754 3.754 0 0116.295 22h-3.606l-.392-.007a12.002 12.002 0 01-5.223-1.388l-.343-.189-.27-.154a2.005 2.005 0 00-.863-.26l-.13-.004H3.5a1.5 1.5 0 01-1.5-1.5V12.5A1.5 1.5 0 013.5 11h1.79l.157-.013a1 1 0 00.724-.512l.063-.145 2.987-8.535Zm-1.1 9.196A3 3 0 015.29 13H4v4.998h1.468a4 4 0 011.986.528l.27.155.285.157A10 10 0 0012.69 20h3.606c.754 0 1.424-.483 1.663-1.2l.03-.126a.819.819 0 00.012-.131v-.872l.587-.586c.388-.388.577-.927.523-1.465l-.038-.23-.02-.087-.21-.9.55-.744A1.663 1.663 0 0018.061 11H14a2.002 2.002 0 01-1.956-2.418l.623-2.904a2 2 0 00-1.626-2.392l-.21-.035-2.71 7.741Z">
                                            </path>
                                        </svg></button>
                                    <button aria-label="Go to Comment" @click="openComments(item.feed_id ?? 0)"><svg
                                            xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"
                                            width="24" focusable="false" aria-hidden="true"
                                            style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                                            <path
                                                d="M1 6a4 4 0 014-4h14a4 4 0 014 4v10a4 4 0 01-4 4h-4.8l-5.105 2.836A1.41 1.41 0 017 21.604V20H5a4 4 0 01-4-4V6Zm8 12v2.601l4.229-2.35.453-.251H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h4ZM7 8a1 1 0 000 2h10a1 1 0 100-2H7Zm-1 5a1 1 0 001 1h6a1 1 0 000-2H7a1 1 0 00-1 1Z">
                                            </path>
                                        </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>

    <div class="modal fade comment-modal" id="commentmodal" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    </Lottie><img v-if="getFileExtension(comment.comment ?? '') !== '.json'"
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

    <Teleport to="body">
        <div style="position: fixed; z-index: 999999; left: 0; top: 0;">
            <EmojiPicker ref="emojiPickerRef" v-on:selected-emoji="selectedEmoji"
                v-on:select-custom-emoji="selectCustomEmoji" />
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { FeedsModel, RequestURL } from '~/composables/models';
import videojs from "video.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, Pagination } from 'swiper/modules'
import "swiper/css";
let swiperInstance = null
const videoRefs = ref([])
const players = ref([])
const showPlayBtn = ref([])
const playingStates = ref([]) // track play/pause per video
let fadeTimers = [] // store timeout IDs
const { $bootstrap } = useNuxtApp();
var commentModal: any = null
const selectedFeedId = ref(0);
const commentTxt = ref('');
const route = useRoute();
const login_store = useLoginStore()
const comments = ref([] as FeedsModel.FetchFeedCommentResponseModel[])
const is_comment_loading = ref(false);
const is_like_loading = ref(false);
const is_add_comment_loading = ref(false);
const commentRef = ref<HTMLInputElement | null>(null);
const emojiPickerRef = ref(null)
definePageMeta({
    middleware: 'auth'
})
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const fetchFeeds = async () => {
    const api_url = getUrl(RequestURL.fetchFeeds);
    const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
        cache: "no-cache",
        method: "post",
        body: {
            login_id: login_store.getUserDetails?.user_id ?? 0,
            user_id: Number(route.params.id),
            media_type: route.query.media_type,
            feed_type: route.query.feed_type
        },
        headers: {
            "content-type": "application/json"
        }
    });
    return feed_response.value?.result ?? []
}
allFeeds.value = await fetchFeeds() as FeedsModel.FeedsResponseModel[]
onMounted(async () => {
    commentModal = new ($bootstrap as any).Modal(document.getElementById('commentmodal'));
    await nextTick()
    if (route.query.media_type === 'video') {


        allFeeds.value.forEach((feed, i) => {

            const videoEl = videoRefs.value[i]
            const player = videojs(videoEl, {
                controls: false, // ✅ hide default UI
                autoplay: false,
                preload: 'auto',
                muted: false,
                loop: true,
                fluid: true,
                sources: [
                    {
                        src: `${feed.media_path}${feed.hd_feed_video}`,
                        type: 'application/x-mpegURL'
                    }
                ],
                html5: {
                    vhs: {
                        overrideNative: true
                    },
                    nativeAudioTracks: false,
                    nativeVideoTracks: false
                }

            })
            players.value.push(player)
            playingStates.value.push(false)
            showPlayBtn.value.push(true) // show initially
        })

        // 🧠 Observe which slide is visible → play/pause automatically
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const index = entry.target.querySelector('video')?.dataset.index
                    const player = players.value[index]
                    if (!player) return
                    if (entry.isIntersecting) {
                        player.play().catch(() => { })
                        playingStates.value[index] = true
                    } else {
                        player.pause()
                        playingStates.value[index] = false
                    }
                })
            },
            { threshold: 0.7 }
        )
        document.querySelectorAll('.short-slide').forEach(el => observer.observe(el))

        onBeforeUnmount(() => {
            observer.disconnect()
            players.value.forEach(p => p.dispose())
        })
    }
})


const onSwiper = (swiper: any) => {
    swiperInstance = swiper
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
    const player = players.value[index]
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
                console.log('Frame tapped, showing play button')
            }

        }, 2000)
    }
}
// Handle slide changes (pause others)
const onSlideChange = () => {
    const activeIndex = swiperInstance?.activeIndex ?? 0
    players.value.forEach((player, i) => {
        if (i === activeIndex) {
            player.play().catch(() => { })
            playingStates.value[i] = true
            showPlayBtn.value[i] = false // ✅ hide immediately on new slide
            // or showPlayTemporarily(i) if you want a short flash
        } else {
            player.pause()
            playingStates.value[i] = false
            showPlayBtn.value[i] = true // keep visible if paused
        }
    })
}


// ✅ Stop last video when reaching the end
const onReachEnd = () => {
    const lastIndex = allFeeds.value.length - 1
    const lastPlayer = players.value[lastIndex]
    if (lastPlayer) {
        lastPlayer.pause()
        playingStates.value[lastIndex] = false
    }
}



function openComments(feed_id: number) {
    commentTxt.value = ''
    selectedFeedId.value = feed_id
    commentModal.show();
    fetchComments(feed_id)
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
    if (emojiPickerRef.value) {
        emojiPickerRef.value.toggleEmojiPicker()
    }
}

async function addLikeDisLike(feed_id: number) {
    if (is_like_loading.value) {
        return;
    }
    comments.value = []
    is_like_loading.value = true;
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
    is_like_loading.value = false;
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

</script>

<style>
@import "video.js/dist/video-js.css";
</style>