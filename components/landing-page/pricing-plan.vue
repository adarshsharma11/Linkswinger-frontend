<template>
  
    <section class="section-py-space bg-dark" id="price">

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="landing-title">
              <div class="sub-title">
                <div>
                  <h2 class="text-white">Platform Features</h2>
                </div>
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
                <swiper :breakpoints="swiperOption.breakpoints" Swiper :slidesPerView="4" :mousewheel="true" :spaceBetween="10"
                :loop="true"  :pagination="{clickable: true,}" :modules="modules" class="swiper-wrapper">
                  <swiper-slide
                    class="swiper-slide"
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
                            <h4>{{ item.price }} | {{ item.palne }}</h4><nuxt-link class="btn pricing-btn" to="/bonus/price">get started</nuxt-link>
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
  </section>
  
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
const config = useRuntimeConfig();

let swiperOption=ref({
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
      })

let plans = ([
  {
    img: "/images/landing/pricing-plan/1.png",
    plan: "Free Plan",
    price: "$0",
    palne: "Basic Features",
    feature1: "Basic Secure Messaging",
    feature2: "Limited Video Calls (5 mins)",
    feature3: "Basic Security Verification"
  },
  {
    img: "/images/landing/pricing-plan/2.png",
    plan: "Professional",
    price: "$59",
    palne: "Enhanced Features",
    feature1: "Unlimited Secure Messaging with Media",
    feature2: "HD Video Calls (No Time Limit)",
    feature3: "Advanced Security & Trust Score"
  },
  {
    img: "/images/landing/pricing-plan/3.png",
    plan: "Advanced",
    price: "$99",
    palne: "Premium Features",
    feature1: "Priority Secure Messaging & Storage",
    feature2: "Group Video Calls & Screen Sharing",
    feature3: "Premium Verification Badge"
  },
  {
    img: "/images/landing/pricing-plan/2.png",
    plan: "Enterprise",
    price: "$159",
    palne: "Complete Package",
    feature1: "All Premium Messaging Features",
    feature2: "Unlimited Video Conference Tools",
    feature3: "Custom Security Solutions"
  }
])
let modules= [Pagination]
</script>

