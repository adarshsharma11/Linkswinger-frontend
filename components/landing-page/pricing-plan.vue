<template>
  
    <section class="section-py-space" id="price">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="landing-title">
              <div>
                <h1>pricing plan</h1>
              </div>
              <div class="sub-title">
                <div>
                  <h4>Choose Your Pricing Plan</h4>
                  <h2>Affordable for everyone!</h2>
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
                             :src="`${config.public.baseURL}${item.img}`"
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

      let  plans= ([
        {
          img: "/images/landing/pricing-plan/1.png",
          plan :"Free Plan",
          price:"$0",
          palne:"Totally Free Plane",
          feature1 : "Common Feature is Available",
          feature2 : "sxgsgerggregrterett",
          feature3 : "Try for free, Forever!"
        },
        {
          img: "/images/landing/pricing-plan/2.png",
          plan :"Professional",
          price:"$59",
          palne:"Professional Plane",
          feature1 : "All Features is Available",
          feature2 : "High Definition Full-screen",
          feature3 : "24/7 phone and email support"
        },
        {
          img: "/images/landing/pricing-plan/3.png",
          plan :"Advanced",
          price:"$99",
          palne:"Advance Plane",
          feature1 : "All Features is Available",
          feature2 : "High Definition Full-screen",
          feature3 : "24/7 phone and email support"
        },
        {
          img: "/images/landing/pricing-plan/2.png",
          plan :"Professional",
          price:"$59",
          palne:"Professional Plane",
          feature1 : "All Features is Available",
          feature2 : "High Definition Full-screen",
          feature3 : "24/7 phone and email support"
        }
      ])
let modules= [Pagination]
</script>

