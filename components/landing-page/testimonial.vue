<template>

    <div class="custom-container testimonial-main">
      <div class="row">
        <div class="col-12">
      
              <swiper :breakpoints="swiperOption.breakpoints" :navigation="true"  Swiper :slidesPerView="4" :mousewheel="true" :spaceBetween="10"
              :loop="true"  :pagination="{clickable: true,}" :modules="modules" class="swiper-wrapper">
                <swiper-slide
                  class="swiper-slide"
                  v-for="(item, index) in testimonial"
                  :key="index"
                >
                  <div class="item">
                    <div class="testimonial-box mt-0">
                      <div class="test-img">
                        <img class="img-fluid" :src="`${config.public.baseURL}${item.img}`" alt="test-img" /><i
                          v-if="item.heart"
                          class="test-wish fa fa-heart"
                        ></i>
                      </div>
                      <div class="test-contain">
                        <h4>{{ item.manager }}</h4>
                        <h3>{{ item.equipment }}</h3>
                        <h6>{{ item.desc }}</h6>
                        <ul class="test-icon">
                          <li>
                            <a href="https://www.google.com/"
                              ><img
                                class="img-fluid"
                                src="/images/landing/testimonial/icon1.png"
                                alt="icon-google"
                            /></a>
                          </li>
                          <li>
                            <a href="https://twitter.com/"
                              ><img
                                class="img-fluid"
                                src="/images/landing/testimonial/icon2.png"
                                alt="icon-google"
                            /></a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/"
                              ><img
                                class="img-fluid"
                                src="/images/landing/testimonial/icon3.png"
                                alt="icon-google"
                            /></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
        
        </div>
      </div>
      <div class="testimonial-back-content">
        <img
          class="img-fluid test-img2"
          src="/images/landing/testimonial/6.png"
          alt="testimonial"
        />
      </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
const config = useRuntimeConfig();

const swiperOption = ref({
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1070: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1600: {
      slidesPerView: 4,
    },
  },
});

const testimonial = ref([
  {
    img: "/images/landing/testimonial/1.png",
    heart: true,
    manager: "project manager",
    equipment: "Advanced Equipment",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    img: "/images/landing/testimonial/2.png",
    heart: false,
    manager: "project manager",
    equipment: "Advanced Equipment",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    img: "/images/landing/testimonial/3.png",
    heart: true,
    manager: "project manager",
    equipment: "Advanced Equipment",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    img: "/images/landing/testimonial/4.png",
    heart: true,
    manager: "project manager",
    equipment: "Advanced Equipment",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    img: "/images/landing/testimonial/3.png",
    heart: true,
    manager: "project manager",
    equipment: "Advanced Equipment",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
]);

const modules = [Pagination, Navigation];
</script>