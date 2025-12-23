<template>
  <div class="supporter-page">
    <!-- Mobile Version -->
    <div class="supporter-mobile" v-if="isMobile">
      <div class="supporter-app">
        <div class="supporter-header">
          <img src="/images/logo/landing-logo.gif" alt="LinkSwingers logo" class="supporter-logo" />
          <div class="supporter-kicker">Choose Your Plan</div>
          <h1 class="supporter-title text-white">LinkSwingers Site Supporter Plans</h1>
          <p class="supporter-subtitle">Swipe left/right to compare plans. No page scrolling — scroll inside each plan card.</p>
        </div>

        <section class="supporter-carousel-shell">
          <button 
            class="supporter-nav-btn supporter-nav-left" 
            @click="scrollToPlan(currentPlanIndex - 1)"
            :disabled="currentPlanIndex === 0"
            aria-label="Previous plan"
          >
            ‹
          </button>
          <button 
            class="supporter-nav-btn supporter-nav-right" 
            @click="scrollToPlan(currentPlanIndex + 1)"
            :disabled="currentPlanIndex === plans.length - 1"
            aria-label="Next plan"
          >
            ›
          </button>

          <div class="supporter-carousel" ref="carousel">
            <div 
              v-for="(plan, index) in plans" 
              :key="plan.id"
              class="supporter-slide"
            >
              <article class="supporter-card">
                <div class="supporter-card-top">
                  <div class="supporter-top">
                    <div class="supporter-plan-icon">
                      <img :src="`/images/badges/animated/150X150px/${plan.icon}`" :alt="`${plan.name} icon`" />
                    </div>
                    <div class="supporter-plan-meta">
                      <h2 class="supporter-plan-name">{{ plan.name }}</h2>
                      <div class="supporter-plan-price">
                        {{ plan.price }}
                        <span v-if="plan.vat" class="supporter-vat">+ VAT</span>
                      </div>
                      <div class="supporter-pay-meta">{{ plan.paymentInfo }}</div>
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
                        <li v-for="feature in plan.supportedFeatures" :key="feature">
                          <span class="supporter-tick">✓</span>
                          <span class="text-white">{{ feature }}</span>
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
                        <li v-for="feature in plan.notSupportedFeatures" :key="feature">
                          <span class="supporter-cross">✕</span>
                          <span class="text-white">{{ feature }}</span>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>

                <div class="supporter-card-bottom">
                  <button 
                    class="supporter-btn"
                    :class="{ 'supporter-btn-secondary': plan.isCurrent }"
                    type="button"
                  >
                    {{ plan.isCurrent ? 'Current Plan' : 'Get Started' }}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div class="supporter-dots">
          <button 
            v-for="(plan, index) in plans" 
            :key="`dot-${plan.id}`"
            class="supporter-dot-btn"
            :class="{ 'supporter-dot-btn-active': index === currentPlanIndex }"
            @click="scrollToPlan(index)"
            :aria-label="`Go to plan ${index + 1}`"
          ></button>
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
            These are <strong>not memberships</strong>. They are <strong>site supporter</strong> payments (valid for <strong>30 days</strong>) and are <strong>non-recurring</strong>.
          </p>
        </div>

        <div class="supporter-grid">
          <section 
            v-for="plan in plans" 
            :key="`desktop-${plan.id}`"
            class="supporter-card"
          >
            <div class="supporter-plan-icon">
              <img :src="`/images/badges/animated/150X150px/${plan.icon}`" :alt="`${plan.name} icon`" />
            </div>
            <h2 class="supporter-plan-name">{{ plan.name }}</h2>
            <p class="supporter-plan-price">
              {{ plan.price }}
              <span v-if="plan.vat" class="supporter-vat">+ VAT</span>
              <span class="supporter-price-meta">{{ plan.paymentInfo }}</span>
            </p>

            <div class="supporter-group-title supporter-group-title-supported">Supported</div>
            <ul class="supporter-features">
              <li v-for="feature in plan.supportedFeatures" :key="feature">
                <span class="supporter-tick">✓</span>
                <span class="text-white">{{ feature }}</span>
              </li>
            </ul>

            <div class="supporter-group-title supporter-group-title-not-supported">Not Supported</div>
            <ul class="supporter-features">
              <li v-for="feature in plan.notSupportedFeatures" :key="feature">
                <span class="supporter-cross">✕</span>
                <span class="text-white">{{ feature }}</span>
              </li>
            </ul>

            <div class="supporter-actions">
              <button 
                class="supporter-btn"
                :class="{ 'supporter-btn-secondary': plan.isCurrent }"
                type="button"
              >
                {{ plan.isCurrent ? 'Current Plan' : 'Get Started' }}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentPlanIndex = ref(0)
const carousel = ref(null)
const isMobile = ref(false)

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