<template>
  <section class="section-py-space bg-darker" id="price">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="landing-title text-center">
            <div class="login-content-header mb-3">
              <CommonLogo :logo="'landing-logo.gif'" />
            </div>
            <h4 class="text-white-50 mb-2">Choose Your Pricing Plan</h4>
            <h2 class="text-white fw-bold">LinkSwingers Membership Tiers</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Plans -->
    <div class="custom-container mt-4">
      <div class="row">
        <div class="col-12">
          <swiper
            :breakpoints="swiperOption.breakpoints"
            :slidesPerView="4"
            :spaceBetween="20"
            :loop="true"
            :pagination="{ clickable: true }"
            :navigation="true"
            :modules="modules"
            class="swiper-wrapper"
          >
            <swiper-slide
              v-for="(item, index) in plans"
              :key="index"
              class="swiper-slide"
            >
              <div class="item h-100">
                <div class="pricing-box bg-black text-white h-100 rounded shadow-sm p-4 d-flex flex-column">
                  <!-- Icon -->
                  <div class="pricing-icon text-center mb-3">
                    <img
                      class="img-fluid"
                      :src="item.icon"
                      alt="plan-icon"
                    />
                  </div>

                  <!-- Plan Info -->
                  <div class="pricing-content text-center mb-3">
                    <h3 class="text-theme">{{ item.plan }}</h3>
                    <p class="small text-white-50">{{ item.desc }}</p>
                  </div>

                  <!-- Features -->
                  <ul class="avb-price list-unstyled text-start flex-grow-1">
                    <li
                      v-for="(feature, i) in item.features"
                      :key="i"
                      class="d-flex align-items-start mb-2 text-white"
                    >
                      <i class="fa fa-check text-success me-2 mt-1"></i>
                      <span class="text-white">{{ feature }}</span>
                    </li>
                  </ul>

                  <!-- Button -->
                  <div class="text-center mt-3">
                    <nuxt-link
                      class="btn bg-theme-color w-100 fw-bold"
                      to="/bonus/price"
                    >
                      Get Started
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiperOption = ref({
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 15 },
    576: { slidesPerView: 1, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1200: { slidesPerView: 3, spaceBetween: 20 },
    1600: { slidesPerView: 4, spaceBetween: 20 },
  },
});

const plans = [
  {
    plan: "Free",
    desc: "Perfect for exploring the basics.",
    icon: "/images/badges/free.png",
    features: [
      "Location sharing → see up to 10 people nearby",
      "Send up to 100 messages/day (text only)",
      "Upload 3 pictures/day (max 50)",
      "No video calls or Roulette",
      "View public pictures only",
      "Attach only approved photos in messages",
    ],
  },
  {
    plan: "Basic Plus",
    desc: "Unlock messaging freedom & live features.",
    icon: "/images/badges/basic-plus.png",
    features: [
      "Location sharing → full view",
      "Unlimited text messages",
      "Emojis enabled",
      "Upload 10 pictures/day (max 120)",
      "Watch videos (no uploads)",
      "Attach photos in messages from device",
      "See who’s live & type in chat",
    ],
  },
  {
    plan: "Plus",
    desc: "Enjoy full messaging + calls + Roulette spins.",
    icon: "/images/badges/plus.png",
    features: [
      "Location sharing → full access",
      "Unlimited messages",
      "Attach content (photos/videos)",
      "Audio/video calls with PIN (30 mins/day)",
      "Video Roulette → 200 spins/day",
    ],
  },
  {
    plan: "Elite",
    desc: "Everything unlimited + Go Live!",
    icon: "/images/badges/elite.png",
    features: [
      "Everything in Plus",
      "No limits on messaging, uploads, calls, Roulette",
      "Roulette with gender & location filters",
      "Go Live → host own livestreams",
      "Unlimited Roulette session length",
      "Upload 20 pictures/day (max 200)",
      "Upload 20 videos/day (max 50)",
    ],
  },
];

const modules = [Pagination, Navigation];
</script>
