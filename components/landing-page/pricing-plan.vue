<template>
  <section class="section-py-space bg-dark" id="price">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="landing-title">
            <div class="sub-title">
              <div>
                <h2 class="text-white">Free vs Premium Membership</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="custom-container">
        <div class="row">
          <div class="col-12">
            <div>
              <div>
                <swiper
                  :breakpoints="swiperOption.breakpoints"
                  :slides-per-view="4"
                  :space-between="10"
                  :loop="true"
                  :autoplay="{ delay: 2000, disableOnInteraction: false }"
                  :modules="modules"
                  class="swiper-wrapper"
                >
                  <swiper-slide
                    v-for="(item, index) in plans"
                    :key="index"
                  >
                    <div class="item">
                      <div class="pricing-box">
                        <div>
                          <div class="pricing-icon">
                            <img
                              class="img-fluid"
                              :src="`${item.img}`"
                              alt="test-img"
                            />
                          </div>
                          <div class="pricing-content">
                            <h2>{{ item.plan }}</h2>
                            <h4>{{ item.price }} | {{ item.palne }}</h4>
                            <nuxt-link class="btn pricing-btn" to="/bonus/price">
                              get started
                            </nuxt-link>
                          </div>
                          <ul class="avb-price">
                            <li><i class="fa fa-check"></i>{{ item.feature1 }}</li>
                            <li><i class="fa fa-check"></i>{{ item.feature2 }}</li>
                            <li><i class="fa fa-check"></i>{{ item.feature3 }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

let swiperOption = ref({
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1070: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1600: {
      slidesPerView: 3,
    },
  },
});

let plans = [
  {
    img: "/images/landing/pricing-plan/1.png",
    plan: "Basic",
    price: "£0/month",
    palne: "Basic Features",
    feature1: "Location sharing (up to 10 people)",
    feature2: "No video uploads/playback",
    feature3: "Upload up to 3 pictures/day",
  },
  {
    img: "/images/landing/pricing-plan/2.png",
    plan: "Basic+",
    price: "£5/month",
    palne: "Enhanced Features",
    feature1: "Full location sharing (no cap)",
    feature2: "Unlimited text messages with emojis",
    feature3: "Upload up to 10 pictures/day",
  },
  {
    img: "/images/landing/pricing-plan/3.png",
    plan: "Plus",
    price: "£9/month",
    palne: "Premium Features",
    feature1: "Audio/video calls (30 min/day)",
    feature2: "Roulette: 350 spins/day",
    feature3: "HD photo & video upload & view",
  },
  {
    img: "/images/landing/pricing-plan/2.png",
    plan: "Elite",
    price: "£12.50/month",
    palne: "Complete Package",
    feature1: "Everything in Plus",
    feature2: "Elite-only Roulette with gender filters",
    feature3: "Full location sharing access",
  },
];

let modules = [Pagination, Autoplay];
</script>
