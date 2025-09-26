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
              v-for="(item, index) in allMemberships"
              :key="index"
              class="swiper-slide"
            >
              <div class="item h-100">
                <div class="pricing-box bg-black text-white h-100 rounded shadow-sm p-4 d-flex flex-column">
                  <!-- Icon -->
                  <div class="pricing-icon text-center mb-3">
                    <img
                      class="img-fluid"
                      alt="plan-icon"
                      :src="getIcon(item.tier_name ?? '')"
                    />
                  </div>

                  <!-- Plan Info -->
                  <div class="pricing-content text-center mb-3">
                    <h3 class="text-theme">{{ item.tier_name }}</h3>
                  </div>

                  <!-- Features -->
                  <ul class="avb-price list-unstyled text-start flex-grow-1">
                    <li
                      v-for="(feature, i) in item.tier_features?.filter(f => (f.notes?.trim().length !== 0)) ?? []"
                      :key="i"
                      class="d-flex align-items-start mb-2 text-white"
                    >
                      <span class="text-white"> {{ feature.notes }}</span>
                    </li>
                  </ul>

                  <!-- Button -->
                  <div class="text-center mt-3">
                    <button
                      class="btn bg-theme-color w-100 fw-bold" :disabled="isDowngrade(item.price ?? 0)" @click="fetchMembership(item.tier_id ?? 0,item.price ?? 0)" v-if="(item.price ?? 0) !== 0"
                    >
                      Get Started
                      <span class="btn-loader" v-if="is_fetching"></span>
                  </button>
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

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { MembershipsModel, SuccessError, UsersModel } from "~/composables/models";
const user_store = userStore();
const login_store = useLoginStore();
const allMemberships = ref([] as MembershipsModel.FetchMembershipsResponseModel[])
const is_fetching = ref(false);
const fetchMemberShips = async () => {
  const api_url = getUrl(RequestURL.fetchMemberShips);
  const { data: mem_response, error: option_error } = await useFetch<SuccessError<MembershipsModel.FetchMembershipsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: {
      "content-type": "application/json"
    }
  });
  return mem_response.value?.result ?? []
}
allMemberships.value = await fetchMemberShips() as MembershipsModel.FetchMembershipsResponseModel[]
const modules = [Pagination, Navigation];

const swiperOption = ref({
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 15 },
    576: { slidesPerView: 1, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1200: { slidesPerView: 3, spaceBetween: 20 },
    1600: { slidesPerView: 4, spaceBetween: 20 },
  },
});

function getIcon(tier_name:string) : string
{
  if (tier_name.includes ("Elite")) return "/images/badges/elite.png";
  if (tier_name.includes("Basic+")) return "/images/badges/basic-plus.png";
  if (tier_name.includes ("Plus")) return "/images/badges/plus.png";
  return "/images/badges/free.png";
}

function isDowngrade(price:number) : boolean
{
  const currentPrice = login_store.getUserDetails?.price ?? 0;
  if (currentPrice > price) return true;
  return false;
}

async function fetchMembership(tier_id:number,price:number) 
{
    if (user_store.getLoginId === 0)
    {
      showToastError("You need to be logged in to perform this action");
      return;
    }
  if (is_fetching.value) return;
  is_fetching.value = true;
  const api_url = getUrl(RequestURL.fetchUserMembership);
 let response = await $fetch<SuccessError<UsersModel.FetchMembershipResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { user_id: user_store.getLoginId , tier_id : tier_id},
    headers: {
      "content-type": "application/json"
    }
  })
   
  if (response.success)
  {
      let price_difference = response.response?.price_difference ?? 0
      if (price_difference > 0)
      {
        createMembership(price_difference,tier_id)
      }
      else
      {
        is_fetching.value = false;
      }
  }
  else
  {
    if (response.code === 500)
    {
      is_fetching.value = false;
     showToastError(response.message ?? "Something went wrong");
    }
    else
    {
      createMembership(price,tier_id)
    }
  }
}

async function createMembership(price:number,tier_id:number)
{
    const api_url = getUrl(RequestURL.createUserMembership);
let response = await $fetch<SuccessError<UsersModel.CreateMembershipResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { user_id: user_store.getLoginId , tier_id : tier_id , price : price},
    headers: {
      "content-type": "application/json"
    }
  })
  is_fetching.value = false;
  if (response.success)
  {
     await navigateTo(response.response?.session_url,{
      external : true
     })
  }
  else
  {
    showToastError(response.message)
  }
  
}


</script>
