<template>

  <section class="counter-sec section-py-space counter-main">
    <div class="container">
      <div class="counter-title">
        <h4 class="title-line">Counters</h4>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="pt-0 counter-slider">
            <div >
              <swiper :breakpoints="swiperOption.breakpoints" :slidesPerView="4" :mousewheel="true" :spaceBetween="10"
              :loop="true"   class="swiper-wrapper">
                <swiper-slide
                  class="swiper-slide"
                  v-for="(item, index) in counterdata"
                  :key="index"
                >
                  <div class="item">
                    <div class="counter-box-second">
                      <div class="counter-box">
                        <div>
                          <i :class="item.tag"></i>
                          <h6 class="counter-no count"> <number class="counter-no count" ref="number1" :from="0" :to="item.count" :duration="5"
                            :delay="0" easing="Power1.easeOut" /></h6>
                          <span>{{ item.desc }} </span>
                        </div>
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
import "swiper/css";
const swiperOption = ref({
  breakpoints: {
    481: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
  },
});
const counterdata= ref([
        {
          tag: "counter-icon fa fa-user-o",
          count: 80,
          desc: "Happy Clients",
        },
        {
          tag: "counter-icon fa fa-square-o",
          count: 120,
          desc: "Project Completed",
        },
        {
          tag: "counter-icon fa fa-heart-o",
          count: 90,
          desc: "Photo Capture",
        },
        {
          tag: "counter-icon fa fa-comments-o",
          count: 140,
          desc: "Telephonic Talk",
        },
        {
          tag: "counter-icon fa fa-square-o",
          count: 120,
          desc: "Project Completed",
        },
      ])

</script>
