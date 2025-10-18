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
                            class="video-js vjs-defaultskin short-video"></video>
                        <!-- ✅ Simple Play / Pause Button -->
                        <!-- ✅ Play/Pause button with fade -->
                        <transition name="fade" v-if="item.media_type === 'video'">
                            <button v-if="showPlayBtn[index]" class="play-toggle" @click="togglePlay(index)">
                                {{ playingStates[index] ? '❚❚' : '▶️' }}
                            </button>
                        </transition>
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        <div class="overlay">
                            <h3 style="color: white;">{{ item.feed_desc }}</h3>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { FeedsModel, RequestURL } from '~/composables/models';
import videojs from "video.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel, Navigation, Pagination } from 'swiper/modules'
let swiperInstance = null
const videoRefs = ref([])
const players = ref([])
const showPlayBtn = ref([])
const playingStates = ref([]) // track play/pause per video
let fadeTimers = [] // store timeout IDs
import "swiper/css";
const route = useRoute();
definePageMeta({
    middleware: 'userdetails'
})
const allFeeds = ref([] as FeedsModel.FeedsResponseModel[])
const fetchFeeds = async () => {
    const api_url = getUrl(RequestURL.fetchFeeds);
    const { data: feed_response, error: option_error } = await useFetch<SuccessError<FeedsModel.FeedsResponseModel>>(api_url, {
        cache: "no-cache",
        method: "post",
        body: {
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
    await nextTick()
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
            ]
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


</script>

<style>
@import "video.js/dist/video-js.css";

/* ✅ Ensure body and root fill the screen */
html,
body,
#__nuxt,
#__layout {
    height: 100%;
    margin: 0;

}

/* ✅ Outer wrapper: full height and centered horizontally */
.shorts-wrapper {
    height: 100vh;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* ✅ Swiper must fill the wrapper fully */
.shorts-swiper {
    height: 100%;
    width: 100%;
}

/* ✅ Each slide fills the swiper viewport */
.short-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: black;
}

/* ✅ Container centers the frame */
.short-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

/* ✅ Frame simulates 9:16 Shorts card */
.short-frame {
    position: relative;
    width: 360px;
    height: 640px;
    /* 9:16 ratio */
    background: #000;

    overflow: hidden;
}

.short-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

/* ✅ Completely disable pointer events on the Video.js player */
.short-video,
.video-js {
    pointer-events: none !important;
}

/* Prevent user selecting text / long-press menus */
.short-video,
.video-js video {
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    touch-action: none;
}

/* --- Play / Pause Button --- */
.play-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2rem;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    cursor: pointer;

}

.play-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* --- Fade Animation --- */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;

}

/* ✅ Image fits frame */
.short-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: contain;
}

/* ✅ Overlay text */
.overlay {
    position: absolute;
    bottom: 0px;
    left: 5px;
    color: white;
    font-size: 1.2rem;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}

/* ✅ Responsive: make full width on mobile */
@media (max-width: 480px) {
    .shorts-wrapper {
        width: 100%;
        border-radius: 0;
        box-shadow: none;
    }
}
</style>