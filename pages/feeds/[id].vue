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
                            class="video-js vjs-defaultskin short-video"  playsinline webkit-playsinline x5-playsinline></video>
                        <!-- ✅ Simple Play / Pause Button -->
                        <!-- ✅ Play/Pause button with fade -->
                        <transition name="fade" v-if="item.media_type === 'video'">
                            <button v-if="showPlayBtn[index]" class="play-toggle" @click="togglePlay(index)">
                                {{ playingStates[index] ? '❚❚' : '▶️' }}
                            </button>
                        </transition>
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        <div class="overlay">
                            <div class="vd-name">
                                <div class="vd-img">
                                    <img :src="getImagePath(item)" />
                                </div>
                                <div class="vdo-name">
                                    <h3>{{ item.nick_name }}</h3>
                                </div>
                            </div>
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
    middleware: 'auth'
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
            controls: true, // ✅ hide default UI
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

function getImagePath(item: FeedsModel.FeedsResponseModel) {
    let profile_image = item.profile_image  ?? '';
    if (profile_image.length === 0) {
        return 'public/images/avtar/1.jpg';
    }

    return `${item.media_path}${item.profile_image}`;
}


</script>

<style>
@import "video.js/dist/video-js.css";
</style>