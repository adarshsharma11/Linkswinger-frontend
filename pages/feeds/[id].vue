<template>
    <div class="shorts-wrapper">
        <Swiper :modules="[Pagination, Navigation, Mousewheel]" direction="vertical" :mousewheel="true"
            :slides-per-view="1" class="shorts-swiper" @swiper="onSwiper" :lazy="true">
            <SwiperSlide v-for="(item, index) in allFeeds" :key="item.feed_id" class="short-slide">
                <div class="short-container" :key="item.feed_id">
                    <div class="short-frame" :key="item.feed_id">
                        <img :key="item.feed_id" :src="`${item.media_path}${item.hd_feed_image}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'image'" />
                        <img :key="item.feed_id" :src="`${item.media_path}${item.feed_thumbnail}`" class="short-image"
                            loading="lazy" v-if="item.media_type === 'video'" />
                        <video v-if="item.media_type === 'video'" ref="videoRefs"
                            class="video-js vjs-defaultskin short-video"></video>
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
const onSwiper = (swiper: any) => {
    swiperInstance = swiper
}
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
onMounted(() => {

    allFeeds.value.forEach((feed, index) => {
        const videoEl = videoRefs.value[index]

        const player = videojs(videoEl, {
            autoplay: false,
            controls: true,
            loop: true,
            preload: 'auto',
            muted: false,
            fluid: true,
            sources: [
                {
                    src: (feed.media_path ?? '') + feed.hd_feed_video,
                    type: 'application/x-mpegURL'
                }
            ]
        })

        players.value.push(player)

        // Pause/Play based on visibility
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const index = entry.target.querySelector('video')?.dataset.index
                    const player = players.value[index]
                    if (!player) return
                    if (entry.isIntersecting) player.play().catch(() => { })
                    else player.pause()
                })
            },
            { threshold: 0.7 }
        )
        document.querySelectorAll('.short-slide').forEach(el => observer.observe(el))
        onBeforeUnmount(() => {
            console.log('Cleaning up observers and players')
            observer.disconnect()
            players.value.forEach(p => p.dispose())
        })


    })

});

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