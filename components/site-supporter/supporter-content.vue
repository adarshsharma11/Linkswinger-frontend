<template>
  <div class="supporter-page">
    <!-- Mobile Version -->
    <div class="supporter-mobile" v-if="isMobile">
      <div class="supporter-app">
        <div class="supporter-header">
          <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo" class="supporter-logo" />
          <div class="supporter-kicker">Choose Your Plan</div>
          <h1 class="supporter-title text-white">LinkSwingers Site Supporter Plans</h1>
          <p class="supporter-subtitle">Swipe left/right to compare plans. No page scrolling — scroll inside each plan
            card.</p>
        </div>

        <section class="supporter-carousel-shell">
          <button class="supporter-nav-btn supporter-nav-left" @click="scrollToPlan(currentPlanIndex - 1)"
            :disabled="currentPlanIndex === 0" aria-label="Previous plan">
            ‹
          </button>
          <button class="supporter-nav-btn supporter-nav-right" @click="scrollToPlan(currentPlanIndex + 1)"
            :disabled="currentPlanIndex === plans.length - 1" aria-label="Next plan">
            ›
          </button>

          <div class="supporter-carousel" ref="carousel">
            <div v-for="(plan, index) in allMemberships" :key="plan.tier_id" class="supporter-slide">
              <article class="supporter-card">
                <div class="supporter-card-top">
                  <div class="supporter-top">
                    <div class="supporter-plan-icon">
                      <img :src="getIcon(plan.tier_name ?? '')" :alt="`${plan.tier_name} icon`" />
                    </div>
                    <div class="supporter-plan-meta">
                      <h2 class="supporter-plan-name">{{ plan.tier_name }}</h2>
                      <div class="supporter-plan-price">
                        £{{ plan.price }} / 30 Days
                        <span v-if="plan.price !== 0" class="supporter-vat">+ VAT</span>
                      </div>
                      <div v-if="plan.price === 0" class="supporter-pay-meta">{{ 'No payment • Free access' }}</div>
                       <div v-if="plan.price !== 0" class="supporter-pay-meta">{{ 'Pay once • Non-recurring'}}</div>
                    </div>
                  </div>
                </div>

                <div class="supporter-card-body">
                  <details open class="supporter-details">
                    <summary class="supporter-summary">
                      <span class="supporter-badge">
                        <span class="supporter-dot supporter-dot-green"></span>
                        <span class="text-white">Supported</span>
                      </span>
                      <span class="text-white">Tap</span>
                    </summary>
                    <div class="supporter-panel">
                      <ul class="supporter-features">
                        <li v-for="feature in fetchTierFeatures(plan, true)" :key="feature.tier_feature_id">
                          <span class="supporter-tick">✓</span>
                          <span class="text-white">{{ feature.notes }}</span>
                        </li>
                      </ul>
                    </div>
                  </details>

                  <details class="supporter-details">
                    <summary class="supporter-summary">
                      <span class="supporter-badge">
                        <span class="supporter-dot supporter-dot-red"></span>
                        <span class="text-white">Not Supported</span>
                      </span>
                      <span class="text-white">Tap</span>
                    </summary>
                    <div class="supporter-panel">
                      <ul class="supporter-features">
                        <li v-for="feature in fetchTierFeatures(plan, false)" :key="feature.tier_feature_id">
                          <span class="supporter-cross">✕</span>
                          <span class="text-white">{{ feature.notes }}</span>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>

                <div class="supporter-card-bottom">
                  <button class="supporter-btn" :disabled="(plan.price ?? 0) === 0 || isDowngrade(plan.price ?? 0)"
                    :class="{ 'supporter-btn-secondary': (plan.price ?? 0) === 0 }" type="button"
                    @click="(plan.price ?? 0) !== 0 && fetchMembership(plan.tier_id ?? 0, plan.price ?? 0)">
                    {{ (plan.price ?? 0) === 0 ? 'Current Plan' : 'Get Started' }}
                    <span class="btn-loader" v-if="is_fetching && (plan.price ?? 0) !== 0"></span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div class="supporter-dots">
          <button v-for="(plan, index) in plans" :key="`dot-${plan.id}`" class="supporter-dot-btn"
            :class="{ 'supporter-dot-btn-active': index === currentPlanIndex }" @click="scrollToPlan(index)"
            :aria-label="`Go to plan ${index + 1}`"></button>
        </div>
      </div>
    </div>

    <!-- Desktop Version -->
    <div class="supporter-desktop" v-else>
      <div class="supporter-wrap">
        <div class="supporter-brand">
          <img src="/images/thank-you/Linkswingers.webp" alt="LinkSwingers logo" class="supporter-logo" />
          <div class="supporter-kicker">Choose Your Plan</div>
          <h1 class="supporter-title">LinkSwingers Site Supporter Plans</h1>
          <p class="supporter-subtitle">
            These are <strong>not memberships</strong>. They are <strong>site supporter</strong> payments (valid for
            <strong>30 days</strong>) and are <strong>non-recurring</strong>.
          </p>
        </div>

        <div class="supporter-grid">
          <section v-for="plan in allMemberships" :key="`desktop-${plan.tier_id}`" class="supporter-card">
            <div class="supporter-plan-icon">
              <img :src="getIcon(plan.tier_name ?? '')" :alt="`${plan.tier_name} icon`" />
            </div>
            <h2 class="supporter-plan-name">{{ plan.tier_name }}</h2>
            <p class="supporter-plan-price">
              £{{ plan.price }} / 30 Days
              <span v-if="plan.price !== 0" class="supporter-vat">+ VAT</span>
              <span v-if="plan.price === 0" class="supporter-price-meta">{{ 'No payment • Free access' }}</span>
              <span v-if="plan.price !== 0" class="supporter-price-meta">{{ 'Pay once • Non-recurring' }}</span>
            </p>

            <div class="supporter-group-title supporter-group-title-supported">Supported</div>
            <ul class="supporter-features">
              <li v-for="feature in fetchTierFeatures(plan, true)" :key="feature.tier_feature_id">
                <span class="supporter-tick">✓</span>
                <span class="text-white">{{ feature.notes }}</span>
              </li>
            </ul>

            <div class="supporter-group-title supporter-group-title-not-supported"
              v-if="(fetchTierFeatures(plan, false)?.length ?? 0) > 0">Not Supported</div>
            <ul class="supporter-features">
              <li v-for="feature in fetchTierFeatures(plan, false)" :key="feature.tier_feature_id">
                <span class="supporter-cross">✕</span>
                <span class="text-white">{{ feature.notes }}</span>
              </li>
            </ul>

            <div class="supporter-actions">
              <button class="supporter-btn" :disabled="(plan.price ?? 0) === 0 || isDowngrade(plan.price ?? 0)"
                :class="{ 'supporter-btn-secondary': (plan.price ?? 0) === 0 }" type="button"
                @click="(plan.price ?? 0) !== 0 && fetchMembership(plan.tier_id ?? 0, plan.price ?? 0)">
                {{ (plan.price ?? 0) === 0 ? 'Current Plan' : 'Get Started' }}
                <span class="btn-loader" v-if="is_fetching && (plan.price ?? 0) !== 0"></span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import "swiper/css";
import "swiper/css/navigation";
import type { MembershipsModel, SuccessError, UsersModel } from "~/composables/models";
const currentPlanIndex = ref(0)
const carousel = ref(null)
const isMobile = ref(false)


const user_store = userStore();
const login_store = useLoginStore();
const allMemberships = ref([] as MembershipsModel.FetchMembershipsResponseModel[]);
const is_fetching = ref(false);

const fetchMemberShips = async () => {
  const api_url = getUrl(RequestURL.fetchMemberShips);
  const { data: mem_response } = await useFetch<SuccessError<MembershipsModel.FetchMembershipsResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: {},
    headers: { "content-type": "application/json" }
  });
  return mem_response.value?.result ?? [];
};

allMemberships.value = await fetchMemberShips() as MembershipsModel.FetchMembershipsResponseModel[];

function fetchTierFeatures(item: MembershipsModel.FetchMembershipsResponseModel, is_supported: boolean) {
  if (is_supported) {
    return item.tier_features?.filter(f => f.is_enabled ?? false);
  }
  return item.tier_features?.filter(f => !(f.is_enabled ?? false));

}


function getIcon(tier_name: string): string {

  if (tier_name.includes("Elite")) return "/images/badges/animated/150X150px/elite.gif";
  if (tier_name.includes("Basic+")) return "/images/badges/animated/150X150px/basic.gif";
  if (tier_name.includes("Plus")) return "/images/badges/animated/150X150px/plus.gif";
  return "/images/badges/animated/150X150px/free.gif";
}
function isDowngrade(price: number): boolean {
  const currentPrice = price - (login_store.getUserDetails?.price ?? 0);
  return currentPrice <= 0;
}

async function fetchMembership(tier_id: number, price: number) {
  if (user_store.getLoginId === 0) {
    showToastError("You need to be logged in to perform this action");
    return;
  }

  if (is_fetching.value) return;
  is_fetching.value = true;

  const api_url = getUrl(RequestURL.fetchUserMembership);
  let response = await $fetch<SuccessError<UsersModel.FetchMembershipResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { user_id: user_store.getLoginId, tier_id },
    headers: { "content-type": "application/json" }
  });

  if (response.success) {
    let price_difference = response.response?.price_difference ?? 0;
    if (price_difference > 0) {
      createMembership(price_difference, tier_id);
    } else {
      is_fetching.value = false;
    }
  } else {
    if (response.code === 500) {
      is_fetching.value = false;
      showToastError(response.message ?? "Something went wrong");
    } else {
      createMembership(price, tier_id);
    }
  }
}

async function createMembership(price: number, tier_id: number) {
  const api_url = getUrl(RequestURL.createUserMembership);
  let response = await $fetch<SuccessError<UsersModel.CreateMembershipResponseModel>>(api_url, {
    cache: "no-cache",
    method: "post",
    body: { user_id: user_store.getLoginId, tier_id, price },
    headers: { "content-type": "application/json" }
  });

  is_fetching.value = false;

  if (response.success) {
    await navigateTo(response.response?.session_url, { external: true });
  } else {
    showToastError(response.message);
  }
}
function getPaymentInfo() {

}

function sortMemberShips(features: MembershipsModel.TierFeaturesModel[]): MembershipsModel.TierFeaturesModel[] {
  let enabledfeature = features.filter(f => f.is_enabled ?? false);
  let disabledfeature = features.filter(f => !(f.is_enabled ?? false));
  return enabledfeature.concat(disabledfeature);
}

const plans = ref([
  {
    id: 'basic-free',
    name: 'Basic (Free)',
    price: '£0 / 30 Days',
    vat: false,
    paymentInfo: 'No payment • Free access',
    isCurrent: true,
    icon: 'FREE.gif',
    supportedFeatures: [
      'Messages',
      'Message attachments: pictures only (from your own gallery)',
      'Upload pictures (max 120)',
      'View pictures (LQ)',
      'Like / comment on other people\'s pictures (photo verified required)',
      'Create Meet Events (photo verified profiles only)',
      'Video Roulette (LQ — ads may be shown)',
      'Nearby list (max 10 people)'
    ],
    notSupportedFeatures: [
      'Emojis / stickers',
      'View videos',
      'Upload videos',
      'Private video calls',
      'Video Roulette filters',
      'Who viewed my profile list',
      'Hide from Who viewed me list',
      'Remove attachments from chat'
    ]
  },
  {
    id: 'basic-plus',
    name: 'Basic+',
    price: '£6.50 / 30 Days',
    vat: true,
    paymentInfo: 'Pay once • Non-recurring',
    isCurrent: false,
    icon: 'BASIC.gif',
    supportedFeatures: [
      'Messages',
      'Message attachments (gallery + device)',
      'Upload pictures (max 250)',
      'Upload videos (max 50) — photo verified required',
      'View pictures and videos',
      'Like / comment on other people\'s photos & videos (photo verified required)',
      'Comments enabled on your own media',
      'Emoji + stickers in chat',
      'Who viewed my profile list',
      'Nearby list (full access)',
      'Video Roulette (SQ)',
      'Create Meet Events (photo verified required)',
      'Remove your attachments in chat'
    ],
    notSupportedFeatures: [
      'Private video calls',
      'Video Roulette filters',
      'Hide from Who viewed me list'
    ]
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '£9.50 / 30 Days',
    vat: true,
    paymentInfo: 'Pay once • Non-recurring',
    isCurrent: false,
    icon: 'PLUS.gif',
    supportedFeatures: [
      'Messages',
      'Message attachments (gallery + device)',
      'Upload pictures (max 500)',
      'Upload videos (max 100) — photo verified required',
      'View pictures and videos',
      'Like / comment on other people\'s photos & videos (photo verified required)',
      'Comments enabled on your own media',
      'Emoji + stickers in chat',
      'Who viewed my profile list',
      'Nearby list (full access)',
      'Video Roulette (SQ)',
      'Create Meet Events (photo verified required)',
      'Remove your attachments in chat',
      'Private video calls (SQ) — 120 minutes total per 30 days'
    ],
    notSupportedFeatures: [
      'Video Roulette filters',
      'Hide from Who viewed me list'
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '£14.50 / 30 Days',
    vat: true,
    paymentInfo: 'Pay once • Non-recurring',
    isCurrent: false,
    icon: 'elite.gif',
    supportedFeatures: [
      'Messages',
      'Message attachments (gallery + device)',
      'Upload pictures (max 1000)',
      'Upload videos (max 250) — photo verified required',
      'View pictures and videos',
      'Like / comment on other people\'s photos & videos (photo verified required)',
      'Comments enabled on your own media',
      'Emoji + stickers in chat',
      'Who viewed my profile list',
      'Nearby list (full access)',
      'Video Roulette (HD)',
      'Video Roulette filters',
      'Create Meet Events (photo verified required)',
      'Remove your attachments in chat',
      'Private video calls (HD) — unlimited',
      'Hide from Who viewed me list'
    ],
    notSupportedFeatures: []
  }
])

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const scrollToPlan = (index) => {
  if (index < 0 || index >= plans.value.length) return

  currentPlanIndex.value = index

  if (isMobile.value && carousel.value) {
    const slides = carousel.value.querySelectorAll('.supporter-slide')
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }
}

const handleCarouselScroll = () => {
  if (!carousel.value) return

  const rect = carousel.value.getBoundingClientRect()
  const center = rect.left + rect.width / 2

  let bestIndex = 0
  let bestDistance = Infinity

  const slides = carousel.value.querySelectorAll('.supporter-slide')
  slides.forEach((slide, index) => {
    const slideRect = slide.getBoundingClientRect()
    const slideCenter = slideRect.left + slideRect.width / 2
    const distance = Math.abs(slideCenter - center)

    if (distance < bestDistance) {
      bestDistance = distance
      bestIndex = index
    }
  })

  currentPlanIndex.value = bestIndex
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  if (carousel.value) {
    carousel.value.addEventListener('scroll', handleCarouselScroll)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)

  if (carousel.value) {
    carousel.value.removeEventListener('scroll', handleCarouselScroll)
  }
})
</script>